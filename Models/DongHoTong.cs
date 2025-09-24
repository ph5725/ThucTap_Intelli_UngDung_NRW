using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models.Database;

public partial class DongHoTong
{
    public int Id { get; set; }

    public string Ma { get; set; } = null!;

    public string Ten { get; set; } = null!;

    public int SanLuong { get; set; }

    public DateOnly NgayGhi { get; set; }

    public DateOnly? NgayChinhSua { get; set; }

    public int? NguoiChinhSua { get; set; }

    public bool DanhDauLoi { get; set; }

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public int NguoiTao { get; set; }

    public int? NguoiCapNhat { get; set; }

    public virtual ICollection<CauHinhDht> CauHinhDhts { get; set; } = new List<CauHinhDht>();

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung? NguoiChinhSuaNavigation { get; set; }

    public virtual NguoiDung NguoiTaoNavigation { get; set; } = null!;
}
