namespace WebAPI_NRW.ResponeModel.NguoiDung
{
    public class NhomNguoiDung_ResponeModel
    {
        public int Id { get; set; }

        public string NhomNguoiDung1 { get; set; } = null!;

        public string? ThanhVien { get; set; }

        public string? GhiChu { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime? NgayCapNhat { get; set; }

        public string? NguoiTao { get; set; }

        public string? NguoiCapNhat { get; set; }
    }
}
