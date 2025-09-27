using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DanhSach;
using WebAPI_NRW.RequestModel.NrwCongTy;
using WebAPI_NRW.ResponeModel.DanhSach;
using WebAPI_NRW.ResponeModel.NrwCongTy;
using WebAPI_NRW.Services;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class NrwCongTyController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public NrwCongTyController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "nrwcongty";
        }

        /// API Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NrwCongTy_ResponeModel>>> Get()
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var list = _context.NrwcongTies
                .Include(nrwCongTy => nrwCongTy.NguoiTaoNavigation)
                .Include(nrwCongTy => nrwCongTy.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public async Task<ActionResult<NrwCongTy_ResponeModel>> GetById(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NrwcongTies
                .Include(nrwCongTy => nrwCongTy.NguoiTaoNavigation)
                .Include(nrwCongTy => nrwCongTy.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(nrwCongTy => nrwCongTy.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public async Task<ActionResult<NrwCongTy_ResponeModel>> Post(Add_NrwCongTy_Model addNrwCongTy)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "add", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = new NrwcongTy
            {
                Ma = addNrwCongTy.Ma,
                Ky = addNrwCongTy.Ky,
                Nam = addNrwCongTy.Nam,

                SanLuongDauVao = addNrwCongTy.SanLuongDauVao,
                SanLuongTieuThu = addNrwCongTy.SanLuongTieuThu,
                LuongNuocThatThoat = addNrwCongTy.LuongNuocThatThoat,
                TyLeThatThoatChuan1 = addNrwCongTy.TyLeThatThoatChuan1,
                TyLeThatThoatChuan2 = addNrwCongTy.TyLeThatThoatChuan2,

                TuNgay = addNrwCongTy.TuNgay,
                DenNgay = addNrwCongTy.DenNgay,
                SoNgayDocSoDht = addNrwCongTy.SoNgayDocSoDht,
                SoNgayDocSoBilling = addNrwCongTy.SoNgayDocSoBilling,

                NguyenNhan = addNrwCongTy.NguyenNhan,
                GhiChu = addNrwCongTy.GhiChu,

                NgayTao = addNrwCongTy.NgayTao,
                NguoiTao = addNrwCongTy.NguoiTao,
            };

            _context.NrwcongTies.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<NrwCongTy_ResponeModel>> Update(int id, Update_NrwCongTy_Model updateNrwCongTy)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NrwcongTies.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.Ma = updateNrwCongTy.Ma;
            entity.Ky = updateNrwCongTy.Ky;
            entity.Nam = updateNrwCongTy.Nam;

            entity.SanLuongDauVao = updateNrwCongTy.SanLuongDauVao;
            entity.SanLuongTieuThu = updateNrwCongTy.SanLuongTieuThu;
            entity.LuongNuocThatThoat = updateNrwCongTy.LuongNuocThatThoat;
            entity.TyLeThatThoatChuan1 = updateNrwCongTy.TyLeThatThoatChuan1;
            entity.TyLeThatThoatChuan2 = updateNrwCongTy.TyLeThatThoatChuan2;

            entity.TuNgay = updateNrwCongTy.TuNgay;
            entity.DenNgay = updateNrwCongTy.DenNgay;
            entity.SoNgayDocSoDht = updateNrwCongTy.SoNgayDocSoDht;
            entity.SoNgayDocSoBilling = updateNrwCongTy.SoNgayDocSoBilling;

            entity.NguyenNhan = updateNrwCongTy.NguyenNhan;
            entity.GhiChu = updateNrwCongTy.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateNrwCongTy.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<NrwCongTy_ResponeModel>> Delete(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "delete", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NrwcongTies.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.NrwcongTies.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public NrwCongTy_ResponeModel Post(Add_NrwCongTy_Model addNrwCongTy)
        //{
        //    //Map request -> Entity
        //    var nrwCongTy = new NrwcongTy()
        //    {
        //        Ma = addNrwCongTy.Ma,
        //        Ky = addNrwCongTy.Ky,
        //        Nam = addNrwCongTy.Nam,

        //        SanLuongDauVao = addNrwCongTy.SanLuongDauVao,
        //        SanLuongTieuThu = addNrwCongTy.SanLuongTieuThu,
        //        LuongNuocThatThoat = addNrwCongTy.LuongNuocThatThoat,
        //        TyLeThatThoatChuan1 = addNrwCongTy.TyLeThatThoatChuan1,
        //        TyLeThatThoatChuan2 = addNrwCongTy.TyLeThatThoatChuan2,

        //        TuNgay = addNrwCongTy.TuNgay,
        //        DenNgay = addNrwCongTy.DenNgay,
        //        SoNgayDocSoDht = addNrwCongTy.SoNgayDocSoDht,
        //        SoNgayDocSoBilling = addNrwCongTy.SoNgayDocSoBilling,

        //        NguyenNhan = addNrwCongTy.NguyenNhan,
        //        GhiChu = addNrwCongTy.GhiChu,

        //        NgayTao = addNrwCongTy.NgayTao,
        //        NguoiTao = addNrwCongTy.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.NrwcongTies.Add(nrwCongTy);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new NrwCongTy_ResponeModel()
        //    {
        //        Id = nrwCongTy.Id,
        //        Ma = nrwCongTy.Ma,
        //        Ky = nrwCongTy.Ky,
        //        Nam = nrwCongTy.Nam,

        //        SanLuongDauVao = nrwCongTy.SanLuongDauVao,
        //        SanLuongTieuThu = nrwCongTy.SanLuongTieuThu,
        //        LuongNuocThatThoat = nrwCongTy.LuongNuocThatThoat,
        //        TyLeThatThoatChuan1 = nrwCongTy.TyLeThatThoatChuan1,
        //        TyLeThatThoatChuan2 = nrwCongTy.TyLeThatThoatChuan2,

        //        TuNgay = nrwCongTy.TuNgay,
        //        DenNgay = nrwCongTy.DenNgay,
        //        SoNgayDocSoDht = nrwCongTy.SoNgayDocSoDht,
        //        SoNgayDocSoBilling = nrwCongTy.SoNgayDocSoBilling,

        //        NguyenNhan = nrwCongTy.NguyenNhan,
        //        GhiChu = nrwCongTy.GhiChu,

        //        NgayTao = nrwCongTy.NgayTao,
        //        NguoiTao = nrwCongTy.NguoiTao,
        //        NgayCapNhat = nrwCongTy.NgayCapNhat,
        //        NguoiCapNhat = nrwCongTy.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public NrwCongTy_ResponeModel Update(int id, Update_NrwCongTy_Model updateNrwCongTy)
        //{
        //    // Lấy entity từ DB
        //    var nrwCongTy = _context.NrwcongTies.FirstOrDefault(e => e.Id == id);

        //    if (nrwCongTy == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    nrwCongTy.Ma = updateNrwCongTy.Ma;
        //    nrwCongTy.Ky = updateNrwCongTy.Ky;
        //    nrwCongTy.Nam = updateNrwCongTy.Nam;

        //    nrwCongTy.SanLuongDauVao = updateNrwCongTy.SanLuongDauVao;
        //    nrwCongTy.SanLuongTieuThu = updateNrwCongTy.SanLuongTieuThu;
        //    nrwCongTy.LuongNuocThatThoat = updateNrwCongTy.LuongNuocThatThoat;
        //    nrwCongTy.TyLeThatThoatChuan1 = updateNrwCongTy.TyLeThatThoatChuan1;
        //    nrwCongTy.TyLeThatThoatChuan2 = updateNrwCongTy.TyLeThatThoatChuan2;

        //    nrwCongTy.TuNgay = updateNrwCongTy.TuNgay;
        //    nrwCongTy.DenNgay = updateNrwCongTy.DenNgay;
        //    nrwCongTy.SoNgayDocSoDht = updateNrwCongTy.SoNgayDocSoDht;
        //    nrwCongTy.SoNgayDocSoBilling = updateNrwCongTy.SoNgayDocSoBilling;

        //    nrwCongTy.NguyenNhan = updateNrwCongTy.NguyenNhan;
        //    nrwCongTy.GhiChu = updateNrwCongTy.GhiChu;
        //    nrwCongTy.NgayCapNhat = DateTime.Now;
        //    nrwCongTy.NguoiCapNhat = updateNrwCongTy.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new NrwCongTy_ResponeModel
        //    {
        //        Id = nrwCongTy.Id,
        //        Ma = nrwCongTy.Ma,
        //        Ky = nrwCongTy.Ky,
        //        Nam = nrwCongTy.Nam,

        //        SanLuongDauVao = nrwCongTy.SanLuongDauVao,
        //        SanLuongTieuThu = nrwCongTy.SanLuongTieuThu,
        //        LuongNuocThatThoat = nrwCongTy.LuongNuocThatThoat,
        //        TyLeThatThoatChuan1 = nrwCongTy.TyLeThatThoatChuan1,
        //        TyLeThatThoatChuan2 = nrwCongTy.TyLeThatThoatChuan2,

        //        TuNgay = nrwCongTy.TuNgay,
        //        DenNgay = nrwCongTy.DenNgay,
        //        SoNgayDocSoDht = nrwCongTy.SoNgayDocSoDht,
        //        SoNgayDocSoBilling = nrwCongTy.SoNgayDocSoBilling,

        //        NguyenNhan = nrwCongTy.NguyenNhan,
        //        GhiChu = nrwCongTy.GhiChu,

        //        NgayTao = nrwCongTy.NgayTao,
        //        NguoiTao = nrwCongTy.NguoiTao,
        //        NgayCapNhat = nrwCongTy.NgayCapNhat,
        //        NguoiCapNhat = nrwCongTy.NguoiCapNhat,
        //    };
        //}
    }
}
