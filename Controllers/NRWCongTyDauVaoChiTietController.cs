using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.NrwCongTy;
using WebAPI_NRW.ResponeModel.NrwCongTy;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NRWCongTyDauVaoChiTietController
    {
        private readonly DbNrwContext _context;

        public NRWCongTyDauVaoChiTietController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<NRWCongTyDauVaoChiTiet_ResponeModel> Get()
        {
            //Linq Query
            var query = from nrwCongTyDauVaoChiTiet in _context.NrwcongTyDauVaoChiTiets
                        select new NRWCongTyDauVaoChiTiet_ResponeModel
                        {
                            Id = nrwCongTyDauVaoChiTiet.Id,
                            MaDauVao = nrwCongTyDauVaoChiTiet.MaDauVao,
                            Ky = nrwCongTyDauVaoChiTiet.Ky,
                            Nam = nrwCongTyDauVaoChiTiet.Nam,

                            Nguon = nrwCongTyDauVaoChiTiet.Nguon,
                            ToanTu = nrwCongTyDauVaoChiTiet.ToanTu,
                            ThuTuHienThi = nrwCongTyDauVaoChiTiet.ThuTuHienThi,

                            GhiChu = nrwCongTyDauVaoChiTiet.GhiChu,
                            NgayTao = nrwCongTyDauVaoChiTiet.NgayTao,
                            NguoiTao = nrwCongTyDauVaoChiTiet.NguoiTao,
                            NgayCapNhat = nrwCongTyDauVaoChiTiet.NgayCapNhat,
                            NguoiCapNhat = nrwCongTyDauVaoChiTiet.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Add
        [HttpPost]
        public NRWCongTyDauVaoChiTiet_ResponeModel Post(Add_NRWCongTyDauVaoChiTiet_Model addNrwCongTyDauVaoChiTiet)
        {
            //Map request -> Entity
            var nrwCongTyDauVaoChiTiet = new NrwcongTyDauVaoChiTiet()
            {
                MaDauVao = addNrwCongTyDauVaoChiTiet.MaDauVao,
                Ky = addNrwCongTyDauVaoChiTiet.Ky,
                Nam = addNrwCongTyDauVaoChiTiet.Nam,

                Nguon = addNrwCongTyDauVaoChiTiet.Nguon,
                ToanTu = addNrwCongTyDauVaoChiTiet.ToanTu,
                ThuTuHienThi = addNrwCongTyDauVaoChiTiet.ThuTuHienThi,

                GhiChu = addNrwCongTyDauVaoChiTiet.GhiChu,
                NgayTao = addNrwCongTyDauVaoChiTiet.NgayTao,
                NguoiTao = addNrwCongTyDauVaoChiTiet.NguoiTao,
            };

            //Lưu vào DB
            _context.NrwcongTyDauVaoChiTiets.Add(nrwCongTyDauVaoChiTiet);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new NRWCongTyDauVaoChiTiet_ResponeModel()
            {
                Id = nrwCongTyDauVaoChiTiet.Id,
                MaDauVao = nrwCongTyDauVaoChiTiet.MaDauVao,
                Ky = nrwCongTyDauVaoChiTiet.Ky,
                Nam = nrwCongTyDauVaoChiTiet.Nam,

                Nguon = nrwCongTyDauVaoChiTiet.Nguon,
                ToanTu = nrwCongTyDauVaoChiTiet.ToanTu,
                ThuTuHienThi = nrwCongTyDauVaoChiTiet.ThuTuHienThi,

                GhiChu = nrwCongTyDauVaoChiTiet.GhiChu,
                NgayTao = nrwCongTyDauVaoChiTiet.NgayTao,
                NguoiTao = nrwCongTyDauVaoChiTiet.NguoiTao,
                NgayCapNhat = nrwCongTyDauVaoChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwCongTyDauVaoChiTiet.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public NRWCongTyDauVaoChiTiet_ResponeModel Update(int id, Update_NRWCongTyDauVaoChiTiet_Model updateNrwCongTyDauVaoChiTiet)
        {
            // Lấy entity từ DB
            var nrwCongTyDauVaoChiTiet = _context.NrwcongTyDauVaoChiTiets.FirstOrDefault(e => e.Id == id);

            if (nrwCongTyDauVaoChiTiet == null) return null;

            // Gán dữ liệu từ request vào entity
            nrwCongTyDauVaoChiTiet.MaDauVao = updateNrwCongTyDauVaoChiTiet.MaDauVao;
            nrwCongTyDauVaoChiTiet.Ky = updateNrwCongTyDauVaoChiTiet.Ky;
            nrwCongTyDauVaoChiTiet.Nam = updateNrwCongTyDauVaoChiTiet.Nam;

            nrwCongTyDauVaoChiTiet.Nguon = updateNrwCongTyDauVaoChiTiet.Nguon;
            nrwCongTyDauVaoChiTiet.ToanTu = updateNrwCongTyDauVaoChiTiet.ToanTu;
            nrwCongTyDauVaoChiTiet.ThuTuHienThi = updateNrwCongTyDauVaoChiTiet.ThuTuHienThi;

            nrwCongTyDauVaoChiTiet.GhiChu = updateNrwCongTyDauVaoChiTiet.GhiChu;
            nrwCongTyDauVaoChiTiet.NgayCapNhat = DateTime.Now;
            nrwCongTyDauVaoChiTiet.NguoiCapNhat = updateNrwCongTyDauVaoChiTiet.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new NRWCongTyDauVaoChiTiet_ResponeModel
            {
                Id = nrwCongTyDauVaoChiTiet.Id,
                MaDauVao = nrwCongTyDauVaoChiTiet.MaDauVao,
                Ky = nrwCongTyDauVaoChiTiet.Ky,
                Nam = nrwCongTyDauVaoChiTiet.Nam,

                Nguon = nrwCongTyDauVaoChiTiet.Nguon,
                ToanTu = nrwCongTyDauVaoChiTiet.ToanTu,
                ThuTuHienThi = nrwCongTyDauVaoChiTiet.ThuTuHienThi,

                GhiChu = nrwCongTyDauVaoChiTiet.GhiChu,
                NgayTao = nrwCongTyDauVaoChiTiet.NgayTao,
                NguoiTao = nrwCongTyDauVaoChiTiet.NguoiTao,
                NgayCapNhat = nrwCongTyDauVaoChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwCongTyDauVaoChiTiet.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public NRWCongTyDauVaoChiTiet_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var nrwCongTyDauVaoChiTiet = _context.NrwcongTyDauVaoChiTiets.FirstOrDefault(e => e.Id == id);

            if (nrwCongTyDauVaoChiTiet == null) return null;

            // Xóa
            _context.NrwcongTyDauVaoChiTiets.Remove(nrwCongTyDauVaoChiTiet);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new NRWCongTyDauVaoChiTiet_ResponeModel
            {
                Id = nrwCongTyDauVaoChiTiet.Id,
                MaDauVao = nrwCongTyDauVaoChiTiet.MaDauVao,
                Ky = nrwCongTyDauVaoChiTiet.Ky,
                Nam = nrwCongTyDauVaoChiTiet.Nam,

                Nguon = nrwCongTyDauVaoChiTiet.Nguon,
                ToanTu = nrwCongTyDauVaoChiTiet.ToanTu,
                ThuTuHienThi = nrwCongTyDauVaoChiTiet.ThuTuHienThi,

                GhiChu = nrwCongTyDauVaoChiTiet.GhiChu,
                NgayTao = nrwCongTyDauVaoChiTiet.NgayTao,
                NguoiTao = nrwCongTyDauVaoChiTiet.NguoiTao,
                NgayCapNhat = nrwCongTyDauVaoChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwCongTyDauVaoChiTiet.NguoiCapNhat,
            };
        }
    }
}
