// components/AdminProducts.jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const AdminProducts = ({ category }) => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState({});

  const products = [
    { id: 1, name: "Men's Shirt", category: "Men", price: 700 },
    { id: 2, name: "Men's Pant", category: "Men", price: 1200 },
    { id: 3, name: "Women's Shirt", category: "Women", price: 750 },
    { id: 4, name: "Women's Pant", category: "Women", price: 1100 },
    { id: 5, name: "Kid's Shirt", category: "Kids", price: 500 },
    { id: 6, name: "Kid's Pant", category: "Kids", price: 600 },
    { id: 7, name: "Men's Blazer", category: "Men", price: 2500 },
    { id: 8, name: "Women's Skirt", category: "Women", price: 900 },
    { id: 9, name: "Kid's Jacket", category: "Kids", price: 800 },
    { id: 10, name: "Men's T-Shirt", category: "Men", price: 400 },
    { id: 11, name: "Women's Top", category: "Women", price: 650 },
    { id: 12, name: "Kid's Shorts", category: "Kids", price: 350 },
  ];

  const filteredProducts = products.filter((product) => product.category === category);

  const handleQuantityChange = (product, quantity) => {
    setSelectedProducts((prev) => {
      const updated = { ...prev };
      if (quantity > 0) {
        updated[product.id] = { ...product, quantity };
      } else {
        delete updated[product.id];
      }
      return updated;
    });
  };

  const handleAdd = () => {
    const productArray = Object.values(selectedProducts);
    // Get existing products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem('userProducts')) || [];
    
    // Create a map of existing products for easy lookup
    const existingProductsMap = new Map(existingProducts.map(p => [p.id, p]));
    
    // Update the map with new products (will overwrite if same id exists)
    productArray.forEach(product => {
      existingProductsMap.set(product.id, product);
    });
    
    // Convert back to array and save
    const updatedProducts = Array.from(existingProductsMap.values());
    localStorage.setItem('userProducts', JSON.stringify(updatedProducts));
    alert('Products added for user.');
  };

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white flex justify-between items-center p-4">
        <button 
          onClick={handleBack}
          className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Categories
        </button>
        <h1 className="text-xl font-bold">{category} Products</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleAdd}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Add Selected
          </button>
        </div>
      </nav>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;