namespace WebAPI_NRW.RequestModel.HeThongBilling
{
    public class Update_Billing_Model
    {
        public int SanLuongTieuThu { get; set; }

        public string MaDoiTuong { get; set; } = null!;

        public int Ky { get; set; }

        public int Nam { get; set; }

        public int? Dot { get; set; }

        public DateOnly? TuNgay { get; set; }

        public DateOnly? DenNgay { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public int? NguoiCapNhat { get; set; }
    }
}
