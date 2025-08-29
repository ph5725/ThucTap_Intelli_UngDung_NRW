using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.NrwCongTy;
using WebAPI_NRW.ResponeModel.NrwCongTy;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NRWCongTyController : ControllerBase
    {
        private readonly DbNrwContext _context;

        public NRWCongTyController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<NRWCongTy_ResponeModel> Get()
        {
            //Linq Query
            var query = from nrwCongTy in _context.NrwcongTies
                        select new NRWCongTy_ResponeModel
                        {
                            Id = nrwCongTy.Id,
                            Ma = nrwCongTy.Ma,
                            Ky = nrwCongTy.Ky,
                            Nam = nrwCongTy.Nam,

                            SanLuongDauVao = nrwCongTy.SanLuongDauVao,
                            SanLuongTieuThu = nrwCongTy.SanLuongTieuThu,
                            LuongNuocThatThoat = nrwCongTy.LuongNuocThatThoat,
                            TyLeThatThoatChuan1 = nrwCongTy.TyLeThatThoatChuan1,
                            TyLeThatThoatChuan2 = nrwCongTy.TyLeThatThoatChuan2,

                            TuNgay = nrwCongTy.TuNgay,
                            DenNgay = nrwCongTy.DenNgay,
                            SoNgayDocSoDht = nrwCongTy.SoNgayDocSoDht,
                            SoNgayDocSoBilling = nrwCongTy.SoNgayDocSoBilling,

                            NguyenNhan = nrwCongTy.NguyenNhan,
                            GhiChu = nrwCongTy.GhiChu,

                            NgayTao = nrwCongTy.NgayTao,
                            NguoiTao = nrwCongTy.NguoiTao,
                            NgayCapNhat = nrwCongTy.NgayCapNhat,
                            NguoiCapNhat = nrwCongTy.NguoiCapNhat,
                        } ;
            return query.ToList();
        }

        /// API Get by id
        [HttpGet("{id}")]
        public ActionResult<NRWCongTy_ResponeModel> Get(int id)
        {
            var nrwCongTy = _context.NrwcongTies.FirstOrDefault(e => e.Id == id);

            if(nrwCongTy == null)
            {
                return NotFound();
            }

            //Map Entity -> ResponseModel để trả về
            var response = new NRWCongTy_ResponeModel()
            {
                Id = nrwCongTy.Id,
                Ma = nrwCongTy.Ma,
                Ky = nrwCongTy.Ky,
                Nam = nrwCongTy.Nam,

                SanLuongDauVao = nrwCongTy.SanLuongDauVao,
                SanLuongTieuThu = nrwCongTy.SanLuongTieuThu,
                LuongNuocThatThoat = nrwCongTy.LuongNuocThatThoat,
                TyLeThatThoatChuan1 = nrwCongTy.TyLeThatThoatChuan1,
                TyLeThatThoatChuan2 = nrwCongTy.TyLeThatThoatChuan2,

                TuNgay = nrwCongTy.TuNgay,
                DenNgay = nrwCongTy.DenNgay,
                SoNgayDocSoDht = nrwCongTy.SoNgayDocSoDht,
                SoNgayDocSoBilling = nrwCongTy.SoNgayDocSoBilling,

                NguyenNhan = nrwCongTy.NguyenNhan,
                GhiChu = nrwCongTy.GhiChu,

                NgayTao = nrwCongTy.NgayTao,
                NguoiTao = nrwCongTy.NguoiTao,
                NgayCapNhat = nrwCongTy.NgayCapNhat,
                NguoiCapNhat = nrwCongTy.NguoiCapNhat,
            };

            return response;
        }

        /// API Add
        [HttpPost]
        public NRWCongTy_ResponeModel Post(Add_NRWCongTy_Model addNrwCongTy)
        {
            //Map request -> Entity
            var nrwCongTy = new NrwcongTy()
            {
                Ma = addNrwCongTy.Ma,
                Ky = addNrwCongTy.Ky,
                Nam = addNrwCongTy.Nam,

                SanLuongDauVao = addNrwCongTy.SanLuongDauVao,
                SanLuongTieuThu = addNrwCongTy.SanLuongTieuThu,
                LuongNuocThatThoat = addNrwCongTy.LuongNuocThatThoat,
                TyLeThatThoatChuan1 = addNrwCongTy.TyLeThatThoatChuan1,
                TyLeThatThoatChuan2 = addNrwCongTy.TyLeThatThoatChuan2,

                TuNgay = addNrwCongTy.TuNgay,
                DenNgay = addNrwCongTy.DenNgay,
                SoNgayDocSoDht = addNrwCongTy.SoNgayDocSoDht,
                SoNgayDocSoBilling = addNrwCongTy.SoNgayDocSoBilling,

                NguyenNhan = addNrwCongTy.NguyenNhan,
                GhiChu = addNrwCongTy.GhiChu,

                NgayTao = addNrwCongTy.NgayTao,
                NguoiTao = addNrwCongTy.NguoiTao,
            };

            //Lưu vào DB
            _context.NrwcongTies.Add(nrwCongTy);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new NRWCongTy_ResponeModel()
            {
                Id = nrwCongTy.Id,
                Ma = nrwCongTy.Ma,
                Ky = nrwCongTy.Ky,
                Nam = nrwCongTy.Nam,

                SanLuongDauVao = nrwCongTy.SanLuongDauVao,
                SanLuongTieuThu = nrwCongTy.SanLuongTieuThu,
                LuongNuocThatThoat = nrwCongTy.LuongNuocThatThoat,
                TyLeThatThoatChuan1 = nrwCongTy.TyLeThatThoatChuan1,
                TyLeThatThoatChuan2 = nrwCongTy.TyLeThatThoatChuan2,

                TuNgay = nrwCongTy.TuNgay,
                DenNgay = nrwCongTy.DenNgay,
                SoNgayDocSoDht = nrwCongTy.SoNgayDocSoDht,
                SoNgayDocSoBilling = nrwCongTy.SoNgayDocSoBilling,

                NguyenNhan = nrwCongTy.NguyenNhan,
                GhiChu = nrwCongTy.GhiChu,

                NgayTao = nrwCongTy.NgayTao,
                NguoiTao = nrwCongTy.NguoiTao,
                NgayCapNhat = nrwCongTy.NgayCapNhat,
                NguoiCapNhat = nrwCongTy.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public NRWCongTy_ResponeModel Update(int id, Update_NRWCongTy_Model updateNrwCongTy)
        {
            // Lấy entity từ DB
            var nrwCongTy = _context.NrwcongTies.FirstOrDefault(e => e.Id == id);

            if (nrwCongTy == null) return null;

            // Gán dữ liệu từ request vào entity
            nrwCongTy.Ma = updateNrwCongTy.Ma;
            nrwCongTy.Ky = updateNrwCongTy.Ky;
            nrwCongTy.Nam = updateNrwCongTy.Nam;

            nrwCongTy.SanLuongDauVao = updateNrwCongTy.SanLuongDauVao;
            nrwCongTy.SanLuongTieuThu = updateNrwCongTy.SanLuongTieuThu;
            nrwCongTy.LuongNuocThatThoat = updateNrwCongTy.LuongNuocThatThoat;
            nrwCongTy.TyLeThatThoatChuan1 = updateNrwCongTy.TyLeThatThoatChuan1;
            nrwCongTy.TyLeThatThoatChuan2 = updateNrwCongTy.TyLeThatThoatChuan2;

            nrwCongTy.TuNgay = updateNrwCongTy.TuNgay;
            nrwCongTy.DenNgay = updateNrwCongTy.DenNgay;
            nrwCongTy.SoNgayDocSoDht = updateNrwCongTy.SoNgayDocSoDht;
            nrwCongTy.SoNgayDocSoBilling = updateNrwCongTy.SoNgayDocSoBilling;

            nrwCongTy.NguyenNhan = updateNrwCongTy.NguyenNhan;
            nrwCongTy.GhiChu = updateNrwCongTy.GhiChu;
            nrwCongTy.NgayCapNhat = DateTime.Now;
            nrwCongTy.NguoiCapNhat = updateNrwCongTy.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new NRWCongTy_ResponeModel
            {
                Id = nrwCongTy.Id,
                Ma = nrwCongTy.Ma,
                Ky = nrwCongTy.Ky,
                Nam = nrwCongTy.Nam,

                SanLuongDauVao = nrwCongTy.SanLuongDauVao,
                SanLuongTieuThu = nrwCongTy.SanLuongTieuThu,
                LuongNuocThatThoat = nrwCongTy.LuongNuocThatThoat,
                TyLeThatThoatChuan1 = nrwCongTy.TyLeThatThoatChuan1,
                TyLeThatThoatChuan2 = nrwCongTy.TyLeThatThoatChuan2,

                TuNgay = nrwCongTy.TuNgay,
                DenNgay = nrwCongTy.DenNgay,
                SoNgayDocSoDht = nrwCongTy.SoNgayDocSoDht,
                SoNgayDocSoBilling = nrwCongTy.SoNgayDocSoBilling,

                NguyenNhan = nrwCongTy.NguyenNhan,
                GhiChu = nrwCongTy.GhiChu,

                NgayTao = nrwCongTy.NgayTao,
                NguoiTao = nrwCongTy.NguoiTao,
                NgayCapNhat = nrwCongTy.NgayCapNhat,
                NguoiCapNhat = nrwCongTy.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public NRWCongTy_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var nrwCongTy = _context.NrwcongTies.FirstOrDefault(e => e.Id == id);

            if (nrwCongTy == null) return null;

            // Xóa
            _context.NrwcongTies.Remove(nrwCongTy);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new NRWCongTy_ResponeModel
            {
                Id = nrwCongTy.Id,
                Ma = nrwCongTy.Ma,
                Ky = nrwCongTy.Ky,
                Nam = nrwCongTy.Nam,

                SanLuongDauVao = nrwCongTy.SanLuongDauVao,
                SanLuongTieuThu = nrwCongTy.SanLuongTieuThu,
                LuongNuocThatThoat = nrwCongTy.LuongNuocThatThoat,
                TyLeThatThoatChuan1 = nrwCongTy.TyLeThatThoatChuan1,
                TyLeThatThoatChuan2 = nrwCongTy.TyLeThatThoatChuan2,

                TuNgay = nrwCongTy.TuNgay,
                DenNgay = nrwCongTy.DenNgay,
                SoNgayDocSoDht = nrwCongTy.SoNgayDocSoDht,
                SoNgayDocSoBilling = nrwCongTy.SoNgayDocSoBilling,

                NguyenNhan = nrwCongTy.NguyenNhan,
                GhiChu = nrwCongTy.GhiChu,

                NgayTao = nrwCongTy.NgayTao,
                NguoiTao = nrwCongTy.NguoiTao,
                NgayCapNhat = nrwCongTy.NgayCapNhat,
                NguoiCapNhat = nrwCongTy.NguoiCapNhat,
            };
        }
    }
}
