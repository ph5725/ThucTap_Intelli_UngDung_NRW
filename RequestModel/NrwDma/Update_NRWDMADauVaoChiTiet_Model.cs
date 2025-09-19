namespace WebAPI_NRW.RequestModel.NrwDma
{
    public class Update_NRWDMADauVaoChiTiet_Model
    {
        public int MaDauVao { get; set; }

        public string MaDma { get; set; } = null!;

        public int Ky { get; set; }

        public int Nam { get; set; }

        public string Nguon { get; set; } = null!;

        public string ToanTu { get; set; } = null!;

        public double GiaTri { get; set; }

        public int? ThuTuHienThi { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
