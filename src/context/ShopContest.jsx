import React, { createContext, useEffect, useState, useCallback } from "react";
import Axios from "../service/Axios";

export const ShopContext = createContext(null);

const CART_STORAGE_KEY = "cart_v1";

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = async () => {
    try {
      const res = await Axios.get("products");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Product fetch failed", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ---------------- PERSIST CART ---------------- */
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  /* ---------------- CART ACTIONS ---------------- */
  const addToCart = useCallback((productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => {
      if (!prev[productId]) return prev;

      const updated = { ...prev };

      if (updated[productId] === 1) {
        delete updated[productId]; // 🔥 remove zero values
      } else {
        updated[productId]--;
      }

      return updated;
    });
  }, []);

  const clearCart = () => setCartItems({});

  /* ---------------- CART HELPERS ---------------- */
  const getTotalItems = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getTotalAmount = () =>
    Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find((p) => p.id === id);
      return product ? total + product.new_price * qty : total;
    }, 0);
  
  /* ---------------- CONTEXT ---------------- */
  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalAmount,
        fetchProducts
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
