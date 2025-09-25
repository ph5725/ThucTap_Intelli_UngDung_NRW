import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7019", // Swagger backend
});

// API Công Ty
export const getCompanyStats = async () => {
  const res = await api.get("/api/Dashboard/NRWCongTy"); // thay endpoint đúng trong swagger
  return res.data;
};

// API DMA
export const getDmaStats = async () => {
  const res = await api.get("/api/Dashboard/NRWDMA"); // thay endpoint đúng trong swagger
  return res.data;
};

export default api;
