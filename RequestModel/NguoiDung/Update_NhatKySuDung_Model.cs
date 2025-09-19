namespace WebAPI_NRW.RequestModel.NguoiDung
{
    public class Update_NhatKySuDung_Model
    {
        public string TenNguoiDung { get; set; } = null!;

        public string HanhDong { get; set; } = null!;

        public string? TinhNang { get; set; }

        public string? DuLieu { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
