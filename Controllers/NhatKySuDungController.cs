using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DanhSach;
using WebAPI_NRW.RequestModel.NguoiDung;
using WebAPI_NRW.ResponeModel.DanhSach;
using WebAPI_NRW.ResponeModel.NguoiDung;
using WebAPI_NRW.Services;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class NhatKySuDungController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public NhatKySuDungController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "nhatky";
        }

        /// API Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhatKySuDung_ResponeModel>>> Get()
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var list = _context.NhatKySuDungs
                .Include(nhatKySuDung => nhatKySuDung.TenNguoiDungNavigation)
                .Include(nhatKySuDung => nhatKySuDung.NguoiTaoNavigation)
                .Include(nhatKySuDung => nhatKySuDung.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public async Task<ActionResult<NhatKySuDung_ResponeModel>> GetById(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NhatKySuDungs
                .Include(nhatKySuDung => nhatKySuDung.TenNguoiDungNavigation)
                .Include(nhatKySuDung => nhatKySuDung.NguoiTaoNavigation)
                .Include(nhatKySuDung => nhatKySuDung.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(nhatKySuDung => nhatKySuDung.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public async Task<ActionResult<NhatKySuDung_ResponeModel>> Post(Add_NhatKySuDung_Model addNhatKySuDung)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "add", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = new NhatKySuDung
            {
                TenNguoiDung = addNhatKySuDung.TenNguoiDung,
                HanhDong = addNhatKySuDung.HanhDong,
                TinhNang = addNhatKySuDung.TinhNang,
                DuLieu = addNhatKySuDung.DuLieu,
                GhiChu = addNhatKySuDung.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = addNhatKySuDung.NguoiTao,
            };

            _context.NhatKySuDungs.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.TenNguoiDungNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<NhatKySuDung_ResponeModel>> Update(int id, Update_NhatKySuDung_Model updateNhatKySuDung)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NhatKySuDungs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.TenNguoiDung = updateNhatKySuDung.TenNguoiDung;
            entity.HanhDong = updateNhatKySuDung.HanhDong;
            entity.TinhNang = updateNhatKySuDung.TinhNang;
            entity.DuLieu = updateNhatKySuDung.DuLieu;
            entity.GhiChu = updateNhatKySuDung.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateNhatKySuDung.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.TenNguoiDungNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<NhatKySuDung_ResponeModel>> Delete(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "delete", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NhatKySuDungs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.NhatKySuDungs.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.TenNguoiDungNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public NhatKySuDung_ResponeModel Post(Add_NhatKySuDung_Model addNhatKySuDung)
        //{
        //    //Map request -> Entity
        //    var nhatKySuDung = new NhatKySuDung()
        //    {
        //        TenNguoiDung = addNhatKySuDung.TenNguoiDung,
        //        HanhDong = addNhatKySuDung.HanhDong,
        //        TinhNang = addNhatKySuDung.TinhNang,
        //        DuLieu = addNhatKySuDung.DuLieu,
        //        GhiChu = addNhatKySuDung.GhiChu,
        //        NgayTao = DateTime.Now,
        //        NguoiTao = addNhatKySuDung.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.NhatKySuDungs.Add(nhatKySuDung);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new NhatKySuDung_ResponeModel()
        //    {
        //        Id = nhatKySuDung.Id,
        //        TenNguoiDung = nhatKySuDung.TenNguoiDung,
        //        HanhDong = nhatKySuDung.HanhDong,
        //        TinhNang = nhatKySuDung.TinhNang,
        //        DuLieu = nhatKySuDung.DuLieu,
        //        GhiChu = nhatKySuDung.GhiChu,
        //        NgayTao = nhatKySuDung.NgayTao,
        //        NguoiTao = nhatKySuDung.NguoiTao,
        //        NgayCapNhat = nhatKySuDung.NgayCapNhat,
        //        NguoiCapNhat = nhatKySuDung.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public NhatKySuDung_ResponeModel Update(int id, Update_NhatKySuDung_Model updateNhatKySuDung)
        //{
        //    // Lấy entity từ DB
        //    var nhatKySuDung = _context.NhatKySuDungs.FirstOrDefault(e => e.Id == id);

        //    if (nhatKySuDung == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    nhatKySuDung.TenNguoiDung = updateNhatKySuDung.TenNguoiDung;
        //    nhatKySuDung.HanhDong = updateNhatKySuDung.HanhDong;
        //    nhatKySuDung.TinhNang = updateNhatKySuDung.TinhNang;
        //    nhatKySuDung.DuLieu = updateNhatKySuDung.DuLieu;
        //    nhatKySuDung.GhiChu = updateNhatKySuDung.GhiChu;
        //    nhatKySuDung.NgayCapNhat = DateTime.Now;
        //    nhatKySuDung.NguoiCapNhat = updateNhatKySuDung.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new NhatKySuDung_ResponeModel
        //    {
        //        Id = nhatKySuDung.Id,
        //        TenNguoiDung = nhatKySuDung.TenNguoiDung,
        //        HanhDong = nhatKySuDung.HanhDong,
        //        TinhNang = nhatKySuDung.TinhNang,
        //        DuLieu = nhatKySuDung.DuLieu,
        //        GhiChu = nhatKySuDung.GhiChu,
        //        NgayTao = nhatKySuDung.NgayTao,
        //        NguoiTao = nhatKySuDung.NguoiTao,
        //        NgayCapNhat = nhatKySuDung.NgayCapNhat,
        //        NguoiCapNhat = nhatKySuDung.NguoiCapNhat,
        //    };
        //}
    }
}