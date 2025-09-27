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
    [Route("api/[controller]")]

    public class NrwDmaTieuThuChiTietController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public NrwDmaTieuThuChiTietController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get all
        [HttpGet]
        public ActionResult<IEnumerable<NrwDmaTieuThuChiTiet_ResponeModel>> Get()
        {
            var list = _context.NrwdmatieuThuChiTiets
                .Include(dsDmaTieuThuChiTiet => dsDmaTieuThuChiTiet.MaDmaNavigation)
                .Include(dsDmaTieuThuChiTiet => dsDmaTieuThuChiTiet.NguoiTaoNavigation)
                .Include(dsDmaTieuThuChiTiet => dsDmaTieuThuChiTiet.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<NrwDmaTieuThuChiTiet_ResponeModel> GetById(int id)
        {
            var entity = _context.NrwdmatieuThuChiTiets
                .Include(dsDmaTieuThuChiTiet => dsDmaTieuThuChiTiet.MaDmaNavigation)
                .Include(dsDmaTieuThuChiTiet => dsDmaTieuThuChiTiet.NguoiTaoNavigation)
                .Include(dsDmaTieuThuChiTiet => dsDmaTieuThuChiTiet.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(dsDmaTieuThuChiTiet => dsDmaTieuThuChiTiet.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public ActionResult<NrwDmaTieuThuChiTiet_ResponeModel> Post(Add_NrwDmaTieuThuChiTiet_Model addNrwDmaTieuThuChiTiet)
        {
            var entity = new NrwdmatieuThuChiTiet
            {
                MaTieuThu = addNrwDmaTieuThuChiTiet.MaTieuThu,
                MaDma = addNrwDmaTieuThuChiTiet.MaDma,
                Ky = addNrwDmaTieuThuChiTiet.Ky,
                Nam = addNrwDmaTieuThuChiTiet.Nam,

                Nguon = addNrwDmaTieuThuChiTiet.Nguon,
                ToanTu = addNrwDmaTieuThuChiTiet.ToanTu,
                GiaTri = addNrwDmaTieuThuChiTiet.GiaTri,
                ThuTuHienThi = addNrwDmaTieuThuChiTiet.ThuTuHienThi,

                GhiChu = addNrwDmaTieuThuChiTiet.GhiChu,
                NgayTao = addNrwDmaTieuThuChiTiet.NgayTao,
                NguoiTao = addNrwDmaTieuThuChiTiet.NguoiTao,
            };

            _context.NrwdmatieuThuChiTiets.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDmaNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public ActionResult<NrwDmaTieuThuChiTiet_ResponeModel> Update(int id, Update_NrwDmaTieuThuChiTiet_Model updateNrwDmaTieuThuChiTiet)
        {
            var entity = _context.NrwdmatieuThuChiTiets.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.MaTieuThu = updateNrwDmaTieuThuChiTiet.MaTieuThu;
            entity.MaDma = updateNrwDmaTieuThuChiTiet.MaDma;
            entity.Ky = updateNrwDmaTieuThuChiTiet.Ky;
            entity.Nam = updateNrwDmaTieuThuChiTiet.Nam;

            entity.Nguon = updateNrwDmaTieuThuChiTiet.Nguon;
            entity.ToanTu = updateNrwDmaTieuThuChiTiet.ToanTu;
            entity.GiaTri = updateNrwDmaTieuThuChiTiet.GiaTri;
            entity.ThuTuHienThi = updateNrwDmaTieuThuChiTiet.ThuTuHienThi;

            entity.GhiChu = updateNrwDmaTieuThuChiTiet.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateNrwDmaTieuThuChiTiet.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDmaNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public ActionResult<NrwDmaTieuThuChiTiet_ResponeModel> Delete(int id)
        {
            var entity = _context.NrwdmatieuThuChiTiets.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.NrwdmatieuThuChiTiets.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDmaNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public NrwDmaTieuThuChiTiet_ResponeModel Post(Add_NrwDmaTieuThuChiTiet_Model addNrwDmaTieuThuChiTiet)
        //{
        //    //Map request -> Entity
        //    var nrwDMATieuThuChiTiet = new NrwdmatieuThuChiTiet()
        //    {
        //        MaTieuThu = addNrwDmaTieuThuChiTiet.MaTieuThu,
        //        MaDma = addNrwDmaTieuThuChiTiet.MaDma,
        //        Ky = addNrwDmaTieuThuChiTiet.Ky,
        //        Nam = addNrwDmaTieuThuChiTiet.Nam,

        //        Nguon = addNrwDmaTieuThuChiTiet.Nguon,
        //        ToanTu = addNrwDmaTieuThuChiTiet.ToanTu,
        //        ThuTuHienThi = addNrwDmaTieuThuChiTiet.ThuTuHienThi,

        //        GhiChu = addNrwDmaTieuThuChiTiet.GhiChu,
        //        NgayTao = addNrwDmaTieuThuChiTiet.NgayTao,
        //        NguoiTao = addNrwDmaTieuThuChiTiet.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.NrwdmatieuThuChiTiets.Add(nrwDMATieuThuChiTiet);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new NrwDmaTieuThuChiTiet_ResponeModel()
        //    {
        //        Id = nrwDMATieuThuChiTiet.Id,
        //        MaTieuThu = nrwDMATieuThuChiTiet.MaTieuThu,
        //        MaDma = nrwDMATieuThuChiTiet.MaDma,
        //        Ky = nrwDMATieuThuChiTiet.Ky,
        //        Nam = nrwDMATieuThuChiTiet.Nam,

        //        Nguon = nrwDMATieuThuChiTiet.Nguon,
        //        ToanTu = nrwDMATieuThuChiTiet.ToanTu,
        //        ThuTuHienThi = nrwDMATieuThuChiTiet.ThuTuHienThi,

        //        GhiChu = nrwDMATieuThuChiTiet.GhiChu,
        //        NgayTao = nrwDMATieuThuChiTiet.NgayTao,
        //        NguoiTao = nrwDMATieuThuChiTiet.NguoiTao,
        //        NgayCapNhat = nrwDMATieuThuChiTiet.NgayCapNhat,
        //        NguoiCapNhat = nrwDMATieuThuChiTiet.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public NrwDmaTieuThuChiTiet_ResponeModel Update(int id, Update_NrwDmaTieuThuChiTiet_Model updateNrwDMATieuThuChiTiet)
        //{
        //    // Lấy entity từ DB
        //    var nrwDMATieuThuChiTiet = _context.NrwdmatieuThuChiTiets.FirstOrDefault(e => e.Id == id);

        //    if (nrwDMATieuThuChiTiet == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    nrwDMATieuThuChiTiet.MaTieuThu = updateNrwDMATieuThuChiTiet.MaTieuThu;
        //    nrwDMATieuThuChiTiet.MaDma = updateNrwDMATieuThuChiTiet.MaDma;
        //    nrwDMATieuThuChiTiet.Ky = updateNrwDMATieuThuChiTiet.Ky;
        //    nrwDMATieuThuChiTiet.Nam = updateNrwDMATieuThuChiTiet.Nam;

        //    nrwDMATieuThuChiTiet.Nguon = updateNrwDMATieuThuChiTiet.Nguon;
        //    nrwDMATieuThuChiTiet.ToanTu = updateNrwDMATieuThuChiTiet.ToanTu;
        //    nrwDMATieuThuChiTiet.ThuTuHienThi = updateNrwDMATieuThuChiTiet.ThuTuHienThi;

        //    nrwDMATieuThuChiTiet.GhiChu = updateNrwDMATieuThuChiTiet.GhiChu;
        //    nrwDMATieuThuChiTiet.NgayCapNhat = DateTime.Now;
        //    nrwDMATieuThuChiTiet.NguoiCapNhat = updateNrwDMATieuThuChiTiet.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new NrwDmaTieuThuChiTiet_ResponeModel
        //    {
        //        Id = nrwDMATieuThuChiTiet.Id,
        //        MaTieuThu = nrwDMATieuThuChiTiet.MaTieuThu,
        //        MaDma = nrwDMATieuThuChiTiet.MaDma,
        //        Ky = nrwDMATieuThuChiTiet.Ky,
        //        Nam = nrwDMATieuThuChiTiet.Nam,

        //        Nguon = nrwDMATieuThuChiTiet.Nguon,
        //        ToanTu = nrwDMATieuThuChiTiet.ToanTu,
        //        ThuTuHienThi = nrwDMATieuThuChiTiet.ThuTuHienThi,

        //        GhiChu = nrwDMATieuThuChiTiet.GhiChu,
        //        NgayTao = nrwDMATieuThuChiTiet.NgayTao,
        //        NguoiTao = nrwDMATieuThuChiTiet.NguoiTao,
        //        NgayCapNhat = nrwDMATieuThuChiTiet.NgayCapNhat,
        //        NguoiCapNhat = nrwDMATieuThuChiTiet.NguoiCapNhat,
        //    };
        //}
    }
}