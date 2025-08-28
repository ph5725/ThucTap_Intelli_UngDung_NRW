namespace WebAPI_NRW.RequestModel.HeThongBilling
{
    public class Update_DSNgayDocSoBilling_Model
    {
        public int Nam { get; set; }

        public int Ky { get; set; }

        public int SoNgayDocSoBilling { get; set; }

        public string? GhiChu { get; set; }
        public DateTime? NgayCapNhat { get; set; }
        public string? NguoiCapNhat { get; set; }
    }
}
