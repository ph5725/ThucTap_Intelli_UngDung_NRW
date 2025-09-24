using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models.Database;

public partial class NrwdmatieuThuChiTiet
{
    public int Id { get; set; }

    public int? MaTieuThu { get; set; }

    public int? MaDma { get; set; }

    public int Ky { get; set; }

    public int Nam { get; set; }

    public string Nguon { get; set; } = null!;

    public string ToanTu { get; set; } = null!;

    public double GiaTri { get; set; }

    public int? ThuTuHienThi { get; set; }

    public string? GhiChu { get; set; }

    public DateTime? NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public int NguoiTao { get; set; }

    public int? NguoiCapNhat { get; set; }

    public virtual Dsdma? MaDmaNavigation { get; set; }

    public virtual Nrwdma? MaTieuThuNavigation { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung NguoiTaoNavigation { get; set; } = null!;
}
