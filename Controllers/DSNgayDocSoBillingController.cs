using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.HeThongBilling;
using WebAPI_NRW.ResponeModel.HeThongBilling;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DSNgayDocSoBillingController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public DSNgayDocSoBillingController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<DSNgayDocSoBilling_ResponeModel> Get()
        {
            //Linq Query
            var query = from dsNgayDocSoBilling in _context.DsngayDocSoBillings
                        select new DSNgayDocSoBilling_ResponeModel
                        {
                            Id = dsNgayDocSoBilling.Id,
                            Nam = dsNgayDocSoBilling.Nam,
                            Ky = dsNgayDocSoBilling.Ky,
                            SoNgayDocSoBilling = dsNgayDocSoBilling.SoNgayDocSoBilling,
                            GhiChu = dsNgayDocSoBilling.GhiChu,
                            NgayTao = dsNgayDocSoBilling.NgayTao,
                            NguoiTao = dsNgayDocSoBilling.NguoiTao,
                            NgayCapNhat = dsNgayDocSoBilling.NgayCapNhat,
                            NguoiCapNhat = dsNgayDocSoBilling.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<DSNgayDocSoBilling_ResponeModel> GetById(int id)
        {
            var dsNgayDocSoBilling = _context.DsngayDocSoBillings.FirstOrDefault(e => e.Id == id);

            if(dsNgayDocSoBilling == null)
            {
                return NotFound();
            }

            //Map Entity -> ResponseModel để trả về
            var response = new DSNgayDocSoBilling_ResponeModel()
            {
                Id = dsNgayDocSoBilling.Id,
                Nam = dsNgayDocSoBilling.Nam,
                Ky = dsNgayDocSoBilling.Ky,
                SoNgayDocSoBilling = dsNgayDocSoBilling.SoNgayDocSoBilling,
                GhiChu = dsNgayDocSoBilling.GhiChu,
                NgayTao = dsNgayDocSoBilling.NgayTao,
                NguoiTao = dsNgayDocSoBilling.NguoiTao,
                NgayCapNhat = dsNgayDocSoBilling.NgayCapNhat,
                NguoiCapNhat = dsNgayDocSoBilling.NguoiCapNhat,
            };

            return response;
        }

        /// API Add
        [HttpPost]
        public DSNgayDocSoBilling_ResponeModel Post(Add_DSNgayDocSoBilling_Model addDsNgayDocSoBilling)
        {
            //Map request -> Entity
            var dsNgayDocSoBilling = new DsngayDocSoBilling()
            {
                Nam = addDsNgayDocSoBilling.Nam,
                Ky = addDsNgayDocSoBilling.Ky,
                SoNgayDocSoBilling = addDsNgayDocSoBilling.SoNgayDocSoBilling,
                GhiChu = addDsNgayDocSoBilling.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = addDsNgayDocSoBilling.NguoiTao,
            };

            //Lưu vào DB
            _context.DsngayDocSoBillings.Add(dsNgayDocSoBilling);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new DSNgayDocSoBilling_ResponeModel()
            {
                Id = dsNgayDocSoBilling.Id,
                Nam = dsNgayDocSoBilling.Nam,
                Ky = dsNgayDocSoBilling.Ky,
                SoNgayDocSoBilling = dsNgayDocSoBilling.SoNgayDocSoBilling,
                GhiChu = dsNgayDocSoBilling.GhiChu,
                NgayTao = dsNgayDocSoBilling.NgayTao,
                NguoiTao = dsNgayDocSoBilling.NguoiTao,
                NgayCapNhat = dsNgayDocSoBilling.NgayCapNhat,
                NguoiCapNhat = dsNgayDocSoBilling.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public DSNgayDocSoBilling_ResponeModel Update(int id, Update_DSNgayDocSoBilling_Model updateDsNgayDocSoBilling)
        {
            // Lấy entity từ DB
            var dsNgayDocSoBilling = _context.DsngayDocSoBillings.FirstOrDefault(e => e.Id == id);

            if (dsNgayDocSoBilling == null) return null;

            // Gán dữ liệu từ request vào entity
            dsNgayDocSoBilling.Nam = updateDsNgayDocSoBilling.Nam;
            dsNgayDocSoBilling.Ky = updateDsNgayDocSoBilling.Ky;
            dsNgayDocSoBilling.SoNgayDocSoBilling = updateDsNgayDocSoBilling.SoNgayDocSoBilling;
            dsNgayDocSoBilling.GhiChu = updateDsNgayDocSoBilling.GhiChu;
            dsNgayDocSoBilling.NgayCapNhat = DateTime.Now;
            dsNgayDocSoBilling.NguoiCapNhat = updateDsNgayDocSoBilling.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new DSNgayDocSoBilling_ResponeModel
            {
                Id = dsNgayDocSoBilling.Id,
                Nam = dsNgayDocSoBilling.Nam,
                Ky = dsNgayDocSoBilling.Ky,
                SoNgayDocSoBilling = dsNgayDocSoBilling.SoNgayDocSoBilling,
                GhiChu = dsNgayDocSoBilling.GhiChu,
                NgayTao = dsNgayDocSoBilling.NgayTao,
                NguoiTao = dsNgayDocSoBilling.NguoiTao,
                NgayCapNhat = dsNgayDocSoBilling.NgayCapNhat,
                NguoiCapNhat = dsNgayDocSoBilling.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public DSNgayDocSoBilling_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var dsNgayDocSoBilling = _context.DsngayDocSoBillings.FirstOrDefault(e => e.Id == id);

            if (dsNgayDocSoBilling == null) return null;

            // Xóa
            _context.DsngayDocSoBillings.Remove(dsNgayDocSoBilling);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new DSNgayDocSoBilling_ResponeModel
            {
                Id = dsNgayDocSoBilling.Id,
                Nam = dsNgayDocSoBilling.Nam,
                Ky = dsNgayDocSoBilling.Ky,
                SoNgayDocSoBilling = dsNgayDocSoBilling.SoNgayDocSoBilling,
                GhiChu = dsNgayDocSoBilling.GhiChu,
                NgayTao = dsNgayDocSoBilling.NgayTao,
                NguoiTao = dsNgayDocSoBilling.NguoiTao,
                NgayCapNhat = dsNgayDocSoBilling.NgayCapNhat,
                NguoiCapNhat = dsNgayDocSoBilling.NguoiCapNhat,
            };
        }
    }
}