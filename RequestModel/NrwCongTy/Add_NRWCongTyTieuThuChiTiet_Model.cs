namespace WebAPI_NRW.RequestModel.NrwCongTy
{
    public class Add_NrwCongTyTieuThuChiTiet_Model
    {
        public int? MaTieuThu { get; set; }

        public int Ky { get; set; }

        public int Nam { get; set; }

        public string Nguon { get; set; } = null!;

        public string ToanTu { get; set; } = null!;

        public int GiaTri { get; set; }

        public int ThuTuHienThi { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public int NguoiTao { get; set; }
    }
}
