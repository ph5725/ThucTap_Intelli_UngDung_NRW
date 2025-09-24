using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models.Database;

public partial class PhanQuyenDuLieu
{
    public int Id { get; set; }

    public int? NhomNguoiDung { get; set; }

    public string? DuLieuNrwcongTy { get; set; }

    public string? DuLieuNrwdma { get; set; }

    public virtual NhomNguoiDung? NhomNguoiDungNavigation { get; set; }
}
