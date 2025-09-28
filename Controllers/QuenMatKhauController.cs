using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Helpers;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.TaiKhoan;
using WebAPI_NRW.Services;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class QuenMatKhauController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public QuenMatKhauController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "nguoidung";
        }

        /// <summary>
        /// API Quên mật khẩu - reset về mặc định 123456
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> ResetPassword([FromBody] QuenMatKhau_RequestModel request)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            if (string.IsNullOrEmpty(request.TenNguoiDung))
                return BadRequest(new { message = "Thiếu tên người dùng" });

            // 1. Tìm user
            var user = _context.NguoiDungs
                .FirstOrDefault(nguoiDung => nguoiDung.TenNguoiDung == request.TenNguoiDung);

            if (user == null)
                return NotFound(new { message = "Không tìm thấy người dùng" });

            // 2. Cập nhật mật khẩu về mặc định 123456 (hash trước khi lưu)
            var defaultPassword = PasswordHelper.HashPassword("123456");
            user.MatKhau = defaultPassword;
            _context.SaveChanges();

            return Ok(new { message = "Mật khẩu đã được reset về mặc định" });
        }
    }
}
