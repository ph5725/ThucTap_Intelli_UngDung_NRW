using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.NguoiDung;
using WebAPI_NRW.ResponeModel.NguoiDung;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NhatKySuDungController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public NhatKySuDungController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<NhatKySuDung_ResponeModel> Get()
        {
            //Linq Query
            var query = from nhatKySuDung in _context.NhatKySuDungs
                        select new NhatKySuDung_ResponeModel
                        {
                            Id = nhatKySuDung.Id,
                            TenNguoiDung = nhatKySuDung.TenNguoiDung,
                            HanhDong = nhatKySuDung.HanhDong,
                            TinhNang = nhatKySuDung.TinhNang,
                            DuLieu = nhatKySuDung.DuLieu,
                            GhiChu = nhatKySuDung.GhiChu,
                            NgayTao = nhatKySuDung.NgayTao,
                            NguoiTao = nhatKySuDung.NguoiTao,
                            NgayCapNhat = nhatKySuDung.NgayCapNhat,
                            NguoiCapNhat = nhatKySuDung.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<NhatKySuDung_ResponeModel> GetById(int id)
        {
            var nhatKySuDung = _context.NhatKySuDungs.FirstOrDefault(e => e.Id == id);

            if (nhatKySuDung == null)
            {
                return NotFound();
            }

            //Map Entity -> ResponseModel để trả về
            var response = new NhatKySuDung_ResponeModel()
            {
                Id = nhatKySuDung.Id,
                TenNguoiDung = nhatKySuDung.TenNguoiDung,
                HanhDong = nhatKySuDung.HanhDong,
                TinhNang = nhatKySuDung.TinhNang,
                DuLieu = nhatKySuDung.DuLieu,
                GhiChu = nhatKySuDung.GhiChu,
                NgayTao = nhatKySuDung.NgayTao,
                NguoiTao = nhatKySuDung.NguoiTao,
                NgayCapNhat = nhatKySuDung.NgayCapNhat,
                NguoiCapNhat = nhatKySuDung.NguoiCapNhat,
            };

            return response;
        }

        /// API Add
        [HttpPost]
        public NhatKySuDung_ResponeModel Post(Add_NhatKySuDung_Model addNhatKySuDung)
        {
            //Map request -> Entity
            var nhatKySuDung = new NhatKySuDung()
            {
                TenNguoiDung = addNhatKySuDung.TenNguoiDung,
                HanhDong = addNhatKySuDung.HanhDong,
                TinhNang = addNhatKySuDung.TinhNang,
                DuLieu = addNhatKySuDung.DuLieu,
                GhiChu = addNhatKySuDung.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = addNhatKySuDung.NguoiTao,
            };

            //Lưu vào DB
            _context.NhatKySuDungs.Add(nhatKySuDung);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new NhatKySuDung_ResponeModel()
            {
                Id = nhatKySuDung.Id,
                TenNguoiDung = nhatKySuDung.TenNguoiDung,
                HanhDong = nhatKySuDung.HanhDong,
                TinhNang = nhatKySuDung.TinhNang,
                DuLieu = nhatKySuDung.DuLieu,
                GhiChu = nhatKySuDung.GhiChu,
                NgayTao = nhatKySuDung.NgayTao,
                NguoiTao = nhatKySuDung.NguoiTao,
                NgayCapNhat = nhatKySuDung.NgayCapNhat,
                NguoiCapNhat = nhatKySuDung.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public NhatKySuDung_ResponeModel Update(int id, Update_NhatKySuDung_Model updateNhatKySuDung)
        {
            // Lấy entity từ DB
            var nhatKySuDung = _context.NhatKySuDungs.FirstOrDefault(e => e.Id == id);

            if (nhatKySuDung == null) return null;

            // Gán dữ liệu từ request vào entity
            nhatKySuDung.TenNguoiDung = updateNhatKySuDung.TenNguoiDung;
            nhatKySuDung.HanhDong = updateNhatKySuDung.HanhDong;
            nhatKySuDung.TinhNang = updateNhatKySuDung.TinhNang;
            nhatKySuDung.DuLieu = updateNhatKySuDung.DuLieu;
            nhatKySuDung.GhiChu = updateNhatKySuDung.GhiChu;
            nhatKySuDung.NgayCapNhat = DateTime.Now;
            nhatKySuDung.NguoiCapNhat = updateNhatKySuDung.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new NhatKySuDung_ResponeModel
            {
                Id = nhatKySuDung.Id,
                TenNguoiDung = nhatKySuDung.TenNguoiDung,
                HanhDong = nhatKySuDung.HanhDong,
                TinhNang = nhatKySuDung.TinhNang,
                DuLieu = nhatKySuDung.DuLieu,
                GhiChu = nhatKySuDung.GhiChu,
                NgayTao = nhatKySuDung.NgayTao,
                NguoiTao = nhatKySuDung.NguoiTao,
                NgayCapNhat = nhatKySuDung.NgayCapNhat,
                NguoiCapNhat = nhatKySuDung.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public NhatKySuDung_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var nhatKySuDung = _context.NhatKySuDungs.FirstOrDefault(e => e.Id == id);

            if (nhatKySuDung == null) return null;

            // Xóa
            _context.NhatKySuDungs.Remove(nhatKySuDung);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new NhatKySuDung_ResponeModel
            {
                Id = nhatKySuDung.Id,
                TenNguoiDung = nhatKySuDung.TenNguoiDung,
                HanhDong = nhatKySuDung.HanhDong,
                TinhNang = nhatKySuDung.TinhNang,
                DuLieu = nhatKySuDung.DuLieu,
                GhiChu = nhatKySuDung.GhiChu,
                NgayTao = nhatKySuDung.NgayTao,
                NguoiTao = nhatKySuDung.NguoiTao,
                NgayCapNhat = nhatKySuDung.NgayCapNhat,
                NguoiCapNhat = nhatKySuDung.NguoiCapNhat,
            };
        }
    }
}