using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Helpers;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.TaiKhoan;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DoiMatKhauController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public DoiMatKhauController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// <summary>
        /// API Đổi mật khẩu
        /// </summary>
        [HttpPut("{tenNguoiDung}")]
        public IActionResult ChangePassword(string tenNguoiDung, [FromBody] DoiMatKhau_RequestModel request)
        {
            // 1. Tìm user
            var user = _context.NguoiDungs.FirstOrDefault(nguoiDung => nguoiDung.TenNguoiDung == tenNguoiDung);
            if (user == null)
                return NotFound(new { message = "Không tìm thấy người dùng" });

            // 2. Kiểm tra mật khẩu cũ (hash trước khi so sánh)
            var hashedOld = PasswordHelper.HashPassword(request.MatKhauCu);
            if (user.MatKhau != hashedOld)
                return BadRequest(new { message = "Mật khẩu cũ không đúng" });

            // 3. Cập nhật mật khẩu mới (hash trước khi lưu)
            var hashedNew = PasswordHelper.HashPassword(request.MatKhauMoi);
            if (hashedNew == user.MatKhau)
                return BadRequest(new { message = "Mật khẩu mới không được trùng với mật khẩu trước đó" });
            else
                user.MatKhau = PasswordHelper.HashPassword(request.MatKhauMoi);
            _context.SaveChanges();

            return Ok(new { message = "Đổi mật khẩu thành công" });
        }
    }
}
