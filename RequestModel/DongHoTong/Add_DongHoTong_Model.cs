using WebAPI_NRW.Models;

namespace WebAPI_NRW.RequestModel.DongHoTong
{
    public class Add_DongHoTong_Model
    {
        public string Ma { get; set; } = null!;

        public string Ten { get; set; } = null!;

        public int SanLuong { get; set; }

        public DateOnly NgayGhi { get; set; }

        public bool DanhDauLoi { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public string? NguoiTao { get; set; }
    }
}
