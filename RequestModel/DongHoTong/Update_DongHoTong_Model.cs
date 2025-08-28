namespace WebAPI_NRW.RequestModel.DongHoTong
{
    public class Update_DongHoTong_Model
    {

        public string Ten { get; set; } = null!;

        public int SanLuong { get; set; }

        public DateOnly NgayGhi { get; set; }

        public DateOnly? NgayChinhSua { get; set; }

        public string? NguoiChinhSua { get; set; }

        public bool DanhDauLoi { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
