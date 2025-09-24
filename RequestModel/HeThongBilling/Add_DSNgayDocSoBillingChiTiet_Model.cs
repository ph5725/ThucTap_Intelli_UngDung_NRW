namespace WebAPI_NRW.RequestModel.HeThongBilling
{
    public class Add_DsNgayDocSoBillingChiTiet_Model
    {
        public int? MaNgayDocSo { get; set; }

        public int Nam { get; set; }

        public int Ky { get; set; }

        public int Dot { get; set; }

        public int SoNgayDocSoDot { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public int NguoiTao { get; set; }
    }
}
