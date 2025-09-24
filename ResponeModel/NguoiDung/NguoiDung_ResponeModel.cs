namespace WebAPI_NRW.ResponeModel.NguoiDung
{
    public class NguoiDung_ResponeModel
    {
        public int Id { get; set; }

        public string Ma { get; set; } = null!;

        public string Ten { get; set; } = null!;

        public string TenNguoiDung { get; set; } = null!;

        //public string MatKhau { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? VaiTro { get; set; }

        public bool CapPhep { get; set; }

        public string? AnhDaiDien { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiTao { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
