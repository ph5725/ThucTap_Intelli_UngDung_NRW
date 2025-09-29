/* ========== REQUEST (CLIENT --> API) ========== */
// Thêm dữ liệu
export interface AddPhanQuyenTinhNangRequest {
  NhomNguoiDung?: number;
  DongHoTong?: string;
  CauHinhDht?: string;
  Dsdma?: string;
  NrwcongTy?: string;
  Nrwdma?: string;
  DsngayDocSoBilling?: string;
  NguoiDung?: string;
  NhomNguoiDungTinhNang?: string;
  NhatKySuDung?: string;
  PhanQuyen?: string;
  NgayTao: string;
  NguoiTao: number;
}

// Cập nhật dữ liệu
export interface UpdatePhanQuyenTinhNangRequest {
  NhomNguoiDung?: number;
  DongHoTong?: string;
  CauHinhDht?: string;
  Dsdma?: string;
  NrwcongTy?: string;
  Nrwdma?: string;
  DsngayDocSoBilling?: string;
  NguoiDung?: string;
  NhomNguoiDungTinhNang?: string;
  NhatKySuDung?: string;
  PhanQuyen?: string;
  NgayCapNhat?: string;
  NguoiCapNhat?: number;
}

/* ========== RESPONE (API --> CLIENT) ========== */
// Dữ liệu trả về
export interface PhanQuyenTinhNangResponse {
  Id: number;
  NhomNguoiDung?: string;
  DongHoTong?: string;
  CauHinhDht?: string;
  Dsdma?: string;
  NrwcongTy?: string;
  Nrwdma?: string;
  DsngayDocSoBilling?: string;
  NguoiDung?: string;
  NhomNguoiDungTinhNang?: string;
  NhatKySuDung?: string;
  PhanQuyen?: string;
  NgayTao: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}