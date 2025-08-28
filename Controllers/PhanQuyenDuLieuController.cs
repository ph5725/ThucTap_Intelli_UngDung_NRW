using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.PhanQuyen;
using WebAPI_NRW.ResponeModel.PhanQuyen;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PhanQuyenDuLieuController
    {
        private readonly DbNrwContext _context;

        public PhanQuyenDuLieuController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<PhanQuyenDuLieu_ResponeModel> Get()
        {
            //Linq Query
            var query = from phanQuyenDuLieu in _context.PhanQuyenDuLieus
                        select new PhanQuyenDuLieu_ResponeModel
                        {
                            Id = phanQuyenDuLieu.Id,
                            NhomNguoiDung = phanQuyenDuLieu.NhomNguoiDung,
                            DuLieuNrwcongTy = phanQuyenDuLieu.DuLieuNrwcongTy,
                            DuLieuNrwdma = phanQuyenDuLieu.DuLieuNrwdma,
                        };
            return query.ToList();
        }

        /// API Add
        [HttpPost]
        public PhanQuyenDuLieu_ResponeModel Post(Add_PhanQuyenDuLieu_Model addPhanQuyenDuLieu)
        {
            //Map request -> Entity
            var phanQuyenDuLieu = new PhanQuyenDuLieu()
            {
                NhomNguoiDung = addPhanQuyenDuLieu.NhomNguoiDung,
                DuLieuNrwcongTy = addPhanQuyenDuLieu.DuLieuNrwcongTy,
                DuLieuNrwdma = addPhanQuyenDuLieu.DuLieuNrwdma,
            };

            //Lưu vào DB
            _context.PhanQuyenDuLieus.Add(phanQuyenDuLieu);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new PhanQuyenDuLieu_ResponeModel()
            {
                Id = phanQuyenDuLieu.Id,
                NhomNguoiDung = phanQuyenDuLieu.NhomNguoiDung,
                DuLieuNrwcongTy = phanQuyenDuLieu.DuLieuNrwcongTy,
                DuLieuNrwdma = phanQuyenDuLieu.DuLieuNrwdma,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public PhanQuyenDuLieu_ResponeModel Update(int id, Update_PhanQuyenDuLieu_Model updatePhanQuyenDuLieu)
        {
            // Lấy entity từ DB
            var phanQuyenDuLieu = _context.PhanQuyenDuLieus.FirstOrDefault(e => e.Id == id);

            if (phanQuyenDuLieu == null) return null;

            // Gán dữ liệu từ request vào entity
            phanQuyenDuLieu.NhomNguoiDung = updatePhanQuyenDuLieu.NhomNguoiDung;
            phanQuyenDuLieu.DuLieuNrwcongTy = updatePhanQuyenDuLieu.DuLieuNrwcongTy;
            phanQuyenDuLieu.DuLieuNrwdma = updatePhanQuyenDuLieu.DuLieuNrwdma;

            _context.SaveChanges();

            // Map entity -> response model
            return new PhanQuyenDuLieu_ResponeModel
            {
                Id = phanQuyenDuLieu.Id,
                NhomNguoiDung = phanQuyenDuLieu.NhomNguoiDung,
                DuLieuNrwcongTy = phanQuyenDuLieu.DuLieuNrwcongTy,
                DuLieuNrwdma = phanQuyenDuLieu.DuLieuNrwdma,
            };
        }

        /// API Delete
        [HttpDelete]
        public PhanQuyenDuLieu_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var phanQuyenDuLieu = _context.PhanQuyenDuLieus.FirstOrDefault(e => e.Id == id);

            if (phanQuyenDuLieu == null) return null;

            // Xóa
            _context.PhanQuyenDuLieus.Remove(phanQuyenDuLieu);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new PhanQuyenDuLieu_ResponeModel
            {
                Id = phanQuyenDuLieu.Id,
                NhomNguoiDung = phanQuyenDuLieu.NhomNguoiDung,
                DuLieuNrwcongTy = phanQuyenDuLieu.DuLieuNrwcongTy,
                DuLieuNrwdma = phanQuyenDuLieu.DuLieuNrwdma,
            };
        }
    }
}
