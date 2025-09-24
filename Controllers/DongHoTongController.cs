using Azure.Messaging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models;
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
    [Route("[controller]")]
    public class DongHoTongController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public DongHoTongController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "donghotong";
        }

        /// API Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DongHoTong_ResponeModel>>> Get()
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var list = _context.DongHoTongs
                .Include(dongHoTong => dongHoTong.NguoiChinhSuaNavigation)
                .Include(dongHoTong => dongHoTong.NguoiTaoNavigation)
                .Include(dongHoTong => dongHoTong.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }


        /// API Get by id
        [HttpGet("{id}")]
        public async Task<ActionResult<DongHoTong_ResponeModel>> GetById(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "view", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.DongHoTongs
                .Include(dongHoTong => dongHoTong.NguoiChinhSuaNavigation)
                .Include(dongHoTong => dongHoTong.NguoiTaoNavigation)
                .Include(dongHoTong => dongHoTong.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(dongHoTong => dongHoTong.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public async Task<ActionResult<DongHoTong_ResponeModel>> Post(Add_DongHoTong_Model addDongHoTong)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "add", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = new DongHoTong
            {
                Ma = addDongHoTong.Ma,
                Ten = addDongHoTong.Ten,
                SanLuong = addDongHoTong.SanLuong,
                NgayGhi = addDongHoTong.NgayGhi,
                DanhDauLoi = addDongHoTong.DanhDauLoi,
                GhiChu = addDongHoTong.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = addDongHoTong.NguoiTao,
            };

            _context.DongHoTongs.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiChinhSuaNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<DongHoTong_ResponeModel>> Update(int id, Update_DongHoTong_Model updateDongHoTong)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.DongHoTongs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            entity.Ma = updateDongHoTong.Ma;
            entity.Ten = updateDongHoTong.Ten;
            entity.SanLuong = updateDongHoTong.SanLuong;
            entity.NgayChinhSua = updateDongHoTong.NgayChinhSua;
            entity.NguoiChinhSua = updateDongHoTong.NguoiChinhSua;
            entity.DanhDauLoi = updateDongHoTong.DanhDauLoi;
            entity.GhiChu = updateDongHoTong.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateDongHoTong.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiChinhSuaNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public async Task<ActionResult<DongHoTong_ResponeModel>> Delete(int id)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "delete", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.DongHoTongs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.DongHoTongs.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiChinhSuaNavigation).Load();

            return Ok(entity.MapToResponse());
        }
        ///// API Add
        //[HttpPost]
        //public DongHoTong_ResponeModel Post(Add_DongHoTong_Model addDongHoTong)
        //{
        //    //Map request -> Entity
        //    var dongHoTong = new DongHoTong()
        //    {
        //        Ma = addDongHoTong.Ma,
        //        Ten = addDongHoTong.Ten,
        //        SanLuong = addDongHoTong.SanLuong,
        //        NgayGhi = addDongHoTong.NgayGhi,
        //        DanhDauLoi = addDongHoTong.DanhDauLoi,
        //        GhiChu = addDongHoTong.GhiChu,
        //        NgayTao = DateTime.Now,
        //        NguoiTao = addDongHoTong.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.DongHoTongs.Add(dongHoTong);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new DongHoTong_ResponeModel()
        //    {
        //        Id = dongHoTong.Id,
        //        Ma = dongHoTong.Ma,
        //        Ten = dongHoTong.Ten,
        //        SanLuong = dongHoTong.SanLuong,
        //        NgayGhi = dongHoTong.NgayGhi,
        //        NgayChinhSua = dongHoTong.NgayChinhSua,
        //        NguoiChinhSua = dongHoTong.NguoiChinhSua,
        //        DanhDauLoi = dongHoTong.DanhDauLoi,
        //        GhiChu = dongHoTong.GhiChu,
        //        NgayTao = dongHoTong.NgayTao,
        //        NguoiTao = dongHoTong.NguoiTao,
        //        NgayCapNhat = dongHoTong.NgayCapNhat,
        //        NguoiCapNhat = dongHoTong.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public DongHoTong_ResponeModel Update(int id, Update_DongHoTong_Model updateDongHoTong)
        //{
        //    using var transaction = _context.Database.BeginTransaction();

        //    try
        //    {
        //        // Lấy entity từ DB
        //        var dongHoTong = _context.DongHoTongs.FirstOrDefault(e => e.Id == id);
        //        if (dongHoTong == null) return null;

        //        //var oldMa = dongHoTong.Ma;
        //        //var newMa = updateDongHoTong.Ma;

        //        //// Nếu Ma thay đổi, cập nhật tất cả bảng liên quan
        //        //if (oldMa != newMa)
        //        //{
        //        //    // Ví dụ bảng DongHoChiTiet có FK MaDongHoTong
        //        //    var cauHinhDhts = _context.CauHinhDhts
        //        //                           .Where(e => e.MaDongHo == oldMa)
        //        //                           .ToList();

        //        //    foreach (var maDongHo in cauHinhDhts)
        //        //    {
        //        //        maDongHo.MaDongHo = newMa;
        //        //    }
        //        //}

        //        // Gán dữ liệu từ request vào entity
        //        dongHoTong.Ma = updateDongHoTong.Ma;
        //        dongHoTong.Ten = updateDongHoTong.Ten;
        //        dongHoTong.SanLuong = updateDongHoTong.SanLuong;
        //        dongHoTong.NgayChinhSua = updateDongHoTong.NgayChinhSua;
        //        dongHoTong.NguoiChinhSua = updateDongHoTong.NguoiChinhSua;
        //        dongHoTong.DanhDauLoi = updateDongHoTong.DanhDauLoi;
        //        dongHoTong.GhiChu = updateDongHoTong.GhiChu;
        //        dongHoTong.NgayCapNhat = DateTime.Now;
        //        dongHoTong.NguoiCapNhat = updateDongHoTong.NguoiCapNhat;

        //        _context.SaveChanges();
        //        transaction.Commit();

        //        // Map entity -> response model
        //        return new DongHoTong_ResponeModel
        //        {
        //            Id = dongHoTong.Id,
        //            Ma = dongHoTong.Ma,
        //            Ten = dongHoTong.Ten,
        //            SanLuong = dongHoTong.SanLuong,
        //            NgayGhi = dongHoTong.NgayGhi,
        //            NgayChinhSua = dongHoTong.NgayChinhSua,
        //            NguoiChinhSua = dongHoTong.NguoiChinhSua,
        //            DanhDauLoi = dongHoTong.DanhDauLoi,
        //            GhiChu = dongHoTong.GhiChu,
        //            NgayTao = dongHoTong.NgayTao,
        //            NguoiTao = dongHoTong.NguoiTao,
        //            NgayCapNhat = dongHoTong.NgayCapNhat,
        //            NguoiCapNhat = dongHoTong.NguoiCapNhat,
        //        };
        //    }
        //    catch (DbUpdateException ex)
        //    {
        //        // InnerException thường chứa thông báo SQL Server
        //        var sqlEx = ex.InnerException?.Message;

        //        // Bạn có thể log ra để biết constraint nào bị vi phạm
        //        Console.WriteLine("Lỗi database: " + sqlEx);

        //        // Ví dụ: báo cho client
        //        throw new Exception("Không thể cập nhật vì dữ liệu đang được tham chiếu tại: " + sqlEx);
        //    }
        //}
    }
}
