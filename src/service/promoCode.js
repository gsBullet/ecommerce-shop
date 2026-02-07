import Axios from "./Axios";

export const applyPromoCodeForProduct = async (token, promo) => {
  const response = await Axios.get(`/apply-promo-code-for-products?promo=${promo}`, {
    headers: {
      Authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
