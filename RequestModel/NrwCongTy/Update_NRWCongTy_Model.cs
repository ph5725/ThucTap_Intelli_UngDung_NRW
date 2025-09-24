namespace WebAPI_NRW.RequestModel.NrwCongTy
{
    public class Update_NrwCongTy_Model
    {
        public string Ma { get; set; } = null!;

        public int Ky { get; set; }

        public int Nam { get; set; }

        public double SanLuongDauVao { get; set; }

        public double SanLuongTieuThu { get; set; }

        public double? LuongNuocThatThoat { get; set; }

        public double? TyLeThatThoatChuan2 { get; set; }

        public double? TyLeThatThoatChuan1 { get; set; }

        public DateOnly TuNgay { get; set; }

        public DateOnly DenNgay { get; set; }

        public int? SoNgayDocSoDht { get; set; }

        public double? SoNgayDocSoBilling { get; set; }

        public string? NguyenNhan { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public int? NguoiCapNhat { get; set; }
    }
}
