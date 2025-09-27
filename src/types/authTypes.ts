// Cấu trúc người dùng
export interface User {
  id: number;
  ma: string;
  ten: string;
  tenNguoiDung: string;
  email: string;
  vaiTro: string;
  capPhep: boolean;
}

// Nhóm người dùng
export interface NhomNguoiDung {
  id: number;
  nhomNguoiDung: string;
  thanhVien: string;
}

// Phân quyền dữ liệu
export interface PhanQuyenDuLieu {
  duLieuNrwcongTy: string;
  duLieuNrwdma: string;
}

// Phân quyền tính năng
export interface PhanQuyenTinhNang {
  [key: string]: string; // Ví dụ: "dongHoTong": "Add,Edit,View,Delete"
}

// Response đăng nhập
export interface LoginResponse {
  token: string;
  expiresIn: number;
  nguoiDung: User;
  nhomNguoiDung: NhomNguoiDung;
  phanQuyenDuLieu: PhanQuyenDuLieu;
  phanQuyenTinhNang: PhanQuyenTinhNang;
}
