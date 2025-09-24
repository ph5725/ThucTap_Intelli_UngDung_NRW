using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models.Database;

public partial class Nrwdma
{
    public int Id { get; set; }

    public int? MaDma { get; set; }

    public int Ky { get; set; }

    public int Nam { get; set; }

    public double LuongNuocVao { get; set; }

    public double LuongNuocTieuThu { get; set; }

    public double? LuongNuocSucXa { get; set; }

    public double? LuongNuocThatThoat { get; set; }

    public double? TyLeThatThoatKyTruoc { get; set; }

    public double? TyLeThatThoat { get; set; }

    public string? NguyenNhan { get; set; }

    public string? GhiChu { get; set; }

    public DateTime? NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public int NguoiTao { get; set; }

    public int? NguoiCapNhat { get; set; }

    public virtual Dsdma? MaDmaNavigation { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung NguoiTaoNavigation { get; set; } = null!;

    public virtual ICollection<NrwdmadauVaoChiTiet> NrwdmadauVaoChiTiets { get; set; } = new List<NrwdmadauVaoChiTiet>();

    public virtual ICollection<NrwdmatieuThuChiTiet> NrwdmatieuThuChiTiets { get; set; } = new List<NrwdmatieuThuChiTiet>();
}
