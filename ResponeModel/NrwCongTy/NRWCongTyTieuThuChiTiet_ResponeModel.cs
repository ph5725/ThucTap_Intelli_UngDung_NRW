namespace WebAPI_NRW.ResponeModel.NrwCongTy
{
    public class NRWCongTyTieuThuChiTiet_ResponeModel
    {
        public int Id { get; set; }

        public int MaTieuThu { get; set; }

        public int Ky { get; set; }

        public int Nam { get; set; }

        public string Nguon { get; set; } = null!;

        public string ToanTu { get; set; } = null!;

        public int GiaTri { get; set; }

        public int ThuTuHienThi { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string NguoiTao { get; set; } = null!;

        public string? NguoiCapNhat { get; set; }
    }
}
