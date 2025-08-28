namespace WebAPI_NRW.ResponeModel.DongHoTong
{
    public class DongHoTong_ResponeModel
    {
        public int Id { get; set; }

        public string Ma { get; set; } = null!;

        public string Ten { get; set; } = null!;

        public int SanLuong { get; set; }

        public DateOnly NgayGhi { get; set; }

        public DateOnly? NgayChinhSua { get; set; }

        public string? NguoiChinhSua { get; set; }

        public bool DanhDauLoi { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiTao { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
