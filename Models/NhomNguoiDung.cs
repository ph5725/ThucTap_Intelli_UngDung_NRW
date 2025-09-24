using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models.Database;

public partial class NhomNguoiDung
{
    public int Id { get; set; }

    public string NhomNguoiDung1 { get; set; } = null!;

    public string? ThanhVien { get; set; }

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public int NguoiTao { get; set; }

    public int? NguoiCapNhat { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung NguoiTaoNavigation { get; set; } = null!;

    public virtual ICollection<PhanQuyenDuLieu> PhanQuyenDuLieus { get; set; } = new List<PhanQuyenDuLieu>();

    public virtual ICollection<PhanQuyenTinhNang> PhanQuyenTinhNangs { get; set; } = new List<PhanQuyenTinhNang>();
}
