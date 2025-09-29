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
  Id: number;
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
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}