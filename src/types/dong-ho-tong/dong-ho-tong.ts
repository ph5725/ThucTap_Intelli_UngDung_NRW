/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddDongHoTongRequest {
  ma: string;
  ten: string;
  sanLuong: number;
  ngayGhi: string;
  danhDauLoi: boolean;
  ghiChu?: string;
  ngayTao: string;
  nguoiTao: string; // BE trả về string, nên giữ string
}

// Cập nhật dữ liệu
export interface UpdateDongHoTongRequest {
  ma: string;
  ten: string;
  sanLuong: number;
  ngayChinhSua?: string;
  nguoiChinhSua?: string; // BE trả về string
  danhDauLoi: boolean;
  ghiChu?: string;
  ngayCapNhat?: string;
  nguoiCapNhat?: number; // BE trả về string
}

/* ========== RESPONSE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface DongHoTongResponse {
  id: number;
  ma: string;
  ten: string;
  sanLuong: number;
  ngayGhi: string;
  ngayChinhSua?: string;
  nguoiChinhSua?: string;
  danhDauLoi: boolean;
  ghiChu?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao?: string;
  nguoiCapNhat?: string;
}
