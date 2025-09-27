// config/billingReadingService.ts
import api from "../config/api";

export interface BillingReading {
  id: number;
  year: number;
  period: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  daysCount: number;

}

export const billingReadingService = {
  list: () => api.get<BillingReading[]>("/dsNgayDocSoBilling").then(res => res.data),
  create: (data: BillingReading) => api.post("/dsNgayDocSoBilling", data),
  detail: (id: number) => api.get<BillingReading>(`/dsNgayDocSoBilling/${id}`).then(res => res.data),
  update: (id: number, data: BillingReading) => api.put(`/dsNgayDocSoBilling/${id}`, data),
  delete: (id: number) => api.delete(`/dsNgayDocSoBilling/${id}`)
};
