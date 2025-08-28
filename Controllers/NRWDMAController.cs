using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.NrwDma;
using WebAPI_NRW.ResponeModel.NrwDma;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NRWDMAController
    {
        private readonly DbNrwContext _context;

        public NRWDMAController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<NRWDMA_ResponeModel> Get()
        {
            //Linq Query
            var query = from nrwDma in _context.Nrwdmas
                        select new NRWDMA_ResponeModel
                        {
                            Id = nrwDma.Id,
                            MaDma = nrwDma.MaDma,
                            Ky = nrwDma.Ky,
                            Nam = nrwDma.Nam,

                            LuongNuocVao = nrwDma.LuongNuocVao,
                            LuongNuocTieuThu = nrwDma.LuongNuocTieuThu,
                            LuongNuocSucXa = nrwDma.LuongNuocSucXa,
                            LuongNuocThatThoat = nrwDma.LuongNuocThatThoat,

                            TyLeThatThoatKyTruoc = nrwDma.TyLeThatThoatKyTruoc,
                            TyLeThatThoat = nrwDma.TyLeThatThoat,

                            NguyenNhan = nrwDma.NguyenNhan,
                            GhiChu = nrwDma.GhiChu,

                            NgayTao = nrwDma.NgayTao,
                            NguoiTao = nrwDma.NguoiTao,
                            NgayCapNhat = nrwDma.NgayCapNhat,
                            NguoiCapNhat = nrwDma.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Add
        [HttpPost]
        public NRWDMA_ResponeModel Post(Add_NRWDMA_Model addNrwDma)
        {
            //Map request -> Entity
            var nrwDma = new Nrwdma()
            {
                MaDma = addNrwDma.MaDma,
                Ky = addNrwDma.Ky,
                Nam = addNrwDma.Nam,

                LuongNuocVao = addNrwDma.LuongNuocVao,
                LuongNuocTieuThu = addNrwDma.LuongNuocTieuThu,
                LuongNuocSucXa = addNrwDma.LuongNuocThatThoat,
                LuongNuocThatThoat = addNrwDma.LuongNuocThatThoat,

                TyLeThatThoatKyTruoc = addNrwDma.TyLeThatThoatKyTruoc,
                TyLeThatThoat = addNrwDma.TyLeThatThoat,

                NguyenNhan = addNrwDma.NguyenNhan,
                GhiChu = addNrwDma.GhiChu,

                NgayTao = addNrwDma.NgayTao,
                NguoiTao = addNrwDma.NguoiTao,
            };

            //Lưu vào DB
            _context.Nrwdmas.Add(nrwDma);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new NRWDMA_ResponeModel()
            {
                Id = nrwDma.Id,
                MaDma = nrwDma.MaDma,
                Ky = nrwDma.Ky,
                Nam = nrwDma.Nam,

                LuongNuocVao = nrwDma.LuongNuocVao,
                LuongNuocTieuThu = nrwDma.LuongNuocTieuThu,
                LuongNuocSucXa = nrwDma.LuongNuocSucXa,
                LuongNuocThatThoat = nrwDma.LuongNuocThatThoat,

                TyLeThatThoatKyTruoc = nrwDma.TyLeThatThoatKyTruoc,
                TyLeThatThoat = nrwDma.TyLeThatThoat,

                NguyenNhan = nrwDma.NguyenNhan,
                GhiChu = nrwDma.GhiChu,

                NgayTao = nrwDma.NgayTao,
                NguoiTao = nrwDma.NguoiTao,
                NgayCapNhat = nrwDma.NgayCapNhat,
                NguoiCapNhat = nrwDma.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public NRWDMA_ResponeModel Update(int id, Update_NRWDMA_Model updateNrwDma)
        {
            // Lấy entity từ DB
            var nrwDma = _context.Nrwdmas.FirstOrDefault(e => e.Id == id);

            if (nrwDma == null) return null;

            // Gán dữ liệu từ request vào entity
            nrwDma.MaDma = updateNrwDma.MaDma;
            nrwDma.Ky = updateNrwDma.Ky;
            nrwDma.Nam = updateNrwDma.Nam;

            nrwDma.LuongNuocVao = updateNrwDma.LuongNuocVao;
            nrwDma.LuongNuocTieuThu = updateNrwDma.LuongNuocTieuThu;
            nrwDma.LuongNuocSucXa = updateNrwDma.LuongNuocSucXa;
            nrwDma.LuongNuocThatThoat = updateNrwDma.LuongNuocThatThoat;

            nrwDma.TyLeThatThoatKyTruoc = updateNrwDma.TyLeThatThoatKyTruoc;
            nrwDma.TyLeThatThoat = updateNrwDma.TyLeThatThoat;

            nrwDma.NguyenNhan = updateNrwDma.NguyenNhan;
            nrwDma.GhiChu = updateNrwDma.GhiChu;

            nrwDma.NgayCapNhat = DateTime.Now;
            nrwDma.NguoiCapNhat = updateNrwDma.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new NRWDMA_ResponeModel
            {
                Id = nrwDma.Id,
                MaDma = nrwDma.MaDma,
                Ky = nrwDma.Ky,
                Nam = nrwDma.Nam,

                LuongNuocVao = nrwDma.LuongNuocVao,
                LuongNuocTieuThu = nrwDma.LuongNuocTieuThu,
                LuongNuocSucXa = nrwDma.LuongNuocSucXa,
                LuongNuocThatThoat = nrwDma.LuongNuocThatThoat,

                TyLeThatThoatKyTruoc = nrwDma.TyLeThatThoatKyTruoc,
                TyLeThatThoat = nrwDma.TyLeThatThoat,

                NguyenNhan = nrwDma.NguyenNhan,
                GhiChu = nrwDma.GhiChu,

                NgayTao = nrwDma.NgayTao,
                NguoiTao = nrwDma.NguoiTao,
                NgayCapNhat = nrwDma.NgayCapNhat,
                NguoiCapNhat = nrwDma.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public NRWDMA_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var nrwDma = _context.Nrwdmas.FirstOrDefault(e => e.Id == id);

            if (nrwDma == null) return null;

            // Xóa
            _context.Nrwdmas.Remove(nrwDma);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new NRWDMA_ResponeModel
            {
                Id = nrwDma.Id,
                MaDma = nrwDma.MaDma,
                Ky = nrwDma.Ky,
                Nam = nrwDma.Nam,

                LuongNuocVao = nrwDma.LuongNuocVao,
                LuongNuocTieuThu = nrwDma.LuongNuocTieuThu,
                LuongNuocSucXa = nrwDma.LuongNuocSucXa,
                LuongNuocThatThoat = nrwDma.LuongNuocThatThoat,

                TyLeThatThoatKyTruoc = nrwDma.TyLeThatThoatKyTruoc,
                TyLeThatThoat = nrwDma.TyLeThatThoat,

                NguyenNhan = nrwDma.NguyenNhan,
                GhiChu = nrwDma.GhiChu,

                NgayTao = nrwDma.NgayTao,
                NguoiTao = nrwDma.NguoiTao,
                NgayCapNhat = nrwDma.NgayCapNhat,
                NguoiCapNhat = nrwDma.NguoiCapNhat,
            };
        }
    }
}
