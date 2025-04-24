import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const axiosApi = axios.create({ baseURL: backendUrl });
if (typeof window !== "undefined") {
  axiosApi.interceptors.request.use((config) => {
    const initialToken = localStorage.getItem("Token");

    config.headers["Authorization"] = initialToken?.startsWith("Bearer ")
      ? initialToken
      : `Bearer ${initialToken}`;
    return config;
  });
}

export default axiosApi;
