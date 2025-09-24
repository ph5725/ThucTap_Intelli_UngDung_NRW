using Azure.Core;
using System.Security.Cryptography;
using WebAPI_NRW.Helpers;
using WebAPI_NRW.Models;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.TaiKhoan;


// Danh sách
using WebAPI_NRW.ResponeModel.DanhSach;
// Đồng hồ tổng
using WebAPI_NRW.ResponeModel.DongHoTong;
// Hệ thống Billing
using WebAPI_NRW.ResponeModel.HeThongBilling;
// Người dùng
using WebAPI_NRW.ResponeModel.NguoiDung;
// Nrw Công ty
using WebAPI_NRW.ResponeModel.NrwCongTy;
// Nrw Dma
using WebAPI_NRW.ResponeModel.NrwDma;
// Phân quyền
using WebAPI_NRW.ResponeModel.PhanQuyen;
using WebAPI_NRW.ResponeModel.TaiKhoan;

namespace WebAPI_NRW.MapToResponse
{
    public static class MappingExtensions
    {
        // ===== THÔNG TIN NGƯỜI DÙNG =====
        // Thông tin người dùng trả về sau khi đăng nhập
        public static DangNhapDto.LoginResponse MapToLoginResponse(
            this NguoiDung nguoiDung,
            string token,
            int expiresIn,
            NhomNguoiDung nhomNguoiDung,
            PhanQuyenDuLieu phanQuyenDuLieu,
            PhanQuyenTinhNang phanQuyenTinhNang)
        {
            return new DangNhapDto.LoginResponse
            {
                Token = token,
                ExpiresIn = expiresIn,

                NguoiDung = new DangNhapDto.ThongTinNguoiDung
                {
                    Id = nguoiDung.Id,
                    Ma = nguoiDung.Ma,
                    Ten = nguoiDung.Ten,
                    TenNguoiDung = nguoiDung.TenNguoiDung,
                    Email = nguoiDung.Email,
                    VaiTro = nguoiDung.VaiTro,
                    CapPhep = nguoiDung.CapPhep
                },

                NhomNguoiDung = new DangNhapDto.ThongTinNhomNguoiDung
                {
                    Id = nhomNguoiDung.Id,
                    NhomNguoiDung = nhomNguoiDung.NhomNguoiDung1,
                    ThanhVien = nhomNguoiDung.ThanhVien
                },

                PhanQuyenDuLieu = new DangNhapDto.ThongTinPhanQuyenDuLieu
                {
                    DuLieuNrwcongTy = phanQuyenDuLieu?.DuLieuNrwcongTy,
                    DuLieuNrwdma = phanQuyenDuLieu?.DuLieuNrwdma
                },

                PhanQuyenTinhNang = new DangNhapDto.ThongTinPhanQuyenTinhNang
                {
                    DongHoTong = phanQuyenTinhNang?.DongHoTong,
                    CauHinhDht = phanQuyenTinhNang?.CauHinhDht,
                    Dsdma = phanQuyenTinhNang?.Dsdma,
                    NrwcongTy = phanQuyenTinhNang?.NrwcongTy,
                    Nrwdma = phanQuyenTinhNang?.Nrwdma,
                    DsngayDocSoBilling = phanQuyenTinhNang?.DsngayDocSoBilling,
                    NguoiDung = phanQuyenTinhNang?.NguoiDung,
                    NhomNguoiDungTinhNang = phanQuyenTinhNang?.NhomNguoiDungTinhNang,
                    NhatKySuDung = phanQuyenTinhNang?.NhatKySuDung,
                    PhanQuyen = phanQuyenTinhNang?.PhanQuyen
                }
            };
        }

