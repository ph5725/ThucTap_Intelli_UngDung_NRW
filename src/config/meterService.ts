// src/services/meterService.ts
import api from "../config/api"; // axios instance

export interface Meter {
  id: number;
  code: string;
  name: string;
  volume: number;
  status: "Hoạt động" | "Cảnh báo" | "Lỗi";
  locked?: boolean;
  recordDate: string;
  updatedDate: string;
  updatedBy: string;
  errorFlag: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedByUser: string;
  note: string;
}

const BASE_URL = "/dongHoTong";

export const meterService = {
  getAll: () => api.get<Meter[]>(BASE_URL),
  getById: (id: number) => api.get<Meter>(`${BASE_URL}/${id}`),
  create: (data: Meter) => api.post(BASE_URL, data),
  update: (id: number, data: Meter) => api.put(`${BASE_URL}/${id}`, data),
  delete: (id: number) => api.delete(`${BASE_URL}/${id}`),
};
