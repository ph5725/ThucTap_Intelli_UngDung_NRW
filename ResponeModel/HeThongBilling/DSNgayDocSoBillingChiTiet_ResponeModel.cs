namespace WebAPI_NRW.ResponeModel.HeThongBilling
{
    public class DSNgayDocSoBillingChiTiet_ResponeModel
    {
        public int Id { get; set; }

        public int MaNgayDocSo { get; set; }

        public int Nam { get; set; }

        public int Ky { get; set; }

        public int Dot { get; set; }

        public int SoNgayDocSoDot { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiTao { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
