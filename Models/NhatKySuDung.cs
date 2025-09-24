using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models.Database;

public partial class NhatKySuDung
{
    public int Id { get; set; }

    public int? TenNguoiDung { get; set; }

    public string HanhDong { get; set; } = null!;

    public string? TinhNang { get; set; }

    public string? DuLieu { get; set; }

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public int NguoiTao { get; set; }

    public int? NguoiCapNhat { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung NguoiTaoNavigation { get; set; } = null!;

    public virtual NguoiDung? TenNguoiDungNavigation { get; set; }
}
