using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models.Database;

public partial class CauHinhDht
{
    public int Id { get; set; }

    public int? MaDoiTuong { get; set; }

    public int? MaDongHo { get; set; }

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public int NguoiTao { get; set; }

    public int? NguoiCapNhat { get; set; }

    public virtual DongHoTong? MaDongHoNavigation { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung NguoiTaoNavigation { get; set; } = null!;
}
