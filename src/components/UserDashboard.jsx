// components/UserDashboard.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHistory from './OrderHistory';

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [finalOrderTotal, setFinalOrderTotal] = useState(0);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('userProducts')) || [];
    setProducts(savedProducts);
    setFilteredProducts(savedProducts);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleIncrease = (product) => {
    setCart((prev) => {
      const existing = prev[product.id] || {
        ...product,
        quantity: 0,
        totalPrice: 0,
      };

      if (existing.quantity >= product.quantity) return prev;

      const newQuantity = existing.quantity + 1;

      return {
        ...prev,
        [product.id]: {
          ...existing,
          quantity: newQuantity,
          totalPrice: newQuantity * (product.price || 0),
        },
      };
    });
  };

  const handleDecrease = (product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      if (!existing) return prev;

      const newQuantity = existing.quantity - 1;
      if (newQuantity <= 0) {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      }

      return {
        ...prev,
        [product.id]: {
          ...existing,
          quantity: newQuantity,
          totalPrice: newQuantity * (product.price || 0),
        },
      };
    });
  };

  const saveOrderToHistory = (cartItems, total) => {
    const orders = JSON.parse(localStorage.getItem('userOrders')) || [];
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cartItems,
      total,
    };
    localStorage.setItem('userOrders', JSON.stringify([...orders, newOrder]));
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setFinalOrderTotal(total);
    
    saveOrderToHistory(cartItems, total);
    
    const updatedProducts = products
      .map(product => {
        const cartItem = cart[product.id];
        if (cartItem) {
          return {
            ...product,
            quantity: product.quantity - cartItem.quantity
          };
        }
        return product;
      })
      .filter(product => product.quantity > 0);
    
    setProducts(updatedProducts);
    localStorage.setItem('userProducts', JSON.stringify(updatedProducts));
    
    setOrderPlaced(true);
    setCart({});
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  const cartItems = Object.values(cart);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Glassmorphic navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Luxury Boutique
          </h1>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/90 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium shadow-sm"
            >
              <option value="All">All Collections</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">kids</option>
            </select>
            
            <button
              onClick={() => setShowOrderHistory(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg shadow hover:shadow-md transition-all hover:scale-105 flex items-center space-x-2"
            >
              <span>Order History</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow hover:shadow-md transition-all hover:scale-105 flex items-center space-x-2"
            >
              <span>Logout</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {showOrderHistory ? (
          <OrderHistory onClose={() => setShowOrderHistory(false)} />
        ) : (
          <>
            {/* Product grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20 transition-all hover:shadow-xl hover:scale-[1.02]"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-1">
                            {product.category}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.quantity} left
                        </span>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">₹{product.price || 0}</span>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDecrease(product)}
                            className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                          
                          <span className="w-8 text-center font-medium text-gray-900">
                            {cart[product.id]?.quantity || 0}
                          </span>
                          
                          <button
                            onClick={() => handleIncrease(product)}
                            disabled={(cart[product.id]?.quantity || 0) >= product.quantity}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                              (cart[product.id]?.quantity || 0) >= product.quantity
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                            }`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating cart */}
            {cartItems.length > 0 && (
              <div className="fixed bottom-6 right-6 z-50">
                <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden w-80 transform transition-all hover:scale-105">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Your Shopping Bag
                    </h2>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 border-b border-gray-100 last:border-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.quantity} × ₹{item.price}</p>
                          </div>
                          <span className="font-semibold">₹{item.totalPrice}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium text-gray-700">Total</span>
                      <span className="text-xl font-bold text-gray-900">₹{cartTotal}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg shadow hover:shadow-md transition-all hover:scale-[1.02]"
                    >
                      Secure Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Order confirmation modal */}
            {orderPlaced && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md transform transition-all">
                  <div className="p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
                    <p className="text-lg font-semibold text-gray-900 mb-6">Total: ₹{finalOrderTotal}</p>
                    <button
                      onClick={() => setOrderPlaced(false)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg shadow hover:shadow-md transition-all"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;