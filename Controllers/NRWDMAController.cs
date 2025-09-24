using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DanhSach;
using WebAPI_NRW.RequestModel.NrwDma;
using WebAPI_NRW.ResponeModel.DanhSach;
using WebAPI_NRW.ResponeModel.NrwDma;
using WebAPI_NRW.Services;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class NrwDmaController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public NrwDmaController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "nrwdma";
        }

        /// API Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NrwDma_ResponeModel>>> Get()
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var list = _context.Nrwdmas
                .Include(nrwDma => nrwDma.MaDmaNavigation)
                .Include(nrwDma => nrwDma.NguoiTaoNavigation)
                .Include(nrwDma => nrwDma.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public async Task<ActionResult<NrwDma_ResponeModel>> GetById(int id)
        {
            var entity = _context.Nrwdmas
                .Include(nrwDma => nrwDma.MaDmaNavigation)
                .Include(nrwDma => nrwDma.NguoiTaoNavigation)
                .Include(nrwDma => nrwDma.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(nrwDma => nrwDma.Id == id);

            if (entity == null) return NotFound();

            // Lấy mã DMA (chuỗi) từ entity
            var dmaCode = entity.MaDmaNavigation?.MaDma ?? "N/A";

            Console.WriteLine($"Gia tri dmaCode duoc chọn: '{dmaCode}'");
            // Kiểm tra quyền dữ liệu
            if (!await PermissionHelper.HasDataPermission(User, _feature, dmaCode, false, _permissionService))
            {
                return StatusCode(403, new { message = "Bạn không có quyền truy cập DMA này" });
            }

            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public async Task<ActionResult<NrwDma_ResponeModel>> Post(Add_NrwDma_Model addNrwDma)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "add", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = new Nrwdma
            {
                MaDma = addNrwDma.MaDma,
                Ky = addNrwDma.Ky,
                Nam = addNrwDma.Nam,

                LuongNuocVao = addNrwDma.LuongNuocVao,
                LuongNuocTieuThu = addNrwDma.LuongNuocTieuThu,
                LuongNuocSucXa = addNrwDma.LuongNuocThatThoat,
                LuongNuocThatThoat = addNrwDma.LuongNuocThatThoat,

                TyLeThatThoatKyTruoc = addNrwDma.TyLeThatThoatKyTruoc,
                TyLeThatThoat = addNrwDma.TyLeThatThoat,

                NguyenNhan = addNrwDma.NguyenNhan,
                GhiChu = addNrwDma.GhiChu,

                NgayTao = addNrwDma.NgayTao,
                NguoiTao = addNrwDma.NguoiTao,
            };

            _context.Nrwdmas.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDmaNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<NrwDma_ResponeModel>> Update(int id, Update_NrwDma_Model updateNrwDma)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.Nrwdmas.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.MaDma = updateNrwDma.MaDma;
            entity.Ky = updateNrwDma.Ky;
            entity.Nam = updateNrwDma.Nam;

            entity.LuongNuocVao = updateNrwDma.LuongNuocVao;
            entity.LuongNuocTieuThu = updateNrwDma.LuongNuocTieuThu;
            entity.LuongNuocSucXa = updateNrwDma.LuongNuocSucXa;
            entity.LuongNuocThatThoat = updateNrwDma.LuongNuocThatThoat;

            entity.TyLeThatThoatKyTruoc = updateNrwDma.TyLeThatThoatKyTruoc;
            entity.TyLeThatThoat = updateNrwDma.TyLeThatThoat;

            entity.NguyenNhan = updateNrwDma.NguyenNhan;
            entity.GhiChu = updateNrwDma.GhiChu;

            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateNrwDma.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDmaNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<NrwDma_ResponeModel>> Delete(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "delete", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.Nrwdmas.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.Nrwdmas.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDmaNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public NrwDma_ResponeModel Post(Add_NrwDma_Model addNrwDma)
        //{
        //    //Map request -> Entity
        //    var nrwDma = new Nrwdma()
        //    {
        //        MaDma = addNrwDma.MaDma,
        //        Ky = addNrwDma.Ky,
        //        Nam = addNrwDma.Nam,

        //        LuongNuocVao = addNrwDma.LuongNuocVao,
        //        LuongNuocTieuThu = addNrwDma.LuongNuocTieuThu,
        //        LuongNuocSucXa = addNrwDma.LuongNuocThatThoat,
        //        LuongNuocThatThoat = addNrwDma.LuongNuocThatThoat,

        //        TyLeThatThoatKyTruoc = addNrwDma.TyLeThatThoatKyTruoc,
        //        TyLeThatThoat = addNrwDma.TyLeThatThoat,

        //        NguyenNhan = addNrwDma.NguyenNhan,
        //        GhiChu = addNrwDma.GhiChu,

        //        NgayTao = addNrwDma.NgayTao,
        //        NguoiTao = addNrwDma.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.Nrwdmas.Add(nrwDma);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new NrwDma_ResponeModel()
        //    {
        //        Id = nrwDma.Id,
        //        MaDma = nrwDma.MaDma,
        //        Ky = nrwDma.Ky,
        //        Nam = nrwDma.Nam,

        //        LuongNuocVao = nrwDma.LuongNuocVao,
        //        LuongNuocTieuThu = nrwDma.LuongNuocTieuThu,
        //        LuongNuocSucXa = nrwDma.LuongNuocSucXa,
        //        LuongNuocThatThoat = nrwDma.LuongNuocThatThoat,

        //        TyLeThatThoatKyTruoc = nrwDma.TyLeThatThoatKyTruoc,
        //        TyLeThatThoat = nrwDma.TyLeThatThoat,

        //        NguyenNhan = nrwDma.NguyenNhan,
        //        GhiChu = nrwDma.GhiChu,

        //        NgayTao = nrwDma.NgayTao,
        //        NguoiTao = nrwDma.NguoiTao,
        //        NgayCapNhat = nrwDma.NgayCapNhat,
        //        NguoiCapNhat = nrwDma.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public NrwDma_ResponeModel Update(int id, Update_NrwDma_Model updateNrwDma)
        //{
        //    // Lấy entity từ DB
        //    var nrwDma = _context.Nrwdmas.FirstOrDefault(e => e.Id == id);

        //    if (nrwDma == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    nrwDma.MaDma = updateNrwDma.MaDma;
        //    nrwDma.Ky = updateNrwDma.Ky;
        //    nrwDma.Nam = updateNrwDma.Nam;

        //    nrwDma.LuongNuocVao = updateNrwDma.LuongNuocVao;
        //    nrwDma.LuongNuocTieuThu = updateNrwDma.LuongNuocTieuThu;
        //    nrwDma.LuongNuocSucXa = updateNrwDma.LuongNuocSucXa;
        //    nrwDma.LuongNuocThatThoat = updateNrwDma.LuongNuocThatThoat;

        //    nrwDma.TyLeThatThoatKyTruoc = updateNrwDma.TyLeThatThoatKyTruoc;
        //    nrwDma.TyLeThatThoat = updateNrwDma.TyLeThatThoat;

        //    nrwDma.NguyenNhan = updateNrwDma.NguyenNhan;
        //    nrwDma.GhiChu = updateNrwDma.GhiChu;

        //    nrwDma.NgayCapNhat = DateTime.Now;
        //    nrwDma.NguoiCapNhat = updateNrwDma.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new NrwDma_ResponeModel
        //    {
        //        Id = nrwDma.Id,
        //        MaDma = nrwDma.MaDma,
        //        Ky = nrwDma.Ky,
        //        Nam = nrwDma.Nam,

        //        LuongNuocVao = nrwDma.LuongNuocVao,
        //        LuongNuocTieuThu = nrwDma.LuongNuocTieuThu,
        //        LuongNuocSucXa = nrwDma.LuongNuocSucXa,
        //        LuongNuocThatThoat = nrwDma.LuongNuocThatThoat,

        //        TyLeThatThoatKyTruoc = nrwDma.TyLeThatThoatKyTruoc,
        //        TyLeThatThoat = nrwDma.TyLeThatThoat,

        //        NguyenNhan = nrwDma.NguyenNhan,
        //        GhiChu = nrwDma.GhiChu,

        //        NgayTao = nrwDma.NgayTao,
        //        NguoiTao = nrwDma.NguoiTao,
        //        NgayCapNhat = nrwDma.NgayCapNhat,
        //        NguoiCapNhat = nrwDma.NguoiCapNhat,
        //    };
        //}
    }
}
