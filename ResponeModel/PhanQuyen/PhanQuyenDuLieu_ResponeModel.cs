namespace WebAPI_NRW.ResponeModel.PhanQuyen
{
    public class PhanQuyenDuLieu_ResponeModel
    {
        public int Id { get; set; }

        public string NhomNguoiDung { get; set; } = null!;

        public string? DuLieuNrwcongTy { get; set; }

        public string? DuLieuNrwdma { get; set; }
    }
}
