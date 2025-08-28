namespace WebAPI_NRW.RequestModel.DongHoTong
{
    public class Add_CauHinhDHT_Model
    {
        public string MaDoiTuong { get; set; } = null!;

        public string MaDongHo { get; set; } = null!;

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public string? NguoiTao { get; set; }
    }
}
