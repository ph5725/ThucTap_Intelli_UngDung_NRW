namespace WebAPI_NRW.RequestModel.DanhSach
{
    public class Update_DSDMA_Model
    {
        public string MaDma { get; set; } = null!;

        public string TenDma { get; set; } = null!;

        public int SoLuongKhachHang { get; set; }

        public string TinhTrang { get; set; } = null!;

        public DateOnly NgayVanHanh { get; set; }

        public double? TyLeNrwbanDau { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
