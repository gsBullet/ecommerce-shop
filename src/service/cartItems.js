import Axios from "./Axios";

export const addCartItems = ({ formData, token }) => {
  const cartItems = Axios.post(
    "cart/getCartItems",
    {
      formData,
    },
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return cartItems;
};
