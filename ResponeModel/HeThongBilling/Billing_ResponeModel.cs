namespace WebAPI_NRW.ResponeModel.HeThongBilling
{
    public class Billing_ResponeModel
    {
        public int Id { get; set; }

        public int SanLuongTieuThu { get; set; }

        public string MaDoiTuong { get; set; } = null!;

        public int Ky { get; set; }

        public int Nam { get; set; }

        public int? Dot { get; set; }

        public DateOnly? TuNgay { get; set; }

        public DateOnly? DenNgay { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiTao { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
