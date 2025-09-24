namespace WebAPI_NRW.ResponeModel.DanhSach
{
    public class DsDma_ResponeModel
    {
        public int Id { get; set; }

        public string MaDma { get; set; } = null!;

        public string TenDma { get; set; } = null!;

        public int SoLuongKhachHang { get; set; }

        public string TinhTrang { get; set; } = null!;

        public DateOnly NgayVanHanh { get; set; }

        public double? TyLeNrwbanDau { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiTao { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
