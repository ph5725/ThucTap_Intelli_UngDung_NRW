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
  Token: string;
  ExpiresIn: number;
  NguoiDung: ThongTinNguoiDung;
  NhomNguoiDung: ThongTinNhomNguoiDung;
  PhanQuyenDuLieu: ThongTinPhanQuyenDuLieu;
  PhanQuyenTinhNang: ThongTinPhanQuyenTinhNang;
}

// Thông tin người dùng
export interface ThongTinNguoiDung {
  Id: number;
  Ma: string;
  Ten: string;
  TenNguoiDung: string;
  Email: string;
  VaiTro?: string;
  CapPhep: boolean;
}

// Nhóm người dùng
export interface ThongTinNhomNguoiDung {
  Id: number;
  NhomNguoiDung: string;
  ThanhVien?: string;
}

// Phân quyền dữ liệu
export interface ThongTinPhanQuyenDuLieu {
  DuLieuNrwcongTy?: string;
  DuLieuNrwdma?: string;
}

// Phân quyền tính năng
export interface ThongTinPhanQuyenTinhNang {
  DongHoTong?: string;
  CauHinhDht?: string;
  Dsdma?: string;
  NrwcongTy?: string;
  Nrwdma?: string;
  DsngayDocSoBilling?: string;
  NguoiDung?: string;
  NhomNguoiDungTinhNang?: string;
  NhatKySuDung?: string;
  PhanQuyen?: string;
}
