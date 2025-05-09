// components/OrderHistory.js
import { useEffect, useState } from 'react';

const OrderHistory = ({ onClose }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order History</h2>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <ul className="mb-4">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between py-2 border-b">
                    <div>
                      <span>{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-medium">₹{item.totalPrice}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end font-bold text-lg">
                Total: ₹{order.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;