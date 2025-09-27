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

    public class NrwCongTyDauVaoChiTietController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public NrwCongTyDauVaoChiTietController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get all
        [HttpGet]
        public ActionResult<IEnumerable<NrwCongTyDauVaoChiTiet_ResponeModel>> Get()
        {
            var list = _context.NrwcongTyDauVaoChiTiets
                .Include(nrwCongTyDauVaoChiTiet => nrwCongTyDauVaoChiTiet.MaDauVaoNavigation)
                .Include(nrwCongTyDauVaoChiTiet => nrwCongTyDauVaoChiTiet.NguoiTaoNavigation)
                .Include(nrwCongTyDauVaoChiTiet => nrwCongTyDauVaoChiTiet.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<NrwCongTyDauVaoChiTiet_ResponeModel> GetById(int id)
        {
            var entity = _context.NrwcongTyDauVaoChiTiets
                .Include(nrwCongTyDauVaoChiTiet => nrwCongTyDauVaoChiTiet.MaDauVaoNavigation)
                .Include(nrwCongTyDauVaoChiTiet => nrwCongTyDauVaoChiTiet.NguoiTaoNavigation)
                .Include(nrwCongTyDauVaoChiTiet => nrwCongTyDauVaoChiTiet.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(nrwCongTyDauVaoChiTiet => nrwCongTyDauVaoChiTiet.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public ActionResult<NrwCongTyDauVaoChiTiet_ResponeModel> Post(Add_NrwCongTyDauVaoChiTiet_Model addNrwCongTyDauVaoChiTiet)
        {
            var entity = new NrwcongTyDauVaoChiTiet
            {
                MaDauVao = addNrwCongTyDauVaoChiTiet.MaDauVao,
                Ky = addNrwCongTyDauVaoChiTiet.Ky,
                Nam = addNrwCongTyDauVaoChiTiet.Nam,

                Nguon = addNrwCongTyDauVaoChiTiet.Nguon,
                ToanTu = addNrwCongTyDauVaoChiTiet.ToanTu,
                GiaTri = addNrwCongTyDauVaoChiTiet.GiaTri,
                ThuTuHienThi = addNrwCongTyDauVaoChiTiet.ThuTuHienThi,

                GhiChu = addNrwCongTyDauVaoChiTiet.GhiChu,
                NgayTao = addNrwCongTyDauVaoChiTiet.NgayTao,
                NguoiTao = addNrwCongTyDauVaoChiTiet.NguoiTao,
            };

            _context.NrwcongTyDauVaoChiTiets.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDauVaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public ActionResult<NrwCongTyDauVaoChiTiet_ResponeModel> Update(int id, Update_NrwCongTyDauVaoChiTiet_Model updateNrwCongTyDauVaoChiTiet)
        {
            var entity = _context.NrwcongTyDauVaoChiTiets.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.MaDauVao = updateNrwCongTyDauVaoChiTiet.MaDauVao;
            entity.Ky = updateNrwCongTyDauVaoChiTiet.Ky;
            entity.Nam = updateNrwCongTyDauVaoChiTiet.Nam;

            entity.Nguon = updateNrwCongTyDauVaoChiTiet.Nguon;
            entity.ToanTu = updateNrwCongTyDauVaoChiTiet.ToanTu;
            entity.GiaTri = updateNrwCongTyDauVaoChiTiet.GiaTri;
            entity.ThuTuHienThi = updateNrwCongTyDauVaoChiTiet.ThuTuHienThi;

            entity.GhiChu = updateNrwCongTyDauVaoChiTiet.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateNrwCongTyDauVaoChiTiet.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDauVaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public ActionResult<NrwCongTyDauVaoChiTiet_ResponeModel> Delete(int id)
        {
            var entity = _context.NrwcongTyDauVaoChiTiets.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.NrwcongTyDauVaoChiTiets.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.MaDauVaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        ///// API Add
        //[HttpPost]
        //public NrwCongTyDauVaoChiTiet_ResponeModel Post(Add_NrwCongTyDauVaoChiTiet_Model addNrwCongTyDauVaoChiTiet)
        //{
        //    //Map request -> Entity
        //    var nrwCongTyDauVaoChiTiet = new NrwcongTyDauVaoChiTiet()
        //    {
        //        MaDauVao = addNrwCongTyDauVaoChiTiet.MaDauVao,
        //        Ky = addNrwCongTyDauVaoChiTiet.Ky,
        //        Nam = addNrwCongTyDauVaoChiTiet.Nam,

        //        Nguon = addNrwCongTyDauVaoChiTiet.Nguon,
        //        ToanTu = addNrwCongTyDauVaoChiTiet.ToanTu,
        //        ThuTuHienThi = addNrwCongTyDauVaoChiTiet.ThuTuHienThi,

        //        GhiChu = addNrwCongTyDauVaoChiTiet.GhiChu,
        //        NgayTao = addNrwCongTyDauVaoChiTiet.NgayTao,
        //        NguoiTao = addNrwCongTyDauVaoChiTiet.NguoiTao,
        //    };

        //    //Lưu vào DB
        //    _context.NrwcongTyDauVaoChiTiets.Add(nrwCongTyDauVaoChiTiet);
        //    _context.SaveChanges();

        //    //Map Entity -> ResponseModel để trả về
        //    var response = new NrwCongTyDauVaoChiTiet_ResponeModel()
        //    {
        //        Id = nrwCongTyDauVaoChiTiet.Id,
        //        MaDauVao = nrwCongTyDauVaoChiTiet.MaDauVao,
        //        Ky = nrwCongTyDauVaoChiTiet.Ky,
        //        Nam = nrwCongTyDauVaoChiTiet.Nam,

        //        Nguon = nrwCongTyDauVaoChiTiet.Nguon,
        //        ToanTu = nrwCongTyDauVaoChiTiet.ToanTu,
        //        ThuTuHienThi = nrwCongTyDauVaoChiTiet.ThuTuHienThi,

        //        GhiChu = nrwCongTyDauVaoChiTiet.GhiChu,
        //        NgayTao = nrwCongTyDauVaoChiTiet.NgayTao,
        //        NguoiTao = nrwCongTyDauVaoChiTiet.NguoiTao,
        //        NgayCapNhat = nrwCongTyDauVaoChiTiet.NgayCapNhat,
        //        NguoiCapNhat = nrwCongTyDauVaoChiTiet.NguoiCapNhat,
        //    };

        //    return response;
        //}

        ///// API Update
        //[HttpPut]
        //public NrwCongTyDauVaoChiTiet_ResponeModel Update(int id, Update_NrwCongTyDauVaoChiTiet_Model updateNrwCongTyDauVaoChiTiet)
        //{
        //    // Lấy entity từ DB
        //    var nrwCongTyDauVaoChiTiet = _context.NrwcongTyDauVaoChiTiets.FirstOrDefault(e => e.Id == id);

        //    if (nrwCongTyDauVaoChiTiet == null) return null;

        //    // Gán dữ liệu từ request vào entity
        //    nrwCongTyDauVaoChiTiet.MaDauVao = updateNrwCongTyDauVaoChiTiet.MaDauVao;
        //    nrwCongTyDauVaoChiTiet.Ky = updateNrwCongTyDauVaoChiTiet.Ky;
        //    nrwCongTyDauVaoChiTiet.Nam = updateNrwCongTyDauVaoChiTiet.Nam;

        //    nrwCongTyDauVaoChiTiet.Nguon = updateNrwCongTyDauVaoChiTiet.Nguon;
        //    nrwCongTyDauVaoChiTiet.ToanTu = updateNrwCongTyDauVaoChiTiet.ToanTu;
        //    nrwCongTyDauVaoChiTiet.ThuTuHienThi = updateNrwCongTyDauVaoChiTiet.ThuTuHienThi;

        //    nrwCongTyDauVaoChiTiet.GhiChu = updateNrwCongTyDauVaoChiTiet.GhiChu;
        //    nrwCongTyDauVaoChiTiet.NgayCapNhat = DateTime.Now;
        //    nrwCongTyDauVaoChiTiet.NguoiCapNhat = updateNrwCongTyDauVaoChiTiet.NguoiCapNhat;

        //    _context.SaveChanges();

        //    // Map entity -> response model
        //    return new NrwCongTyDauVaoChiTiet_ResponeModel
        //    {
        //        Id = nrwCongTyDauVaoChiTiet.Id,
        //        MaDauVao = nrwCongTyDauVaoChiTiet.MaDauVao,
        //        Ky = nrwCongTyDauVaoChiTiet.Ky,
        //        Nam = nrwCongTyDauVaoChiTiet.Nam,

        //        Nguon = nrwCongTyDauVaoChiTiet.Nguon,
        //        ToanTu = nrwCongTyDauVaoChiTiet.ToanTu,
        //        ThuTuHienThi = nrwCongTyDauVaoChiTiet.ThuTuHienThi,

        //        GhiChu = nrwCongTyDauVaoChiTiet.GhiChu,
        //        NgayTao = nrwCongTyDauVaoChiTiet.NgayTao,
        //        NguoiTao = nrwCongTyDauVaoChiTiet.NguoiTao,
        //        NgayCapNhat = nrwCongTyDauVaoChiTiet.NgayCapNhat,
        //        NguoiCapNhat = nrwCongTyDauVaoChiTiet.NguoiCapNhat,
        //    };
        //}
    }
}
