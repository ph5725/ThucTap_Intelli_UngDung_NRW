namespace WebAPI_NRW.RequestModel.HeThongBilling
{
    public class Update_DsNgayDocSoBillingChiTiet_Model
    {
        public int? MaNgayDocSo { get; set; }

        public int Nam { get; set; }

        public int Ky { get; set; }

        public int Dot { get; set; }

        public int SoNgayDocSoDot { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public int? NguoiCapNhat { get; set; }
    }
}
