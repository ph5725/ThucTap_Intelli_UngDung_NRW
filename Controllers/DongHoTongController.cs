using Microsoft.AspNetCore.Mvc;
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
            // Lấy entity từ DB
            var dongHoTong = _context.DongHoTongs.FirstOrDefault(e => e.Id == id);

            if (dongHoTong == null) return null;

            // Gán dữ liệu từ request vào entity
            dongHoTong.Ten = updateDongHoTong.Ten;
            dongHoTong.SanLuong = updateDongHoTong.SanLuong;
            dongHoTong.NgayGhi = updateDongHoTong.NgayGhi;
            dongHoTong.NgayChinhSua = updateDongHoTong.NgayChinhSua;
            dongHoTong.NguoiChinhSua = updateDongHoTong.NguoiChinhSua;
            dongHoTong.DanhDauLoi = updateDongHoTong.DanhDauLoi;
            dongHoTong.GhiChu = updateDongHoTong.GhiChu;
            dongHoTong.NgayCapNhat = DateTime.Now;
            dongHoTong.NguoiCapNhat = updateDongHoTong.NguoiCapNhat;

            _context.SaveChanges();

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
