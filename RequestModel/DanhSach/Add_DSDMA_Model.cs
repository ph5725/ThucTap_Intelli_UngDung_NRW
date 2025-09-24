namespace WebAPI_NRW.RequestModel.DanhSach
{
    public class Add_DsDma_Model
    {
        public string MaDma { get; set; } = null!;

        public string TenDma { get; set; } = null!;

        public int SoLuongKhachHang { get; set; }

        public string TinhTrang { get; set; } = null!;

        public DateOnly NgayVanHanh { get; set; }

        public double? TyLeNrwbanDau { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public int NguoiTao { get; set; }
    }
}
