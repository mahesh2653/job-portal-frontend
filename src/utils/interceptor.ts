import axios from "axios";

const axiosApi = axios.create();
if (typeof window !== "undefined") {
  axiosApi.interceptors.request.use((config) => {
    const initialToken = localStorage.getItem("token");

    config.headers["Authorization"] = initialToken?.startsWith("Bearer ")
      ? initialToken
      : `Bearer ${initialToken}`;
    return config;
  });
}

export default axiosApi;
