/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddNrwCongTyDauVaoChiTietRequest {
  MaDauVao?: number;
  Ky: number;
  Nam: number;
  Nguon: string;
  ToanTu: string;
  GiaTri: number;
  ThuTuHienThi?: number;
  GhiChu?: string;
  NgayTao?: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateNrwCongTyDauVaoChiTietRequest {
  MaDauVao?: number;
  Ky: number;
  Nam: number;
  Nguon: string;
  ToanTu: string;
  GiaTri: number;
  ThuTuHienThi?: number;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface NrwCongTyDauVaoChiTietResponse {
  Id: number;
  MaDauVao?: string;
  Ky: number;
  Nam: number;
  Nguon: string;
  ToanTu: string;
  GiaTri: number;
  ThuTuHienThi?: number;
  GhiChu?: string;
  NgayTao?: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}