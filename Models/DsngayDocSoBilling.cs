using System;
using System.Collections.Generic;

namespace WebAPI_NRW.Models.Database;

public partial class DsngayDocSoBilling
{
    public int Id { get; set; }

    public int Nam { get; set; }

    public int Ky { get; set; }

    public int SoNgayDocSoBilling { get; set; }

    public string? GhiChu { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public int NguoiTao { get; set; }

    public int? NguoiCapNhat { get; set; }

    public virtual ICollection<DsngayDocSoBillingChiTiet> DsngayDocSoBillingChiTiets { get; set; } = new List<DsngayDocSoBillingChiTiet>();

    public virtual NguoiDung? NguoiCapNhatNavigation { get; set; }

    public virtual NguoiDung NguoiTaoNavigation { get; set; } = null!;
}
