
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using System.Security.Cryptography;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DanhSach;
using WebAPI_NRW.ResponeModel.DanhSach;
using WebAPI_NRW.Services;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DsDmaController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public DsDmaController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "dsdma";
        }

        /// API Get
        //[HttpGet]
        //public IEnumerable<DsDma_ResponeModel> Get()
        //{
        //    //Linq Query
        //    var query = from dsDma in _context.Dsdmas
        //                select new DsDma_ResponeModel
        //                {
        //                    Id = dsDma.Id,
        //                    MaDma = dsDma.MaDma,
        //                    TenDma = dsDma.TenDma,
        //                    SoLuongKhachHang = dsDma.SoLuongKhachHang,
        //                    TinhTrang = dsDma.TinhTrang,
        //                    NgayVanHanh = dsDma.NgayVanHanh,
        //                    TyLeNrwbanDau = dsDma.TyLeNrwbanDau,
        //                    GhiChu = dsDma.GhiChu,
        //                    NgayTao = dsDma.NgayTao,
        //                    NguoiTao = dsDma.NguoiTao,
        //                    NgayCapNhat = dsDma.NgayCapNhat,
        //                    NguoiCapNhat = dsDma.NguoiCapNhat,
        //                };
        //    return query.ToList();
        //}

        /// API Get by id
        //[HttpGet("{id}")]
        //public ActionResult<DsDma_ResponeModel> GetById(int id)
        //{
        //    var dsDma = _context.Dsdmas.FirstOrDefault(e => e.Id == id);

        //    if(dsDma ==  null)
        //    {
        //        return NotFound();
        //    }

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new DsDma_ResponeModel()
        //    {
        //        Id = dsDma.Id,
        //        MaDma = dsDma.MaDma,
        //        TenDma = dsDma.TenDma,
        //        SoLuongKhachHang = dsDma.SoLuongKhachHang,
        //        TinhTrang = dsDma.TinhTrang,
        //        NgayVanHanh = dsDma.NgayVanHanh,
        //        TyLeNrwbanDau = dsDma.TyLeNrwbanDau,
        //        GhiChu = dsDma.GhiChu,
        //        NgayTao = dsDma.NgayTao,
        //        NguoiTao = dsDma.NguoiTao,
        //        NgayCapNhat = dsDma.NgayCapNhat,
        //        NguoiCapNhat = dsDma.NguoiCapNhat,
        //    };

        //    return response;
        //}

        /// API Add
        //[HttpPost]
        //public DsDma_ResponeModel Post(Add_DsDma_Model adddsDma)
        //{
        //    //Map request -> Entity
        //    var dsDma = new Dsdma()
        //    {
        //        MaDma = adddsDma.MaDma,
        //        TenDma = adddsDma.TenDma,
        //        SoLuongKhachHang = adddsDma.SoLuongKhachHang,
        //        TinhTrang = adddsDma.TinhTrang,
        //        NgayVanHanh = adddsDma.NgayVanHanh,
        //        TyLeNrwbanDau = adddsDma.TyLeNrwbanDau,
        //        GhiChu = adddsDma.GhiChu,
        //        NgayTao = DateTime.Now,
        //        NguoiTao = adddsDma.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.Dsdmas.Add(dsDma);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new DsDma_ResponeModel()
        //    {
        //        Id = dsDma.Id,
        //        MaDma = dsDma.MaDma,
        //        TenDma = dsDma.TenDma,
        //        SoLuongKhachHang = dsDma.SoLuongKhachHang,
        //        TinhTrang = dsDma.TinhTrang,
        //        NgayVanHanh = dsDma.NgayVanHanh,
        //        TyLeNrwbanDau = dsDma.TyLeNrwbanDau,
        //        GhiChu = dsDma.GhiChu,
        //        NgayTao = dsDma.NgayTao,
        //        NguoiTao = dsDma.NguoiTao,
        //        NgayCapNhat = dsDma.NgayCapNhat,
        //        NguoiCapNhat = dsDma.NguoiCapNhat,
        //    };

        //    return response;
        //}

        /// API Update
        //[HttpPut]
        //public DsDma_ResponeModel Update(int id, Update_DsDma_Model updatedsDma)
        //{
        //    // Lấy entity từ DB
        //    var dsDma = _context.Dsdmas.FirstOrDefault(e => e.Id == id);

        //    if (dsDma == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    dsDma.MaDma = updatedsDma.MaDma;
        //    dsDma.TenDma = updatedsDma.TenDma;
        //    dsDma.SoLuongKhachHang = updatedsDma.SoLuongKhachHang;
        //    dsDma.TinhTrang = updatedsDma.TinhTrang;
        //    dsDma.NgayVanHanh = updatedsDma.NgayVanHanh;
        //    dsDma.TyLeNrwbanDau = updatedsDma.TyLeNrwbanDau;
        //    dsDma.GhiChu = updatedsDma.GhiChu;
        //    dsDma.NgayCapNhat = DateTime.Now;
        //    dsDma.NguoiCapNhat = updatedsDma.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new DsDma_ResponeModel
        //    {
        //        Id = dsDma.Id,
        //        MaDma = dsDma.MaDma,
        //        TenDma = dsDma.TenDma,
        //        SoLuongKhachHang = dsDma.SoLuongKhachHang,
        //        TinhTrang = dsDma.TinhTrang,
        //        NgayVanHanh = dsDma.NgayVanHanh,
        //        TyLeNrwbanDau = dsDma.TyLeNrwbanDau,
        //        GhiChu = dsDma.GhiChu,
        //        NgayTao = dsDma.NgayTao,
        //        NguoiTao = dsDma.NguoiTao,
        //        NgayCapNhat = dsDma.NgayCapNhat,
        //        NguoiCapNhat = dsDma.NguoiCapNhat,
        //    };
        //}

        /// API Delete
        //[HttpDelete]
        //public DsDma_ResponeModel delete(int id)
        //{
        //    // Lấy entity từ DB
        //    var dsDma = _context.Dsdmas.FirstOrDefault(e => e.Id == id);

        //    if (dsDma == null) return null;

        //    // Xóa
        //    _context.Dsdmas.Remove(dsDma);
        //    _context.SaveChanges();

        //    // Map sang ResponseModel để trả về
        //    return new DsDma_ResponeModel
        //    {
        //        Id = dsDma.Id,
        //        MaDma = dsDma.MaDma,
        //        TenDma = dsDma.TenDma,
        //        SoLuongKhachHang = dsDma.SoLuongKhachHang,
        //        TinhTrang = dsDma.TinhTrang,
        //        NgayVanHanh = dsDma.NgayVanHanh,
        //        TyLeNrwbanDau = dsDma.TyLeNrwbanDau,
        //        GhiChu = dsDma.GhiChu,
        //        NgayTao = dsDma.NgayTao,
        //        NguoiTao = dsDma.NguoiTao,
        //        NgayCapNhat = dsDma.NgayCapNhat,
        //        NguoiCapNhat = dsDma.NguoiCapNhat,
        //    };
        //}

        /// API Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DsDma_ResponeModel>>> Get()
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var list = _context.Dsdmas
                .Include(dsDma => dsDma.NguoiTaoNavigation)
                .Include(dsDma => dsDma.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public async Task<ActionResult<DsDma_ResponeModel>> GetById(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.Dsdmas
                .Include(dsDma => dsDma.NguoiTaoNavigation)
                .Include(dsDma => dsDma.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(dsDma => dsDma.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public async Task<ActionResult<DsDma_ResponeModel>> Post(Add_DsDma_Model addDsDma)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "add", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = new Dsdma
            {
                MaDma = addDsDma.MaDma,
                TenDma = addDsDma.TenDma,
                SoLuongKhachHang = addDsDma.SoLuongKhachHang,
                TinhTrang = addDsDma.TinhTrang,
                NgayVanHanh = addDsDma.NgayVanHanh,
                TyLeNrwbanDau = addDsDma.TyLeNrwbanDau,
                GhiChu = addDsDma.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = addDsDma.NguoiTao,
            };

            _context.Dsdmas.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<DsDma_ResponeModel>> Update(int id, Update_DsDma_Model updateDsDma)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.Dsdmas.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            entity.MaDma = updateDsDma.MaDma;
            entity.TenDma = updateDsDma.TenDma;
            entity.SoLuongKhachHang = updateDsDma.SoLuongKhachHang;
            entity.TinhTrang = updateDsDma.TinhTrang;
            entity.NgayVanHanh = updateDsDma.NgayVanHanh;
            entity.TyLeNrwbanDau = updateDsDma.TyLeNrwbanDau;
            entity.GhiChu = updateDsDma.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateDsDma.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<DsDma_ResponeModel>> Delete(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "delete", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.Dsdmas.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.Dsdmas.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }
    }
}