
using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.DanhSach;
using WebAPI_NRW.ResponeModel.DanhSach;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DSDMAController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public DSDMAController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<DSDMA_ResponeModel> Get()
        {
            //Linq Query
            var query = from dsDma in _context.Dsdmas
                        select new DSDMA_ResponeModel
                        {
                            Id = dsDma.Id,
                            MaDma = dsDma.MaDma,
                            TenDma = dsDma.TenDma,
                            SoLuongKhachHang = dsDma.SoLuongKhachHang,
                            TinhTrang = dsDma.TinhTrang,
                            NgayVanHanh = dsDma.NgayVanHanh,
                            TyLeNrwbanDau = dsDma.TyLeNrwbanDau,
                            GhiChu = dsDma.GhiChu,
                            NgayTao = dsDma.NgayTao,
                            NguoiTao = dsDma.NguoiTao,
                            NgayCapNhat = dsDma.NgayCapNhat,
                            NguoiCapNhat = dsDma.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<DSDMA_ResponeModel> GetById(int id)
        {
            var dsDma = _context.Dsdmas.FirstOrDefault(e => e.Id == id);
            
            if(dsDma ==  null)
            {
                return NotFound();
            }

            //Map Entity -> ResponseModel để trả về
            var response = new DSDMA_ResponeModel()
            {
                Id = dsDma.Id,
                MaDma = dsDma.MaDma,
                TenDma = dsDma.TenDma,
                SoLuongKhachHang = dsDma.SoLuongKhachHang,
                TinhTrang = dsDma.TinhTrang,
                NgayVanHanh = dsDma.NgayVanHanh,
                TyLeNrwbanDau = dsDma.TyLeNrwbanDau,
                GhiChu = dsDma.GhiChu,
                NgayTao = dsDma.NgayTao,
                NguoiTao = dsDma.NguoiTao,
                NgayCapNhat = dsDma.NgayCapNhat,
                NguoiCapNhat = dsDma.NguoiCapNhat,
            };

            return response;
        }

        /// API Add
        [HttpPost]
        public DSDMA_ResponeModel Post(Add_DSDMA_Model adddsDma)
        {
            //Map request -> Entity
            var dsDma = new Dsdma()
            {
                MaDma = adddsDma.MaDma,
                TenDma = adddsDma.TenDma,
                SoLuongKhachHang = adddsDma.SoLuongKhachHang,
                TinhTrang = adddsDma.TinhTrang,
                NgayVanHanh = adddsDma.NgayVanHanh,
                TyLeNrwbanDau = adddsDma.TyLeNrwbanDau,
                GhiChu = adddsDma.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = adddsDma.NguoiTao,
            };

            //Lưu vào DB
            _context.Dsdmas.Add(dsDma);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new DSDMA_ResponeModel()
            {
                Id = dsDma.Id,
                MaDma = dsDma.MaDma,
                TenDma = dsDma.TenDma,
                SoLuongKhachHang = dsDma.SoLuongKhachHang,
                TinhTrang = dsDma.TinhTrang,
                NgayVanHanh = dsDma.NgayVanHanh,
                TyLeNrwbanDau = dsDma.TyLeNrwbanDau,
                GhiChu = dsDma.GhiChu,
                NgayTao = dsDma.NgayTao,
                NguoiTao = dsDma.NguoiTao,
                NgayCapNhat = dsDma.NgayCapNhat,
                NguoiCapNhat = dsDma.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public DSDMA_ResponeModel Update(int id, Update_DSDMA_Model updatedsDma)
        {
            // Lấy entity từ DB
            var dsDma = _context.Dsdmas.FirstOrDefault(e => e.Id == id);

            if (dsDma == null) return null;

            // Gán dữ liệu từ request vào entity
            dsDma.MaDma = updatedsDma.MaDma;
            dsDma.TenDma = updatedsDma.TenDma;
            dsDma.SoLuongKhachHang = updatedsDma.SoLuongKhachHang;
            dsDma.TinhTrang = updatedsDma.TinhTrang;
            dsDma.NgayVanHanh = updatedsDma.NgayVanHanh;
            dsDma.TyLeNrwbanDau = updatedsDma.TyLeNrwbanDau;
            dsDma.GhiChu = updatedsDma.GhiChu;
            dsDma.NgayCapNhat = DateTime.Now;
            dsDma.NguoiCapNhat = updatedsDma.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new DSDMA_ResponeModel
            {
                Id = dsDma.Id,
                MaDma = dsDma.MaDma,
                TenDma = dsDma.TenDma,
                SoLuongKhachHang = dsDma.SoLuongKhachHang,
                TinhTrang = dsDma.TinhTrang,
                NgayVanHanh = dsDma.NgayVanHanh,
                TyLeNrwbanDau = dsDma.TyLeNrwbanDau,
                GhiChu = dsDma.GhiChu,
                NgayTao = dsDma.NgayTao,
                NguoiTao = dsDma.NguoiTao,
                NgayCapNhat = dsDma.NgayCapNhat,
                NguoiCapNhat = dsDma.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public DSDMA_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var dsDma = _context.Dsdmas.FirstOrDefault(e => e.Id == id);

            if (dsDma == null) return null;

            // Xóa
            _context.Dsdmas.Remove(dsDma);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new DSDMA_ResponeModel
            {
                Id = dsDma.Id,
                MaDma = dsDma.MaDma,
                TenDma = dsDma.TenDma,
                SoLuongKhachHang = dsDma.SoLuongKhachHang,
                TinhTrang = dsDma.TinhTrang,
                NgayVanHanh = dsDma.NgayVanHanh,
                TyLeNrwbanDau = dsDma.TyLeNrwbanDau,
                GhiChu = dsDma.GhiChu,
                NgayTao = dsDma.NgayTao,
                NguoiTao = dsDma.NguoiTao,
                NgayCapNhat = dsDma.NgayCapNhat,
                NguoiCapNhat = dsDma.NguoiCapNhat,
            };
        }
    }
}