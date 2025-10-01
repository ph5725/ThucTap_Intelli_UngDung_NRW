/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddNhatKySuDungRequest {
  tenNguoiDung?: number;   // số ID người dùng
  hanhDong: string;
  tinhNang?: string;
  duLieu?: string;
  ghiChu?: string;
  ngayTao: string;
  nguoiTao: string;        // BE nhận string
}

// Cập nhật dữ liệu
export interface UpdateNhatKySuDungRequest {
  tenNguoiDung?: number;
  hanhDong: string;
  tinhNang?: string;
  duLieu?: string;
  ghiChu?: string;
  ngayCapNhat?: string;
  nguoiCapNhat?: string;
}

/* ========== RESPONSE (API --> CLIENT) ========== */
export interface NhatKySuDungResponse {
  id: number;
  tenNguoiDung: string;
  hanhDong: string;
  tinhNang: string;
  duLieu: string;
  ghiChu?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao: string;
  nguoiCapNhat?: string;
}
