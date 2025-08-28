namespace WebAPI_NRW.RequestModel.NguoiDung
{
    public class Update_NhomNguoiDung_Model
    {
        public string NhomNguoiDung1 { get; set; } = null!;

        public string? ThanhVien { get; set; }

        public string? GhiChu { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
