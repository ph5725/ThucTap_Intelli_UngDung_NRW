/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddNhatKySuDungRequest {
  TenNguoiDung?: number;
  HanhDong: string;
  TinhNang?: string;
  DuLieu?: string;
  GhiChu?: string;
  NgayTao: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateNhatKySuDungRequest {
  TenNguoiDung?: number;
  HanhDong: string;
  TinhNang?: string;
  DuLieu?: string;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface NhatKySuDungResponse {
  Id: number;
  TenNguoiDung?: string;
  HanhDong: string;
  TinhNang?: string;
  DuLieu?: string;
  GhiChu?: string;
  NgayTao: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}