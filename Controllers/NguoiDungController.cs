using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.Helpers;
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
    public class NguoiDungController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public NguoiDungController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "nguoidung";
        }

        /// API Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NguoiDung_ResponeModel>>> Get()
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var list = _context.NguoiDungs
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public async Task<ActionResult<NguoiDung_ResponeModel>> GetById(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NguoiDungs
                .AsNoTracking()
                .FirstOrDefault(nguoiDung => nguoiDung.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public async Task<ActionResult<NguoiDung_ResponeModel>> Post(Add_NguoiDung_Model addNguoiDung)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "add", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = new NguoiDung
            {
                Ma = addNguoiDung.Ma,
                Ten = addNguoiDung.Ten,
                TenNguoiDung = addNguoiDung.TenNguoiDung,
                //MatKhau = addNguoiDung.MatKhau,
                MatKhau = PasswordHelper.HashPassword(addNguoiDung.MatKhau),
                Email = addNguoiDung.Email,
                VaiTro = addNguoiDung.VaiTro,
                CapPhep = addNguoiDung.CapPhep,
                AnhDaiDien = addNguoiDung.AnhDaiDien,
                NgayTao = DateTime.Now,
                NguoiTao = addNguoiDung.NguoiTao,
            };

            _context.NguoiDungs.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            //_context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            //_context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<NguoiDung_ResponeModel>> Update(int id, Update_NguoiDung_Model updateNguoiDung)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NguoiDungs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.Ma = updateNguoiDung.Ma;
            entity.Ten = updateNguoiDung.Ten;
            entity.TenNguoiDung = updateNguoiDung.TenNguoiDung;
            entity.Email = updateNguoiDung.Email;
            entity.VaiTro = updateNguoiDung.VaiTro;
            entity.CapPhep = updateNguoiDung.CapPhep;
            entity.AnhDaiDien = updateNguoiDung.AnhDaiDien;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateNguoiDung.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            //_context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            //_context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<NguoiDung_ResponeModel>> Delete(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "delete", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NguoiDungs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.NguoiDungs.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            //_context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            //_context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public NguoiDung_ResponeModel Post(Add_NguoiDung_Model addNguoiDung)
        //{
        //    //Map request -> Entity
        //    var nguoiDung = new NguoiDung()
        //    {
        //        Ma = addNguoiDung.Ma,
        //        Ten = addNguoiDung.Ten,
        //        TenNguoiDung = addNguoiDung.TenNguoiDung,
        //        MatKhau = addNguoiDung.MatKhau,
        //        Email = addNguoiDung.Email,
        //        VaiTro = addNguoiDung.VaiTro,
        //        CapPhep = addNguoiDung.CapPhep,
        //        AnhDaiDien = addNguoiDung.AnhDaiDien,
        //        NgayTao = DateTime.Now,
        //        NguoiTao = addNguoiDung.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.NguoiDungs.Add(nguoiDung);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new NguoiDung_ResponeModel()
        //    {
        //        Id = nguoiDung.Id,
        //        Ma = nguoiDung.Ma,
        //        Ten = nguoiDung.Ten,
        //        TenNguoiDung = nguoiDung.TenNguoiDung,
        //        MatKhau = nguoiDung.MatKhau,
        //        Email = nguoiDung.Email,
        //        VaiTro = nguoiDung.VaiTro,
        //        CapPhep = nguoiDung.CapPhep,
        //        AnhDaiDien = nguoiDung.AnhDaiDien,
        //        NgayTao = nguoiDung.NgayTao,
        //        NguoiTao = nguoiDung.NguoiTao,
        //        NgayCapNhat = nguoiDung.NgayCapNhat,
        //        NguoiCapNhat = nguoiDung.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public NguoiDung_ResponeModel Update(int id, Update_NguoiDung_Model updateNguoiDung)
        //{
        //    // Lấy entity từ DB
        //    var nguoiDung = _context.NguoiDungs.FirstOrDefault(e => e.Id == id);

        //    if (nguoiDung == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    nguoiDung.Ma = updateNguoiDung.Ma;
        //    nguoiDung.Ten = updateNguoiDung.Ten;
        //    nguoiDung.TenNguoiDung = updateNguoiDung.TenNguoiDung;
        //    nguoiDung.Email = updateNguoiDung.Email;
        //    nguoiDung.VaiTro = updateNguoiDung.VaiTro;
        //    nguoiDung.CapPhep = updateNguoiDung.CapPhep;
        //    nguoiDung.AnhDaiDien = updateNguoiDung.AnhDaiDien;
        //    nguoiDung.NgayCapNhat = DateTime.Now;
        //    nguoiDung.NguoiCapNhat = updateNguoiDung.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new NguoiDung_ResponeModel
        //    {
        //        Id = nguoiDung.Id,
        //        Ma = nguoiDung.Ma,
        //        Ten = nguoiDung.Ten,
        //        TenNguoiDung = nguoiDung.TenNguoiDung,
        //        MatKhau = nguoiDung.MatKhau,
        //        Email = nguoiDung.Email,
        //        VaiTro = nguoiDung.VaiTro,
        //        CapPhep = nguoiDung.CapPhep,
        //        AnhDaiDien = nguoiDung.AnhDaiDien,
        //        NgayTao = nguoiDung.NgayTao,
        //        NguoiTao = nguoiDung.NguoiTao,
        //        NgayCapNhat = nguoiDung.NgayCapNhat,
        //        NguoiCapNhat = nguoiDung.NguoiCapNhat,
        //    };
        //}
    }
}
