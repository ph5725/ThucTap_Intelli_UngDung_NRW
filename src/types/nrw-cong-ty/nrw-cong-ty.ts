/* ========== REQUEST (CLIENT --> API) ========== */
// Lấy tổng sản lượng
export interface TongSanLuongRequest {
  TuNgay: string;
  DenNgay: string;
  MaDoiTuong: number;
}

// Lấy sản lượng tiêu thụ
export interface SanLuongTieuThuRequest {
  Ky: number;
  Nam: number;
  MaDoiTuong: number;
}

// Lấy sản lượng tiêu thụ
export interface SoNgayDocSoBillingRequest {
  Ky: number;
  Nam: number;
}

// Thêm dữ liệu
export interface AddNrwCongTyRequest {
  Ma: string;
  Ky: number;
  Nam: number;
  SanLuongDauVao: number;
  SanLuongTieuThu: number;
  LuongNuocThatThoat?: number;
  TyLeThatThoatChuan2?: number;
  TyLeThatThoatChuan1?: number;
  TuNgay: string;
  DenNgay: string;
  SoNgayDocSoDht?: number;
  SoNgayDocSoBilling?: number;
  NguyenNhan?: string;
  GhiChu?: string;
  NgayTao: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateNrwCongTyRequest {
  Ma: string;
  Ky: number;
  Nam: number;
  SanLuongDauVao: number;
  SanLuongTieuThu: number;
  LuongNuocThatThoat?: number;
  TyLeThatThoatChuan2?: number;
  TyLeThatThoatChuan1?: number;
  TuNgay: string;
  DenNgay: string;
  SoNgayDocSoDht?: number;
  SoNgayDocSoBilling?: number;
  NguyenNhan?: string;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface NrwCongTyResponse {
  id: number;
  ma: string;
  ky: number;
  nam: number;
  sanLuongDauVao: number;
  sanLuongTieuThu: number;
  luongNuocThatThoat?: number;
  tyLeThatThoatChuan2?: number;
  tyLeThatThoatChuan1?: number;
  tuNgay: string;
  denNgay: string;
  soNgayDocSoDht?: number;
  soNgayDocSoBilling?: number;
  nguyenNhan?: string;
  ghiChu?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao?: string;
  nguoiCapNhat?: string;
}

// Lấy tổng sản lượng
export interface TongSanLuongRespone {
  tongSanLuong: number;
}

// Lấy sản lượng tiêu thụ
export interface SanLuongTieuThuRespone {
  sanLuong: number;
}

// Lấy số ngày đọc số Billing
export interface SoNgayDocSoBillingRespone {
  soNgayDocSoBilling: number;
}