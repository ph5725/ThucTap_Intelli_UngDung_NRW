/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddDsNgayDocSoBillingChiTietRequest {
  MaNgayDocSo?: number;
  Nam: number;
  Ky: number;
  Dot: number;
  SoNgayDocSoDot: number;
  GhiChu?: string;
  NgayTao: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateDsNgayDocSoBillingChiTietRequest {
  MaNgayDocSo?: number;
  Nam: number;
  Ky: number;
  Dot: number;
  SoNgayDocSoDot: number;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface DsNgayDocSoBillingChiTietResponse {
  Id: number;
  MaNgayDocSo?: string;
  Nam: number;
  Ky: number;
  Dot: number;
  SoNgayDocSoDot: number;
  GhiChu?: string;
  NgayTao: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}