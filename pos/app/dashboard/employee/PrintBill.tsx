"use client";
import React from 'react';

const PrintBill = ({ isOpen, onClose, orderDetails }: { isOpen: boolean, onClose: () => void, orderDetails: any[] }) => {

  const calculateTotal = (orders: any[]) => {
    return orders.reduce((acc, order) => acc + order.price * order.quantity, 0);
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex font-mono items-center justify-center z-50">
        <div className="bg-secondary p-6 w-96 max-w-lg rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Restaurant Name</h1>
            <h3 className="text-lg mb-4">Your Order Summary</h3>
          </div>

          <div className="border-t-2 border-gray-300 my-4" />

          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Item</th>
                <th className="text-left p-2">Quantity</th>
                <th className="text-right p-2">Price</th>
                <th className="text-right p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((order, index) => (
                <tr key={index}>
                  <td className="p-2">{order.name}</td>
                  <td className="p-2">{order.quantity}</td>
                  <td className="p-2 text-right">₹{order.price}</td>
                  <td className="p-2 text-right">₹{order.price * order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t-2 border-gray-300 my-4" />

          <div className="flex justify-between mt-4">
            <span className="font-semibold">Subtotal:</span>
            <span>₹{calculateTotal(orderDetails).toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span className="font-semibold">Tax (5%):</span>
            <span>₹{(calculateTotal(orderDetails) * 0.05).toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-4 font-bold">
            <span>Total:</span>
            <span>₹{(calculateTotal(orderDetails) * 1.05).toFixed(2)}</span>
          </div>

          <div className="mt-6 flex justify-center">
            <button 
              onClick={onClose} 
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Thank you for dining with us! We hope to see you again soon.</p>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default PrintBill;
