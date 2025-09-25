import api from "../config/api";

//
// Entity chính từ BE
//
export interface Billing {
  id: number;
  consumption: number;
  objectCode: string;
  period: string;
  year: number;
  batch: string;
  fromDate: string;
  toDate: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedByUser?: string;
  note?: string;

  // metadata riêng cho sản lượng
  updatedAtReading?: string;
  updatedByReading?: string;
}

//
// DTO cho Add
//
export type CreateBillingDTO = Omit<
  Billing,
  | "id"
  | "updatedAt"
  | "updatedByUser"
  | "updatedAtReading"
  | "updatedByReading"
>;

//
// DTO cho Update
//
export type UpdateBillingDTO = Partial<
  Omit<Billing, "id" | "createdBy" | "createdAt">
> & {
  updatedAt: string;
  updatedByUser: string;
};

//
// Service CRUD
//
export const billingService = {
  getAll: () => api.get<Billing[]>("/billing"),

  getById: (id: number) => api.get<Billing>(`/billing/${id}`),

  // FE sẽ sinh id, createdAt, createdBy trước khi gọi
  create: (data: CreateBillingDTO) =>
    api.post<Billing>("/billing", data),

  // FE sẽ sinh updatedAt, updatedByUser trước khi gọi
  update: (id: number, data: UpdateBillingDTO) =>
    api.put<Billing>(`/billing/${id}`, data),

  delete: (id: number) => api.delete(`/billing/${id}`),
};
