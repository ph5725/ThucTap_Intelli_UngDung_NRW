using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DanhSach;
using WebAPI_NRW.RequestModel.HeThongBilling;
using WebAPI_NRW.ResponeModel.DanhSach;
using WebAPI_NRW.ResponeModel.HeThongBilling;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DsNgayDocSoBillingChiTietController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public DsNgayDocSoBillingChiTietController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get all
        [HttpGet]
        public ActionResult<IEnumerable<DsNgayDocSoBillingChiTiet_ResponeModel>> Get()
        {
            var list = _context.DsngayDocSoBillingChiTiets
                .Include(dsNgayDocSoBillingChiTiet => dsNgayDocSoBillingChiTiet.MaNgayDocSoNavigation)
                .Include(dsNgayDocSoBillingChiTiet => dsNgayDocSoBillingChiTiet.NguoiTaoNavigation)
                .Include(dsNgayDocSoBillingChiTiet => dsNgayDocSoBillingChiTiet.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<DsNgayDocSoBillingChiTiet_ResponeModel> GetById(int id)
        {
            var entity = _context.DsngayDocSoBillingChiTiets
                .Include(dsNgayDocSoBillingChiTiet => dsNgayDocSoBillingChiTiet.MaNgayDocSoNavigation)
                .Include(dsNgayDocSoBillingChiTiet => dsNgayDocSoBillingChiTiet.NguoiTaoNavigation)
                .Include(dsNgayDocSoBillingChiTiet => dsNgayDocSoBillingChiTiet.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(dsNgayDocSoBillingChiTiet => dsNgayDocSoBillingChiTiet.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public ActionResult<DsNgayDocSoBillingChiTiet_ResponeModel> Post(Add_DsNgayDocSoBillingChiTiet_Model addDsNgayDocSoBillingChiTiet)
        {
            var entity = new DsngayDocSoBillingChiTiet
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

            _context.DsngayDocSoBillingChiTiets.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaNgayDocSoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public ActionResult<DsNgayDocSoBillingChiTiet_ResponeModel> Update(int id, Update_DsNgayDocSoBillingChiTiet_Model updateDsNgayDocSoBillingChiTiet)
        {
            var entity = _context.DsngayDocSoBillingChiTiets.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.MaNgayDocSo = updateDsNgayDocSoBillingChiTiet.MaNgayDocSo;
            entity.Nam = updateDsNgayDocSoBillingChiTiet.Nam;
            entity.Ky = updateDsNgayDocSoBillingChiTiet.Ky;
            entity.Dot = updateDsNgayDocSoBillingChiTiet.Dot;
            entity.SoNgayDocSoDot = updateDsNgayDocSoBillingChiTiet.SoNgayDocSoDot;
            entity.GhiChu = updateDsNgayDocSoBillingChiTiet.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateDsNgayDocSoBillingChiTiet.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaNgayDocSoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public ActionResult<DsNgayDocSoBillingChiTiet_ResponeModel> Delete(int id)
        {
            var entity = _context.DsngayDocSoBillingChiTiets.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.DsngayDocSoBillingChiTiets.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaNgayDocSoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public DsNgayDocSoBillingChiTiet_ResponeModel Post(Add_DsNgayDocSoBillingChiTiet_Model addDsNgayDocSoBillingChiTiet)
        //{
        //    //Map request -> Entity
        //    var dsNgayDocSoBillingChiTiet = new DsngayDocSoBillingChiTiet()
        //    {
        //        MaNgayDocSo = addDsNgayDocSoBillingChiTiet.MaNgayDocSo,
        //        Nam = addDsNgayDocSoBillingChiTiet.Nam,
        //        Ky = addDsNgayDocSoBillingChiTiet.Ky,
        //        Dot = addDsNgayDocSoBillingChiTiet.Dot,
        //        SoNgayDocSoDot = addDsNgayDocSoBillingChiTiet.SoNgayDocSoDot,
        //        GhiChu = addDsNgayDocSoBillingChiTiet.GhiChu,
        //        NgayTao = DateTime.Now,
        //        NguoiTao = addDsNgayDocSoBillingChiTiet.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.DsngayDocSoBillingChiTiets.Add(dsNgayDocSoBillingChiTiet);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new DsNgayDocSoBillingChiTiet_ResponeModel()
        //    {
        //        Id = dsNgayDocSoBillingChiTiet.Id,
        //        MaNgayDocSo = dsNgayDocSoBillingChiTiet.MaNgayDocSo,
        //        Nam = dsNgayDocSoBillingChiTiet.Nam,
        //        Ky = dsNgayDocSoBillingChiTiet.Ky,
        //        Dot = dsNgayDocSoBillingChiTiet.Dot,
        //        SoNgayDocSoDot = dsNgayDocSoBillingChiTiet.SoNgayDocSoDot,
        //        GhiChu = dsNgayDocSoBillingChiTiet.GhiChu,
        //        NgayTao = dsNgayDocSoBillingChiTiet.NgayTao,
        //        NguoiTao = dsNgayDocSoBillingChiTiet.NguoiTao,
        //        NgayCapNhat = dsNgayDocSoBillingChiTiet.NgayCapNhat,
        //        NguoiCapNhat = dsNgayDocSoBillingChiTiet.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public DsNgayDocSoBillingChiTiet_ResponeModel Update(int id, Update_DsNgayDocSoBillingChiTiet_Model updateDsNgayDocSoBilling)
        //{
        //    // Lấy entity từ DB
        //    var dsNgayDocSoBillingChiTiet = _context.DsngayDocSoBillingChiTiets.FirstOrDefault(e => e.Id == id);

        //    if (dsNgayDocSoBillingChiTiet == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    dsNgayDocSoBillingChiTiet.MaNgayDocSo = updateDsNgayDocSoBilling.MaNgayDocSo;
        //    dsNgayDocSoBillingChiTiet.Nam = updateDsNgayDocSoBilling.Nam;
        //    dsNgayDocSoBillingChiTiet.Ky = updateDsNgayDocSoBilling.Ky;
        //    dsNgayDocSoBillingChiTiet.Dot = updateDsNgayDocSoBilling.Dot;
        //    dsNgayDocSoBillingChiTiet.SoNgayDocSoDot = updateDsNgayDocSoBilling.SoNgayDocSoDot;
        //    dsNgayDocSoBillingChiTiet.GhiChu = updateDsNgayDocSoBilling.GhiChu;
        //    dsNgayDocSoBillingChiTiet.NgayCapNhat = DateTime.Now;
        //    dsNgayDocSoBillingChiTiet.NguoiCapNhat = updateDsNgayDocSoBilling.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new DsNgayDocSoBillingChiTiet_ResponeModel
        //    {
        //        Id = dsNgayDocSoBillingChiTiet.Id,
        //        MaNgayDocSo = dsNgayDocSoBillingChiTiet.MaNgayDocSo,
        //        Nam = dsNgayDocSoBillingChiTiet.Nam,
        //        Ky = dsNgayDocSoBillingChiTiet.Ky,
        //        Dot = dsNgayDocSoBillingChiTiet.Dot,
        //        SoNgayDocSoDot = dsNgayDocSoBillingChiTiet.SoNgayDocSoDot,
        //        GhiChu = dsNgayDocSoBillingChiTiet.GhiChu,
        //        NgayTao = dsNgayDocSoBillingChiTiet.NgayTao,
        //        NguoiTao = dsNgayDocSoBillingChiTiet.NguoiTao,
        //        NgayCapNhat = dsNgayDocSoBillingChiTiet.NgayCapNhat,
        //        NguoiCapNhat = dsNgayDocSoBillingChiTiet.NguoiCapNhat,
        //    };
        //}
    }
}
