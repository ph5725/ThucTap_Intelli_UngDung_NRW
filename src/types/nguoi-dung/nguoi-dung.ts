/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddNguoiDungRequest {
  Ma: string;
  Ten: string;
  TenNguoiDung: string;
  MatKhau: string;
  Email: string;
  VaiTro?: string;
  CapPhep: boolean;
  AnhDaiDien?: string;
  NgayTao: string;
  NguoiTao?: string;
}

// Cập nhật dữ liệu
export interface UpdateNguoiDungRequest {
  Ma: string;
  Ten: string;
  TenNguoiDung: string;
  Email: string;
  VaiTro?: string;
  CapPhep: boolean;
  AnhDaiDien?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: string;
}

// Cập nhật cấp phép
export interface UpdateCapPhepNguoiDungRequest {
  CapPhep: boolean;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface NguoiDungResponse {
  Id: number;
  Ma: string;
  Ten: string;
  TenNguoiDung: string;
  Email: string;
  VaiTro?: string;
  CapPhep: boolean;
  AnhDaiDien?: string;
  NgayTao: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}