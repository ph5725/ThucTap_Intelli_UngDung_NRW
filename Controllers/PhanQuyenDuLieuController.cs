using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DanhSach;
using WebAPI_NRW.RequestModel.PhanQuyen;
using WebAPI_NRW.ResponeModel.DanhSach;
using WebAPI_NRW.ResponeModel.PhanQuyen;
using WebAPI_NRW.Services;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PhanQuyenDuLieuController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public PhanQuyenDuLieuController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "phanquyen";
        }
        /// API Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhanQuyenDuLieu_ResponeModel>>> Get()
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var list = _context.PhanQuyenDuLieus
                .Include(phanQuyenDuLieu => phanQuyenDuLieu.NhomNguoiDungNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public async Task<ActionResult<PhanQuyenDuLieu_ResponeModel>> GetById(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.PhanQuyenDuLieus
                .Include(phanQuyenDuLieu => phanQuyenDuLieu.NhomNguoiDungNavigation)
                .AsNoTracking()
                .FirstOrDefault(phanQuyenDuLieu => phanQuyenDuLieu.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public async Task<ActionResult<PhanQuyenDuLieu_ResponeModel>> Post(Add_PhanQuyenDuLieu_Model addPhanQuyenDuLieu)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "add", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = new PhanQuyenDuLieu
            {
                NhomNguoiDung = addPhanQuyenDuLieu.NhomNguoiDung,
                DuLieuNrwcongTy = addPhanQuyenDuLieu.DuLieuNrwcongTy,
                DuLieuNrwdma = addPhanQuyenDuLieu.DuLieuNrwdma,
            };

            _context.PhanQuyenDuLieus.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NhomNguoiDungNavigation).Load();
            //_context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<PhanQuyenDuLieu_ResponeModel>> Update(int id, Update_PhanQuyenDuLieu_Model updatePhanQuyenDuLieu)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.PhanQuyenDuLieus.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.NhomNguoiDung = updatePhanQuyenDuLieu.NhomNguoiDung;
            entity.DuLieuNrwcongTy = updatePhanQuyenDuLieu.DuLieuNrwcongTy;
            entity.DuLieuNrwdma = updatePhanQuyenDuLieu.DuLieuNrwdma;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NhomNguoiDungNavigation).Load();
            //_context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<PhanQuyenDuLieu_ResponeModel>> Delete(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "delete", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.PhanQuyenDuLieus.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.PhanQuyenDuLieus.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NhomNguoiDungNavigation).Load();
            //_context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public PhanQuyenDuLieu_ResponeModel Post(Add_PhanQuyenDuLieu_Model addPhanQuyenDuLieu)
        //{
        //    //Map request -> Entity
        //    var phanQuyenDuLieu = new PhanQuyenDuLieu()
        //    {
        //        NhomNguoiDung = addPhanQuyenDuLieu.NhomNguoiDung,
        //        DuLieuNrwcongTy = addPhanQuyenDuLieu.DuLieuNrwcongTy,
        //        DuLieuNrwdma = addPhanQuyenDuLieu.DuLieuNrwdma,
        //    };

        //    //Lưu vào DB
        //    _context.PhanQuyenDuLieus.Add(phanQuyenDuLieu);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new PhanQuyenDuLieu_ResponeModel()
        //    {
        //        Id = phanQuyenDuLieu.Id,
        //        NhomNguoiDung = phanQuyenDuLieu.NhomNguoiDung,
        //        DuLieuNrwcongTy = phanQuyenDuLieu.DuLieuNrwcongTy,
        //        DuLieuNrwdma = phanQuyenDuLieu.DuLieuNrwdma,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public PhanQuyenDuLieu_ResponeModel Update(int id, Update_PhanQuyenDuLieu_Model updatePhanQuyenDuLieu)
        //{
        //    // Lấy entity từ DB
        //    var phanQuyenDuLieu = _context.PhanQuyenDuLieus.FirstOrDefault(e => e.Id == id);

        //    if (phanQuyenDuLieu == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    phanQuyenDuLieu.NhomNguoiDung = updatePhanQuyenDuLieu.NhomNguoiDung;
        //    phanQuyenDuLieu.DuLieuNrwcongTy = updatePhanQuyenDuLieu.DuLieuNrwcongTy;
        //    phanQuyenDuLieu.DuLieuNrwdma = updatePhanQuyenDuLieu.DuLieuNrwdma;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new PhanQuyenDuLieu_ResponeModel
        //    {
        //        Id = phanQuyenDuLieu.Id,
        //        NhomNguoiDung = phanQuyenDuLieu.NhomNguoiDung,
        //        DuLieuNrwcongTy = phanQuyenDuLieu.DuLieuNrwcongTy,
        //        DuLieuNrwdma = phanQuyenDuLieu.DuLieuNrwdma,
        //    };
        //}
    }
}
