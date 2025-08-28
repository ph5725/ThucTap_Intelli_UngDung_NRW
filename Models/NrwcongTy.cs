using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models;

public partial class NrwcongTy
{
    public int Id { get; set; }

    public string Ma { get; set; } = null!;

    public int Ky { get; set; }

    public int Nam { get; set; }

    public double SanLuongDauVao { get; set; }

    public double SanLuongTieuThu { get; set; }

    public double? LuongNuocThatThoat { get; set; }

    public double? TyLeThatThoatChuan2 { get; set; }

    public double? TyLeThatThoatChuan1 { get; set; }

    public DateOnly TuNgay { get; set; }

    public DateOnly DenNgay { get; set; }

    public int? SoNgayDocSoDht { get; set; }

    public double? SoNgayDocSoBilling { get; set; }

    public string? NguyenNhan { get; set; }

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public string? NguoiTao { get; set; }

    public string? NguoiCapNhat { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung? NguoiTaoNavigation { get; set; }

    public virtual ICollection<NrwcongTyDauVaoChiTiet> NrwcongTyDauVaoChiTiets { get; set; } = new List<NrwcongTyDauVaoChiTiet>();

    public virtual ICollection<NrwcongTyTieuThuChiTiet> NrwcongTyTieuThuChiTiets { get; set; } = new List<NrwcongTyTieuThuChiTiet>();
}
