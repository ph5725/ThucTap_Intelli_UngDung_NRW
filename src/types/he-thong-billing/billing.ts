/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddBillingRequest {
  SanLuongTieuThu: number;
  MaDoiTuong: string;
  Ky: number;
  Nam: number;
  Dot?: number;
  TuNgay?: string;
  DenNgay?: string;
  GhiChu?: string;
  NgayTao: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateBillingRequest {
  SanLuongTieuThu: number;
  MaDoiTuong: string;
  Ky: number;
  Nam: number;
  Dot?: number;
  TuNgay?: string;
  DenNgay?: string;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface BillingResponse {
  Id: number;
  SanLuongTieuThu: number;
  MaDoiTuong: string;
  Ky: number;
  Nam: number;
  Dot?: number;
  TuNgay?: string;
  DenNgay?: string;
  GhiChu?: string;
  NgayTao: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}