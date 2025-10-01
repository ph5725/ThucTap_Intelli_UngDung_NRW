/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm mới
export interface AddPhanQuyenDuLieuRequest {
  nhomNguoiDungId: number;
  tenBang: string;
  dieuKien: string;
  ngayTao: string;
  nguoiTao: number;
}

// Cập nhật
export interface UpdatePhanQuyenDuLieuRequest {
  nhomNguoiDungId: number;
  tenBang: string;
  dieuKien: string;
  ngayCapNhat?: string;
  nguoiCapNhat?: number;
}

/* ========== RESPONSE (API --> CLIENT) ========== */
export interface PhanQuyenDuLieuResponse {
  id: number;
  nhomNguoiDungId: number;
  tenBang: string;
  dieuKien: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao?: number;
  nguoiCapNhat?: number;
}
