namespace WebAPI_NRW.RequestModel.NrwDma
{
    public class Update_NrwDma_Model
    {
        public int? MaDma { get; set; }

        public int Ky { get; set; }

        public int Nam { get; set; }

        public double LuongNuocVao { get; set; }

        public double LuongNuocTieuThu { get; set; }

        public double? LuongNuocSucXa { get; set; }

        public double? LuongNuocThatThoat { get; set; }

        public double? TyLeThatThoatKyTruoc { get; set; }

        public double? TyLeThatThoat { get; set; }

        public string? NguyenNhan { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public int? NguoiCapNhat { get; set; }
    }
}
