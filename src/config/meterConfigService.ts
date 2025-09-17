// src/config/meterConfigService.ts
import api from "./api";

export interface MeterConfig {
  id: number;
  objectCode: string;
  meterCode: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedByUser?: string;
  note?: string;
  locked?: boolean;
}

const BASE_URL = "/cauHinhDht";

export const meterConfigService = {
  getAll: () => api.get<MeterConfig[]>(BASE_URL),
  getById: (id: number) => api.get<MeterConfig>(`${BASE_URL}/${id}`),
  create: (data: MeterConfig) => api.post(BASE_URL, data),
  update: (id: number, data: MeterConfig) => api.put(`${BASE_URL}/${id}`, data),
  delete: (id: number) => api.delete(`${BASE_URL}/${id}`),
};
