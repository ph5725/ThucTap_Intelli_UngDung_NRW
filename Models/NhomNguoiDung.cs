using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models;

public partial class NhomNguoiDung
{
    public int Id { get; set; }

    public string NhomNguoiDung1 { get; set; } = null!;

    public string? ThanhVien { get; set; }

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public string? NguoiTao { get; set; }

    public string? NguoiCapNhat { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung? NguoiTaoNavigation { get; set; }

    public virtual ICollection<PhanQuyenDuLieu> PhanQuyenDuLieus { get; set; } = new List<PhanQuyenDuLieu>();

    public virtual ICollection<PhanQuyenTinhNang> PhanQuyenTinhNangs { get; set; } = new List<PhanQuyenTinhNang>();
}
