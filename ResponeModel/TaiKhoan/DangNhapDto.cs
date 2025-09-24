using Microsoft.AspNetCore.Mvc;

namespace WebAPI_NRW.ResponeModel.TaiKhoan
{
    public class DangNhapDto
    {
        //public string TenNguoiDung { get; set; } = null!;

        //public string MatKhau { get; set; } = null!;
        public class LoginResponse
        {
            public string Token { get; set; }
            public int ExpiresIn { get; set; } // số giây hoặc phút

            public ThongTinNguoiDung NguoiDung { get; set; }
            public ThongTinNhomNguoiDung NhomNguoiDung { get; set; }
            public ThongTinPhanQuyenDuLieu PhanQuyenDuLieu { get; set; }
            public ThongTinPhanQuyenTinhNang PhanQuyenTinhNang { get; set; }
        }

        public class ThongTinNguoiDung
        {
            public int Id { get; set; }

            public string Ma { get; set; } = null!;

            public string Ten { get; set; } = null!;

            public string TenNguoiDung { get; set; } = null!;

            public string Email { get; set; } = null!;

            public string? VaiTro { get; set; }

            public bool CapPhep { get; set; }
        }

        public class ThongTinNhomNguoiDung
        {
            public int Id { get; set; }

            public string NhomNguoiDung { get; set; } = null!;

            public string? ThanhVien { get; set; }
        }

        public class ThongTinPhanQuyenDuLieu
        {
            public string? DuLieuNrwcongTy { get; set; }

            public string? DuLieuNrwdma { get; set; }
        }

        public class ThongTinPhanQuyenTinhNang
        {
            public string? DongHoTong { get; set; }

            public string? CauHinhDht { get; set; }

            public string? Dsdma { get; set; }

            public string? NrwcongTy { get; set; }

            public string? Nrwdma { get; set; }

            public string? DsngayDocSoBilling { get; set; }

            public string? NguoiDung { get; set; }

            public string? NhomNguoiDungTinhNang { get; set; }

            public string? NhatKySuDung { get; set; }

            public string? PhanQuyen { get; set; }
        }
    }
}
