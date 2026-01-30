import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Axios from "../service/Axios";

export const ShopContext = createContext(null);

const CART_STORAGE_KEY = "cart_v1";

const ShopContextProvider = ({ children }) => {
  /* ---------------- STATES ---------------- */
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
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  /* ---------------- CART ACTIONS ---------------- */

  // ✅ ADD TO CART (size-aware)
  const addToCart = useCallback((productId, selectedSize) => {
    const cartKey = `${productId}_${selectedSize}`;

    setCartItems((prev) => ({
      ...prev,
      [cartKey]: {
        productId,
        size: selectedSize,
        quantity: (prev[cartKey]?.quantity || 0) + 1,
      },
    }));
  }, []);

  // ✅ REMOVE FROM CART
  const removeFromCart = useCallback((cartKey) => {
    setCartItems((prev) => {
      if (!prev[cartKey]) return prev;

      const updated = { ...prev };

      if (updated[cartKey].quantity === 1) {
        delete updated[cartKey];
      } else {
        updated[cartKey].quantity -= 1;
      }

      return updated;
    });
  }, []);

  // ✅ CLEAR CART
  const clearCart = () => setCartItems({});

  /* ---------------- CART HELPERS ---------------- */

  // total item count
  const getTotalItems = () =>
    Object.values(cartItems).reduce(
      (total, item) => total + item.quantity,
      0
    );

  // total price
  const getTotalAmount = () =>
    Object.values(cartItems).reduce((total, item) => {
      const product = products.find(
        (p) => p.id === item.productId
      );

      return product
        ? total + product.new_price * item.quantity
        : total;
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
        fetchProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
