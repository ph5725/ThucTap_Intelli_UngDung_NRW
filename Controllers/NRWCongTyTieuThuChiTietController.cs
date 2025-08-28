using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.NrwCongTy;
using WebAPI_NRW.ResponeModel.NrwCongTy;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NRWCongTyTieuThuChiTietController
    {
        private readonly DbNrwContext _context;

        public NRWCongTyTieuThuChiTietController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<NRWCongTyTieuThuChiTiet_ResponeModel> Get()
        {
            //Linq Query
            var query = from nrwCongTyTieuThuChiTiet in _context.NrwcongTyTieuThuChiTiets
                        select new NRWCongTyTieuThuChiTiet_ResponeModel
                        {
                            Id = nrwCongTyTieuThuChiTiet.Id,
                            MaTieuThu = nrwCongTyTieuThuChiTiet.MaTieuThu,
                            Ky = nrwCongTyTieuThuChiTiet.Ky,
                            Nam = nrwCongTyTieuThuChiTiet.Nam,

                            Nguon = nrwCongTyTieuThuChiTiet.Nguon,
                            ToanTu = nrwCongTyTieuThuChiTiet.ToanTu,
                            ThuTuHienThi = nrwCongTyTieuThuChiTiet.ThuTuHienThi,

                            GhiChu = nrwCongTyTieuThuChiTiet.GhiChu,
                            NgayTao = nrwCongTyTieuThuChiTiet.NgayTao,
                            NguoiTao = nrwCongTyTieuThuChiTiet.NguoiTao,
                            NgayCapNhat = nrwCongTyTieuThuChiTiet.NgayCapNhat,
                            NguoiCapNhat = nrwCongTyTieuThuChiTiet.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Add
        [HttpPost]
        public NRWCongTyTieuThuChiTiet_ResponeModel Post(Add_NRWCongTyTieuThuChiTiet_Model addNrwCongTyTieuThuChiTiet)
        {
            //Map request -> Entity
            var nrwCongTyTieuThuChiTiet = new NrwcongTyTieuThuChiTiet()
            {
                MaTieuThu = addNrwCongTyTieuThuChiTiet.MaTieuThu,
                Ky = addNrwCongTyTieuThuChiTiet.Ky,
                Nam = addNrwCongTyTieuThuChiTiet.Nam,

                Nguon = addNrwCongTyTieuThuChiTiet.Nguon,
                ToanTu = addNrwCongTyTieuThuChiTiet.ToanTu,
                ThuTuHienThi = addNrwCongTyTieuThuChiTiet.ThuTuHienThi,

                GhiChu = addNrwCongTyTieuThuChiTiet.GhiChu,
                NgayTao = addNrwCongTyTieuThuChiTiet.NgayTao,
                NguoiTao = addNrwCongTyTieuThuChiTiet.NguoiTao,
            };

            //Lưu vào DB
            _context.NrwcongTyTieuThuChiTiets.Add(nrwCongTyTieuThuChiTiet);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new NRWCongTyTieuThuChiTiet_ResponeModel()
            {
                Id = nrwCongTyTieuThuChiTiet.Id,
                MaTieuThu = nrwCongTyTieuThuChiTiet.MaTieuThu,
                Ky = nrwCongTyTieuThuChiTiet.Ky,
                Nam = nrwCongTyTieuThuChiTiet.Nam,

                Nguon = nrwCongTyTieuThuChiTiet.Nguon,
                ToanTu = nrwCongTyTieuThuChiTiet.ToanTu,
                ThuTuHienThi = nrwCongTyTieuThuChiTiet.ThuTuHienThi,

                GhiChu = nrwCongTyTieuThuChiTiet.GhiChu,
                NgayTao = nrwCongTyTieuThuChiTiet.NgayTao,
                NguoiTao = nrwCongTyTieuThuChiTiet.NguoiTao,
                NgayCapNhat = nrwCongTyTieuThuChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwCongTyTieuThuChiTiet.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public NRWCongTyTieuThuChiTiet_ResponeModel Update(int id, Update_NRWCongTyTieuThuChiTiet_Model updateNrwCongTyTieuThuChiTiet)
        {
            // Lấy entity từ DB
            var nrwCongTyTieuThuChiTiet = _context.NrwcongTyTieuThuChiTiets.FirstOrDefault(e => e.Id == id);

            if (nrwCongTyTieuThuChiTiet == null) return null;

            // Gán dữ liệu từ request vào entity
            nrwCongTyTieuThuChiTiet.MaTieuThu = updateNrwCongTyTieuThuChiTiet.MaTieuThu;
            nrwCongTyTieuThuChiTiet.Ky = updateNrwCongTyTieuThuChiTiet.Ky;
            nrwCongTyTieuThuChiTiet.Nam = updateNrwCongTyTieuThuChiTiet.Nam;

            nrwCongTyTieuThuChiTiet.Nguon = updateNrwCongTyTieuThuChiTiet.Nguon;
            nrwCongTyTieuThuChiTiet.ToanTu = updateNrwCongTyTieuThuChiTiet.ToanTu;
            nrwCongTyTieuThuChiTiet.ThuTuHienThi = updateNrwCongTyTieuThuChiTiet.ThuTuHienThi;

            nrwCongTyTieuThuChiTiet.GhiChu = updateNrwCongTyTieuThuChiTiet.GhiChu;
            nrwCongTyTieuThuChiTiet.NgayCapNhat = DateTime.Now;
            nrwCongTyTieuThuChiTiet.NguoiCapNhat = updateNrwCongTyTieuThuChiTiet.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new NRWCongTyTieuThuChiTiet_ResponeModel
            {
                Id = nrwCongTyTieuThuChiTiet.Id,
                MaTieuThu = nrwCongTyTieuThuChiTiet.MaTieuThu,
                Ky = nrwCongTyTieuThuChiTiet.Ky,
                Nam = nrwCongTyTieuThuChiTiet.Nam,

                Nguon = nrwCongTyTieuThuChiTiet.Nguon,
                ToanTu = nrwCongTyTieuThuChiTiet.ToanTu,
                ThuTuHienThi = nrwCongTyTieuThuChiTiet.ThuTuHienThi,

                GhiChu = nrwCongTyTieuThuChiTiet.GhiChu,
                NgayTao = nrwCongTyTieuThuChiTiet.NgayTao,
                NguoiTao = nrwCongTyTieuThuChiTiet.NguoiTao,
                NgayCapNhat = nrwCongTyTieuThuChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwCongTyTieuThuChiTiet.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public NRWCongTyTieuThuChiTiet_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var nrwCongTyTieuThuChiTiet = _context.NrwcongTyTieuThuChiTiets.FirstOrDefault(e => e.Id == id);

            if (nrwCongTyTieuThuChiTiet == null) return null;

            // Xóa
            _context.NrwcongTyTieuThuChiTiets.Remove(nrwCongTyTieuThuChiTiet);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new NRWCongTyTieuThuChiTiet_ResponeModel
            {
                Id = nrwCongTyTieuThuChiTiet.Id,
                MaTieuThu = nrwCongTyTieuThuChiTiet.MaTieuThu,
                Ky = nrwCongTyTieuThuChiTiet.Ky,
                Nam = nrwCongTyTieuThuChiTiet.Nam,

                Nguon = nrwCongTyTieuThuChiTiet.Nguon,
                ToanTu = nrwCongTyTieuThuChiTiet.ToanTu,
                ThuTuHienThi = nrwCongTyTieuThuChiTiet.ThuTuHienThi,

                GhiChu = nrwCongTyTieuThuChiTiet.GhiChu,
                NgayTao = nrwCongTyTieuThuChiTiet.NgayTao,
                NguoiTao = nrwCongTyTieuThuChiTiet.NguoiTao,
                NgayCapNhat = nrwCongTyTieuThuChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwCongTyTieuThuChiTiet.NguoiCapNhat,
            };
        }
    }
}