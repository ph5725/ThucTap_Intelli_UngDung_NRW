using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models;

public partial class CauHinhDht
{
    public int Id { get; set; }

    public string MaDoiTuong { get; set; } = null!;

    public string MaDongHo { get; set; } = null!;

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public string? NguoiTao { get; set; }

    public string? NguoiCapNhat { get; set; }

    public virtual DongHoTong MaDongHoNavigation { get; set; } = null!;

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung? NguoiTaoNavigation { get; set; }
}
