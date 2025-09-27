using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DongHoTong;
using WebAPI_NRW.ResponeModel.DongHoTong;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class DongHoTong_KhongSanLuong : ControllerBase
    {
        private readonly DbNrwContext _context;

        public DongHoTong_KhongSanLuong(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }
               
        /// API Update
        [HttpPut("{id}")]
        public ActionResult<DongHoTong_ResponeModel> Update(int id, Update_DongHoTong_KhongSanLuong_Model updateDongHoTong)
        {
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
