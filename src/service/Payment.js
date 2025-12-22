import Axios from "./Axios";

export const ManualPaymentService = async (data, token) => {
  const response = await Axios.post(`/payments/manual-create`, data, {
    headers: {
      authorization: `EcomToken ${token}`,
    },
  });
  return response.data;
};
