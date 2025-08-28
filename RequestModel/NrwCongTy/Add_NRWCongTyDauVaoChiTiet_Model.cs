namespace WebAPI_NRW.RequestModel.NrwCongTy
{
    public class Add_NRWCongTyDauVaoChiTiet_Model
    {
        public int MaDauVao { get; set; }

        public int Ky { get; set; }

        public int Nam { get; set; }

        public string Nguon { get; set; } = null!;

        public string ToanTu { get; set; } = null!;

        public double GiaTri { get; set; }

        public int? ThuTuHienThi { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayTao { get; set; }

        public string? NguoiTao { get; set; }
    }
}
