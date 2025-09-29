/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddDongHoTongRequest {
  Ma: string;
  Ten: string;
  SanLuong: number;
  NgayGhi: string;
  DanhDauLoi: boolean;
  GhiChu?: string;
  NgayTao: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateDongHoTongRequest {
  Ma: string;
  Ten: string;
  SanLuong: number;
  NgayChinhSua?: string;
  NguoiChinhSua?: number;
  DanhDauLoi: boolean;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface DongHoTongResponse {
  Id: number;
  Ma: string;
  Ten: string;
  SanLuong: number;
  NgayGhi: string;
  NgayChinhSua?: string;
  NguoiChinhSua?: string;
  DanhDauLoi: boolean;
  GhiChu?: string;
  NgayTao: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}