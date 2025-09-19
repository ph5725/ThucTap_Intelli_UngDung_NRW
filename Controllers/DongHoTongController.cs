using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.DongHoTong;
using WebAPI_NRW.ResponeModel.DongHoTong;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DongHoTongController
    {
        private readonly DbNrwContext _context;

        public DongHoTongController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<DongHoTong_ResponeModel> Get()
        {
            //Linq Query
            var query = from dongHoTong in _context.DongHoTongs
                        select new DongHoTong_ResponeModel
                        {
                            Id = dongHoTong.Id,
                            Ma = dongHoTong.Ma,
                            Ten = dongHoTong.Ten,
                            SanLuong = dongHoTong.SanLuong,
                            NgayGhi = dongHoTong.NgayGhi,
                            NgayChinhSua = dongHoTong.NgayChinhSua,
                            NguoiChinhSua = dongHoTong.NguoiChinhSua,
                            DanhDauLoi  = dongHoTong.DanhDauLoi,
                            GhiChu = dongHoTong.GhiChu,
                            NgayTao = dongHoTong.NgayTao,
                            NguoiTao = dongHoTong.NguoiTao,
                            NgayCapNhat = dongHoTong.NgayCapNhat,
                            NguoiCapNhat = dongHoTong.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Add
        [HttpPost]
        public DongHoTong_ResponeModel Post(Add_DongHoTong_Model addDongHoTong)
        {
            //Map request -> Entity
            var dongHoTong = new DongHoTong()
            {
                Ma = addDongHoTong.Ma,
                Ten = addDongHoTong.Ten,
                SanLuong = addDongHoTong.SanLuong,
                NgayGhi = addDongHoTong.NgayGhi,
                DanhDauLoi = addDongHoTong.DanhDauLoi,
                GhiChu = addDongHoTong.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = addDongHoTong.NguoiTao,
            };

            //Lưu vào DB
            _context.DongHoTongs.Add(dongHoTong);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new DongHoTong_ResponeModel()
            {
                Id = dongHoTong.Id,
                Ma = dongHoTong.Ma,
                Ten = dongHoTong.Ten,
                SanLuong = dongHoTong.SanLuong,
                NgayGhi = dongHoTong.NgayGhi,
                NgayChinhSua = dongHoTong.NgayChinhSua,
                NguoiChinhSua = dongHoTong.NguoiChinhSua,
                DanhDauLoi = dongHoTong.DanhDauLoi,
                GhiChu = dongHoTong.GhiChu,
                NgayTao = dongHoTong.NgayTao,
                NguoiTao = dongHoTong.NguoiTao,
                NgayCapNhat = dongHoTong.NgayCapNhat,
                NguoiCapNhat = dongHoTong.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public DongHoTong_ResponeModel Update(int id, Update_DongHoTong_Model updateDongHoTong)
        {
            using var transaction = _context.Database.BeginTransaction();

            try
            {
                // Lấy entity từ DB
                var dongHoTong = _context.DongHoTongs.FirstOrDefault(e => e.Id == id);
                if (dongHoTong == null) return null;

                var oldMa = dongHoTong.Ma;
                var newMa = updateDongHoTong.Ma;

                // Nếu Ma thay đổi, cập nhật tất cả bảng liên quan
                if (oldMa != newMa)
                {
                    // Ví dụ bảng DongHoChiTiet có FK MaDongHoTong
                    var cauHinhDhts = _context.CauHinhDhts
                                           .Where(e => e.MaDongHo == oldMa)
                                           .ToList();

                    foreach (var maDongHo in cauHinhDhts)
                    {
                        maDongHo.MaDongHo = newMa;
                    }
                }

                // Gán dữ liệu từ request vào entity
                dongHoTong.Ma = updateDongHoTong.Ma;
                dongHoTong.Ten = updateDongHoTong.Ten;
                dongHoTong.SanLuong = updateDongHoTong.SanLuong;
                dongHoTong.NgayChinhSua = updateDongHoTong.NgayChinhSua;
                dongHoTong.NguoiChinhSua = updateDongHoTong.NguoiChinhSua;
                dongHoTong.DanhDauLoi = updateDongHoTong.DanhDauLoi;
                dongHoTong.GhiChu = updateDongHoTong.GhiChu;
                dongHoTong.NgayCapNhat = DateTime.Now;
                dongHoTong.NguoiCapNhat = updateDongHoTong.NguoiCapNhat;

                _context.SaveChanges();
                transaction.Commit();

                // Map entity -> response model
                return new DongHoTong_ResponeModel
                {
                    Id = dongHoTong.Id,
                    Ma = dongHoTong.Ma,
                    Ten = dongHoTong.Ten,
                    SanLuong = dongHoTong.SanLuong,
                    NgayGhi = dongHoTong.NgayGhi,
                    NgayChinhSua = dongHoTong.NgayChinhSua,
                    NguoiChinhSua = dongHoTong.NguoiChinhSua,
                    DanhDauLoi = dongHoTong.DanhDauLoi,
                    GhiChu = dongHoTong.GhiChu,
                    NgayTao = dongHoTong.NgayTao,
                    NguoiTao = dongHoTong.NguoiTao,
                    NgayCapNhat = dongHoTong.NgayCapNhat,
                    NguoiCapNhat = dongHoTong.NguoiCapNhat,
                };
            }
            catch (DbUpdateException ex)
            {
                // InnerException thường chứa thông báo SQL Server
                var sqlEx = ex.InnerException?.Message;

                // Bạn có thể log ra để biết constraint nào bị vi phạm
                Console.WriteLine("Lỗi database: " + sqlEx);

                // Ví dụ: báo cho client
                throw new Exception("Không thể cập nhật vì dữ liệu đang được tham chiếu tại: " + sqlEx);
            }
        }

        /// API Delete
        [HttpDelete]
        public DongHoTong_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var dongHoTong = _context.DongHoTongs.FirstOrDefault(e => e.Id == id);

            if (dongHoTong == null) return null;

            // Xóa
            _context.DongHoTongs.Remove(dongHoTong);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new DongHoTong_ResponeModel
            {
                Id = dongHoTong.Id,
                Ma = dongHoTong.Ma,
                Ten = dongHoTong.Ten,
                SanLuong = dongHoTong.SanLuong,
                NgayGhi = dongHoTong.NgayGhi,
                NgayChinhSua = dongHoTong.NgayChinhSua,
                NguoiChinhSua = dongHoTong.NguoiChinhSua,
                DanhDauLoi = dongHoTong.DanhDauLoi,
                GhiChu = dongHoTong.GhiChu,
                NgayTao = dongHoTong.NgayTao,
                NguoiTao = dongHoTong.NguoiTao,
                NgayCapNhat = dongHoTong.NgayCapNhat,
                NguoiCapNhat = dongHoTong.NguoiCapNhat,
            };
        }
    }
}
