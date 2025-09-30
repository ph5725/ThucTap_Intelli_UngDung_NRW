/* ==================== Bao gồm các request, respone liên quan đến đăng nhập, đăng xuất, đổi mật khẩu ==================== */

/* ========== REQUEST (CLIENT --> API) ========== */
/* ========== ĐĂNG NHẬP ========== */

export interface DangNhapRequest {
  TenNguoiDung: string;
  MatKhau: string;
}

/* ========== ĐỔI MẬT KHẨU ========== */
export interface DoiMatKhauRequest {
  TenNguoiDung?: string;
  MatKhauCu?: string;
  MatKhauMoi?: string;
}

/* ========== QUÊN MẬT KHẨU ========== */
export interface QuenMatKhauRequest {
  TenNguoiDung?: string;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Response đăng nhập
export interface DangNhapResponse {
  token: string;
  expiresIn: number;
  nguoiDung: ThongTinNguoiDung;
  nhomNguoiDung: ThongTinNhomNguoiDung;
  phanQuyenDuLieu: ThongTinPhanQuyenDuLieu;
  phanQuyenTinhNang: ThongTinPhanQuyenTinhNang;
}

// Thông tin người dùng
export interface ThongTinNguoiDung {
  id: number;
  ma: string;
  ten: string;
  tenNguoiDung: string;
  email: string;
  vaiTro?: string;
  capPhep: boolean;
}

// Nhóm người dùng
export interface ThongTinNhomNguoiDung {
  id: number;
  nhomNguoiDung: string;
  thanhVien?: string;
}

// Phân quyền dữ liệu
export interface ThongTinPhanQuyenDuLieu {
  duLieuNrwcongTy?: string;
  duLieuNrwdma?: string;
}

// Phân quyền tính năng
export interface ThongTinPhanQuyenTinhNang {
  dongHoTong?: string;
  cauHinhDht?: string;
  dsdma?: string;
  nrwcongTy?: string;
  nrwdma?: string;
  dsngayDocSoBilling?: string;
  nguoiDung?: string;
  nhomNguoiDungTinhNang?: string;
  nhatKySuDung?: string;
  phanQuyen?: string;
}
