/* ========== REQUEST (CLIENT --> API) ========== */
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
  Id: number;
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
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}