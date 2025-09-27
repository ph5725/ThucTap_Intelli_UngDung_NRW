import api from "../config/api";

export interface MeterConfig {
  id: number;
  objectCode: string;
  meterCode: string;
  note?: string;
  locked?: boolean;
  errorFlag?: boolean;

  // Metadata (BE readonly)
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedByUser?: string;
}

const BASE_URL = "/cauHinhDht";

// Payload khi thêm mới
export type MeterConfigCreatePayload = {
  objectCode: string;
  meterCode: string;
  note?: string;
  locked?: boolean;
  errorFlag?: boolean;

  // metadata do FE gửi
  createdAt: string;
  createdBy: string;
};

// Payload khi update
export type MeterConfigUpdatePayload = {
  objectCode: string;
  meterCode: string;
  note?: string;
  locked?: boolean;

  // metadata do FE gửi
  updatedAt: string;
  updatedByUser: string;
};

export const meterConfigService = {
  getAll: () => api.get<MeterConfig[]>(BASE_URL),
  getById: (id: number) => api.get<MeterConfig>(`${BASE_URL}/${id}`),

  create: (data: MeterConfigCreatePayload) =>
    api.post(BASE_URL, data),

  update: (id: number, data: MeterConfigUpdatePayload) =>
    api.put(`${BASE_URL}/${id}`, data),

  delete: (id: number) => api.delete(`${BASE_URL}/${id}`),
};
