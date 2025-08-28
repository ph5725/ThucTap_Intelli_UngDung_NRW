using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models;

public partial class PhanQuyenTinhNang
{
    public int Id { get; set; }

    public string NhomNguoiDung { get; set; } = null!;

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

    public string? NguoiTao { get; set; }

    public string? NguoiCapNhat { get; set; }

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung? NguoiTaoNavigation { get; set; }

    public virtual NhomNguoiDung NhomNguoiDungNavigation { get; set; } = null!;
}
