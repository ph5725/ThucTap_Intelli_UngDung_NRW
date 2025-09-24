using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DanhSach;
using WebAPI_NRW.RequestModel.NrwDma;
using WebAPI_NRW.ResponeModel.DanhSach;
using WebAPI_NRW.ResponeModel.NrwDma;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class NrwDmaDauVaoChiTietController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public NrwDmaDauVaoChiTietController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get all
        [HttpGet]
        public ActionResult<IEnumerable<NrwDmaDauVaoChiTiet_ResponeModel>> Get()
        {
            var list = _context.NrwdmadauVaoChiTiets
                .Include(nrwDmaDauVaoChiTiet => nrwDmaDauVaoChiTiet.MaDmaNavigation)
                .Include(nrwDmaDauVaoChiTiet => nrwDmaDauVaoChiTiet.NguoiTaoNavigation)
                .Include(nrwDmaDauVaoChiTiet => nrwDmaDauVaoChiTiet.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<NrwDmaDauVaoChiTiet_ResponeModel> GetById(int id)
        {
            var entity = _context.NrwdmadauVaoChiTiets
                .Include(nrwDmaDauVaoChiTiet => nrwDmaDauVaoChiTiet.MaDmaNavigation)
                .Include(nrwDmaDauVaoChiTiet => nrwDmaDauVaoChiTiet.NguoiTaoNavigation)
                .Include(nrwDmaDauVaoChiTiet => nrwDmaDauVaoChiTiet.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(nrwDmaDauVaoChiTiet => nrwDmaDauVaoChiTiet.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public ActionResult<NrwDmaDauVaoChiTiet_ResponeModel> Post(Add_NrwDmaDauVaoChiTiet_Model addNrwDmaDauVaoChiTiet)
        {
            var entity = new NrwdmadauVaoChiTiet
            {
                MaDauVao = addNrwDmaDauVaoChiTiet.MaDauVao,
                MaDma = addNrwDmaDauVaoChiTiet.MaDma,
                Ky = addNrwDmaDauVaoChiTiet.Ky,
                Nam = addNrwDmaDauVaoChiTiet.Nam,

                Nguon = addNrwDmaDauVaoChiTiet.Nguon,
                ToanTu = addNrwDmaDauVaoChiTiet.ToanTu,
                GiaTri = addNrwDmaDauVaoChiTiet.GiaTri,
                ThuTuHienThi = addNrwDmaDauVaoChiTiet.ThuTuHienThi,

                GhiChu = addNrwDmaDauVaoChiTiet.GhiChu,
                NgayTao = addNrwDmaDauVaoChiTiet.NgayTao,
                NguoiTao = addNrwDmaDauVaoChiTiet.NguoiTao,
            };

            _context.NrwdmadauVaoChiTiets.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDmaNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public ActionResult<NrwDmaDauVaoChiTiet_ResponeModel> Update(int id, Update_NrwDmaDauVaoChiTiet_Model updateNrwDmaDauVaoChiTiet)
        {
            var entity = _context.NrwdmadauVaoChiTiets.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.MaDauVao = updateNrwDmaDauVaoChiTiet.MaDauVao;
            entity.MaDma = updateNrwDmaDauVaoChiTiet.MaDma;
            entity.Ky = updateNrwDmaDauVaoChiTiet.Ky;
            entity.Nam = updateNrwDmaDauVaoChiTiet.Nam;

            entity.Nguon = updateNrwDmaDauVaoChiTiet.Nguon;
            entity.ToanTu = updateNrwDmaDauVaoChiTiet.ToanTu;
            entity.GiaTri = updateNrwDmaDauVaoChiTiet.GiaTri;
            entity.ThuTuHienThi = updateNrwDmaDauVaoChiTiet.ThuTuHienThi;

            entity.GhiChu = updateNrwDmaDauVaoChiTiet.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateNrwDmaDauVaoChiTiet.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDmaNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public ActionResult<NrwDmaDauVaoChiTiet_ResponeModel> Delete(int id)
        {
            var entity = _context.NrwdmadauVaoChiTiets.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.NrwdmadauVaoChiTiets.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDmaNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public NrwDmaDauVaoChiTiet_ResponeModel Post(Add_NrwDmaDauVaoChiTiet_Model addNrwDmaDauVaoChiTiet)
        //{
        //    //Map request -> Entity
        //    var nrwDMADauVaoChiTiet = new NrwdmadauVaoChiTiet()
        //    {
        //        MaDauVao = addNrwDmaDauVaoChiTiet.MaDauVao,
        //        MaDma = addNrwDmaDauVaoChiTiet.MaDma,
        //        Ky = addNrwDmaDauVaoChiTiet.Ky,
        //        Nam = addNrwDmaDauVaoChiTiet.Nam,

        //        Nguon = addNrwDmaDauVaoChiTiet.Nguon,
        //        ToanTu = addNrwDmaDauVaoChiTiet.ToanTu,
        //        ThuTuHienThi = addNrwDmaDauVaoChiTiet.ThuTuHienThi,

        //        GhiChu = addNrwDmaDauVaoChiTiet.GhiChu,
        //        NgayTao = addNrwDmaDauVaoChiTiet.NgayTao,
        //        NguoiTao = addNrwDmaDauVaoChiTiet.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.NrwdmadauVaoChiTiets.Add(nrwDMADauVaoChiTiet);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new NrwDmaDauVaoChiTiet_ResponeModel()
        //    {
        //        Id = nrwDMADauVaoChiTiet.Id,
        //        MaDauVao = nrwDMADauVaoChiTiet.MaDauVao,
        //        MaDma = nrwDMADauVaoChiTiet.MaDma,
        //        Ky = nrwDMADauVaoChiTiet.Ky,
        //        Nam = nrwDMADauVaoChiTiet.Nam,

        //        Nguon = nrwDMADauVaoChiTiet.Nguon,
        //        ToanTu = nrwDMADauVaoChiTiet.ToanTu,
        //        ThuTuHienThi = nrwDMADauVaoChiTiet.ThuTuHienThi,

        //        GhiChu = nrwDMADauVaoChiTiet.GhiChu,
        //        NgayTao = nrwDMADauVaoChiTiet.NgayTao,
        //        NguoiTao = nrwDMADauVaoChiTiet.NguoiTao,
        //        NgayCapNhat = nrwDMADauVaoChiTiet.NgayCapNhat,
        //        NguoiCapNhat = nrwDMADauVaoChiTiet.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public NrwDmaDauVaoChiTiet_ResponeModel Update(int id, Update_NrwDmaDauVaoChiTiet_Model updateNrwDmaDauVaoChiTiet)
        //{
        //    // Lấy entity từ DB
        //    var nrwDMADauVaoChiTiet = _context.NrwdmadauVaoChiTiets.FirstOrDefault(e => e.Id == id);

        //    if (nrwDMADauVaoChiTiet == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    nrwDMADauVaoChiTiet.MaDauVao = updateNrwDmaDauVaoChiTiet.MaDauVao;
        //    nrwDMADauVaoChiTiet.MaDma = updateNrwDmaDauVaoChiTiet.MaDma;
        //    nrwDMADauVaoChiTiet.Ky = updateNrwDmaDauVaoChiTiet.Ky;
        //    nrwDMADauVaoChiTiet.Nam = updateNrwDmaDauVaoChiTiet.Nam;

        //    nrwDMADauVaoChiTiet.Nguon = updateNrwDmaDauVaoChiTiet.Nguon;
        //    nrwDMADauVaoChiTiet.ToanTu = updateNrwDmaDauVaoChiTiet.ToanTu;
        //    nrwDMADauVaoChiTiet.ThuTuHienThi = updateNrwDmaDauVaoChiTiet.ThuTuHienThi;

        //    nrwDMADauVaoChiTiet.GhiChu = updateNrwDmaDauVaoChiTiet.GhiChu;
        //    nrwDMADauVaoChiTiet.NgayCapNhat = DateTime.Now;
        //    nrwDMADauVaoChiTiet.NguoiCapNhat = updateNrwDmaDauVaoChiTiet.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new NrwDmaDauVaoChiTiet_ResponeModel
        //    {
        //        Id = nrwDMADauVaoChiTiet.Id,
        //        MaDauVao = nrwDMADauVaoChiTiet.MaDauVao,
        //        MaDma = nrwDMADauVaoChiTiet.MaDma,
        //        Ky = nrwDMADauVaoChiTiet.Ky,
        //        Nam = nrwDMADauVaoChiTiet.Nam,

        //        Nguon = nrwDMADauVaoChiTiet.Nguon,
        //        ToanTu = nrwDMADauVaoChiTiet.ToanTu,
        //        ThuTuHienThi = nrwDMADauVaoChiTiet.ThuTuHienThi,

        //        GhiChu = nrwDMADauVaoChiTiet.GhiChu,
        //        NgayTao = nrwDMADauVaoChiTiet.NgayTao,
        //        NguoiTao = nrwDMADauVaoChiTiet.NguoiTao,
        //        NgayCapNhat = nrwDMADauVaoChiTiet.NgayCapNhat,
        //        NguoiCapNhat = nrwDMADauVaoChiTiet.NguoiCapNhat,
        //    };
        //}

        ///// API Delete
        //[HttpDelete]
        //public NrwDmaDauVaoChiTiet_ResponeModel delete(int id)
        //{
        //    // Lấy entity từ DB
        //    var nrwDMADauVaoChiTiet = _context.NrwdmadauVaoChiTiets.FirstOrDefault(e => e.Id == id);

        //    if (nrwDMADauVaoChiTiet == null) return null;

        //    // Xóa
        //    _context.NrwdmadauVaoChiTiets.Remove(nrwDMADauVaoChiTiet);
        //    _context.SaveChanges();

        //    // Map sang ResponseModel để trả về
        //    return new NrwDmaDauVaoChiTiet_ResponeModel
        //    {
        //        Id = nrwDMADauVaoChiTiet.Id,
        //        MaDauVao = nrwDMADauVaoChiTiet.MaDauVao,
        //        MaDma = nrwDMADauVaoChiTiet.MaDma,
        //        Ky = nrwDMADauVaoChiTiet.Ky,
        //        Nam = nrwDMADauVaoChiTiet.Nam,

        //        Nguon = nrwDMADauVaoChiTiet.Nguon,
        //        ToanTu = nrwDMADauVaoChiTiet.ToanTu,
        //        ThuTuHienThi = nrwDMADauVaoChiTiet.ThuTuHienThi,

        //        GhiChu = nrwDMADauVaoChiTiet.GhiChu,
        //        NgayTao = nrwDMADauVaoChiTiet.NgayTao,
        //        NguoiTao = nrwDMADauVaoChiTiet.NguoiTao,
        //        NgayCapNhat = nrwDMADauVaoChiTiet.NgayCapNhat,
        //        NguoiCapNhat = nrwDMADauVaoChiTiet.NguoiCapNhat,
        //    };
        //}
    }
}