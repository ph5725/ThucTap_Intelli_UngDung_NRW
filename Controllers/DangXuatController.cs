using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class DangXuatController : ControllerBase
    {
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Không cần xử lý gì thêm với JWT stateless
            return Ok(new { message = "Đăng xuất thành công, vui lòng xóa token phía client" });
        }
    }
}
