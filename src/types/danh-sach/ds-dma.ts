/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddDsDmaRequest {
  MaDma: string;
  TenDma: string;
  SoLuongKhachHang: number;
  TinhTrang: string;
  NgayVanHanh: string;
  TyLeNrwbanDau?: number;
  GhiChu?: string;
  NgayTao: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateDsDmaRequest {
  MaDma: string;
  TenDma: string;
  SoLuongKhachHang: number;
  TinhTrang: string;
  NgayVanHanh: string;
  TyLeNrwbanDau?: number;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface DsDmaResponse {
  Id: number;
  MaDma: string;
  TenDma: string;
  SoLuongKhachHang: number;
  TinhTrang: string;
  NgayVanHanh: string;
  TyLeNrwbanDau?: number;
  GhiChu?: string;
  NgayTao: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}