using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.TaiKhoan;
using WebAPI_NRW.ResponeModel.TaiKhoan;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]


    public class DoiMatKhauController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public DoiMatKhauController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get by TenNguoiDung
        [HttpGet("{tenNguoiDung}")]
        public ActionResult<DoiMatKhauDto> GetById(string tenNguoiDung)
        {
            var matKhau = _context.NguoiDungs.FirstOrDefault(e => e.TenNguoiDung == tenNguoiDung);

            if (matKhau == null)
            {
                return NotFound();
            }

            //Map Entity -> ResponseModel để trả về
            var response = new DoiMatKhauDto()
            {
                TenNguoiDung = matKhau.TenNguoiDung,
                MatKhau = matKhau.MatKhau,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public DoiMatKhauDto Update(string tenNguoiDung, DoiMatKhau_RequestModel updateMatKhau)
        {
            // Lấy entity từ DB
            var matKhau = _context.NguoiDungs.FirstOrDefault(e => e.TenNguoiDung == tenNguoiDung);

            if (matKhau == null) return null;

            // Gán dữ liệu từ request vào entity
            //matKhau.TenNguoiDung = updateMatKhau.TenNguoiDung;
            matKhau.MatKhau = updateMatKhau.MatKhau;

            _context.SaveChanges();

            // Map entity -> response model
            return new DoiMatKhauDto
            {
                TenNguoiDung = matKhau.TenNguoiDung,
                MatKhau = matKhau.MatKhau
            };
        }
    }
}