        // ===== DANH SÁCH =====
        // Danh sách DMA
        public static DsDma_ResponeModel MapToResponse(this Dsdma dsDma)
        {
            return new DsDma_ResponeModel
            {
                Id = dsDma.Id,
                MaDma = dsDma.MaDma,
                TenDma = dsDma.TenDma,
                SoLuongKhachHang = dsDma.SoLuongKhachHang,
                TinhTrang = dsDma.TinhTrang,
                NgayVanHanh = dsDma.NgayVanHanh,
                TyLeNrwbanDau = dsDma.TyLeNrwbanDau,
                GhiChu = dsDma.GhiChu ?? "N/A",
                NgayTao = dsDma.NgayTao,
                NguoiTao = dsDma.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = dsDma.NgayCapNhat,
                NguoiCapNhat = dsDma.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }

        // ===== ĐỒNG HỒ TỔNG =====

        // Đồng hồ tổng
        public static DongHoTong_ResponeModel MapToResponse(this DongHoTong dongHoTong)
        {
            return new DongHoTong_ResponeModel
            {
                Id = dongHoTong.Id,
                Ma = dongHoTong.Ma,
                Ten = dongHoTong.Ten,
                SanLuong = dongHoTong.SanLuong,
                NgayGhi = dongHoTong.NgayGhi,
                NgayChinhSua = dongHoTong.NgayChinhSua,
                NguoiChinhSua = dongHoTong.NguoiChinhSuaNavigation?.TenNguoiDung ?? "N/A",
                DanhDauLoi = dongHoTong.DanhDauLoi,
                GhiChu = dongHoTong.GhiChu ?? "N/A",
                NgayTao = dongHoTong.NgayTao,
                NguoiTao = dongHoTong.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = dongHoTong.NgayCapNhat,
                NguoiCapNhat = dongHoTong.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }
        // Cấu hình đồng hồ tổng
        public static CauHinhDht_ResponeModel MapToResponse(this CauHinhDht cauHinhDht)
        {
            return new CauHinhDht_ResponeModel
            {
                Id = cauHinhDht.Id,
                MaDoiTuong = cauHinhDht.MaDoiTuong,
                MaDongHo = cauHinhDht.MaDongHoNavigation?.Ma ?? "N/A",
                GhiChu = cauHinhDht.GhiChu ?? "N/A",
                NgayTao = cauHinhDht.NgayTao,
                NguoiTao = cauHinhDht.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = cauHinhDht.NgayCapNhat,
                NguoiCapNhat = cauHinhDht.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }

        // ===== HỆ THỐNG BILLING =====

        // Billing
        public static Billing_ResponeModel MapToResponse(this Billing billing)
        {
            return new Billing_ResponeModel
            {
                Id = billing.Id,
                SanLuongTieuThu = billing.SanLuongTieuThu,
                MaDoiTuong = billing.MaDoiTuong,
                Ky = billing.Ky,
                Nam = billing.Nam,
                Dot = billing.Dot,
                TuNgay = billing.TuNgay,
                DenNgay = billing.DenNgay,
                GhiChu = billing.GhiChu ?? "N/A",
                NgayTao = billing.NgayTao,
                NguoiTao = billing.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = billing.NgayCapNhat,
                NguoiCapNhat = billing.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }
        // Danh sách ngày đọc số Billing
        public static DsNgayDocSoBilling_ResponeModel MapToResponse(this DsngayDocSoBilling dsNgayDocSoBilling)
        {
            return new DsNgayDocSoBilling_ResponeModel
            {
                Id = dsNgayDocSoBilling.Id,
                Nam = dsNgayDocSoBilling.Nam,
                Ky = dsNgayDocSoBilling.Ky,
                SoNgayDocSoBilling = dsNgayDocSoBilling.SoNgayDocSoBilling,
                GhiChu = dsNgayDocSoBilling.GhiChu ?? "N/A",
                NgayTao = dsNgayDocSoBilling.NgayTao,
                NguoiTao = dsNgayDocSoBilling.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = dsNgayDocSoBilling.NgayCapNhat,
                NguoiCapNhat = dsNgayDocSoBilling.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }
        // Danh sách ngày đoc số Billing chi tiết
        public static DsNgayDocSoBillingChiTiet_ResponeModel MapToResponse(this DsngayDocSoBillingChiTiet dsNgayDocSoBillingChiTiet)
        {
            return new DsNgayDocSoBillingChiTiet_ResponeModel
            {
                Id = dsNgayDocSoBillingChiTiet.Id,
                MaNgayDocSo = dsNgayDocSoBillingChiTiet.MaNgayDocSoNavigation is null
                    ? "N/A"
                    : $"Kỳ {dsNgayDocSoBillingChiTiet.MaNgayDocSoNavigation.Ky} - Năm {dsNgayDocSoBillingChiTiet.MaNgayDocSoNavigation.Nam}",
                Nam = dsNgayDocSoBillingChiTiet.Nam,
                Ky = dsNgayDocSoBillingChiTiet.Ky,
                Dot = dsNgayDocSoBillingChiTiet.Dot,
                SoNgayDocSoDot = dsNgayDocSoBillingChiTiet.SoNgayDocSoDot,
                GhiChu = dsNgayDocSoBillingChiTiet.GhiChu ?? "N/A",
                NgayTao = dsNgayDocSoBillingChiTiet.NgayTao,
                NguoiTao = dsNgayDocSoBillingChiTiet.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = dsNgayDocSoBillingChiTiet.NgayCapNhat,
                NguoiCapNhat = dsNgayDocSoBillingChiTiet.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }

        // ===== NRW CÔNG TY =====

        // Nrw Công ty
        public static NrwCongTy_ResponeModel MapToResponse(this NrwcongTy nrwCongTy)
        {
            return new NrwCongTy_ResponeModel
            {
                Id = nrwCongTy.Id,
                Ma = nrwCongTy.Ma,
                Ky = nrwCongTy.Ky,
                Nam = nrwCongTy.Nam,

                SanLuongDauVao = nrwCongTy.SanLuongDauVao,
                SanLuongTieuThu = nrwCongTy.SanLuongTieuThu,
                LuongNuocThatThoat = nrwCongTy.LuongNuocThatThoat,
                TyLeThatThoatChuan1 = nrwCongTy.TyLeThatThoatChuan1,
                TyLeThatThoatChuan2 = nrwCongTy.TyLeThatThoatChuan2,

                TuNgay = nrwCongTy.TuNgay,
                DenNgay = nrwCongTy.DenNgay,
                SoNgayDocSoDht = nrwCongTy.SoNgayDocSoDht,
                SoNgayDocSoBilling = nrwCongTy.SoNgayDocSoBilling,

                NguyenNhan = nrwCongTy.NguyenNhan,
                GhiChu = nrwCongTy.GhiChu ?? "N/A",

                NgayTao = nrwCongTy.NgayTao,
                NguoiTao = nrwCongTy.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = nrwCongTy.NgayCapNhat,
                NguoiCapNhat = nrwCongTy.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }
        // Nrw Công ty đầu vào chi tiết
        public static NrwCongTyDauVaoChiTiet_ResponeModel MapToResponse(this NrwcongTyDauVaoChiTiet nrwCongTyDauVaoChiTiet)
        {
            return new NrwCongTyDauVaoChiTiet_ResponeModel
            {
                Id = nrwCongTyDauVaoChiTiet.Id,
                MaDauVao = nrwCongTyDauVaoChiTiet.MaDauVaoNavigation?.Ma ?? "N/A",
                Ky = nrwCongTyDauVaoChiTiet.Ky,
                Nam = nrwCongTyDauVaoChiTiet.Nam,

                Nguon = nrwCongTyDauVaoChiTiet.Nguon,
                ToanTu = nrwCongTyDauVaoChiTiet.ToanTu,
                ThuTuHienThi = nrwCongTyDauVaoChiTiet.ThuTuHienThi,

                GhiChu = nrwCongTyDauVaoChiTiet.GhiChu ?? "N/A",
                NgayTao = nrwCongTyDauVaoChiTiet.NgayTao,
                NguoiTao = nrwCongTyDauVaoChiTiet.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = nrwCongTyDauVaoChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwCongTyDauVaoChiTiet.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }
        // Nrw Công ty tiêu thụ chi tiết
        public static NrwCongTyTieuThuChiTiet_ResponeModel MapToResponse(this NrwcongTyTieuThuChiTiet nrwCongTyTieuThuChiTiet)
        {
            return new NrwCongTyTieuThuChiTiet_ResponeModel
            {
                Id = nrwCongTyTieuThuChiTiet.Id,
                MaTieuThu = nrwCongTyTieuThuChiTiet.MaTieuThuNavigation?.Ma ?? "N/A",
                Ky = nrwCongTyTieuThuChiTiet.Ky,
                Nam = nrwCongTyTieuThuChiTiet.Nam,

                Nguon = nrwCongTyTieuThuChiTiet.Nguon,
                ToanTu = nrwCongTyTieuThuChiTiet.ToanTu,
                ThuTuHienThi = nrwCongTyTieuThuChiTiet.ThuTuHienThi,

                GhiChu = nrwCongTyTieuThuChiTiet.GhiChu ?? "N/A",
                NgayTao = nrwCongTyTieuThuChiTiet.NgayTao,
                NguoiTao = nrwCongTyTieuThuChiTiet.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = nrwCongTyTieuThuChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwCongTyTieuThuChiTiet.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }

        // ===== NRW DMA =====

        // Nrw Dma
        public static NrwDma_ResponeModel MapToResponse(this Nrwdma nrwDma)
        {
            return new NrwDma_ResponeModel
            {
                Id = nrwDma.Id,
                MaDma = nrwDma.MaDmaNavigation?.MaDma ?? "N/A",
                Ky = nrwDma.Ky,
                Nam = nrwDma.Nam,

                LuongNuocVao = nrwDma.LuongNuocVao,
                LuongNuocTieuThu = nrwDma.LuongNuocTieuThu,
                LuongNuocSucXa = nrwDma.LuongNuocSucXa,
                LuongNuocThatThoat = nrwDma.LuongNuocThatThoat,

                TyLeThatThoatKyTruoc = nrwDma.TyLeThatThoatKyTruoc,
                TyLeThatThoat = nrwDma.TyLeThatThoat,

                NguyenNhan = nrwDma.NguyenNhan,
                GhiChu = nrwDma.GhiChu ?? "N/A",

                NgayTao = nrwDma.NgayTao,
                NguoiTao = nrwDma.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = nrwDma.NgayCapNhat,
                NguoiCapNhat = nrwDma.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }
        // Nrw Dma đầu vào chi tiết
        public static NrwDmaDauVaoChiTiet_ResponeModel MapToResponse(this NrwdmadauVaoChiTiet nrwDmaDauVaoChiTiet)
        {
            return new NrwDmaDauVaoChiTiet_ResponeModel
            {
                Id = nrwDmaDauVaoChiTiet.Id,
                MaDauVao = nrwDmaDauVaoChiTiet.MaDauVao,
                MaDma = nrwDmaDauVaoChiTiet.MaDma,
                Ky = nrwDmaDauVaoChiTiet.Ky,
                Nam = nrwDmaDauVaoChiTiet.Nam,

                Nguon = nrwDmaDauVaoChiTiet.Nguon,
                ToanTu = nrwDmaDauVaoChiTiet.ToanTu,
                ThuTuHienThi = nrwDmaDauVaoChiTiet.ThuTuHienThi,

                GhiChu = nrwDmaDauVaoChiTiet.GhiChu ?? "N/A",
                NgayTao = nrwDmaDauVaoChiTiet.NgayTao,
                NguoiTao = nrwDmaDauVaoChiTiet.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = nrwDmaDauVaoChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwDmaDauVaoChiTiet.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }
        // Nrw Dma tiêu thụ chi tiết
        public static NrwDmaTieuThuChiTiet_ResponeModel MapToResponse(this NrwdmatieuThuChiTiet nrwDmaTieuThuChiTiet)
        {
            return new NrwDmaTieuThuChiTiet_ResponeModel
            {
                Id = nrwDmaTieuThuChiTiet.Id,
                MaTieuThu = nrwDmaTieuThuChiTiet.MaTieuThu,
                MaDma = nrwDmaTieuThuChiTiet.MaDma,
                Ky = nrwDmaTieuThuChiTiet.Ky,
                Nam = nrwDmaTieuThuChiTiet.Nam,

                Nguon = nrwDmaTieuThuChiTiet.Nguon,
                ToanTu = nrwDmaTieuThuChiTiet.ToanTu,
                ThuTuHienThi = nrwDmaTieuThuChiTiet.ThuTuHienThi,

                GhiChu = nrwDmaTieuThuChiTiet.GhiChu ?? "N/A",
                NgayTao = nrwDmaTieuThuChiTiet.NgayTao,
                NguoiTao = nrwDmaTieuThuChiTiet.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = nrwDmaTieuThuChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwDmaTieuThuChiTiet.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }

        // ===== NGƯỜI DÙNG =====

        // Người dùng
        public static NguoiDung_ResponeModel MapToResponse(this NguoiDung nguoiDung)
        {
            //var hashedOld = PasswordHelper.HashPassword(nguoiDung.MatKhau);
            var hashedOld = nguoiDung.MatKhau;
            var hasherNow = PasswordHelper.HashPassword("123456");
            var result = "0";
            if (hashedOld == hasherNow)
            {
                result = "1";
            }    
            return new NguoiDung_ResponeModel
            {
                Id = nguoiDung.Id,
                Ma = nguoiDung.Ma,
                Ten = nguoiDung.Ten,
                TenNguoiDung = nguoiDung.TenNguoiDung,
                //MatKhau = result,
                Email = nguoiDung.Email,
                VaiTro = nguoiDung.VaiTro,
                CapPhep = nguoiDung.CapPhep,
                AnhDaiDien = nguoiDung.AnhDaiDien,
                NgayTao = nguoiDung.NgayTao,
                NguoiTao = nguoiDung.NguoiTao,
                NgayCapNhat = nguoiDung.NgayCapNhat,
                NguoiCapNhat = nguoiDung.NguoiCapNhat
            };
        }
        // Nhóm người dùng
        public static NhomNguoiDung_ResponeModel MapToResponse(this NhomNguoiDung nhomNguoiDung)
        {
            return new NhomNguoiDung_ResponeModel
            {
                Id = nhomNguoiDung.Id,
                NhomNguoiDung1 = nhomNguoiDung.NhomNguoiDung1,
                ThanhVien = nhomNguoiDung.ThanhVien,
                GhiChu = nhomNguoiDung.GhiChu ?? "N/A",
                NgayTao = nhomNguoiDung.NgayTao,
                NguoiTao = nhomNguoiDung.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = nhomNguoiDung.NgayCapNhat,
                NguoiCapNhat = nhomNguoiDung.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }
        // Nhật ký sử dụng
        public static NhatKySuDung_ResponeModel MapToResponse(this NhatKySuDung nhatKySuDung)
        {
            return new NhatKySuDung_ResponeModel
            {
                Id = nhatKySuDung.Id,
                TenNguoiDung = nhatKySuDung.TenNguoiDungNavigation?.TenNguoiDung ?? "N/A",
                HanhDong = nhatKySuDung.HanhDong,
                TinhNang = nhatKySuDung.TinhNang,
                DuLieu = nhatKySuDung.DuLieu,
                GhiChu = nhatKySuDung.GhiChu ?? "N/A",
                NgayTao = nhatKySuDung.NgayTao,
                NguoiTao = nhatKySuDung.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = nhatKySuDung.NgayCapNhat,
                NguoiCapNhat = nhatKySuDung.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }

        // ===== PHÂN QUYỀN =====

        // Phân quyền tính năng
        public static PhanQuyenTinhNang_ResponeModel MapToResponse(this PhanQuyenTinhNang phanQuyenTinhNang)
        {
            return new PhanQuyenTinhNang_ResponeModel
            {
                Id = phanQuyenTinhNang.Id,
                NhomNguoiDung = phanQuyenTinhNang.NhomNguoiDungNavigation?.NhomNguoiDung1 ?? "N/A",

                DongHoTong = phanQuyenTinhNang.DongHoTong,
                CauHinhDht = phanQuyenTinhNang.CauHinhDht,

                Dsdma = phanQuyenTinhNang.Dsdma,
                NrwcongTy = phanQuyenTinhNang.NrwcongTy,
                Nrwdma = phanQuyenTinhNang.Nrwdma,
                DsngayDocSoBilling = phanQuyenTinhNang.DsngayDocSoBilling,

                NguoiDung = phanQuyenTinhNang.NguoiDung,
                NhomNguoiDungTinhNang = phanQuyenTinhNang.NhomNguoiDungTinhNang,
                NhatKySuDung = phanQuyenTinhNang.NhatKySuDung,
                PhanQuyen = phanQuyenTinhNang.PhanQuyen,

                NgayTao = phanQuyenTinhNang.NgayTao,
                NguoiTao = phanQuyenTinhNang.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
                NgayCapNhat = phanQuyenTinhNang.NgayCapNhat,
                NguoiCapNhat = phanQuyenTinhNang.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
            };
        }
        // Phân quyền dữ liệu
        public static PhanQuyenDuLieu_ResponeModel MapToResponse(this PhanQuyenDuLieu phanQuyenDuLieu)
        {
            return new PhanQuyenDuLieu_ResponeModel
            {
                Id = phanQuyenDuLieu.Id,
                NhomNguoiDung = phanQuyenDuLieu.NhomNguoiDungNavigation?.NhomNguoiDung1 ?? "N/A",
                DuLieuNrwcongTy = phanQuyenDuLieu.DuLieuNrwcongTy,
                DuLieuNrwdma = phanQuyenDuLieu.DuLieuNrwdma,
            };
        }
    }
}

