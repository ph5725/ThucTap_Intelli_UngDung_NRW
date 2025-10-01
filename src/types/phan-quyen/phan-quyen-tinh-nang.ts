/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddPhanQuyenTinhNangRequest {
  nhomNguoiDung?: number;
  dongHoTong?: string;
  cauHinhDht?: string;
  dsdma?: string;
  nrwCongTy?: string;
  nrwDma?: string;
  dsngayDocSoBilling?: string;
  nguoiDung?: string;
  nhomNguoiDungTinhNang?: string;
  nhatKySuDung?: string;
  phanQuyen?: string;
  ngayTao: string;
  nguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdatePhanQuyenTinhNangRequest {
  nhomNguoiDung?: number;
  dongHoTong?: string;
  cauHinhDht?: string;
  dsdma?: string;
  nrwCongTy?: string;
  nrwDma?: string;
  dsngayDocSoBilling?: string;
  nguoiDung?: string;
  nhomNguoiDungTinhNang?: string;
  nhatKySuDung?: string;
  phanQuyen?: string;
  ngayCapNhat?: string;
  nguoiCapNhat?: string;

  // 👇 Cho phép key động
  [key: string]: string | number | undefined;
}

/* ========== RESPONSE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface PhanQuyenTinhNangResponse {
  id: number;
  nhomNguoiDung?: string;
  dongHoTong?: string;
  cauHinhDht?: string;
  dsdma?: string;
  nrwCongTy?: string;
  nrwDma?: string;
  dsngayDocSoBilling?: string;
  nguoiDung?: string;
  nhomNguoiDungTinhNang?: string;
  nhatKySuDung?: string;
  phanQuyen?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  nguoiTao?: string;
  nguoiCapNhat?: string;
}
