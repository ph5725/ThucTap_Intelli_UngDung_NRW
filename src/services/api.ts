// src/api/api.ts
import axios from "axios";

// Tạo axios instance chung
const api = axios.create({
  baseURL: "https://localhost:7019/api", // Domain API
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Interceptor tự động gắn token vào header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  else
    console.error("Không có token");
  return config;
});

// Interceptor xử lý lỗi khi gọi API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Kết nối API thất bại:", error.message);
    return Promise.reject(error);
  }
);

export default api;