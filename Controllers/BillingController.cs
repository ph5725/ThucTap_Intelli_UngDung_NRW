using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_NRW.MapToResponse;
using WebAPI_NRW.Models;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.RequestModel.DanhSach;
using WebAPI_NRW.RequestModel.HeThongBilling;
using WebAPI_NRW.ResponeModel.DanhSach;
using WebAPI_NRW.ResponeModel.HeThongBilling;
using WebAPI_NRW.ResponeModel.PhanQuyen;
//using static Grpc.Core.Metadata;

namespace WebAPI_NRW.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class BillingController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public BillingController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get all
        [HttpGet]
        public ActionResult<IEnumerable<Billing_ResponeModel>> Get()
        {
            var list = _context.Billings
                .Include(billing => billing.NguoiTaoNavigation)
                .Include(billing => billing.NguoiCapNhatNavigation)
                .AsNoTracking()
                .Select(e => e.MapToResponse())
                .ToList();

            return Ok(list);
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<Billing_ResponeModel> GetById(int id)
        {
            var entity = _context.Billings
                .Include(billing => billing.NguoiTaoNavigation)
                .Include(billing => billing.NguoiCapNhatNavigation)
                .AsNoTracking()
                .FirstOrDefault(billing => billing.Id == id);

            if (entity == null) return NotFound();

            return Ok(entity.MapToResponse());
        }

        /// API Add
        [HttpPost]
        public ActionResult<Billing_ResponeModel> Post(Add_Billing_Model addBilling)
        {
            var entity = new Billing
            {
                SanLuongTieuThu = addBilling.SanLuongTieuThu,
                MaDoiTuong = addBilling.MaDoiTuong,
                Ky = addBilling.Ky,
                Nam = addBilling.Nam,
                Dot = addBilling.Dot,
                TuNgay = addBilling.TuNgay,
                DenNgay = addBilling.DenNgay,
                GhiChu = addBilling.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = addBilling.NguoiTao,
            };

            _context.Billings.Add(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity.MapToResponse());
        }

        /// API Update
        [HttpPut("{id}")]
        public ActionResult<Billing_ResponeModel> Update(int id, Update_Billing_Model updateBilling)
        {
            var entity = _context.Billings.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            // Gán dữ liệu từ request vào entity
            entity.SanLuongTieuThu = updateBilling.SanLuongTieuThu;
            entity.MaDoiTuong = updateBilling.MaDoiTuong;
            entity.Ky = updateBilling.Ky;
            entity.Nam = updateBilling.Nam;
            entity.Dot = updateBilling.Dot;
            entity.TuNgay = updateBilling.TuNgay;
            entity.DenNgay = updateBilling.DenNgay;
            entity.GhiChu = updateBilling.GhiChu;
            entity.NgayCapNhat = DateTime.Now;
            entity.NguoiCapNhat = updateBilling.NguoiCapNhat;

            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        /// API Delete
        [HttpDelete("{id}")]
        public ActionResult<Billing_ResponeModel> Delete(int id)
        {
            var entity = _context.Billings.FirstOrDefault(e => e.Id == id);
            if (entity == null) return NotFound();

            _context.Billings.Remove(entity);
            _context.SaveChanges();

            // load lại navigation properties
            _context.Entry(entity).Reference(e => e.NguoiTaoNavigation).Load();
            _context.Entry(entity).Reference(e => e.NguoiCapNhatNavigation).Load();

            return Ok(entity.MapToResponse());
        }

        //    private Billing_ResponeModel MapToResponse(Billing billing)
        //    {
        //        return new Billing_ResponeModel
        //        {
        //            Id = billing.Id,
        //            SanLuongTieuThu = billing.SanLuongTieuThu,
        //            MaDoiTuong = billing.MaDoiTuong,
        //            Ky = billing.Ky,
        //            Nam = billing.Nam,
        //            Dot = billing.Dot,
        //            TuNgay = billing.TuNgay,
        //            DenNgay = billing.DenNgay,
        //            GhiChu = billing.GhiChu,
        //            NgayTao = billing.NgayTao,
        //            NguoiTao = billing.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
        //            NgayCapNhat = billing.NgayCapNhat,
        //            NguoiCapNhat = billing.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
        //        };
        //    }

        //    /// API Get
        //    [HttpGet]
        //    public ActionResult<Billing_ResponeModel> Get()
        //    {
        //        //return _context.Billings.ToList();

        //        //Linq Query
        //        //var query = from billing in _context.Billings
        //        //    select new Billing_ResponeModel
        //        //    {
        //        //        Id = billing.Id,
        //        //        SanLuongTieuThu = billing.SanLuongTieuThu,
        //        //        MaDoiTuong = billing.MaDoiTuong,
        //        //        Ky = billing.Ky,
        //        //        Nam = billing.Nam,
        //        //        Dot = billing.Dot,
        //        //        TuNgay = billing.TuNgay,
        //        //        DenNgay = billing.DenNgay,
        //        //        GhiChu = billing.GhiChu,
        //        //        NgayTao = billing.NgayTao,
        //        //        NguoiTao = billing.NguoiTao,
        //        //        NgayCapNhat = billing.NgayCapNhat,
        //        //        NguoiCapNhat = billing.NguoiCapNhat,
        //        //    };
        //        //return query.ToList();

        //        var query = _context.Billings
        //    .Include(billing => billing.NguoiTaoNavigation)
        //    .Include(billing => billing.NguoiCapNhatNavigation)
        //    .Select(billing => new Billing_ResponeModel
        //    {
        //        Id = billing.Id,
        //        SanLuongTieuThu = billing.SanLuongTieuThu,
        //        MaDoiTuong = billing.MaDoiTuong,
        //        Ky = billing.Ky,
        //        Nam = billing.Nam,
        //        Dot = billing.Dot,
        //        TuNgay = billing.TuNgay,
        //        DenNgay = billing.DenNgay,
        //        GhiChu = billing.GhiChu,
        //        NgayTao = billing.NgayTao,
        //        NguoiTao = billing.NguoiTaoNavigation != null ? billing.NguoiTaoNavigation.TenNguoiDung : "N/A",
        //        NgayCapNhat = billing.NgayCapNhat,
        //        NguoiCapNhat = billing.NguoiCapNhatNavigation != null ? billing.NguoiCapNhatNavigation.TenNguoiDung : "N/A"
        //    })
        //    .ToList();

        //        return Ok(query);
        //    }

        //    // API Get by Id
        //    [HttpGet("{id}")]
        //    public ActionResult<Billing_ResponeModel> GetById(int id)
        //    {
        //        //var billing = _context.Billings.FirstOrDefault(e => e.Id == id);

        //        //if (billing == null)
        //        //{
        //        //    return NotFound(); // trả về 404 nếu không tìm thấy
        //        //}

        //        //// Map sang ResponseModel để trả về
        //        //var response = new Billing_ResponeModel()
        //        //{
        //        //    Id = billing.Id,
        //        //    SanLuongTieuThu = billing.SanLuongTieuThu,
        //        //    MaDoiTuong = billing.MaDoiTuong,
        //        //    Ky = billing.Ky,
        //        //    Nam = billing.Nam,
        //        //    Dot = billing.Dot,
        //        //    TuNgay = billing.TuNgay,
        //        //    DenNgay = billing.DenNgay,
        //        //    GhiChu = billing.GhiChu,
        //        //    NgayTao = billing.NgayTao,
        //        //    NguoiTao = billing.NguoiTao,
        //        //    NgayCapNhat = billing.NgayCapNhat,
        //        //    NguoiCapNhat = billing.NguoiCapNhat,
        //        //};

        //        var billingById = _context.Billings
        //    .Include(b => b.NguoiTaoNavigation)
        //    .Include(b => b.NguoiCapNhatNavigation)
        //    .FirstOrDefault(e => e.Id == id);

        //        if (billingById == null)
        //        {
        //            return NotFound(new { message = "Không tìm thấy dữ liệu" });
        //        }

        //        var response = new Billing_ResponeModel
        //        {
        //            Id = billingById.Id,
        //            SanLuongTieuThu = billingById.SanLuongTieuThu,
        //            MaDoiTuong = billingById.MaDoiTuong,
        //            Ky = billingById.Ky,
        //            Nam = billingById.Nam,
        //            Dot = billingById.Dot,
        //            TuNgay = billingById.TuNgay,
        //            DenNgay = billingById.DenNgay,
        //            GhiChu = billingById.GhiChu,
        //            NgayTao = billingById.NgayTao,
        //            NguoiTao = billingById.NguoiTaoNavigation?.TenNguoiDung ?? "Không xác định",
        //            NgayCapNhat = billingById.NgayCapNhat,
        //            NguoiCapNhat = billingById.NguoiCapNhatNavigation?.TenNguoiDung ?? "Không xác định"
        //        };

        //        return Ok(response);
        //    }

        //    /// API Add
        //    [HttpPost]
        //    public ActionResult<Billing_ResponeModel> Post(Add_Billing_Model addBilling)
        //    {
        //        //Map request -> Entity
        //        var billing = new Billing()
        //        {
        //            SanLuongTieuThu = addBilling.SanLuongTieuThu,
        //            MaDoiTuong = addBilling.MaDoiTuong,
        //            Ky = addBilling.Ky,
        //            Nam = addBilling.Nam,
        //            Dot = addBilling.Dot,
        //            TuNgay = addBilling.TuNgay,
        //            DenNgay = addBilling.DenNgay,
        //            GhiChu = addBilling.GhiChu,
        //            NgayTao = DateTime.Now,
        //            NguoiTao = addBilling.NguoiTao,
        //        };

        //        //Lưu vào DB
        //        _context.Billings.Add(billing);
        //        _context.SaveChanges();

        //        //Map Entity -> ResponseModel để trả về
        //        //    var newBilling = _context.Billings
        //        //.Include(b => b.NguoiTaoNavigation)
        //        //.Include(b => b.NguoiCapNhatNavigation)
        //        //.FirstOrDefault(e => e.Id == billing.Id);

        //        //    if (newBilling == null)
        //        //    {
        //        //        return NotFound(new { message = "Không tìm thấy dữ liệu" });
        //        //    }

        //        var response = new Billing_ResponeModel
        //        {
        //            Id = newBilling.Id,
        //            SanLuongTieuThu = newBilling.SanLuongTieuThu,
        //            MaDoiTuong = newBilling.MaDoiTuong,
        //            Ky = newBilling.Ky,
        //            Nam = newBilling.Nam,
        //            Dot = newBilling.Dot,
        //            TuNgay = newBilling.TuNgay,
        //            DenNgay = newBilling.DenNgay,
        //            GhiChu = newBilling.GhiChu,
        //            NgayTao = newBilling.NgayTao,
        //            NguoiTao = newBilling.NguoiTaoNavigation?.TenNguoiDung ?? "N/A",
        //            NgayCapNhat = newBilling.NgayCapNhat,
        //            NguoiCapNhat = newBilling.NguoiCapNhatNavigation?.TenNguoiDung ?? "N/A"
        //        };

        //        return CreatedAtAction(nameof(GetById), new { id = bill.Id }, response);
        //    }

        //    /// API Update
        //    [HttpPut]
        //    public Billing_ResponeModel Update(int id, Update_Billing_Model updateBilling)
        //    {
        //        //Billing_ResponeModel? billing = _context.Billings.FirstOrDefault(e => e.Id == id);
        //        //if (billing != null)
        //        //{
        //        //    billing.SanLuongTieuThu = updateBilling.SanLuongTieuThu;
        //        //    billing.MaDoiTuong = updateBilling.MaDoiTuong;
        //        //    billing.Ky = updateBilling.Ky;
        //        //    billing.Nam = updateBilling.Nam;
        //        //    billing.Dot = updateBilling.Dot;
        //        //    billing.TuNgay = updateBilling.TuNgay;
        //        //    billing.DenNgay = updateBilling.DenNgay;
        //        //    billing.GhiChu = updateBilling.GhiChu;
        //        //    billing.NgayCapNhat = DateTime.Now;
        //        //    billing.NguoiCapNhat = updateBilling.NguoiCapNhat;
        //        //    _context.SaveChanges();
        //        //}
        //        //return billing!;

        //        // Lấy entity Billing từ DB
        //        var billing = _context.Billings.FirstOrDefault(e => e.Id == id);

        //        if (billing == null) return null;

        //        // Gán dữ liệu từ request vào entity
        //        billing.SanLuongTieuThu = updateBilling.SanLuongTieuThu;
        //        billing.MaDoiTuong = updateBilling.MaDoiTuong;
        //        billing.Ky = updateBilling.Ky;
        //        billing.Nam = updateBilling.Nam;
        //        billing.Dot = updateBilling.Dot;
        //        billing.TuNgay = updateBilling.TuNgay;
        //        billing.DenNgay = updateBilling.DenNgay;
        //        billing.GhiChu = updateBilling.GhiChu;
        //        billing.NgayCapNhat = DateTime.Now;
        //        billing.NguoiCapNhat = updateBilling.NguoiCapNhat;

        //        _context.SaveChanges();

        //        // Map entity -> response model
        //        return new Billing_ResponeModel
        //        {
        //            Id = billing.Id,
        //            SanLuongTieuThu = billing.SanLuongTieuThu,
        //            MaDoiTuong = billing.MaDoiTuong,
        //            Ky = billing.Ky,
        //            Nam = billing.Nam,
        //            Dot = billing.Dot,
        //            TuNgay = billing.TuNgay,
        //            DenNgay = billing.DenNgay,
        //            GhiChu = billing.GhiChu,
        //            NgayTao = billing.NgayTao,
        //            NguoiTao = billing.NguoiTao,
        //            NgayCapNhat = billing.NgayCapNhat,
        //            NguoiCapNhat = billing.NguoiCapNhat
        //        };
        //    }

        //    /// API Delete
        //    [HttpDelete]
        //    public Billing_ResponeModel delete(int id)
        //    {
        //        //Billing_ResponeModel? billing = _context.Billings.FirstOrDefault(e => e.Id == id);
        //        //if (billing != null)
        //        //{
        //        //    _context.Remove(billing);
        //        //    _context.SaveChanges();
        //        //}
        //        //return billing!;

        //        // Lấy entity Billing từ DB
        //        var billing = _context.Billings.FirstOrDefault(e => e.Id == id);

        //        if (billing == null) return null;

        //        // Xóa
        //        _context.Billings.Remove(billing);
        //        _context.SaveChanges();

        //        // Map sang ResponseModel để trả về
        //        return new Billing_ResponeModel
        //        {
        //            Id = billing.Id,
        //            SanLuongTieuThu = billing.SanLuongTieuThu,
        //            MaDoiTuong = billing.MaDoiTuong,
        //            Ky = billing.Ky,
        //            Nam = billing.Nam,
        //            Dot = billing.Dot,
        //            TuNgay = billing.TuNgay,
        //            DenNgay = billing.DenNgay,
        //            GhiChu = billing.GhiChu,
        //            NgayTao = billing.NgayTao,
        //            NguoiTao = billing.NguoiTao,
        //            NgayCapNhat = billing.NgayCapNhat,
        //            NguoiCapNhat = billing.NguoiCapNhat
        //        };
        //    }

    }
}