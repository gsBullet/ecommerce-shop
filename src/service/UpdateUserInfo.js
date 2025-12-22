import Axios from "./Axios";

export const updateUserInfo = async ({ formData, token, userId }) => {
  const response = await Axios.post(
    `auth/general-user-update-info/${userId}`,
    {
      formData,
    },
    {
      headers: {
        Authorization: `EcomToken ${token}`,
      },
    }
  );
  return response.data;
};
