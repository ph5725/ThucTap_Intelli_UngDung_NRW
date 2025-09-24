using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using WebAPI_NRW.Helpers;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.TaiKhoan;
using WebAPI_NRW.ResponeModel.TaiKhoan;
using static WebAPI_NRW.ResponeModel.TaiKhoan.DangNhapDto;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DbNrwContext _context;
        private readonly JwtHelper _jwtHelper;

        public AuthController(DbNrwContext context, JwtHelper jwtHelper)
        {
            _context = context;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] DangNhap_RequestModel request)
        {
            //// 1. Kiểm tra user
            //var nguoiDung = _context.NguoiDungs
            //    .FirstOrDefault(x => x.TenNguoiDung == request.NguoiDung.TenNguoiDung);

            //if (nguoiDung == null || !PasswordHelper.VerifyPassword(request.NguoiDung.MatKhau, nguoiDung.MatKhau))
            //    return Unauthorized("Sai tên người dùng hoặc mật khẩu");

            // 1. Tìm user
            var nguoiDung = _context.NguoiDungs.FirstOrDefault(nguoiDung => nguoiDung.TenNguoiDung == request.TenNguoiDung);
            if (nguoiDung == null)
                return NotFound(new { message = "Không tìm thấy người dùng" });

            // 2. Kiểm tra mật khẩu
            //var hashedPassword = PasswordHelper.HashPassword(request.MatKhau);
            //if (nguoiDung.MatKhau != hashedPassword)
            //    return BadRequest(new { message = "Mật khẩu không đúng" });

            // 2. Kiểm tra mật khẩu (dùng VerifyPassword)
            if (!PasswordHelper.VerifyPassword(request.MatKhau, nguoiDung.MatKhau))
                return BadRequest(new { message = "Mật khẩu không đúng" });

            // 3. Kiểm tra tài khoản có được hoạt động không (cột CapPhep trong bảng NguoiDung)
            if (!nguoiDung.CapPhep)
                return BadRequest(new { message = "Tài khoản đã bị khóa" });

            // 4. Lấy role từ DB (cột VaiTro trong bảng NguoiDung)
            var vaiTro = nguoiDung.VaiTro ?? "Nguoi dung"; // nếu null thì default là user

            // 5. Tìm nhóm người dùng mà user này thuộc về
            var nhomNguoiDung = _context.NhomNguoiDungs
                .AsEnumerable() // chuyển sang LINQ to Objects
                .FirstOrDefault(nhomNguoiDung =>
                    !string.IsNullOrEmpty(nhomNguoiDung.ThanhVien) &&
                    nhomNguoiDung.ThanhVien.Split(',').Any(thanhVien => thanhVien.Trim() == nguoiDung.TenNguoiDung));
            if (nhomNguoiDung == null)
                return BadRequest(new { message = "Người dùng chưa được phân nhóm để sử dụng" });

            // 6. Lấy phân quyền theo nhóm
            var phanQuyenDuLieu = _context.PhanQuyenDuLieus
                .FirstOrDefault(p => p.NhomNguoiDung == nhomNguoiDung.Id);
            if (phanQuyenDuLieu == null)
                return BadRequest(new { message = "Người dùng chưa được phân quyền để dùng các dữ liệu" });

            var phanQuyenTinhNang = _context.PhanQuyenTinhNangs
                .FirstOrDefault(p => p.NhomNguoiDung == nhomNguoiDung.Id);
            if (phanQuyenTinhNang == null)
                return BadRequest(new { message = "Người dùng chưa được phân quyền để dùng các tính năng" });

            // 7. Tạo token (truyền tên người dùng, vai trò, id)
            var token = _jwtHelper.GenerateToken(nguoiDung.TenNguoiDung, vaiTro, nguoiDung.Id, nhomNguoiDung.Id);
            var expiresIn = 3600; // ví dụ 1h

            // 8. Map sang DTO
            var response = nguoiDung.MapToLoginResponse(
                token,
                expiresIn,
                nhomNguoiDung,
                phanQuyenDuLieu,
                phanQuyenTinhNang
            );

            return Ok(response);
        }
    }
}
