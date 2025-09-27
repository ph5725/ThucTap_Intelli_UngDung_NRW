using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DanhSach;
using WebAPI_NRW.RequestModel.DongHoTong;
using WebAPI_NRW.ResponeModel.DanhSach;
using WebAPI_NRW.ResponeModel.DongHoTong;
using WebAPI_NRW.Services;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class CauHinhDHTController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public CauHinhDHTController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "cauhinhdht";
        }

        /// API Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CauHinhDht_ResponeModel>>> Get()
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var list = _context.CauHinhDhts
                .Include(cauHinhDht => cauHinhDht.MaDongHoNavigation)
                .Include(cauHinhDht => cauHinhDht.NguoiTaoNavigation)
                .Include(cauHinhDht => cauHinhDht.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public async Task<ActionResult<CauHinhDht_ResponeModel>> GetById(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.CauHinhDhts
                .Include(cauHinhDht => cauHinhDht.MaDongHoNavigation)
                .Include(cauHinhDht => cauHinhDht.NguoiTaoNavigation)
                .Include(cauHinhDht => cauHinhDht.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(cauHinhDht => cauHinhDht.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public async Task<ActionResult<CauHinhDht_ResponeModel>> Post(Add_CauHinhDht_Model addCauHinhDht)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "add", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = new CauHinhDht
            {
                MaDoiTuong = addCauHinhDht.MaDoiTuong,
                MaDongHo = addCauHinhDht.MaDongHo,
                GhiChu = addCauHinhDht.GhiChu,
                NgayTao = addCauHinhDht.NgayTao,
                NguoiTao = addCauHinhDht.NguoiTao,
            };

            _context.CauHinhDhts.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDongHoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<CauHinhDht_ResponeModel>> Update(int id, Update_CauHinhDht_Model updateCauHinhDht)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.CauHinhDhts.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.MaDoiTuong = updateCauHinhDht.MaDoiTuong;
            entity.MaDongHo = updateCauHinhDht.MaDongHo;
            entity.GhiChu = updateCauHinhDht.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateCauHinhDht.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDongHoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<CauHinhDht_ResponeModel>> Delete(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "delete", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.CauHinhDhts.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.CauHinhDhts.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDongHoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public CauHinhDht_ResponeModel Post(Add_CauHinhDht_Model addCauHinhDHT)
        //{
        //    //Map request -> Entity
        //    var cauHinhDHT = new CauHinhDht()
        //    {
        //        MaDoiTuong = addCauHinhDHT.MaDoiTuong,
        //        MaDongHo = addCauHinhDHT.MaDoiTuong,
        //        GhiChu = addCauHinhDHT.GhiChu,
        //        NgayTao = addCauHinhDHT.NgayTao,
        //        NguoiTao = addCauHinhDHT.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.CauHinhDhts.Add(cauHinhDHT);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new CauHinhDht_ResponeModel()
        //    {
        //        Id = cauHinhDHT.Id,
        //        MaDoiTuong = cauHinhDHT.MaDoiTuong,
        //        MaDongHo = cauHinhDHT.MaDoiTuong,
        //        GhiChu = cauHinhDHT.GhiChu,
        //        NgayTao = cauHinhDHT.NgayTao,
        //        NguoiTao = cauHinhDHT.NguoiTao,
        //        NgayCapNhat = cauHinhDHT.NgayCapNhat,
        //        NguoiCapNhat = cauHinhDHT.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public CauHinhDht_ResponeModel Update(int id, Update_CauHinhDht_Model updateCauHinhDHT)
        //{
        //    var cauHinhDHT = _context.CauHinhDhts.FirstOrDefault(e => e.Id == id);

        //    if (cauHinhDHT == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    cauHinhDHT.MaDoiTuong = updateCauHinhDHT.MaDoiTuong;
        //    cauHinhDHT.MaDongHo = updateCauHinhDHT.MaDongHo;
        //    cauHinhDHT.GhiChu = updateCauHinhDHT.GhiChu;
        //    cauHinhDHT.NgayCapNhat = DateTime.Now;
        //    cauHinhDHT.NguoiCapNhat = updateCauHinhDHT.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new CauHinhDht_ResponeModel
        //    {
        //        Id = cauHinhDHT.Id,
        //        MaDoiTuong = cauHinhDHT.MaDoiTuong,
        //        MaDongHo = cauHinhDHT.MaDoiTuong,
        //        GhiChu = cauHinhDHT.GhiChu,
        //        NgayTao = cauHinhDHT.NgayTao,
        //        NguoiTao = cauHinhDHT.NguoiTao,
        //        NgayCapNhat = cauHinhDHT.NgayCapNhat,
        //        NguoiCapNhat = cauHinhDHT.NguoiCapNhat,
        //    };
        //}
    }
}