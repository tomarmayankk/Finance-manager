import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://finance-manager-backend-dcve.onrender.com/api",
  withCredentials: true, // VERY IMPORTANT for cookies
});

export default axiosInstance;