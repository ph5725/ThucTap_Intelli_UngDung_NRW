/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddNrwDmaTieuThuChiTietRequest {
  MaTieuThu?: number;
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
export interface UpdateNrwDmaTieuThuChiTietRequest {
  MaTieuThu?: number;
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
export interface NrwDmaTieuThuChiTietResponse {
  id: number;
  maTieuThu?: number;
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