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
using WebAPI_NRW.Services;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DsNgayDocSoBillingController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public DsNgayDocSoBillingController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "dsngaydocsobilling";
        }

        /// API Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DsNgayDocSoBilling_ResponeModel>>> Get()
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var list = _context.DsngayDocSoBillings
                .Include(dsNgayDocSoBilling => dsNgayDocSoBilling.NguoiTaoNavigation)
                .Include(dsNgayDocSoBilling => dsNgayDocSoBilling.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public async Task<ActionResult<DsNgayDocSoBilling_ResponeModel>> GetById(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.DsngayDocSoBillings
                .Include(dsNgayDocSoBilling => dsNgayDocSoBilling.NguoiTaoNavigation)
                .Include(dsNgayDocSoBilling => dsNgayDocSoBilling.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(dsNgayDocSoBilling => dsNgayDocSoBilling.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public async Task<ActionResult<DsNgayDocSoBilling_ResponeModel>> Post(Add_DsNgayDocSoBilling_Model addDsNgayDocSoBilling)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "add", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = new DsngayDocSoBilling
            {
                Nam = addDsNgayDocSoBilling.Nam,
                Ky = addDsNgayDocSoBilling.Ky,
                SoNgayDocSoBilling = addDsNgayDocSoBilling.SoNgayDocSoBilling,
                GhiChu = addDsNgayDocSoBilling.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = addDsNgayDocSoBilling.NguoiTao,
            };

            _context.DsngayDocSoBillings.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<DsNgayDocSoBilling_ResponeModel>> Update(int id, Update_DsNgayDocSoBilling_Model updateDsNgayDocSoBilling)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.DsngayDocSoBillings.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.Nam = updateDsNgayDocSoBilling.Nam;
            entity.Ky = updateDsNgayDocSoBilling.Ky;
            entity.SoNgayDocSoBilling = updateDsNgayDocSoBilling.SoNgayDocSoBilling;
            entity.GhiChu = updateDsNgayDocSoBilling.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateDsNgayDocSoBilling.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<DsNgayDocSoBilling_ResponeModel>> Delete(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "delete", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.DsngayDocSoBillings.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.DsngayDocSoBillings.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public DsNgayDocSoBilling_ResponeModel Post(Add_DsNgayDocSoBilling_Model addDsNgayDocSoBilling)
        //{
        //    //Map request -> Entity
        //    var dsNgayDocSoBilling = new DsngayDocSoBilling()
        //    {
        //        Nam = addDsNgayDocSoBilling.Nam,
        //        Ky = addDsNgayDocSoBilling.Ky,
        //        SoNgayDocSoBilling = addDsNgayDocSoBilling.SoNgayDocSoBilling,
        //        GhiChu = addDsNgayDocSoBilling.GhiChu,
        //        NgayTao = DateTime.Now,
        //        NguoiTao = addDsNgayDocSoBilling.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.DsngayDocSoBillings.Add(dsNgayDocSoBilling);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new DsNgayDocSoBilling_ResponeModel()
        //    {
        //        Id = dsNgayDocSoBilling.Id,
        //        Nam = dsNgayDocSoBilling.Nam,
        //        Ky = dsNgayDocSoBilling.Ky,
        //        SoNgayDocSoBilling = dsNgayDocSoBilling.SoNgayDocSoBilling,
        //        GhiChu = dsNgayDocSoBilling.GhiChu,
        //        NgayTao = dsNgayDocSoBilling.NgayTao,
        //        NguoiTao = dsNgayDocSoBilling.NguoiTao,
        //        NgayCapNhat = dsNgayDocSoBilling.NgayCapNhat,
        //        NguoiCapNhat = dsNgayDocSoBilling.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public DsNgayDocSoBilling_ResponeModel Update(int id, Update_DsNgayDocSoBilling_Model updateDsNgayDocSoBilling)
        //{
        //    // Lấy entity từ DB
        //    var dsNgayDocSoBilling = _context.DsngayDocSoBillings.FirstOrDefault(e => e.Id == id);

        //    if (dsNgayDocSoBilling == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    dsNgayDocSoBilling.Nam = updateDsNgayDocSoBilling.Nam;
        //    dsNgayDocSoBilling.Ky = updateDsNgayDocSoBilling.Ky;
        //    dsNgayDocSoBilling.SoNgayDocSoBilling = updateDsNgayDocSoBilling.SoNgayDocSoBilling;
        //    dsNgayDocSoBilling.GhiChu = updateDsNgayDocSoBilling.GhiChu;
        //    dsNgayDocSoBilling.NgayCapNhat = DateTime.Now;
        //    dsNgayDocSoBilling.NguoiCapNhat = updateDsNgayDocSoBilling.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new DsNgayDocSoBilling_ResponeModel
        //    {
        //        Id = dsNgayDocSoBilling.Id,
        //        Nam = dsNgayDocSoBilling.Nam,
        //        Ky = dsNgayDocSoBilling.Ky,
        //        SoNgayDocSoBilling = dsNgayDocSoBilling.SoNgayDocSoBilling,
        //        GhiChu = dsNgayDocSoBilling.GhiChu,
        //        NgayTao = dsNgayDocSoBilling.NgayTao,
        //        NguoiTao = dsNgayDocSoBilling.NguoiTao,
        //        NgayCapNhat = dsNgayDocSoBilling.NgayCapNhat,
        //        NguoiCapNhat = dsNgayDocSoBilling.NguoiCapNhat,
        //    };
        //}
    }
}