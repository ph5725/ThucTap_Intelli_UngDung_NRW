using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.NrwDma;
using WebAPI_NRW.ResponeModel.NrwDma;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NRWDMATieuThuChiTietController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public NRWDMATieuThuChiTietController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<NRWDMATieuThuChiTiet_ResponeModel> Get()
        {
            //Linq Query
            var query = from nrwDMATieuThuChiTiet in _context.NrwdmatieuThuChiTiets
                        select new NRWDMATieuThuChiTiet_ResponeModel
                        {
                            Id = nrwDMATieuThuChiTiet.Id,
                            MaTieuThu = nrwDMATieuThuChiTiet.MaTieuThu,
                            MaDma = nrwDMATieuThuChiTiet.MaDma,
                            Ky = nrwDMATieuThuChiTiet.Ky,
                            Nam = nrwDMATieuThuChiTiet.Nam,

                            Nguon = nrwDMATieuThuChiTiet.Nguon,
                            ToanTu = nrwDMATieuThuChiTiet.ToanTu,
                            ThuTuHienThi = nrwDMATieuThuChiTiet.ThuTuHienThi,

                            GhiChu = nrwDMATieuThuChiTiet.GhiChu,
                            NgayTao = nrwDMATieuThuChiTiet.NgayTao,
                            NguoiTao = nrwDMATieuThuChiTiet.NguoiTao,
                            NgayCapNhat = nrwDMATieuThuChiTiet.NgayCapNhat,
                            NguoiCapNhat = nrwDMATieuThuChiTiet.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<NRWDMATieuThuChiTiet_ResponeModel> Get(int id)
        {
            var nrwDMATieuThuChiTiet = _context.NrwdmatieuThuChiTiets.FirstOrDefault(e => e.Id == id);

            if (nrwDMATieuThuChiTiet == null)
            {
                return NotFound();
            }

            //Map Entity -> ResponseModel để trả về
            var response = new NRWDMATieuThuChiTiet_ResponeModel()
            {
                Id = nrwDMATieuThuChiTiet.Id,
                MaTieuThu = nrwDMATieuThuChiTiet.MaTieuThu,
                MaDma = nrwDMATieuThuChiTiet.MaDma,
                Ky = nrwDMATieuThuChiTiet.Ky,
                Nam = nrwDMATieuThuChiTiet.Nam,

                Nguon = nrwDMATieuThuChiTiet.Nguon,
                ToanTu = nrwDMATieuThuChiTiet.ToanTu,
                ThuTuHienThi = nrwDMATieuThuChiTiet.ThuTuHienThi,

                GhiChu = nrwDMATieuThuChiTiet.GhiChu,
                NgayTao = nrwDMATieuThuChiTiet.NgayTao,
                NguoiTao = nrwDMATieuThuChiTiet.NguoiTao,
                NgayCapNhat = nrwDMATieuThuChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwDMATieuThuChiTiet.NguoiCapNhat,
            };

            return response;
        }

        /// API Add
        [HttpPost]
        public NRWDMATieuThuChiTiet_ResponeModel Post(Add_NRWDMATieuThuChiTiet_Model addNrwDmaTieuThuChiTiet)
        {
            //Map request -> Entity
            var nrwDMATieuThuChiTiet = new NrwdmatieuThuChiTiet()
            {
                MaTieuThu = addNrwDmaTieuThuChiTiet.MaTieuThu,
                MaDma = addNrwDmaTieuThuChiTiet.MaDma,
                Ky = addNrwDmaTieuThuChiTiet.Ky,
                Nam = addNrwDmaTieuThuChiTiet.Nam,

                Nguon = addNrwDmaTieuThuChiTiet.Nguon,
                ToanTu = addNrwDmaTieuThuChiTiet.ToanTu,
                ThuTuHienThi = addNrwDmaTieuThuChiTiet.ThuTuHienThi,

                GhiChu = addNrwDmaTieuThuChiTiet.GhiChu,
                NgayTao = addNrwDmaTieuThuChiTiet.NgayTao,
                NguoiTao = addNrwDmaTieuThuChiTiet.NguoiTao,
            };

            //Lưu vào DB
            _context.NrwdmatieuThuChiTiets.Add(nrwDMATieuThuChiTiet);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new NRWDMATieuThuChiTiet_ResponeModel()
            {
                Id = nrwDMATieuThuChiTiet.Id,
                MaTieuThu = nrwDMATieuThuChiTiet.MaTieuThu,
                MaDma = nrwDMATieuThuChiTiet.MaDma,
                Ky = nrwDMATieuThuChiTiet.Ky,
                Nam = nrwDMATieuThuChiTiet.Nam,

                Nguon = nrwDMATieuThuChiTiet.Nguon,
                ToanTu = nrwDMATieuThuChiTiet.ToanTu,
                ThuTuHienThi = nrwDMATieuThuChiTiet.ThuTuHienThi,

                GhiChu = nrwDMATieuThuChiTiet.GhiChu,
                NgayTao = nrwDMATieuThuChiTiet.NgayTao,
                NguoiTao = nrwDMATieuThuChiTiet.NguoiTao,
                NgayCapNhat = nrwDMATieuThuChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwDMATieuThuChiTiet.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public NRWDMATieuThuChiTiet_ResponeModel Update(int id, Update_NRWDMATieuThuChiTiet_Model updateNrwDMATieuThuChiTiet)
        {
            // Lấy entity từ DB
            var nrwDMATieuThuChiTiet = _context.NrwdmatieuThuChiTiets.FirstOrDefault(e => e.Id == id);

            if (nrwDMATieuThuChiTiet == null) return null;

            // Gán dữ liệu từ request vào entity
            nrwDMATieuThuChiTiet.MaTieuThu = updateNrwDMATieuThuChiTiet.MaTieuThu;
            nrwDMATieuThuChiTiet.MaDma = updateNrwDMATieuThuChiTiet.MaDma;
            nrwDMATieuThuChiTiet.Ky = updateNrwDMATieuThuChiTiet.Ky;
            nrwDMATieuThuChiTiet.Nam = updateNrwDMATieuThuChiTiet.Nam;

            nrwDMATieuThuChiTiet.Nguon = updateNrwDMATieuThuChiTiet.Nguon;
            nrwDMATieuThuChiTiet.ToanTu = updateNrwDMATieuThuChiTiet.ToanTu;
            nrwDMATieuThuChiTiet.ThuTuHienThi = updateNrwDMATieuThuChiTiet.ThuTuHienThi;

            nrwDMATieuThuChiTiet.GhiChu = updateNrwDMATieuThuChiTiet.GhiChu;
            nrwDMATieuThuChiTiet.NgayCapNhat = DateTime.Now;
            nrwDMATieuThuChiTiet.NguoiCapNhat = updateNrwDMATieuThuChiTiet.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new NRWDMATieuThuChiTiet_ResponeModel
            {
                Id = nrwDMATieuThuChiTiet.Id,
                MaTieuThu = nrwDMATieuThuChiTiet.MaTieuThu,
                MaDma = nrwDMATieuThuChiTiet.MaDma,
                Ky = nrwDMATieuThuChiTiet.Ky,
                Nam = nrwDMATieuThuChiTiet.Nam,

                Nguon = nrwDMATieuThuChiTiet.Nguon,
                ToanTu = nrwDMATieuThuChiTiet.ToanTu,
                ThuTuHienThi = nrwDMATieuThuChiTiet.ThuTuHienThi,

                GhiChu = nrwDMATieuThuChiTiet.GhiChu,
                NgayTao = nrwDMATieuThuChiTiet.NgayTao,
                NguoiTao = nrwDMATieuThuChiTiet.NguoiTao,
                NgayCapNhat = nrwDMATieuThuChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwDMATieuThuChiTiet.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public NRWDMATieuThuChiTiet_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var nrwDMATieuThuChiTiet = _context.NrwdmatieuThuChiTiets.FirstOrDefault(e => e.Id == id);

            if (nrwDMATieuThuChiTiet == null) return null;

            // Xóa
            _context.NrwdmatieuThuChiTiets.Remove(nrwDMATieuThuChiTiet);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new NRWDMATieuThuChiTiet_ResponeModel
            {
                Id = nrwDMATieuThuChiTiet.Id,
                MaTieuThu = nrwDMATieuThuChiTiet.MaTieuThu,
                MaDma = nrwDMATieuThuChiTiet.MaDma,
                Ky = nrwDMATieuThuChiTiet.Ky,
                Nam = nrwDMATieuThuChiTiet.Nam,

                Nguon = nrwDMATieuThuChiTiet.Nguon,
                ToanTu = nrwDMATieuThuChiTiet.ToanTu,
                ThuTuHienThi = nrwDMATieuThuChiTiet.ThuTuHienThi,

                GhiChu = nrwDMATieuThuChiTiet.GhiChu,
                NgayTao = nrwDMATieuThuChiTiet.NgayTao,
                NguoiTao = nrwDMATieuThuChiTiet.NguoiTao,
                NgayCapNhat = nrwDMATieuThuChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwDMATieuThuChiTiet.NguoiCapNhat,
            };
        }
    }
}