/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddNhomNguoiDungRequest {
  NhomNguoiDung1: string;
  ThanhVien?: string;
  GhiChu?: string;
  NgayTao: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateNhomNguoiDungRequest {
  NhomNguoiDung1: string;
  ThanhVien?: string;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface NhomNguoiDungResponse {
  Id: number;
  NhomNguoiDung1: string;
  ThanhVien?: string;
  GhiChu?: string;
  NgayTao: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}