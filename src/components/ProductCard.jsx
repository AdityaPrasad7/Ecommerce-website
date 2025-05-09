import { useState } from 'react';

const ProductCard = ({ product, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

  const increase = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQuantityChange(product, newQty);
  };

  const decrease = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onQuantityChange(product, newQty);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-sm font-medium">₹{product.price}</p>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={decrease}
          className="bg-red-400 text-white px-3 rounded hover:bg-red-500"
        >
          -
        </button>
        <span className="mx-3 font-semibold">{quantity}</span>
        <button
          onClick={increase}
          className="bg-green-500 text-white px-3 rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;