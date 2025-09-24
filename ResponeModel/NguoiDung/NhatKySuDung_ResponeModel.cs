namespace WebAPI_NRW.ResponeModel.NguoiDung
{
    public class NhatKySuDung_ResponeModel
    {
        public int Id { get; set; }

        public string? TenNguoiDung { get; set; }

        public string HanhDong { get; set; } = null!;

        public string? TinhNang { get; set; }

        public string? DuLieu { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiTao { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
