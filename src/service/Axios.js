import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:9000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ ✅ AUTO TOKEN ATTACH (INTERCEPTOR)
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("usertoken");

    if (token) {
      config.headers.Authorization = `EcomToken ${token}`; 
      // ✅ যদি আপনার backend "Token xxx" চায়, তবে লিখবেন:
      // config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
