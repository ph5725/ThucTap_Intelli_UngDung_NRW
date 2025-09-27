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
    [Route("api/[controller]")]

    public class NhomNguoiDungController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public NhomNguoiDungController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "nhomnguoidung";
        }

        /// API Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhomNguoiDung_ResponeModel>>> Get()
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var list = _context.NhomNguoiDungs
                .Include(nhomNguoiDung => nhomNguoiDung.NguoiTaoNavigation)
                .Include(nhomNguoiDung => nhomNguoiDung.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public async Task<ActionResult<NhomNguoiDung_ResponeModel>> GetById(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NhomNguoiDungs
                .Include(nhomNguoiDung => nhomNguoiDung.NguoiTaoNavigation)
                .Include(nhomNguoiDung => nhomNguoiDung.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(nhomNguoiDung => nhomNguoiDung.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public async Task<ActionResult<NhomNguoiDung_ResponeModel>> Post(Add_NhomNguoiDung_Model addNhomNguoiDung)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "add", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = new NhomNguoiDung
            {
                NhomNguoiDung1 = addNhomNguoiDung.NhomNguoiDung1,
                ThanhVien = addNhomNguoiDung.ThanhVien,
                GhiChu = addNhomNguoiDung.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = addNhomNguoiDung.NguoiTao,
            };

            _context.NhomNguoiDungs.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<NhomNguoiDung_ResponeModel>> Update(int id, Update_NhomNguoiDung_Model updateNhomNguoiDung)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NhomNguoiDungs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.NhomNguoiDung1 = updateNhomNguoiDung.NhomNguoiDung1;
            entity.ThanhVien = updateNhomNguoiDung.ThanhVien;
            entity.GhiChu = updateNhomNguoiDung.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateNhomNguoiDung.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<NhomNguoiDung_ResponeModel>> Delete(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "delete", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NhomNguoiDungs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.NhomNguoiDungs.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public NhomNguoiDung_ResponeModel Post(Add_NhomNguoiDung_Model addNhomNguoiDung)
        //{
        //    //Map request -> Entity
        //    var nhomNguoiDung = new NhomNguoiDung()
        //    {
        //        NhomNguoiDung1 = addNhomNguoiDung.NhomNguoiDung1,
        //        ThanhVien = addNhomNguoiDung.ThanhVien,
        //        GhiChu = addNhomNguoiDung.GhiChu,
        //        NgayTao = DateTime.Now,
        //        NguoiTao = addNhomNguoiDung.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.NhomNguoiDungs.Add(nhomNguoiDung);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new NhomNguoiDung_ResponeModel()
        //    {
        //        Id = nhomNguoiDung.Id,
        //        NhomNguoiDung1 = nhomNguoiDung.NhomNguoiDung1,
        //        ThanhVien = nhomNguoiDung.ThanhVien,
        //        GhiChu = nhomNguoiDung.GhiChu,
        //        NgayTao = nhomNguoiDung.NgayTao,
        //        NguoiTao = nhomNguoiDung.NguoiTao,
        //        NgayCapNhat = nhomNguoiDung.NgayCapNhat,
        //        NguoiCapNhat = nhomNguoiDung.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public NhomNguoiDung_ResponeModel Update(int id, Update_NhomNguoiDung_Model updateNhomNguoiDung)
        //{
        //    // Lấy entity từ DB
        //    var nhomNguoiDung = _context.NhomNguoiDungs.FirstOrDefault(e => e.Id == id);

        //    if (nhomNguoiDung == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    nhomNguoiDung.NhomNguoiDung1 = updateNhomNguoiDung.NhomNguoiDung1;
        //    nhomNguoiDung.ThanhVien = updateNhomNguoiDung.ThanhVien;
        //    nhomNguoiDung.GhiChu = updateNhomNguoiDung.GhiChu;
        //    nhomNguoiDung.NgayCapNhat = DateTime.Now;
        //    nhomNguoiDung.NguoiCapNhat = updateNhomNguoiDung.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new NhomNguoiDung_ResponeModel
        //    {
        //        Id = nhomNguoiDung.Id,
        //        NhomNguoiDung1 = nhomNguoiDung.NhomNguoiDung1,
        //        ThanhVien = nhomNguoiDung.ThanhVien,
        //        GhiChu = nhomNguoiDung.GhiChu,
        //        NgayTao = nhomNguoiDung.NgayTao,
        //        NguoiTao = nhomNguoiDung.NguoiTao,
        //        NgayCapNhat = nhomNguoiDung.NgayCapNhat,
        //        NguoiCapNhat = nhomNguoiDung.NguoiCapNhat,
        //    };
        //}
    }
}
