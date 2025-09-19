using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models;

public partial class Dsdma
{
    public int Id { get; set; }

    public string MaDma { get; set; } = null!;

    public string TenDma { get; set; } = null!;

    public int SoLuongKhachHang { get; set; }

    public string TinhTrang { get; set; } = null!;

    public DateOnly NgayVanHanh { get; set; }

    public double? TyLeNrwbanDau { get; set; }

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public string? NguoiTao { get; set; }

    public string? NguoiCapNhat { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung? NguoiTaoNavigation { get; set; }

    public virtual ICollection<NrwdmadauVaoChiTiet> NrwdmadauVaoChiTiets { get; set; } = new List<NrwdmadauVaoChiTiet>();

    public virtual ICollection<Nrwdma> Nrwdmas { get; set; } = new List<Nrwdma>();

    public virtual ICollection<NrwdmatieuThuChiTiet> NrwdmatieuThuChiTiets { get; set; } = new List<NrwdmatieuThuChiTiet>();
}
