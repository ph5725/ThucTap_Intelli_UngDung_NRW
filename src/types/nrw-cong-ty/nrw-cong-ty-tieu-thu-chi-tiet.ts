/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddNrwCongTyTieuThuChiTietRequest {
  MaTieuThu?: number;
  Ky: number;
  Nam: number;
  Nguon: string;
  ToanTu: string;
  GiaTri: number;
  ThuTuHienThi: number;
  GhiChu?: string;
  NgayTao: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateNrwCongTyTieuThuChiTietRequest {
  MaTieuThu?: number;
  Ky: number;
  Nam: number;
  Nguon: string;
  ToanTu: string;
  GiaTri: number;
  ThuTuHienThi: number;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface NrwCongTyTieuThuChiTietResponse {
  id: number;
  maTieuThu?: string;
  ky: number;
  nam: number;
  nguon: string;
  toanTu: string;
  giaTri: number;
  thuTuHienThi: number;
  ghiChu?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao?: string;
  nguoiCapNhat?: string;
}