const PRODUCTS_KEY = 'globalProducts';

// Default products with initial quantities

export const getProducts = () => {
  const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
  return products || [];
};

export const updateProductQuantity = (productId, change) => {
  const products = getProducts();
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex >= 0) {
    const newQuantity = Math.max(0, products[productIndex].quantity + change);
    products[productIndex] = {
      ...products[productIndex],
      quantity: newQuantity
    };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return true;
  }
  return false;
};

export const initializeProducts = () => {
  const existing = localStorage.getItem(PRODUCTS_KEY);
  if (!existing) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  }
};