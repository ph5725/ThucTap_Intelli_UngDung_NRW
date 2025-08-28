using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models;

public partial class Billing
{
    public int Id { get; set; }

    public int SanLuongTieuThu { get; set; }

    public string MaDoiTuong { get; set; } = null!;

    public int Ky { get; set; }

    public int Nam { get; set; }

    public int? Dot { get; set; }

    public DateOnly? TuNgay { get; set; }

    public DateOnly? DenNgay { get; set; }

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public string? NguoiTao { get; set; }

    public string? NguoiCapNhat { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung? NguoiTaoNavigation { get; set; }
}
