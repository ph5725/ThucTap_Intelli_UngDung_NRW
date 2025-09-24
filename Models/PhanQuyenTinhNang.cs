using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models.Database;

public partial class PhanQuyenTinhNang
{
    public int Id { get; set; }

    public int? NhomNguoiDung { get; set; }

    public string? DongHoTong { get; set; }

    public string? CauHinhDht { get; set; }

    public string? Dsdma { get; set; }

    public string? NrwcongTy { get; set; }

    public string? Nrwdma { get; set; }

    public string? DsngayDocSoBilling { get; set; }

    public string? NguoiDung { get; set; }

    public string? NhomNguoiDungTinhNang { get; set; }

    public string? NhatKySuDung { get; set; }

    public string? PhanQuyen { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public int NguoiTao { get; set; }

    public int? NguoiCapNhat { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung NguoiTaoNavigation { get; set; } = null!;

    public virtual NhomNguoiDung? NhomNguoiDungNavigation { get; set; }
}
