/* ========== REQUEST (CLIENT --> API) ========== */

// Thêm dữ liệu
export interface AddNguoiDungRequest {
  ma: string;
  ten: string;
  tenNguoiDung: string;
  matKhau: string;
  email: string;
  vaiTro?: string;
  capPhep: boolean;
  anhDaiDien?: string;
  ngayTao: string;
  nguoiTao?: string;
}

// Cập nhật dữ liệu
export interface UpdateNguoiDungRequest {
  ma: string;
  ten: string;
  tenNguoiDung: string;
  email: string;
  vaiTro?: string;
  capPhep: boolean;
  anhDaiDien?: string;
  ngayCapNhat?: string;
  nguoiCapNhat?: string;
}

// Cập nhật cấp phép
export interface UpdateCapPhepNguoiDungRequest {
  capPhep: boolean;
}

/* ========== RESPONSE (API --> CLIENT) ========== */

// Dữ liệu trả về
export interface NguoiDungResponse {
  id: number;
  ma: string;
  ten: string;
  tenNguoiDung: string;
  email: string;
  vaiTro?: string;
  capPhep: boolean;
  anhDaiDien?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao?: string;
  nguoiCapNhat?: string;
}
