/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddCauHinhDhtRequest {
  maDoiTuong?: number;
  maDongHo?: string; // giống BE: string
  ghiChu?: string;
  ngayTao: string;
  nguoiTao: string; // BE dùng string
}

// Cập nhật dữ liệu
export interface UpdateCauHinhDhtRequest {
  maDoiTuong?: number;
  maDongHo?: string; // giống BE
  ghiChu?: string;
  ngayCapNhat?: string;
  nguoiCapNhat?: string; // BE dùng string
}

/* ========== RESPONSE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface CauHinhDhtResponse {
  locked: unknown;
  id: number;
  maDoiTuong?: number;
  maDongHo?: string;
  ghiChu?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao?: string;
  nguoiCapNhat?: string;
}
