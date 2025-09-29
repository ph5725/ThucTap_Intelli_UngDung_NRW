/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddCauHinhDhtRequest {
  MaDoiTuong?: number;
  MaDongHo?: number;
  GhiChu?: string;
  NgayTao: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdateCauHinhDhtRequest {
  MaDoiTuong?: number;
  MaDongHo?: number;
  GhiChu?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface CauHinhDhtResponse {
  Id: number;
  MaDoiTuong?: number;
  MaDongHo?: string;
  GhiChu?: string;
  NgayTao: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}