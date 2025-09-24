using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models.Database;

public partial class NrwcongTyTieuThuChiTiet
{
    public int Id { get; set; }

    public int? MaTieuThu { get; set; }

    public int Ky { get; set; }

    public int Nam { get; set; }

    public string Nguon { get; set; } = null!;

    public string ToanTu { get; set; } = null!;

    public int GiaTri { get; set; }

    public int ThuTuHienThi { get; set; }

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public int NguoiTao { get; set; }

    public int? NguoiCapNhat { get; set; }

    public virtual NrwcongTy? MaTieuThuNavigation { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung NguoiTaoNavigation { get; set; } = null!;
}
