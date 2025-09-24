namespace WebAPI_NRW.RequestModel.DongHoTong
{
    public class Update_DongHoTong_KhongSanLuong_Model
    {
        public string Ma { get; set; } = null!;

        public string Ten { get; set; } = null!;

        public bool DanhDauLoi { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public int? NguoiCapNhat { get; set; }
    }
}
