using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.NrwDma;
using WebAPI_NRW.ResponeModel.NrwDma;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NRWDMADauVaoChiTietController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public NRWDMADauVaoChiTietController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<NRWDMADauVaoChiTiet_ResponeModel> Get()
        {
            //Linq Query
            var query = from nrwDMADauVaoChiTiet in _context.NrwdmadauVaoChiTiets
                        select new NRWDMADauVaoChiTiet_ResponeModel
                        {
                            Id = nrwDMADauVaoChiTiet.Id,
                            MaDauVao = nrwDMADauVaoChiTiet.MaDauVao,
                            MaDma = nrwDMADauVaoChiTiet.MaDma,
                            Ky = nrwDMADauVaoChiTiet.Ky,
                            Nam = nrwDMADauVaoChiTiet.Nam,

                            Nguon = nrwDMADauVaoChiTiet.Nguon,
                            ToanTu = nrwDMADauVaoChiTiet.ToanTu,
                            ThuTuHienThi = nrwDMADauVaoChiTiet.ThuTuHienThi,

                            GhiChu = nrwDMADauVaoChiTiet.GhiChu,
                            NgayTao = nrwDMADauVaoChiTiet.NgayTao,
                            NguoiTao = nrwDMADauVaoChiTiet.NguoiTao,
                            NgayCapNhat = nrwDMADauVaoChiTiet.NgayCapNhat,
                            NguoiCapNhat = nrwDMADauVaoChiTiet.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<NRWDMADauVaoChiTiet_ResponeModel> Get(int id)
        {
            var nrwDMADauVaoChiTiet = _context.NrwdmadauVaoChiTiets.FirstOrDefault(e => e.Id == id);

            if (nrwDMADauVaoChiTiet == null)
            {
                return NotFound();
            }

            //Map Entity -> ResponseModel để trả về
            var response = new NRWDMADauVaoChiTiet_ResponeModel()
            {
                Id = nrwDMADauVaoChiTiet.Id,
                MaDauVao = nrwDMADauVaoChiTiet.MaDauVao,
                MaDma = nrwDMADauVaoChiTiet.MaDma,
                Ky = nrwDMADauVaoChiTiet.Ky,
                Nam = nrwDMADauVaoChiTiet.Nam,

                Nguon = nrwDMADauVaoChiTiet.Nguon,
                ToanTu = nrwDMADauVaoChiTiet.ToanTu,
                ThuTuHienThi = nrwDMADauVaoChiTiet.ThuTuHienThi,

                GhiChu = nrwDMADauVaoChiTiet.GhiChu,
                NgayTao = nrwDMADauVaoChiTiet.NgayTao,
                NguoiTao = nrwDMADauVaoChiTiet.NguoiTao,
                NgayCapNhat = nrwDMADauVaoChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwDMADauVaoChiTiet.NguoiCapNhat,
            };

            return response;
        }

        /// API Add
        [HttpPost]
        public NRWDMADauVaoChiTiet_ResponeModel Post(Add_NRWDMADauVaoChiTiet_Model addNrwDmaDauVaoChiTiet)
        {
            //Map request -> Entity
            var nrwDMADauVaoChiTiet = new NrwdmadauVaoChiTiet()
            {
                MaDauVao = addNrwDmaDauVaoChiTiet.MaDauVao,
                MaDma = addNrwDmaDauVaoChiTiet.MaDma,
                Ky = addNrwDmaDauVaoChiTiet.Ky,
                Nam = addNrwDmaDauVaoChiTiet.Nam,

                Nguon = addNrwDmaDauVaoChiTiet.Nguon,
                ToanTu = addNrwDmaDauVaoChiTiet.ToanTu,
                ThuTuHienThi = addNrwDmaDauVaoChiTiet.ThuTuHienThi,

                GhiChu = addNrwDmaDauVaoChiTiet.GhiChu,
                NgayTao = addNrwDmaDauVaoChiTiet.NgayTao,
                NguoiTao = addNrwDmaDauVaoChiTiet.NguoiTao,
            };

            //Lưu vào DB
            _context.NrwdmadauVaoChiTiets.Add(nrwDMADauVaoChiTiet);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new NRWDMADauVaoChiTiet_ResponeModel()
            {
                Id = nrwDMADauVaoChiTiet.Id,
                MaDauVao = nrwDMADauVaoChiTiet.MaDauVao,
                MaDma = nrwDMADauVaoChiTiet.MaDma,
                Ky = nrwDMADauVaoChiTiet.Ky,
                Nam = nrwDMADauVaoChiTiet.Nam,

                Nguon = nrwDMADauVaoChiTiet.Nguon,
                ToanTu = nrwDMADauVaoChiTiet.ToanTu,
                ThuTuHienThi = nrwDMADauVaoChiTiet.ThuTuHienThi,

                GhiChu = nrwDMADauVaoChiTiet.GhiChu,
                NgayTao = nrwDMADauVaoChiTiet.NgayTao,
                NguoiTao = nrwDMADauVaoChiTiet.NguoiTao,
                NgayCapNhat = nrwDMADauVaoChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwDMADauVaoChiTiet.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public NRWDMADauVaoChiTiet_ResponeModel Update(int id, Update_NRWDMADauVaoChiTiet_Model updateNrwDmaDauVaoChiTiet)
        {
            // Lấy entity từ DB
            var nrwDMADauVaoChiTiet = _context.NrwdmadauVaoChiTiets.FirstOrDefault(e => e.Id == id);

            if (nrwDMADauVaoChiTiet == null) return null;

            // Gán dữ liệu từ request vào entity
            nrwDMADauVaoChiTiet.MaDauVao = updateNrwDmaDauVaoChiTiet.MaDauVao;
            nrwDMADauVaoChiTiet.MaDma = updateNrwDmaDauVaoChiTiet.MaDma;
            nrwDMADauVaoChiTiet.Ky = updateNrwDmaDauVaoChiTiet.Ky;
            nrwDMADauVaoChiTiet.Nam = updateNrwDmaDauVaoChiTiet.Nam;

            nrwDMADauVaoChiTiet.Nguon = updateNrwDmaDauVaoChiTiet.Nguon;
            nrwDMADauVaoChiTiet.ToanTu = updateNrwDmaDauVaoChiTiet.ToanTu;
            nrwDMADauVaoChiTiet.ThuTuHienThi = updateNrwDmaDauVaoChiTiet.ThuTuHienThi;

            nrwDMADauVaoChiTiet.GhiChu = updateNrwDmaDauVaoChiTiet.GhiChu;
            nrwDMADauVaoChiTiet.NgayCapNhat = DateTime.Now;
            nrwDMADauVaoChiTiet.NguoiCapNhat = updateNrwDmaDauVaoChiTiet.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new NRWDMADauVaoChiTiet_ResponeModel
            {
                Id = nrwDMADauVaoChiTiet.Id,
                MaDauVao = nrwDMADauVaoChiTiet.MaDauVao,
                MaDma = nrwDMADauVaoChiTiet.MaDma,
                Ky = nrwDMADauVaoChiTiet.Ky,
                Nam = nrwDMADauVaoChiTiet.Nam,

                Nguon = nrwDMADauVaoChiTiet.Nguon,
                ToanTu = nrwDMADauVaoChiTiet.ToanTu,
                ThuTuHienThi = nrwDMADauVaoChiTiet.ThuTuHienThi,

                GhiChu = nrwDMADauVaoChiTiet.GhiChu,
                NgayTao = nrwDMADauVaoChiTiet.NgayTao,
                NguoiTao = nrwDMADauVaoChiTiet.NguoiTao,
                NgayCapNhat = nrwDMADauVaoChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwDMADauVaoChiTiet.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public NRWDMADauVaoChiTiet_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var nrwDMADauVaoChiTiet = _context.NrwdmadauVaoChiTiets.FirstOrDefault(e => e.Id == id);

            if (nrwDMADauVaoChiTiet == null) return null;

            // Xóa
            _context.NrwdmadauVaoChiTiets.Remove(nrwDMADauVaoChiTiet);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new NRWDMADauVaoChiTiet_ResponeModel
            {
                Id = nrwDMADauVaoChiTiet.Id,
                MaDauVao = nrwDMADauVaoChiTiet.MaDauVao,
                MaDma = nrwDMADauVaoChiTiet.MaDma,
                Ky = nrwDMADauVaoChiTiet.Ky,
                Nam = nrwDMADauVaoChiTiet.Nam,

                Nguon = nrwDMADauVaoChiTiet.Nguon,
                ToanTu = nrwDMADauVaoChiTiet.ToanTu,
                ThuTuHienThi = nrwDMADauVaoChiTiet.ThuTuHienThi,

                GhiChu = nrwDMADauVaoChiTiet.GhiChu,
                NgayTao = nrwDMADauVaoChiTiet.NgayTao,
                NguoiTao = nrwDMADauVaoChiTiet.NguoiTao,
                NgayCapNhat = nrwDMADauVaoChiTiet.NgayCapNhat,
                NguoiCapNhat = nrwDMADauVaoChiTiet.NguoiCapNhat,
            };
        }
    }
}