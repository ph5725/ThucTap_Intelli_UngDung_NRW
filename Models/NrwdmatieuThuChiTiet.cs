using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models;

public partial class NrwdmatieuThuChiTiet
{
    public int Id { get; set; }

    public int MaTieuThu { get; set; }

    public string MaDma { get; set; } = null!;

    public int Ky { get; set; }

    public int Nam { get; set; }

    public string Nguon { get; set; } = null!;

    public string ToanTu { get; set; } = null!;

    public double GiaTri { get; set; }

    public int? ThuTuHienThi { get; set; }

    public string? GhiChu { get; set; }

    public DateTime? NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public string? NguoiTao { get; set; }

    public string? NguoiCapNhat { get; set; }

    public virtual Nrwdma MaTieuThuNavigation { get; set; } = null!;

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung? NguoiTaoNavigation { get; set; }
}
