/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddDsNgayDocSoBillingRequest {
  Nam: number;
  Ky: number;
  SoNgayDocSoBilling: number;
  GhiChu?: string;
  NgayTao: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateDsNgayDocSoBillingRequest {
  Nam: number;
  Ky: number;
  SoNgayDocSoBilling: number;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface DsNgayDocSoBillingResponse {
  Id: number;
  Nam: number;
  Ky: number;
  SoNgayDocSoBilling: number;
  GhiChu?: string;
  NgayTao: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}