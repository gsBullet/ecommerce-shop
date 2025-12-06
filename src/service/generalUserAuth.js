import Axios from "./Axios";

export const customerForgotPassword = async (data) => {
  const res = await Axios.post("auth/general-user-forgot-password", data);
  return res.data;
};
