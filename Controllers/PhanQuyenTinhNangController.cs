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
    [Route("api/[controller]")]

    public class PhanQuyenTinhNangController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public PhanQuyenTinhNangController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "phanquyen";
        }

        /// API Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhanQuyenTinhNang_ResponeModel>>> Get()
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var list = _context.PhanQuyenTinhNangs
                .Include(phanQuyenTinhNang => phanQuyenTinhNang.NhomNguoiDungNavigation)
                .Include(phanQuyenTinhNang => phanQuyenTinhNang.NguoiTaoNavigation)
                .Include(phanQuyenTinhNang => phanQuyenTinhNang.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public async Task<ActionResult<PhanQuyenTinhNang_ResponeModel>> GetById(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.PhanQuyenTinhNangs
                .Include(phanQuyenTinhNang => phanQuyenTinhNang.NhomNguoiDungNavigation)
                .Include(phanQuyenTinhNang => phanQuyenTinhNang.NguoiTaoNavigation)
                .Include(phanQuyenTinhNang => phanQuyenTinhNang.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(phanQuyenTinhNang => phanQuyenTinhNang.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public async Task<ActionResult<PhanQuyenTinhNang_ResponeModel>> Post(Add_PhanQuyenTinhNang_Model addPhanQuyenTinhNang)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "add", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = new PhanQuyenTinhNang
            {
                NhomNguoiDung = addPhanQuyenTinhNang.NhomNguoiDung,

                DongHoTong = addPhanQuyenTinhNang.DongHoTong,
                CauHinhDht = addPhanQuyenTinhNang.CauHinhDht,

                Dsdma = addPhanQuyenTinhNang.Dsdma,
                NrwcongTy = addPhanQuyenTinhNang.NrwcongTy,
                Nrwdma = addPhanQuyenTinhNang.Nrwdma,
                DsngayDocSoBilling = addPhanQuyenTinhNang.DsngayDocSoBilling,

                NguoiDung = addPhanQuyenTinhNang.NguoiDung,
                NhomNguoiDungTinhNang = addPhanQuyenTinhNang.NhomNguoiDungTinhNang,
                NhatKySuDung = addPhanQuyenTinhNang.NhatKySuDung,
                PhanQuyen = addPhanQuyenTinhNang.PhanQuyen,

                NgayTao = addPhanQuyenTinhNang.NgayTao,
                NguoiTao = addPhanQuyenTinhNang.NguoiTao,
            };

            _context.PhanQuyenTinhNangs.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NhomNguoiDungNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<PhanQuyenTinhNang_ResponeModel>> Update(int id, Update_PhanQuyenTinhNang_Model updatePhanQuyenTinhNang)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.PhanQuyenTinhNangs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.NhomNguoiDung = updatePhanQuyenTinhNang.NhomNguoiDung;

            entity.DongHoTong = updatePhanQuyenTinhNang.DongHoTong;
            entity.CauHinhDht = updatePhanQuyenTinhNang.CauHinhDht;

            entity.Dsdma = updatePhanQuyenTinhNang.Dsdma;
            entity.NrwcongTy = updatePhanQuyenTinhNang.NrwcongTy;
            entity.Nrwdma = updatePhanQuyenTinhNang.Nrwdma;
            entity.DsngayDocSoBilling = updatePhanQuyenTinhNang.PhanQuyen;

            entity.NguoiDung = updatePhanQuyenTinhNang.NguoiDung;
            entity.NhomNguoiDungTinhNang = updatePhanQuyenTinhNang.NhomNguoiDungTinhNang;
            entity.NhatKySuDung = updatePhanQuyenTinhNang.NhatKySuDung;
            entity.PhanQuyen = updatePhanQuyenTinhNang.PhanQuyen;

            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updatePhanQuyenTinhNang.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NhomNguoiDungNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<PhanQuyenTinhNang_ResponeModel>> Delete(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "delete", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.PhanQuyenTinhNangs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.PhanQuyenTinhNangs.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NhomNguoiDungNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public PhanQuyenTinhNang_ResponeModel Post(Add_PhanQuyenTinhNang_Model addPhanQuyenTinhNang)
        //{
        //    //Map request -> Entity
        //    var phanQuyenTinhNang = new PhanQuyenTinhNang()
        //    {
        //        NhomNguoiDung = addPhanQuyenTinhNang.NhomNguoiDung,

        //        DongHoTong = addPhanQuyenTinhNang.DongHoTong,
        //        CauHinhDht = addPhanQuyenTinhNang.CauHinhDht,

        //        Dsdma = addPhanQuyenTinhNang.Dsdma,
        //        NrwcongTy = addPhanQuyenTinhNang.NrwcongTy,
        //        Nrwdma = addPhanQuyenTinhNang.Nrwdma,
        //        DsngayDocSoBilling = addPhanQuyenTinhNang.DsngayDocSoBilling,

        //        NguoiDung = addPhanQuyenTinhNang.NguoiDung,
        //        NhomNguoiDungTinhNang = addPhanQuyenTinhNang.NhomNguoiDung,
        //        NhatKySuDung = addPhanQuyenTinhNang.NhatKySuDung,
        //        PhanQuyen = addPhanQuyenTinhNang.PhanQuyen,

        //        NgayTao = addPhanQuyenTinhNang.NgayTao,
        //        NguoiTao = addPhanQuyenTinhNang.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.PhanQuyenTinhNangs.Add(phanQuyenTinhNang);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new PhanQuyenTinhNang_ResponeModel()
        //    {
        //        Id = phanQuyenTinhNang.Id,
        //        NhomNguoiDung = phanQuyenTinhNang.NhomNguoiDung,

        //        DongHoTong = phanQuyenTinhNang.DongHoTong,
        //        CauHinhDht = phanQuyenTinhNang.CauHinhDht,

        //        Dsdma = phanQuyenTinhNang.Dsdma,
        //        NrwcongTy = phanQuyenTinhNang.NrwcongTy,
        //        Nrwdma = phanQuyenTinhNang.Nrwdma,
        //        DsngayDocSoBilling = phanQuyenTinhNang.DsngayDocSoBilling,

        //        NguoiDung = phanQuyenTinhNang.NguoiDung,
        //        NhomNguoiDungTinhNang = phanQuyenTinhNang.NhomNguoiDungTinhNang,
        //        NhatKySuDung = phanQuyenTinhNang.NhatKySuDung,
        //        PhanQuyen = phanQuyenTinhNang.PhanQuyen,

        //        NgayTao = phanQuyenTinhNang.NgayTao,
        //        NguoiTao = phanQuyenTinhNang.NguoiTao,
        //        NgayCapNhat = phanQuyenTinhNang.NgayCapNhat,
        //        NguoiCapNhat = phanQuyenTinhNang.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public PhanQuyenTinhNang_ResponeModel Update(int id, Update_PhanQuyenTinhNang_Model updatePhanQuyenTinhNang)
        //{
        //    // Lấy entity từ DB
        //    var phanQuyenTinhNang = _context.PhanQuyenTinhNangs.FirstOrDefault(e => e.Id == id);

        //    if (phanQuyenTinhNang == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    phanQuyenTinhNang.NhomNguoiDung = updatePhanQuyenTinhNang.NhomNguoiDung;

        //    phanQuyenTinhNang.DongHoTong = updatePhanQuyenTinhNang.DongHoTong;
        //    phanQuyenTinhNang.CauHinhDht = updatePhanQuyenTinhNang.CauHinhDht;

        //    phanQuyenTinhNang.Dsdma = updatePhanQuyenTinhNang.Dsdma;
        //    phanQuyenTinhNang.NrwcongTy = updatePhanQuyenTinhNang.NrwcongTy;
        //    phanQuyenTinhNang.Nrwdma = updatePhanQuyenTinhNang.Nrwdma;
        //    phanQuyenTinhNang.DsngayDocSoBilling = updatePhanQuyenTinhNang.PhanQuyen;

        //    phanQuyenTinhNang.NguoiDung = updatePhanQuyenTinhNang.NguoiDung;
        //    phanQuyenTinhNang.NhomNguoiDungTinhNang = updatePhanQuyenTinhNang.NhomNguoiDungTinhNang;
        //    phanQuyenTinhNang.NhatKySuDung = updatePhanQuyenTinhNang.NhatKySuDung;
        //    phanQuyenTinhNang.PhanQuyen = updatePhanQuyenTinhNang.PhanQuyen;

        //    phanQuyenTinhNang.NgayCapNhat = DateTime.Now;
        //    phanQuyenTinhNang.NguoiCapNhat = updatePhanQuyenTinhNang.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new PhanQuyenTinhNang_ResponeModel
        //    {
        //        Id = phanQuyenTinhNang.Id,
        //        NhomNguoiDung = phanQuyenTinhNang.NhomNguoiDung,

        //        DongHoTong = phanQuyenTinhNang.DongHoTong,
        //        CauHinhDht = phanQuyenTinhNang.CauHinhDht,

        //        Dsdma = phanQuyenTinhNang.Dsdma,
        //        NrwcongTy = phanQuyenTinhNang.NrwcongTy,
        //        Nrwdma = phanQuyenTinhNang.Nrwdma,
        //        DsngayDocSoBilling = phanQuyenTinhNang.DsngayDocSoBilling,

        //        NguoiDung = phanQuyenTinhNang.NguoiDung,
        //        NhomNguoiDungTinhNang = phanQuyenTinhNang.NhomNguoiDungTinhNang,
        //        NhatKySuDung = phanQuyenTinhNang.NhatKySuDung,
        //        PhanQuyen = phanQuyenTinhNang.PhanQuyen,

        //        NgayTao = phanQuyenTinhNang.NgayTao,
        //        NguoiTao = phanQuyenTinhNang.NguoiTao,
        //        NgayCapNhat = phanQuyenTinhNang.NgayCapNhat,
        //        NguoiCapNhat = phanQuyenTinhNang.NguoiCapNhat,
        //    };
        //}
    }
}