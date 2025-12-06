import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // ✅ Load Cart from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // ✅ Fetch All Products
  const getAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/products");
      const data = await response.json();

      setAll_product(data.data);

      // ✅ Initialize cart based on products
      let cart = {};
      data.data.forEach((product) => {
        cart[product._id] = 0;
      });

      // ✅ Merge old saved cart with new product list
      setCartItems((prev) => ({ ...cart, ...prev }));
    } catch (error) {
      console.log("Product Fetch Error:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // ✅ ✅ MODERN ADD TO CART
  const addToCart = (productId) => {
    setCartItems((prev) => {
      const updatedCart = {
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      };

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  // ✅ ✅ MODERN REMOVE FROM CART
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updatedCart = {
        ...prev,
        [productId]: prev[productId] > 0 ? prev[productId] - 1 : 0,
      };

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  // ✅ ✅ TOTAL CART AMOUNT
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const product = all_product.find(
          (product) => product.id === item
        );

        if (product) {
          totalAmount += cartItems[item] * product.new_price;
        }
      }
    }

    return totalAmount;
  };

  // ✅ ✅ TOTAL CART ITEM COUNT
  const getTotalCartItems = () => {
    let totalItems = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }

    return totalItems;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    getAllProducts,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
