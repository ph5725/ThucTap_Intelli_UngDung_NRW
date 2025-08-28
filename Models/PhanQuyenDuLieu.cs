using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models;

public partial class PhanQuyenDuLieu
{
    public int Id { get; set; }

    public string NhomNguoiDung { get; set; } = null!;

    public string? DuLieuNrwcongTy { get; set; }

    public string? DuLieuNrwdma { get; set; }

    public virtual NhomNguoiDung NhomNguoiDungNavigation { get; set; } = null!;
}
