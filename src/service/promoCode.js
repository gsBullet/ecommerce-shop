import Axios from "./Axios";

export const applyPromoCodeForProduct = async (token, promo, userId, cartItems) => {
  const response = await Axios.get(`/apply-promo-code-for-products?promo=${promo}&userId=${userId}&cartItems=${cartItems}`, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
