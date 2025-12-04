import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState();
  console.log(all_product);
  

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < all_product?.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/products");
      const data = await response.json();
      setAll_product(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const addToCart = (productId) => {
    setCartItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
    // console.log(cartItems);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let product = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += cartItems[item] * product.new_price;
      }
    }
    return totalAmount;
  };

  const getTotatCartItems = () => {
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
    getTotatCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
