using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models;

public partial class NhatKySuDung
{
    public int Id { get; set; }

    public string TenNguoiDung { get; set; } = null!;

    public string HanhDong { get; set; } = null!;

    public string? TinhNang { get; set; }

    public string? DuLieu { get; set; }

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public string? NguoiTao { get; set; }

    public string? NguoiCapNhat { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung? NguoiTaoNavigation { get; set; }

    public virtual NguoiDung TenNguoiDungNavigation { get; set; } = null!;
}
