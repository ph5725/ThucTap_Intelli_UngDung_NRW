using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.NguoiDung;
using WebAPI_NRW.ResponeModel.NguoiDung;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NhomNguoiDungController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public NhomNguoiDungController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<NhomNguoiDung_ResponeModel> Get()
        {
            //Linq Query
            var query = from nhomNguoiDung in _context.NhomNguoiDungs
                        select new NhomNguoiDung_ResponeModel
                        {
                            Id = nhomNguoiDung.Id,
                            NhomNguoiDung1 = nhomNguoiDung.NhomNguoiDung1,
                            ThanhVien = nhomNguoiDung.ThanhVien,
                            GhiChu = nhomNguoiDung.GhiChu,
                            NgayTao = nhomNguoiDung.NgayTao,
                            NguoiTao = nhomNguoiDung.NguoiTao,
                            NgayCapNhat = nhomNguoiDung.NgayCapNhat,
                            NguoiCapNhat = nhomNguoiDung.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<NhomNguoiDung_ResponeModel> GetById(int id)
        {
            var nhomNguoiDung = _context.NhomNguoiDungs.FirstOrDefault(e => e.Id == id);

            if(nhomNguoiDung == null)
            {
                return NotFound();
            }

            //Map Entity -> ResponseModel để trả về
            var response = new NhomNguoiDung_ResponeModel()
            {
                Id = nhomNguoiDung.Id,
                NhomNguoiDung1 = nhomNguoiDung.NhomNguoiDung1,
                ThanhVien = nhomNguoiDung.ThanhVien,
                GhiChu = nhomNguoiDung.GhiChu,
                NgayTao = nhomNguoiDung.NgayTao,
                NguoiTao = nhomNguoiDung.NguoiTao,
                NgayCapNhat = nhomNguoiDung.NgayCapNhat,
                NguoiCapNhat = nhomNguoiDung.NguoiCapNhat,
            };

            return response;
        }

        /// API Add
        [HttpPost]
        public NhomNguoiDung_ResponeModel Post(Add_NhomNguoiDung_Model addNhomNguoiDung)
        {
            //Map request -> Entity
            var nhomNguoiDung = new NhomNguoiDung()
            {
                NhomNguoiDung1 = addNhomNguoiDung.NhomNguoiDung1,
                ThanhVien = addNhomNguoiDung.ThanhVien,
                GhiChu = addNhomNguoiDung.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = addNhomNguoiDung.NguoiTao,
            };

            //Lưu vào DB
            _context.NhomNguoiDungs.Add(nhomNguoiDung);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new NhomNguoiDung_ResponeModel()
            {
                Id = nhomNguoiDung.Id,
                NhomNguoiDung1 = nhomNguoiDung.NhomNguoiDung1,
                ThanhVien = nhomNguoiDung.ThanhVien,
                GhiChu = nhomNguoiDung.GhiChu,
                NgayTao = nhomNguoiDung.NgayTao,
                NguoiTao = nhomNguoiDung.NguoiTao,
                NgayCapNhat = nhomNguoiDung.NgayCapNhat,
                NguoiCapNhat = nhomNguoiDung.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public NhomNguoiDung_ResponeModel Update(int id, Update_NhomNguoiDung_Model updateNhomNguoiDung)
        {
            // Lấy entity từ DB
            var nhomNguoiDung = _context.NhomNguoiDungs.FirstOrDefault(e => e.Id == id);

            if (nhomNguoiDung == null) return null;

            // Gán dữ liệu từ request vào entity
            nhomNguoiDung.NhomNguoiDung1 = updateNhomNguoiDung.NhomNguoiDung1;
            nhomNguoiDung.ThanhVien = updateNhomNguoiDung.ThanhVien;
            nhomNguoiDung.GhiChu = updateNhomNguoiDung.GhiChu;
            nhomNguoiDung.NgayCapNhat = DateTime.Now;
            nhomNguoiDung.NguoiCapNhat = updateNhomNguoiDung.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new NhomNguoiDung_ResponeModel
            {
                Id = nhomNguoiDung.Id,
                NhomNguoiDung1 = nhomNguoiDung.NhomNguoiDung1,
                ThanhVien = nhomNguoiDung.ThanhVien,
                GhiChu = nhomNguoiDung.GhiChu,
                NgayTao = nhomNguoiDung.NgayTao,
                NguoiTao = nhomNguoiDung.NguoiTao,
                NgayCapNhat = nhomNguoiDung.NgayCapNhat,
                NguoiCapNhat = nhomNguoiDung.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public NhomNguoiDung_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var nhomNguoiDung = _context.NhomNguoiDungs.FirstOrDefault(e => e.Id == id);

            if (nhomNguoiDung == null) return null;

            // Xóa
            _context.NhomNguoiDungs.Remove(nhomNguoiDung);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new NhomNguoiDung_ResponeModel
            {
                Id = nhomNguoiDung.Id,
                NhomNguoiDung1 = nhomNguoiDung.NhomNguoiDung1,
                ThanhVien = nhomNguoiDung.ThanhVien,
                GhiChu = nhomNguoiDung.GhiChu,
                NgayTao = nhomNguoiDung.NgayTao,
                NguoiTao = nhomNguoiDung.NguoiTao,
                NgayCapNhat = nhomNguoiDung.NgayCapNhat,
                NguoiCapNhat = nhomNguoiDung.NguoiCapNhat,
            };
        }
    }
}
