import React, { createContext, useEffect, useState } from "react";
import Axios from "../service/Axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState({});
  // console.log('cart',cartItems);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // ✅ Fetch All Products
  const getAllProducts = async () => {
    try {
      const response = await Axios.get("products");
      console.log(response);
      setAll_product(response.data.data);


      let cart = {};
      response.data.data.forEach((product) => {
        cart[product._id] = 0;
      });

      setCartItems((prev) => ({ ...cart, ...prev }));
    } catch (error) {
      console.log("Product Fetch Error:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const product = all_product.find((product) => product.id === item);

        if (product) {
          totalAmount += cartItems[item] * product.new_price;
        }
      }
    }

    return totalAmount;
  };

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
