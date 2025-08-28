using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.HeThongBilling;
using WebAPI_NRW.ResponeModel.HeThongBilling;
//using static Grpc.Core.Metadata;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BillingController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public BillingController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<Billing_ResponeModel> Get()
        {
            //return _context.Billings.ToList();

            //Linq Query
            var query = from billing in _context.Billings
                select new Billing_ResponeModel
                {
                    Id = billing.Id,
                    SanLuongTieuThu = billing.SanLuongTieuThu,
                    MaDoiTuong = billing.MaDoiTuong,
                    Ky = billing.Ky,
                    Nam = billing.Nam,
                    Dot = billing.Dot,
                    TuNgay = billing.TuNgay,
                    DenNgay = billing.DenNgay,
                    GhiChu = billing.GhiChu,
                    NgayTao = billing.NgayTao,
                    NguoiTao = billing.NguoiTao,
                    NgayCapNhat = billing.NgayCapNhat,
                    NguoiCapNhat = billing.NguoiCapNhat,
                };
            return query.ToList();
        }

        /// API Add
        [HttpPost]
        public Billing_ResponeModel Post(Add_Billing_Model addBilling)
        {
            //Map request -> Entity
            var billing = new Billing()
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

            //Lưu vào DB
            _context.Billings.Add(billing);
            _context.SaveChanges();


            //Map Entity -> ResponseModel để trả về
            var response = new Billing_ResponeModel()
            {
                Id = billing.Id,
                SanLuongTieuThu = billing.SanLuongTieuThu,
                MaDoiTuong = billing.MaDoiTuong,
                Ky = billing.Ky,
                Nam = billing.Nam,
                Dot = billing.Dot,
                TuNgay = billing.TuNgay,
                DenNgay = billing.DenNgay,
                GhiChu = billing.GhiChu,
                NgayTao = billing.NgayTao,
                NguoiTao = billing.NguoiTao,
                NgayCapNhat = billing.NgayCapNhat,
                NguoiCapNhat = billing.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public Billing_ResponeModel Update(int id, Update_Billing_Model updateBilling)
        {
            //Billing_ResponeModel? billing = _context.Billings.FirstOrDefault(e => e.Id == id);
            //if (billing != null)
            //{
            //    billing.SanLuongTieuThu = updateBilling.SanLuongTieuThu;
            //    billing.MaDoiTuong = updateBilling.MaDoiTuong;
            //    billing.Ky = updateBilling.Ky;
            //    billing.Nam = updateBilling.Nam;
            //    billing.Dot = updateBilling.Dot;
            //    billing.TuNgay = updateBilling.TuNgay;
            //    billing.DenNgay = updateBilling.DenNgay;
            //    billing.GhiChu = updateBilling.GhiChu;
            //    billing.NgayCapNhat = DateTime.Now;
            //    billing.NguoiCapNhat = updateBilling.NguoiCapNhat;
            //    _context.SaveChanges();
            //}
            //return billing!;

            // Lấy entity Billing từ DB
            var billing = _context.Billings.FirstOrDefault(e => e.Id == id);

            if (billing == null) return null;

            // Gán dữ liệu từ request vào entity
            billing.SanLuongTieuThu = updateBilling.SanLuongTieuThu;
            billing.MaDoiTuong = updateBilling.MaDoiTuong;
            billing.Ky = updateBilling.Ky;
            billing.Nam = updateBilling.Nam;
            billing.Dot = updateBilling.Dot;
            billing.TuNgay = updateBilling.TuNgay;
            billing.DenNgay = updateBilling.DenNgay;
            billing.GhiChu = updateBilling.GhiChu;
            billing.NgayCapNhat = DateTime.Now;
            billing.NguoiCapNhat = updateBilling.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new Billing_ResponeModel
            {
                Id = billing.Id,
                SanLuongTieuThu = billing.SanLuongTieuThu,
                MaDoiTuong = billing.MaDoiTuong,
                Ky = billing.Ky,
                Nam = billing.Nam,
                Dot = billing.Dot,
                TuNgay = billing.TuNgay,
                DenNgay = billing.DenNgay,
                GhiChu = billing.GhiChu,
                NgayTao = billing.NgayTao,
                NguoiTao = billing.NguoiTao,
                NgayCapNhat = billing.NgayCapNhat,
                NguoiCapNhat = billing.NguoiCapNhat
            };
        }

        /// API Delete
        [HttpDelete]
        public Billing_ResponeModel delete(int id)
        {
            //Billing_ResponeModel? billing = _context.Billings.FirstOrDefault(e => e.Id == id);
            //if (billing != null)
            //{
            //    _context.Remove(billing);
            //    _context.SaveChanges();
            //}
            //return billing!;

            // Lấy entity Billing từ DB
            var billing = _context.Billings.FirstOrDefault(e => e.Id == id);

            if (billing == null) return null;

            // Xóa
            _context.Billings.Remove(billing);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new Billing_ResponeModel
            {
                Id = billing.Id,
                SanLuongTieuThu = billing.SanLuongTieuThu,
                MaDoiTuong = billing.MaDoiTuong,
                Ky = billing.Ky,
                Nam = billing.Nam,
                Dot = billing.Dot,
                TuNgay = billing.TuNgay,
                DenNgay = billing.DenNgay,
                GhiChu = billing.GhiChu,
                NgayTao = billing.NgayTao,
                NguoiTao = billing.NguoiTao,
                NgayCapNhat = billing.NgayCapNhat,
                NguoiCapNhat = billing.NguoiCapNhat
            };
        }
    }
}