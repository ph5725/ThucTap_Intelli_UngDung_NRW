namespace WebAPI_NRW.RequestModel.NguoiDung
{
    public class Update_NhatKySuDung_Model
    {
        public int Id { get; set; }

        public int? TenNguoiDung { get; set; }

        public string HanhDong { get; set; } = null!;

        public string? TinhNang { get; set; }

        public string? DuLieu { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public int? NguoiCapNhat { get; set; }
    }
}
