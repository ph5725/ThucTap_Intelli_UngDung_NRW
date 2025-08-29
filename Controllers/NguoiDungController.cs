using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.NguoiDung;
using WebAPI_NRW.ResponeModel.NguoiDung;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NguoiDungController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public NguoiDungController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<NguoiDung_ResponeModel> Get()
        {
            //Linq Query
            var query = from nguoiDung in _context.NguoiDungs
                        select new NguoiDung_ResponeModel
                        {
                            Id = nguoiDung.Id,
                            Ma = nguoiDung.Ma,
                            Ten = nguoiDung.Ten,
                            TenNguoiDung = nguoiDung.TenNguoiDung,
                            MatKhau = nguoiDung.MatKhau,
                            Email = nguoiDung.Email,
                            VaiTro = nguoiDung.VaiTro,
                            CapPhep = nguoiDung.CapPhep,
                            AnhDaiDien = nguoiDung.AnhDaiDien,
                            NgayTao = nguoiDung.NgayTao,
                            NguoiTao = nguoiDung.NguoiTao,
                            NgayCapNhat = nguoiDung.NgayCapNhat,
                            NguoiCapNhat = nguoiDung.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Get
        [HttpGet("{id}")]
        public ActionResult<NguoiDung_ResponeModel> GetById(int id)
        {
            var nguoiDung = _context.NguoiDungs.FirstOrDefault(e => e.Id == id);

            if (nguoiDung == null)
            {
                return NotFound();
            }

            //Map Entity -> ResponseModel để trả về
            var response = new NguoiDung_ResponeModel()
            {
                Id = nguoiDung.Id,
                Ma = nguoiDung.Ma,
                Ten = nguoiDung.Ten,
                TenNguoiDung = nguoiDung.TenNguoiDung,
                MatKhau = nguoiDung.MatKhau,
                Email = nguoiDung.Email,
                VaiTro = nguoiDung.VaiTro,
                CapPhep = nguoiDung.CapPhep,
                AnhDaiDien = nguoiDung.AnhDaiDien,
                NgayTao = nguoiDung.NgayTao,
                NguoiTao = nguoiDung.NguoiTao,
                NgayCapNhat = nguoiDung.NgayCapNhat,
                NguoiCapNhat = nguoiDung.NguoiCapNhat,
            };

            return response;
        }

        /// API Add
        [HttpPost]
        public NguoiDung_ResponeModel Post(Add_NguoiDung_Model addNguoiDung)
        {
            //Map request -> Entity
            var nguoiDung = new NguoiDung()
            {
                Ma = addNguoiDung.Ma,
                Ten = addNguoiDung.Ten,
                TenNguoiDung = addNguoiDung.TenNguoiDung,
                MatKhau = addNguoiDung.MatKhau,
                Email = addNguoiDung.Email,
                VaiTro = addNguoiDung.VaiTro,
                CapPhep = addNguoiDung.CapPhep,
                AnhDaiDien = addNguoiDung.AnhDaiDien,
                NgayTao = DateTime.Now,
                NguoiTao = addNguoiDung.NguoiTao,
            };

            //Lưu vào DB
            _context.NguoiDungs.Add(nguoiDung);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new NguoiDung_ResponeModel()
            {
                Id = nguoiDung.Id,
                Ma = nguoiDung.Ma,
                Ten = nguoiDung.Ten,
                TenNguoiDung = nguoiDung.TenNguoiDung,
                MatKhau = nguoiDung.MatKhau,
                Email = nguoiDung.Email,
                VaiTro = nguoiDung.VaiTro,
                CapPhep = nguoiDung.CapPhep,
                AnhDaiDien = nguoiDung.AnhDaiDien,
                NgayTao = nguoiDung.NgayTao,
                NguoiTao = nguoiDung.NguoiTao,
                NgayCapNhat = nguoiDung.NgayCapNhat,
                NguoiCapNhat = nguoiDung.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public NguoiDung_ResponeModel Update(int id, Update_NguoiDung_Model updateNguoiDung)
        {
            // Lấy entity từ DB
            var nguoiDung = _context.NguoiDungs.FirstOrDefault(e => e.Id == id);

            if (nguoiDung == null) return null;

            // Gán dữ liệu từ request vào entity
            nguoiDung.Ma = updateNguoiDung.Ma;
            nguoiDung.Ten = updateNguoiDung.Ten;
            nguoiDung.TenNguoiDung = updateNguoiDung.TenNguoiDung;
            nguoiDung.Email = updateNguoiDung.Email;
            nguoiDung.VaiTro = updateNguoiDung.VaiTro;
            nguoiDung.CapPhep = updateNguoiDung.CapPhep;
            nguoiDung.AnhDaiDien = updateNguoiDung.AnhDaiDien;
            nguoiDung.NgayCapNhat = DateTime.Now;
            nguoiDung.NguoiCapNhat = updateNguoiDung.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new NguoiDung_ResponeModel
            {
                Id = nguoiDung.Id,
                Ma = nguoiDung.Ma,
                Ten = nguoiDung.Ten,
                TenNguoiDung = nguoiDung.TenNguoiDung,
                MatKhau = nguoiDung.MatKhau,
                Email = nguoiDung.Email,
                VaiTro = nguoiDung.VaiTro,
                CapPhep = nguoiDung.CapPhep,
                AnhDaiDien = nguoiDung.AnhDaiDien,
                NgayTao = nguoiDung.NgayTao,
                NguoiTao = nguoiDung.NguoiTao,
                NgayCapNhat = nguoiDung.NgayCapNhat,
                NguoiCapNhat = nguoiDung.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public NguoiDung_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var nguoiDung = _context.NguoiDungs.FirstOrDefault(e => e.Id == id);

            if (nguoiDung == null) return null;

            // Xóa
            _context.NguoiDungs.Remove(nguoiDung);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new NguoiDung_ResponeModel
            {
                Id = nguoiDung.Id,
                Ma = nguoiDung.Ma,
                Ten = nguoiDung.Ten,
                TenNguoiDung = nguoiDung.TenNguoiDung,
                MatKhau = nguoiDung.MatKhau,
                Email = nguoiDung.Email,
                VaiTro = nguoiDung.VaiTro,
                CapPhep = nguoiDung.CapPhep,
                AnhDaiDien = nguoiDung.AnhDaiDien,
                NgayTao = nguoiDung.NgayTao,
                NguoiTao = nguoiDung.NguoiTao,
                NgayCapNhat = nguoiDung.NgayCapNhat,
                NguoiCapNhat = nguoiDung.NguoiCapNhat,
            };
        }
    }
}
