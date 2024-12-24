import { useState } from 'react';

const menuItems = [
  { id: 1, name: 'Pizza', price: 400 },
  { id: 2, name: 'Pasta', price: 200 },
  { id: 3, name: 'Burger', price: 150 },
  { id: 4, name: 'Fries', price: 100 }
];

const AddMenuDialog = ({ isOpen, onClose, onAddMenu }: any) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const toggleItem = (item: any) => {
    const exists = selectedItems.find((i) => i.id === item.id);
    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + quantity) } : item
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-4">
        <h3 className="mb-4 text-lg font-bold">Add Menu Items</h3>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  checked={!!selectedItems.find((i) => i.id === item.id)}
                  onChange={() => toggleItem(item)}
                  className="mr-2"
                />
                {item.name} - ₹{item.price}
              </div>
              {selectedItems.find((i) => i.id === item.id) && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="rounded bg-gray-200 px-2 py-1"
                  >
                    -
                  </button>
                  <span>{selectedItems.find((i) => i.id === item.id)?.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="rounded bg-gray-200 px-2 py-1"
                  >
                    +
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAddMenu(selectedItems);
              onClose();
            }}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenuDialog;
