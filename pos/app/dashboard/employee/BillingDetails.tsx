import { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';
import AddMenuDialog from './AddMenuDialog';
import QRCode from "react-qr-code"; 
import PrintBill from './PrintBill';


const BillingDetails = ({ table, onUpdateTable }: any) => {
  const [isAddMenuOpen, setAddMenuOpen] = useState(false);
  const [discount, setDiscount] = useState(0); // Discount in percentage
  const [tax, setTax] = useState(10); // Tax in percentage
  const [isPrintModalOpen, setPrintModalOpen] = useState(false);

  if (!table) {
    return (
      <div className="bg flex items-center justify-center px-4 py-2 ">
        <p>Select a table to view billing details.</p>
      </div>
    );
  }

  const calculateBill = (orders: any[]) => {
    const subtotal = orders.reduce(
      (total, order) => total + order.price * order.quantity,
      0
    );
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = ((subtotal - discountAmount) * tax) / 100;
    return {
      subtotal,
      discountAmount,
      taxAmount,
      total: subtotal - discountAmount + taxAmount
    };
  };

  const handleAddMenu = (selectedItems: any[]) => {
    const updatedOrders = [...table.orders, ...selectedItems];
    const { total } = calculateBill(updatedOrders);

    onUpdateTable({
      ...table,
      orders: updatedOrders,
      bill: total
    });
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    const updatedOrders = table.orders.map((order: any, i: number) =>
      i === index ? { ...order, quantity } : order
    );

    const { total } = calculateBill(updatedOrders);

    onUpdateTable({
      ...table,
      orders: updatedOrders,
      bill: total
    });
  };

  const handleRemoveOrder = (index: number) => {
    const updatedOrders = table.orders.filter(
      (_: any, i: number) => i !== index
    );
    const { total } = calculateBill(updatedOrders);

    onUpdateTable({
      ...table,
      orders: updatedOrders,
      bill: total
    });
  };

  const handleCheckout = () => {
    if (
      confirm('Are you sure you want to finalize the bill and reset the table?')
    ) {
      onUpdateTable({
        ...table,
        status: 'Available',
        orders: [],
        bill: 0
      });
    }
  };

  const { subtotal, discountAmount, taxAmount, total } = calculateBill(
    table.orders
  );
  const togglePrintModal = () => setPrintModalOpen(!isPrintModalOpen);

  const customer = {
    name: "John Doe",
    phone: "123-456-7890",
    members: 4,
    rating: 4.5,
    review: "Great service, enjoyed the meal!",
  };

  return (
    <div className="rounded-lg -mt-14 mb-5 bg-secondary  p-6 shadow-lg">
      {/* Customer Details */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <QRCode value={`https://restaurant.com/table/${table.name}`} size={100} />
          <div>
            <h3 className="text-xl font-semibold">Customer Details</h3>
            <p className=""><strong>Name:</strong> {customer.name}</p>
            <p className=""><strong>Phone:</strong> {customer.phone}</p>
            <p className=""><strong>Review:</strong> {customer.review}</p>
          </div>
        </div>
        <p className="text-gray-600">Capacity: {table.capacity}</p>
      </div>


      <div className="mt-2">
        <table className="w-full text-left">
          <thead className=" flex w-full">
            <tr className="mb-4 flex w-full">
              <th className="border-b w-1/4 px-4 py-2 text-left text-sm ">
                Item
              </th>
              <th className="border-b w-1/4 px-4 py-2 text-left text-sm ">
                Price
              </th>
              <th className="border-b w-1/4 px-4 py-2 text-left text-sm ">
                Quantity
              </th>
              <th className="border-b w-1/4 px-4 py-2 text-left text-sm ">
                Total
              </th>
              <th className="border-b w-1/4 px-4 py-2 text-left text-sm ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className="bg-grey-light flex w-full flex-col items-center justify-between overflow-y-scroll"
            style={{ height: '30vh' }}
          >
            {table.orders.length === 0 ? (
              <tr className="mb-4 flex w-full">
                <td colSpan={5} className="px-4 py-2 text-center ">
                  No orders yet
                </td>
              </tr>
            ) : (
              table.orders.map((order: any, index: number) => (
                <tr key={index} className="mb-4 flex w-full hover:bg-gray-50 hover:bg-opacity-10">
                  <td className="border-b w-1/4 px-4 py-2 text-sm ">
                    {order.name}
                  </td>
                  <td className="border-b w-1/4 px-4 py-2 text-sm ">
                    ₹{order.price}
                  </td>
                  <td className="border-b  w-1/4 px-4 py-2 text-sm ">
                    <input
                      type="number"
                      value={order.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(index, Number(e.target.value))
                      }
                      className="w-16 rounded-lg border p-2 text-center"
                    />
                  </td>
                  <td className="border-b  w-1/4 px-4 py-2 text-sm ">
                    ₹{order.price * order.quantity}
                  </td>
                  <td className="border-b w-1/4 px-4 py-2">
                    <button
                      onClick={() => handleRemoveOrder(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
           
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-sm ">
          <p>Subtotal</p>
          <p>₹{subtotal}</p>
        </div>
        <div className="flex justify-between text-sm ">
          <p>
            Discount (
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-16 rounded-lg border p-2 text-center"
            />
            %)
          </p>
          <p>- ₹{discountAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm ">
          <p>
            Tax (
            <input
              type="number"
              value={tax}
              onChange={(e) => setTax(Number(e.target.value))}
              className="w-16 rounded-lg border p-2 text-center"
            />
            %)
          </p>
          <p>+ ₹{taxAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-xl font-semibold text-gray-900">
          <p>Total</p>
          <p>₹{total.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-between space-x-4">
        <button
          onClick={() => setAddMenuOpen(true)}
          className="flex items-center rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md hover:bg-blue-700"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Menu
        </button>
        <button
          onClick={togglePrintModal}
          className="rounded-lg bg-green-600 px-6 py-2 text-white shadow-md hover:bg-green-700"
        >
          Finalize Bill
        </button>
      </div>

      <AddMenuDialog
        isOpen={isAddMenuOpen}
        onClose={() => setAddMenuOpen(false)}
        onAddMenu={handleAddMenu}
      />
      <PrintBill 
        isOpen={isPrintModalOpen} 
        onClose={togglePrintModal} 
        orderDetails={table.orders} 
      />
    </div>
  );
};

export default BillingDetails;
