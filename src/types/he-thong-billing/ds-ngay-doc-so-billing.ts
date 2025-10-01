/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddDsNgayDocSoBillingRequest {
  nam: number;
  ky: number;
  soNgayDocSoBilling: number;
  ghiChu?: string;
  ngayTao: string;
  nguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateDsNgayDocSoBillingRequest {
  nam: number;
  ky: number;
  soNgayDocSoBilling: number;
  ghiChu?: string;
  ngayCapNhat?: string;
  nguoiCapNhat?: number;
}

/* ========== RESPONSE (API --> CLIENT) ========== */
export interface DsNgayDocSoBillingResponse {
  id: number;
  nam: number;
  ky: number;
  soNgayDocSoBilling: number;
  ghiChu?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao?: string;
  nguoiCapNhat?: string;
}
