namespace WebAPI_NRW.ResponeModel.DongHoTong
{
    public class CauHinhDht_ResponeModel
    {
        public int Id { get; set; }

        public int? MaDoiTuong { get; set; }

        public string? MaDongHo { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiTao { get; set; }

        public string? NguoiCapNhat { get; set; }

    }
}
