namespace WebAPI_NRW.RequestModel.HeThongBilling
{
    public class Add_DsNgayDocSoBilling_Model
    {
        public int Nam { get; set; }

        public int Ky { get; set; }

        public int SoNgayDocSoBilling { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public int NguoiTao { get; set; }
    }
}
