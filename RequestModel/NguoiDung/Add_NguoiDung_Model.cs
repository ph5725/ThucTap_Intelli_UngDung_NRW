namespace WebAPI_NRW.RequestModel.NguoiDung
{
    public class Add_NguoiDung_Model
    {
        public string Ma { get; set; } = null!;

        public string Ten { get; set; } = null!;

        public string TenNguoiDung { get; set; } = null!;

        public string MatKhau { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? VaiTro { get; set; }

        public bool CapPhep { get; set; }

        public string? AnhDaiDien { get; set; }

        public DateTime NgayTao { get; set; }

        public string? NguoiTao { get; set; }
    }
}
