namespace WebAPI_NRW.RequestModel.NguoiDung
{
    public class Add_NhatKySuDung_Model
    {
        public string TenNguoiDung { get; set; } = null!;

        public string HanhDong { get; set; } = null!;

        public string? TinhNang { get; set; }

        public string? DuLieu { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public string? NguoiTao { get; set; }
    }
}
