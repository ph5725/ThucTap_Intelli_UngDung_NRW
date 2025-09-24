namespace WebAPI_NRW.RequestModel.DongHoTong
{
    public class Update_DongHoTong_Model
    {
        public string Ma { get; set; } = null!;

        public string Ten { get; set; } = null!;

        public int SanLuong { get; set; }

        public DateOnly? NgayChinhSua { get; set; }

        public int? NguoiChinhSua { get; set; }

        public bool DanhDauLoi { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public int? NguoiCapNhat { get; set; }
    }
}
