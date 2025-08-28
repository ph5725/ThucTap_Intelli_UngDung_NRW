using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.DongHoTong;
using WebAPI_NRW.ResponeModel.DongHoTong;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CauHinhDHTController
    {
        private readonly DbNrwContext _context;

        public CauHinhDHTController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<CauHinhDHT_ResponeModel> Get()
        {
            //Linq Query
            var query = from CauHinhDHT in _context.CauHinhDhts
                select new CauHinhDHT_ResponeModel
                {
                    Id = CauHinhDHT.Id,
                    MaDoiTuong = CauHinhDHT.MaDoiTuong,
                    MaDongHo = CauHinhDHT.MaDoiTuong,
                    GhiChu = CauHinhDHT.GhiChu,
                    NgayTao = CauHinhDHT.NgayTao,
                    NguoiTao = CauHinhDHT.NguoiTao,
                    NgayCapNhat = CauHinhDHT.NgayCapNhat,
                    NguoiCapNhat = CauHinhDHT.NguoiCapNhat,
                };
            return query.ToList();
        }

        /// API Add
        [HttpPost]
        public CauHinhDHT_ResponeModel Post(Add_CauHinhDHT_Model addCauHinhDHT)
        {
            //Map request -> Entity
            var cauHinhDHT = new CauHinhDht()
            {
                MaDoiTuong = addCauHinhDHT.MaDoiTuong,
                MaDongHo = addCauHinhDHT.MaDoiTuong,
                GhiChu = addCauHinhDHT.GhiChu,
                NgayTao = addCauHinhDHT.NgayTao,
                NguoiTao = addCauHinhDHT.NguoiTao,
            };

            //Lưu vào DB
            _context.CauHinhDhts.Add(cauHinhDHT);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new CauHinhDHT_ResponeModel()
            {
                Id = cauHinhDHT.Id,
                MaDoiTuong = cauHinhDHT.MaDoiTuong,
                MaDongHo = cauHinhDHT.MaDoiTuong,
                GhiChu = cauHinhDHT.GhiChu,
                NgayTao = cauHinhDHT.NgayTao,
                NguoiTao = cauHinhDHT.NguoiTao,
                NgayCapNhat = cauHinhDHT.NgayCapNhat,
                NguoiCapNhat = cauHinhDHT.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public CauHinhDHT_ResponeModel Update(int id, Update_CauHinhDHT_Model updateCauHinhDHT)
        {
            var cauHinhDHT = _context.CauHinhDhts.FirstOrDefault(e => e.Id == id);

            if (cauHinhDHT == null) return null;

            // Gán dữ liệu từ request vào entity
            cauHinhDHT.MaDoiTuong = updateCauHinhDHT.MaDoiTuong;
            cauHinhDHT.MaDongHo = updateCauHinhDHT.MaDongHo;
            cauHinhDHT.GhiChu = updateCauHinhDHT.GhiChu;
            cauHinhDHT.NgayCapNhat = DateTime.Now;
            cauHinhDHT.NguoiCapNhat = updateCauHinhDHT.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new CauHinhDHT_ResponeModel
            {
                Id = cauHinhDHT.Id,
                MaDoiTuong = cauHinhDHT.MaDoiTuong,
                MaDongHo = cauHinhDHT.MaDoiTuong,
                GhiChu = cauHinhDHT.GhiChu,
                NgayTao = cauHinhDHT.NgayTao,
                NguoiTao = cauHinhDHT.NguoiTao,
                NgayCapNhat = cauHinhDHT.NgayCapNhat,
                NguoiCapNhat = cauHinhDHT.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public CauHinhDHT_ResponeModel delete(int id)
        {
            // Lấy entity CauHinhDHT từ DB
            var CauHinhDHT = _context.CauHinhDhts.FirstOrDefault(e => e.Id == id);

            if (CauHinhDHT == null) return null;

            // Xóa
            _context.CauHinhDhts.Remove(CauHinhDHT);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new CauHinhDHT_ResponeModel
            {
                Id = CauHinhDHT.Id,
                MaDoiTuong = CauHinhDHT.MaDoiTuong,
                MaDongHo = CauHinhDHT.MaDoiTuong,
                GhiChu = CauHinhDHT.GhiChu,
                NgayTao = CauHinhDHT.NgayTao,
                NguoiTao = CauHinhDHT.NguoiTao,
                NgayCapNhat = CauHinhDHT.NgayCapNhat,
                NguoiCapNhat = CauHinhDHT.NguoiCapNhat,
            };
        }
    }
}