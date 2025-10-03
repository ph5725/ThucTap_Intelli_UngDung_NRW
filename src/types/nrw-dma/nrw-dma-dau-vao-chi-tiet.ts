/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddNrwDmaDauVaoChiTietRequest {
  MaDauVao?: number;
  MaDma?: number;
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
export interface UpdateNrwDmaDauVaoChiTietRequest {
  MaDauVao?: number;
  MaDma?: number;
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
export interface NrwDmaDauVaoChiTietResponse {
  id: number;
  maDauVao?: number;
  maDma?: number;
  ky: number;
  nam: number;
  nguon: string;
  toanTu: string;
  giaTri: number;
  thuTuHienThi?: number;
  ghiChu?: string;
  ngayTao?: string;
  ngayCapNhat?: string;
  nguoiTao?: string;
  nguoiCapNhat?: string;
}