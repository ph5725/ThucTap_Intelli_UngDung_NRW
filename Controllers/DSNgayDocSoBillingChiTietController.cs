using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.HeThongBilling;
using WebAPI_NRW.ResponeModel.HeThongBilling;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DSNgayDocSoBillingChiTietController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public DSNgayDocSoBillingChiTietController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<DSNgayDocSoBillingChiTiet_ResponeModel> Get()
        {
            //Linq Query
            var query = from dsNgayDocSoBillingChiTiet in _context.DsngayDocSoBillingChiTiets
                        select new DSNgayDocSoBillingChiTiet_ResponeModel
                        {
                            Id = dsNgayDocSoBillingChiTiet.Id,
                            MaNgayDocSo = dsNgayDocSoBillingChiTiet.MaNgayDocSo,
                            Nam = dsNgayDocSoBillingChiTiet.Nam,
                            Ky = dsNgayDocSoBillingChiTiet.Ky,
                            Dot = dsNgayDocSoBillingChiTiet.Dot,
                            SoNgayDocSoDot = dsNgayDocSoBillingChiTiet.SoNgayDocSoDot,
                            GhiChu = dsNgayDocSoBillingChiTiet.GhiChu,
                            NgayTao = dsNgayDocSoBillingChiTiet.NgayTao,
                            NguoiTao = dsNgayDocSoBillingChiTiet.NguoiTao,
                            NgayCapNhat = dsNgayDocSoBillingChiTiet.NgayCapNhat,
                            NguoiCapNhat = dsNgayDocSoBillingChiTiet.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<DSNgayDocSoBillingChiTiet_ResponeModel> GetById(int id)
        {
            var dsNgayDocSoBillingChiTiet = _context.DsngayDocSoBillingChiTiets.FirstOrDefault(e => e.Id == id);

            if(dsNgayDocSoBillingChiTiet == null)
            {
                return NotFound();
            }

            //Map Entity -> ResponseModel để trả về
            var response = new DSNgayDocSoBillingChiTiet_ResponeModel()
            {
                Id = dsNgayDocSoBillingChiTiet.Id,
                MaNgayDocSo = dsNgayDocSoBillingChiTiet.MaNgayDocSo,
                Nam = dsNgayDocSoBillingChiTiet.Nam,
                Ky = dsNgayDocSoBillingChiTiet.Ky,
                Dot = dsNgayDocSoBillingChiTiet.Dot,
                SoNgayDocSoDot = dsNgayDocSoBillingChiTiet.SoNgayDocSoDot,
                GhiChu = dsNgayDocSoBillingChiTiet.GhiChu,
                NgayTao = dsNgayDocSoBillingChiTiet.NgayTao,
                NguoiTao = dsNgayDocSoBillingChiTiet.NguoiTao,
                NgayCapNhat = dsNgayDocSoBillingChiTiet.NgayCapNhat,
                NguoiCapNhat = dsNgayDocSoBillingChiTiet.NguoiCapNhat,
            };

            return response;
        }

        /// API Add
        [HttpPost]
        public DSNgayDocSoBillingChiTiet_ResponeModel Post(Add_DSNgayDocSoBillingChiTiet_Model addDsNgayDocSoBillingChiTiet)
        {
            //Map request -> Entity
            var dsNgayDocSoBillingChiTiet = new DsngayDocSoBillingChiTiet()
            {
                MaNgayDocSo = addDsNgayDocSoBillingChiTiet.MaNgayDocSo,
                Nam = addDsNgayDocSoBillingChiTiet.Nam,
                Ky = addDsNgayDocSoBillingChiTiet.Ky,
                Dot = addDsNgayDocSoBillingChiTiet.Dot,
                SoNgayDocSoDot = addDsNgayDocSoBillingChiTiet.SoNgayDocSoDot,
                GhiChu = addDsNgayDocSoBillingChiTiet.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = addDsNgayDocSoBillingChiTiet.NguoiTao,
            };

            //Lưu vào DB
            _context.DsngayDocSoBillingChiTiets.Add(dsNgayDocSoBillingChiTiet);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new DSNgayDocSoBillingChiTiet_ResponeModel()
            {
                Id = dsNgayDocSoBillingChiTiet.Id,
                MaNgayDocSo = dsNgayDocSoBillingChiTiet.MaNgayDocSo,
                Nam = dsNgayDocSoBillingChiTiet.Nam,
                Ky = dsNgayDocSoBillingChiTiet.Ky,
                Dot = dsNgayDocSoBillingChiTiet.Dot,
                SoNgayDocSoDot = dsNgayDocSoBillingChiTiet.SoNgayDocSoDot,
                GhiChu = dsNgayDocSoBillingChiTiet.GhiChu,
                NgayTao = dsNgayDocSoBillingChiTiet.NgayTao,
                NguoiTao = dsNgayDocSoBillingChiTiet.NguoiTao,
                NgayCapNhat = dsNgayDocSoBillingChiTiet.NgayCapNhat,
                NguoiCapNhat = dsNgayDocSoBillingChiTiet.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public DSNgayDocSoBillingChiTiet_ResponeModel Update(int id, Update_DSNgayDocSoBillingChiTiet updateDsNgayDocSoBilling)
        {
            // Lấy entity từ DB
            var dsNgayDocSoBillingChiTiet = _context.DsngayDocSoBillingChiTiets.FirstOrDefault(e => e.Id == id);

            if (dsNgayDocSoBillingChiTiet == null) return null;

            // Gán dữ liệu từ request vào entity
            dsNgayDocSoBillingChiTiet.MaNgayDocSo = updateDsNgayDocSoBilling.MaNgayDocSo;
            dsNgayDocSoBillingChiTiet.Nam = updateDsNgayDocSoBilling.Nam;
            dsNgayDocSoBillingChiTiet.Ky = updateDsNgayDocSoBilling.Ky;
            dsNgayDocSoBillingChiTiet.Dot = updateDsNgayDocSoBilling.Dot;
            dsNgayDocSoBillingChiTiet.SoNgayDocSoDot = updateDsNgayDocSoBilling.SoNgayDocSoDot;
            dsNgayDocSoBillingChiTiet.GhiChu = updateDsNgayDocSoBilling.GhiChu;
            dsNgayDocSoBillingChiTiet.NgayCapNhat = DateTime.Now;
            dsNgayDocSoBillingChiTiet.NguoiCapNhat = updateDsNgayDocSoBilling.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new DSNgayDocSoBillingChiTiet_ResponeModel
            {
                Id = dsNgayDocSoBillingChiTiet.Id,
                MaNgayDocSo = dsNgayDocSoBillingChiTiet.MaNgayDocSo,
                Nam = dsNgayDocSoBillingChiTiet.Nam,
                Ky = dsNgayDocSoBillingChiTiet.Ky,
                Dot = dsNgayDocSoBillingChiTiet.Dot,
                SoNgayDocSoDot = dsNgayDocSoBillingChiTiet.SoNgayDocSoDot,
                GhiChu = dsNgayDocSoBillingChiTiet.GhiChu,
                NgayTao = dsNgayDocSoBillingChiTiet.NgayTao,
                NguoiTao = dsNgayDocSoBillingChiTiet.NguoiTao,
                NgayCapNhat = dsNgayDocSoBillingChiTiet.NgayCapNhat,
                NguoiCapNhat = dsNgayDocSoBillingChiTiet.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public DSNgayDocSoBillingChiTiet_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var dsNgayDocSoBillingChiTiet = _context.DsngayDocSoBillingChiTiets.FirstOrDefault(e => e.Id == id);

            if (dsNgayDocSoBillingChiTiet == null) return null;

            // Xóa
            _context.DsngayDocSoBillingChiTiets.Remove(dsNgayDocSoBillingChiTiet);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new DSNgayDocSoBillingChiTiet_ResponeModel
            {
                Id = dsNgayDocSoBillingChiTiet.Id,
                MaNgayDocSo = dsNgayDocSoBillingChiTiet.MaNgayDocSo,
                Nam = dsNgayDocSoBillingChiTiet.Nam,
                Ky = dsNgayDocSoBillingChiTiet.Ky,
                Dot = dsNgayDocSoBillingChiTiet.Dot,
                SoNgayDocSoDot = dsNgayDocSoBillingChiTiet.SoNgayDocSoDot,
                GhiChu = dsNgayDocSoBillingChiTiet.GhiChu,
                NgayTao = dsNgayDocSoBillingChiTiet.NgayTao,
                NguoiTao = dsNgayDocSoBillingChiTiet.NguoiTao,
                NgayCapNhat = dsNgayDocSoBillingChiTiet.NgayCapNhat,
                NguoiCapNhat = dsNgayDocSoBillingChiTiet.NguoiCapNhat,
            };
        }
    }
}
