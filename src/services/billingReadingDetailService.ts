import api from "../config/api";

export interface BillingReadingDetail {
  id: number;
  code: string;
  year: number;
  period: string;
  batch: string;
  daysCount: number;
  note?: string;

  // Metadata
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export const billingReadingDetailService = {
  list: () =>
    api.get<BillingReadingDetail[]>("/dsNgayDocSoBillingChiTiet")
       .then(res => res.data),

  detail: (id: number) =>
    api.get<BillingReadingDetail>(`/dsNgayDocSoBillingChiTiet/${id}`)
       .then(res => res.data),

  create: (data: Omit<BillingReadingDetail, "id">) =>
    api.post<BillingReadingDetail>("/dsNgayDocSoBillingChiTiet", data)
       .then(res => res.data),

  update: (id: number, data: BillingReadingDetail) =>
    api.put<BillingReadingDetail>(`/dsNgayDocSoBillingChiTiet/${id}`, data)
       .then(res => res.data),

  delete: (id: number) =>
    api.delete(`/dsNgayDocSoBillingChiTiet/${id}`)
       .then(res => res.data),
};
