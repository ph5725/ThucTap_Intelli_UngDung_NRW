/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddPhanQuyenDuLieuRequest {
  NhomNguoiDung?: number;
  DuLieuNrwcongTy?: string;
  DuLieuNrwdma?: string;
}

// Cập nhật dữ liệu
export interface UpdatePhanQuyenDuLieuRequest {
  NhomNguoiDung?: number;
  DuLieuNrwcongTy?: string;
  DuLieuNrwdma?: string;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface PhanQuyenDuLieuResponse {
  Id: number;
  NhomNguoiDung?: string;
  DuLieuNrwcongTy?: string;
  DuLieuNrwdma?: string;
}