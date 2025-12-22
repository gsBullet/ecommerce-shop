import Axios from "./Axios";

export const updateUserInfo = ({ formData, token, userId }) => {
  const response = Axios.post(
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
