using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DanhSach;
using WebAPI_NRW.RequestModel.NrwCongTy;
using WebAPI_NRW.ResponeModel.DanhSach;
using WebAPI_NRW.ResponeModel.NrwCongTy;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class NrwCongTyTieuThuChiTietController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public NrwCongTyTieuThuChiTietController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get all
        [HttpGet]
        public ActionResult<IEnumerable<NrwCongTyTieuThuChiTiet_ResponeModel>> Get()
        {
            var list = _context.NrwcongTyTieuThuChiTiets
                .Include(nrwCongTyTieuThuChiTiet => nrwCongTyTieuThuChiTiet.MaTieuThuNavigation)
                .Include(nrwCongTyTieuThuChiTiet => nrwCongTyTieuThuChiTiet.NguoiTaoNavigation)
                .Include(nrwCongTyTieuThuChiTiet => nrwCongTyTieuThuChiTiet.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<NrwCongTyTieuThuChiTiet_ResponeModel> GetById(int id)
        {
            var entity = _context.NrwcongTyTieuThuChiTiets
                .Include(nrwCongTyTieuThuChiTiet => nrwCongTyTieuThuChiTiet.MaTieuThuNavigation)
                .Include(nrwCongTyTieuThuChiTiet => nrwCongTyTieuThuChiTiet.NguoiTaoNavigation)
                .Include(nrwCongTyTieuThuChiTiet => nrwCongTyTieuThuChiTiet.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(nrwCongTyTieuThuChiTiet => nrwCongTyTieuThuChiTiet.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Get by maTieuThu
        [HttpGet("by-ma/{maTieuThu}")]
        public ActionResult<IEnumerable<NrwCongTyTieuThuChiTiet_ResponeModel>> GetByMaTieuThu(int maTieuThu)
        {
            var entities = _context.NrwcongTyTieuThuChiTiets
                .Include(e => e.MaTieuThuNavigation)
                .Include(e => e.NguoiTaoNavigation)
                .Include(e => e.NguoiCapNhatNavigation)
                .Where(e => e.MaTieuThu == maTieuThu)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            if (entities == null || entities.Count == 0)
                return NotFound();

            //return Ok(entities.Select(e => e.MapToResponse()));
            return Ok(entities);
        }

        /// API Add
        [HttpPost]
        public ActionResult<NrwCongTyTieuThuChiTiet_ResponeModel> Post(Add_NrwCongTyTieuThuChiTiet_Model addNrwCongTyTieuThuChiTiet)
        {
            var entity = new NrwcongTyTieuThuChiTiet
            {
                MaTieuThu = addNrwCongTyTieuThuChiTiet.MaTieuThu,
                Ky = addNrwCongTyTieuThuChiTiet.Ky,
                Nam = addNrwCongTyTieuThuChiTiet.Nam,

                Nguon = addNrwCongTyTieuThuChiTiet.Nguon,
                ToanTu = addNrwCongTyTieuThuChiTiet.ToanTu,
                GiaTri = addNrwCongTyTieuThuChiTiet.GiaTri,
                ThuTuHienThi = addNrwCongTyTieuThuChiTiet.ThuTuHienThi,

                GhiChu = addNrwCongTyTieuThuChiTiet.GhiChu,
                NgayTao = addNrwCongTyTieuThuChiTiet.NgayTao,
                NguoiTao = addNrwCongTyTieuThuChiTiet.NguoiTao,
            };

            _context.NrwcongTyTieuThuChiTiets.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaTieuThuNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public ActionResult<NrwCongTyTieuThuChiTiet_ResponeModel> Update(int id, Update_NrwCongTyTieuThuChiTiet_Model updateNrwCongTyTieuThuChiTiet)
        {
            var entity = _context.NrwcongTyTieuThuChiTiets.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.MaTieuThu = updateNrwCongTyTieuThuChiTiet.MaTieuThu;
            entity.Ky = updateNrwCongTyTieuThuChiTiet.Ky;
            entity.Nam = updateNrwCongTyTieuThuChiTiet.Nam;

            entity.Nguon = updateNrwCongTyTieuThuChiTiet.Nguon;
            entity.ToanTu = updateNrwCongTyTieuThuChiTiet.ToanTu;
            entity.GiaTri = updateNrwCongTyTieuThuChiTiet.GiaTri;
            entity.ThuTuHienThi = updateNrwCongTyTieuThuChiTiet.ThuTuHienThi;

            entity.GhiChu = updateNrwCongTyTieuThuChiTiet.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateNrwCongTyTieuThuChiTiet.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaTieuThuNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public ActionResult<NrwCongTyTieuThuChiTiet_ResponeModel> Delete(int id)
        {
            var entity = _context.NrwcongTyTieuThuChiTiets.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.NrwcongTyTieuThuChiTiets.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaTieuThuNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public NrwCongTyTieuThuChiTiet_ResponeModel Post(Add_NrwCongTyTieuThuChiTiet_Model addNrwCongTyTieuThuChiTiet)
        //{
        //    //Map request -> Entity
        //    var nrwCongTyTieuThuChiTiet = new NrwcongTyTieuThuChiTiet()
        //    {
        //        MaTieuThu = addNrwCongTyTieuThuChiTiet.MaTieuThu,
        //        Ky = addNrwCongTyTieuThuChiTiet.Ky,
        //        Nam = addNrwCongTyTieuThuChiTiet.Nam,

        //        Nguon = addNrwCongTyTieuThuChiTiet.Nguon,
        //        ToanTu = addNrwCongTyTieuThuChiTiet.ToanTu,
        //        ThuTuHienThi = addNrwCongTyTieuThuChiTiet.ThuTuHienThi,

        //        GhiChu = addNrwCongTyTieuThuChiTiet.GhiChu,
        //        NgayTao = addNrwCongTyTieuThuChiTiet.NgayTao,
        //        NguoiTao = addNrwCongTyTieuThuChiTiet.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.NrwcongTyTieuThuChiTiets.Add(nrwCongTyTieuThuChiTiet);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new NrwCongTyTieuThuChiTiet_ResponeModel()
        //    {
        //        Id = nrwCongTyTieuThuChiTiet.Id,
        //        MaTieuThu = nrwCongTyTieuThuChiTiet.MaTieuThu,
        //        Ky = nrwCongTyTieuThuChiTiet.Ky,
        //        Nam = nrwCongTyTieuThuChiTiet.Nam,

        //        Nguon = nrwCongTyTieuThuChiTiet.Nguon,
        //        ToanTu = nrwCongTyTieuThuChiTiet.ToanTu,
        //        ThuTuHienThi = nrwCongTyTieuThuChiTiet.ThuTuHienThi,

        //        GhiChu = nrwCongTyTieuThuChiTiet.GhiChu,
        //        NgayTao = nrwCongTyTieuThuChiTiet.NgayTao,
        //        NguoiTao = nrwCongTyTieuThuChiTiet.NguoiTao,
        //        NgayCapNhat = nrwCongTyTieuThuChiTiet.NgayCapNhat,
        //        NguoiCapNhat = nrwCongTyTieuThuChiTiet.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public NrwCongTyTieuThuChiTiet_ResponeModel Update(int id, Update_NrwCongTyTieuThuChiTiet_Model updateNrwCongTyTieuThuChiTiet)
        //{
        //    // Lấy entity từ DB
        //    var nrwCongTyTieuThuChiTiet = _context.NrwcongTyTieuThuChiTiets.FirstOrDefault(e => e.Id == id);

        //    if (nrwCongTyTieuThuChiTiet == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    nrwCongTyTieuThuChiTiet.MaTieuThu = updateNrwCongTyTieuThuChiTiet.MaTieuThu;
        //    nrwCongTyTieuThuChiTiet.Ky = updateNrwCongTyTieuThuChiTiet.Ky;
        //    nrwCongTyTieuThuChiTiet.Nam = updateNrwCongTyTieuThuChiTiet.Nam;

        //    nrwCongTyTieuThuChiTiet.Nguon = updateNrwCongTyTieuThuChiTiet.Nguon;
        //    nrwCongTyTieuThuChiTiet.ToanTu = updateNrwCongTyTieuThuChiTiet.ToanTu;
        //    nrwCongTyTieuThuChiTiet.ThuTuHienThi = updateNrwCongTyTieuThuChiTiet.ThuTuHienThi;

        //    nrwCongTyTieuThuChiTiet.GhiChu = updateNrwCongTyTieuThuChiTiet.GhiChu;
        //    nrwCongTyTieuThuChiTiet.NgayCapNhat = DateTime.Now;
        //    nrwCongTyTieuThuChiTiet.NguoiCapNhat = updateNrwCongTyTieuThuChiTiet.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new NrwCongTyTieuThuChiTiet_ResponeModel
        //    {
        //        Id = nrwCongTyTieuThuChiTiet.Id,
        //        MaTieuThu = nrwCongTyTieuThuChiTiet.MaTieuThu,
        //        Ky = nrwCongTyTieuThuChiTiet.Ky,
        //        Nam = nrwCongTyTieuThuChiTiet.Nam,

        //        Nguon = nrwCongTyTieuThuChiTiet.Nguon,
        //        ToanTu = nrwCongTyTieuThuChiTiet.ToanTu,
        //        ThuTuHienThi = nrwCongTyTieuThuChiTiet.ThuTuHienThi,

        //        GhiChu = nrwCongTyTieuThuChiTiet.GhiChu,
        //        NgayTao = nrwCongTyTieuThuChiTiet.NgayTao,
        //        NguoiTao = nrwCongTyTieuThuChiTiet.NguoiTao,
        //        NgayCapNhat = nrwCongTyTieuThuChiTiet.NgayCapNhat,
        //        NguoiCapNhat = nrwCongTyTieuThuChiTiet.NguoiCapNhat,
        //    };
        //}

        ///// API Delete
        //[HttpDelete]
        //public NrwCongTyTieuThuChiTiet_ResponeModel delete(int id)
        //{
        //    // Lấy entity từ DB
        //    var nrwCongTyTieuThuChiTiet = _context.NrwcongTyTieuThuChiTiets.FirstOrDefault(e => e.Id == id);

        //    if (nrwCongTyTieuThuChiTiet == null) return null;

        //    // Xóa
        //    _context.NrwcongTyTieuThuChiTiets.Remove(nrwCongTyTieuThuChiTiet);
        //    _context.SaveChanges();

        //    // Map sang ResponseModel để trả về
        //    return new NrwCongTyTieuThuChiTiet_ResponeModel
        //    {
        //        Id = nrwCongTyTieuThuChiTiet.Id,
        //        MaTieuThu = nrwCongTyTieuThuChiTiet.MaTieuThu,
        //        Ky = nrwCongTyTieuThuChiTiet.Ky,
        //        Nam = nrwCongTyTieuThuChiTiet.Nam,

        //        Nguon = nrwCongTyTieuThuChiTiet.Nguon,
        //        ToanTu = nrwCongTyTieuThuChiTiet.ToanTu,
        //        ThuTuHienThi = nrwCongTyTieuThuChiTiet.ThuTuHienThi,

        //        GhiChu = nrwCongTyTieuThuChiTiet.GhiChu,
        //        NgayTao = nrwCongTyTieuThuChiTiet.NgayTao,
        //        NguoiTao = nrwCongTyTieuThuChiTiet.NguoiTao,
        //        NgayCapNhat = nrwCongTyTieuThuChiTiet.NgayCapNhat,
        //        NguoiCapNhat = nrwCongTyTieuThuChiTiet.NguoiCapNhat,
        //    };
        //}
    }
}