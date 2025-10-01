/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddBillingRequest {
  sanLuongTieuThu: number;
  maDoiTuong: string;
  ky: number;
  nam: number;
  dot?: number;
  tuNgay?: string;
  denNgay?: string;
  ghiChu?: string;
  ngayTao: string;
  nguoiTao: string;   // string, giống BE
}

// Cập nhật dữ liệu
export interface UpdateBillingRequest {
  sanLuongTieuThu: number;
  maDoiTuong: string;
  ky: number;
  nam: number;
  dot?: number;
  tuNgay?: string;
  denNgay?: string;
  ghiChu?: string;
  ngayCapNhat?: string;
  nguoiCapNhat?: string;  // string, giống BE
}

/* ========== RESPONSE (API --> CLIENT) ========== */
export interface BillingResponse {
  id: number;
  sanLuongTieuThu: number;
  maDoiTuong: string;
  ky: number;
  nam: number;
  dot?: number;
  tuNgay?: string;
  denNgay?: string;
  ghiChu?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao?: string;
  nguoiCapNhat?: string;
}
