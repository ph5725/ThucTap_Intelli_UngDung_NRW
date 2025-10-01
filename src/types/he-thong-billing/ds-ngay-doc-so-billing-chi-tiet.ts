/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddDsNgayDocSoBillingChiTietRequest {
  maNgayDocSo?: string;  // string, giống BE
  nam: number;
  ky: number;
  dot: number;
  soNgayDocSoDot: number;
  ghiChu?: string;
  ngayTao: string;
  nguoiTao: string;      // string, giống BE
}

// Cập nhật dữ liệu
export interface UpdateDsNgayDocSoBillingChiTietRequest {
  maNgayDocSo?: string;  // string, giống BE
  nam: number;
  ky: number;
  dot: number;
  soNgayDocSoDot: number;
  ghiChu?: string;
  ngayCapNhat?: string;
  nguoiCapNhat?: string; // string, giống BE
}

/* ========== RESPONSE (API --> CLIENT) ========== */
export interface DsNgayDocSoBillingChiTietResponse {
  id: number;
  maNgayDocSo?: string;
  nam: number;
  ky: number;
  dot: number;
  soNgayDocSoDot: number;
  ghiChu?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao?: string;
  nguoiCapNhat?: string;
}
