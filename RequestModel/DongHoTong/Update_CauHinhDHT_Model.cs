namespace WebAPI_NRW.RequestModel.DongHoTong
{
    public class Update_CauHinhDHT_Model
    {
        public string MaDoiTuong { get; set; } = null!;

        public string MaDongHo { get; set; } = null!;

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
