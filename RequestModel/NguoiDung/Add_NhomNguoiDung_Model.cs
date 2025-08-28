namespace WebAPI_NRW.RequestModel.NguoiDung
{
    public class Add_NhomNguoiDung_Model
    {
        public string NhomNguoiDung1 { get; set; } = null!;

        public string? ThanhVien { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public string? NguoiTao { get; set; }
    }
}
