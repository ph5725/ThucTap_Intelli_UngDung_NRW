using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models;

public partial class NguoiDung
{
    public int Id { get; set; }

    public string Ma { get; set; } = null!;

    public string Ten { get; set; } = null!;

    public string TenNguoiDung { get; set; } = null!;

    public string MatKhau { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? VaiTro { get; set; }

    public bool CapPhep { get; set; }

    public string? AnhDaiDien { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public string? NguoiTao { get; set; }

    public string? NguoiCapNhat { get; set; }

    public virtual ICollection<Billing> BillingNguoiCapNhatNavigations { get; set; } = new List<Billing>();

    public virtual ICollection<Billing> BillingNguoiTaoNavigations { get; set; } = new List<Billing>();

    public virtual ICollection<CauHinhDht> CauHinhDhtNguoiCapNhatNavigations { get; set; } = new List<CauHinhDht>();

    public virtual ICollection<CauHinhDht> CauHinhDhtNguoiTaoNavigations { get; set; } = new List<CauHinhDht>();

    public virtual ICollection<DongHoTong> DongHoTongNguoiCapNhatNavigations { get; set; } = new List<DongHoTong>();

    public virtual ICollection<DongHoTong> DongHoTongNguoiTaoNavigations { get; set; } = new List<DongHoTong>();

    public virtual ICollection<Dsdma> DsdmaNguoiCapNhatNavigations { get; set; } = new List<Dsdma>();

    public virtual ICollection<Dsdma> DsdmaNguoiTaoNavigations { get; set; } = new List<Dsdma>();

    public virtual ICollection<DsngayDocSoBillingChiTiet> DsngayDocSoBillingChiTietNguoiCapNhatNavigations { get; set; } = new List<DsngayDocSoBillingChiTiet>();

    public virtual ICollection<DsngayDocSoBillingChiTiet> DsngayDocSoBillingChiTietNguoiTaoNavigations { get; set; } = new List<DsngayDocSoBillingChiTiet>();

    public virtual ICollection<DsngayDocSoBilling> DsngayDocSoBillingNguoiCapNhatNavigations { get; set; } = new List<DsngayDocSoBilling>();

    public virtual ICollection<DsngayDocSoBilling> DsngayDocSoBillingNguoiTaoNavigations { get; set; } = new List<DsngayDocSoBilling>();

    public virtual ICollection<NhatKySuDung> NhatKySuDungNguoiCapNhatNavigations { get; set; } = new List<NhatKySuDung>();

    public virtual ICollection<NhatKySuDung> NhatKySuDungNguoiTaoNavigations { get; set; } = new List<NhatKySuDung>();

    public virtual ICollection<NhatKySuDung> NhatKySuDungTenNguoiDungNavigations { get; set; } = new List<NhatKySuDung>();

    public virtual ICollection<NhomNguoiDung> NhomNguoiDungNguoiCapNhatNavigations { get; set; } = new List<NhomNguoiDung>();

    public virtual ICollection<NhomNguoiDung> NhomNguoiDungNguoiTaoNavigations { get; set; } = new List<NhomNguoiDung>();

    public virtual ICollection<NrwcongTyDauVaoChiTiet> NrwcongTyDauVaoChiTietNguoiCapNhatNavigations { get; set; } = new List<NrwcongTyDauVaoChiTiet>();

    public virtual ICollection<NrwcongTyDauVaoChiTiet> NrwcongTyDauVaoChiTietNguoiTaoNavigations { get; set; } = new List<NrwcongTyDauVaoChiTiet>();

    public virtual ICollection<NrwcongTy> NrwcongTyNguoiCapNhatNavigations { get; set; } = new List<NrwcongTy>();

    public virtual ICollection<NrwcongTy> NrwcongTyNguoiTaoNavigations { get; set; } = new List<NrwcongTy>();

    public virtual ICollection<NrwcongTyTieuThuChiTiet> NrwcongTyTieuThuChiTietNguoiCapNhatNavigations { get; set; } = new List<NrwcongTyTieuThuChiTiet>();

    public virtual ICollection<NrwcongTyTieuThuChiTiet> NrwcongTyTieuThuChiTietNguoiTaoNavigations { get; set; } = new List<NrwcongTyTieuThuChiTiet>();

    public virtual ICollection<Nrwdma> NrwdmaNguoiCapNhatNavigations { get; set; } = new List<Nrwdma>();

    public virtual ICollection<Nrwdma> NrwdmaNguoiTaoNavigations { get; set; } = new List<Nrwdma>();

    public virtual ICollection<NrwdmadauVaoChiTiet> NrwdmadauVaoChiTietNguoiCapNhatNavigations { get; set; } = new List<NrwdmadauVaoChiTiet>();

    public virtual ICollection<NrwdmadauVaoChiTiet> NrwdmadauVaoChiTietNguoiTaoNavigations { get; set; } = new List<NrwdmadauVaoChiTiet>();

    public virtual ICollection<NrwdmatieuThuChiTiet> NrwdmatieuThuChiTietNguoiCapNhatNavigations { get; set; } = new List<NrwdmatieuThuChiTiet>();

    public virtual ICollection<NrwdmatieuThuChiTiet> NrwdmatieuThuChiTietNguoiTaoNavigations { get; set; } = new List<NrwdmatieuThuChiTiet>();

    public virtual ICollection<PhanQuyenTinhNang> PhanQuyenTinhNangNguoiCapNhatNavigations { get; set; } = new List<PhanQuyenTinhNang>();

    public virtual ICollection<PhanQuyenTinhNang> PhanQuyenTinhNangNguoiTaoNavigations { get; set; } = new List<PhanQuyenTinhNang>();
}
