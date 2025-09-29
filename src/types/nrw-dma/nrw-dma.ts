/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddNrwDmaRequest {
  MaDma?: number;
  Ky: number;
  Nam: number;
  LuongNuocVao: number;
  LuongNuocTieuThu: number;
  LuongNuocSucXa?: number;
  LuongNuocThatThoat?: number;
  TyLeThatThoatKyTruoc?: number;
  TyLeThatThoat?: number;
  NguyenNhan?: string;
  GhiChu?: string;
  NgayTao?: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateNrwDmaRequest {
  MaDma?: number;
  Ky: number;
  Nam: number;
  LuongNuocVao: number;
  LuongNuocTieuThu: number;
  LuongNuocSucXa?: number;
  LuongNuocThatThoat?: number;
  TyLeThatThoatKyTruoc?: number;
  TyLeThatThoat?: number;
  NguyenNhan?: string;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface NrwDmaResponse {
  Id: number;
  MaDma?: string;
  Ky: number;
  Nam: number;
  LuongNuocVao: number;
  LuongNuocTieuThu: number;
  LuongNuocSucXa?: number;
  LuongNuocThatThoat?: number;
  TyLeThatThoatKyTruoc?: number;
  TyLeThatThoat?: number;
  NguyenNhan?: string;
  GhiChu?: string;
  NgayTao?: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}