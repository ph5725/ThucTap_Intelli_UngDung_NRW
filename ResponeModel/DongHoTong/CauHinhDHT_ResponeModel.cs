namespace WebAPI_NRW.ResponeModel.DongHoTong
{
    public class CauHinhDHT_ResponeModel
    {
        public int Id { get; set; }

        public string MaDoiTuong { get; set; } = null!;

        public string MaDongHo { get; set; } = null!;

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiTao { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
