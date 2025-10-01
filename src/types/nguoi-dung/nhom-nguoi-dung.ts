/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddNhomNguoiDungRequest {
  nhomNguoiDung1: string;
  thanhVien?: string;
  ghiChu?: string;
  ngayTao: string;
  nguoiTao: string;   // BE trả về string, nên để string
}

// Cập nhật dữ liệu
export interface UpdateNhomNguoiDungRequest {
  nhomNguoiDung1: string;
  thanhVien?: string;
  ghiChu?: string;
  ngayCapNhat?: string;
  nguoiCapNhat?: number; // BE trả về string
}

/* ========== RESPONSE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface NhomNguoiDungResponse {
  id: number;
  nhomNguoiDung1: string;
  thanhVien?: string;
  ghiChu?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao?: string;
  nguoiCapNhat?: string;
}
