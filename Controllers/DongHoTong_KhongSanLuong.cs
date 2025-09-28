using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DongHoTong;
using WebAPI_NRW.ResponeModel.DongHoTong;
using WebAPI_NRW.Services;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class DongHoTong_KhongSanLuong : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public DongHoTong_KhongSanLuong(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "donghotong";
        }
               
        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<DongHoTong_ResponeModel>> Update(int id, Update_DongHoTong_KhongSanLuong_Model updateDongHoTong)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.DongHoTongs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            entity.Ma = updateDongHoTong.Ma;
            entity.Ten = updateDongHoTong.Ten;
            //entity.SanLuong = updateDongHoTong.SanLuong;
            //entity.NgayChinhSua = updateDongHoTong.NgayChinhSua;
            //entity.NguoiChinhSua = updateDongHoTong.NguoiChinhSua;
            entity.DanhDauLoi = updateDongHoTong.DanhDauLoi;
            entity.GhiChu = updateDongHoTong.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateDongHoTong.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }
    }
}
