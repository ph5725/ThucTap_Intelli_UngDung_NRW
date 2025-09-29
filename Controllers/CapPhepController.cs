using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.NguoiDung;
using WebAPI_NRW.ResponeModel.NguoiDung;
using WebAPI_NRW.Services;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class CapPhepController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly IPermissionService _permissionService;
        private readonly string _feature;

        public CapPhepController(DbNrwContext dbcontext, IPermissionService permissionService)
        {
            _context = dbcontext;
            _permissionService = permissionService;
            _feature = "nguoidung";
        }

        /// API Update
        [HttpPut("{id}")]
        public async Task<ActionResult<NguoiDung_ResponeModel>> Update(int id, Update_CapPhepNguoiDung_Model updateCapPhepNguoiDung)
        {
            // Kiểm tra quyền tính năng
            if (!await PermissionHelper.HasFeaturePermission(User, _feature, "edit", _permissionService))
                return StatusCode(403, new { message = "Bạn không có quyền truy cập tính năng này." }); // 403

            var entity = _context.NguoiDungs.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.CapPhep = updateCapPhepNguoiDung.CapPhep;

            _context.SaveChanges();

            return Ok(entity.MapToResponse());
        }
    }
}
