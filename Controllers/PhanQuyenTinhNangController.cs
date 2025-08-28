using Microsoft.AspNetCore.Mvc;
using WebAPI_NRW.Models;
using WebAPI_NRW.RequestModel.PhanQuyen;
using WebAPI_NRW.ResponeModel.PhanQuyen;

namespace WebAPI_NRW.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PhanQuyenTinhNangController
    {
        private readonly DbNrwContext _context;

        public PhanQuyenTinhNangController(DbNrwContext dbcontext)
        {
            _context = dbcontext;
        }

        /// API Get
        [HttpGet]
        public IEnumerable<PhanQuyenTinhNang_ResponeModel> Get()
        {
            //Linq Query
            var query = from phanQuyenTinhNang in _context.PhanQuyenTinhNangs
                        select new PhanQuyenTinhNang_ResponeModel
                        {
                            Id = phanQuyenTinhNang.Id,
                            NhomNguoiDung = phanQuyenTinhNang.NhomNguoiDung,

                            DongHoTong = phanQuyenTinhNang.DongHoTong,
                            CauHinhDht = phanQuyenTinhNang.CauHinhDht,

                            Dsdma = phanQuyenTinhNang.Dsdma,
                            NrwcongTy = phanQuyenTinhNang.NrwcongTy,
                            Nrwdma = phanQuyenTinhNang.Nrwdma,
                            DsngayDocSoBilling = phanQuyenTinhNang.DsngayDocSoBilling,

                            NguoiDung = phanQuyenTinhNang.NguoiDung,
                            NhomNguoiDungTinhNang = phanQuyenTinhNang.NhomNguoiDungTinhNang,
                            NhatKySuDung = phanQuyenTinhNang.NhatKySuDung,
                            PhanQuyen = phanQuyenTinhNang.PhanQuyen,

                            NgayTao = phanQuyenTinhNang.NgayTao,
                            NguoiTao = phanQuyenTinhNang.NguoiTao,
                            NgayCapNhat = phanQuyenTinhNang.NgayCapNhat,
                            NguoiCapNhat = phanQuyenTinhNang.NguoiCapNhat,
                        };
            return query.ToList();
        }

        /// API Add
        [HttpPost]
        public PhanQuyenTinhNang_ResponeModel Post(Add_PhanQuyenTinhNang_Model addPhanQuyenTinhNang)
        {
            //Map request -> Entity
            var phanQuyenTinhNang = new PhanQuyenTinhNang()
            {
                NhomNguoiDung = addPhanQuyenTinhNang.NhomNguoiDung,

                DongHoTong = addPhanQuyenTinhNang.DongHoTong,
                CauHinhDht = addPhanQuyenTinhNang.CauHinhDht,

                Dsdma = addPhanQuyenTinhNang.Dsdma,
                NrwcongTy = addPhanQuyenTinhNang.NrwcongTy,
                Nrwdma = addPhanQuyenTinhNang.Nrwdma,
                DsngayDocSoBilling = addPhanQuyenTinhNang.DsngayDocSoBilling,

                NguoiDung = addPhanQuyenTinhNang.NguoiDung,
                NhomNguoiDungTinhNang = addPhanQuyenTinhNang.NhomNguoiDung,
                NhatKySuDung = addPhanQuyenTinhNang.NhatKySuDung,
                PhanQuyen = addPhanQuyenTinhNang.PhanQuyen,

                NgayTao = addPhanQuyenTinhNang.NgayTao,
                NguoiTao = addPhanQuyenTinhNang.NguoiTao,
            };

            //Lưu vào DB
            _context.PhanQuyenTinhNangs.Add(phanQuyenTinhNang);
            _context.SaveChanges();

            //Map Entity -> ResponseModel để trả về
            var response = new PhanQuyenTinhNang_ResponeModel()
            {
                Id = phanQuyenTinhNang.Id,
                NhomNguoiDung = phanQuyenTinhNang.NhomNguoiDung,

                DongHoTong = phanQuyenTinhNang.DongHoTong,
                CauHinhDht = phanQuyenTinhNang.CauHinhDht,

                Dsdma = phanQuyenTinhNang.Dsdma,
                NrwcongTy = phanQuyenTinhNang.NrwcongTy,
                Nrwdma = phanQuyenTinhNang.Nrwdma,
                DsngayDocSoBilling = phanQuyenTinhNang.DsngayDocSoBilling,

                NguoiDung = phanQuyenTinhNang.NguoiDung,
                NhomNguoiDungTinhNang = phanQuyenTinhNang.NhomNguoiDungTinhNang,
                NhatKySuDung = phanQuyenTinhNang.NhatKySuDung,
                PhanQuyen = phanQuyenTinhNang.PhanQuyen,

                NgayTao = phanQuyenTinhNang.NgayTao,
                NguoiTao = phanQuyenTinhNang.NguoiTao,
                NgayCapNhat = phanQuyenTinhNang.NgayCapNhat,
                NguoiCapNhat = phanQuyenTinhNang.NguoiCapNhat,
            };

            return response;
        }

        /// API Update
        [HttpPut]
        public PhanQuyenTinhNang_ResponeModel Update(int id, Update_PhanQuyenTinhNang_Model updatePhanQuyenTinhNang)
        {
            // Lấy entity từ DB
            var phanQuyenTinhNang = _context.PhanQuyenTinhNangs.FirstOrDefault(e => e.Id == id);

            if (phanQuyenTinhNang == null) return null;

            // Gán dữ liệu từ request vào entity
            phanQuyenTinhNang.NhomNguoiDung = updatePhanQuyenTinhNang.NhomNguoiDung;

            phanQuyenTinhNang.DongHoTong = updatePhanQuyenTinhNang.DongHoTong;
            phanQuyenTinhNang.CauHinhDht = updatePhanQuyenTinhNang.CauHinhDht;

            phanQuyenTinhNang.Dsdma = updatePhanQuyenTinhNang.Dsdma;
            phanQuyenTinhNang.NrwcongTy = updatePhanQuyenTinhNang.NrwcongTy;
            phanQuyenTinhNang.Nrwdma = updatePhanQuyenTinhNang.Nrwdma;
            phanQuyenTinhNang.DsngayDocSoBilling = updatePhanQuyenTinhNang.PhanQuyen;

            phanQuyenTinhNang.NguoiDung = updatePhanQuyenTinhNang.NguoiDung;
            phanQuyenTinhNang.NhomNguoiDungTinhNang = updatePhanQuyenTinhNang.NhomNguoiDungTinhNang;
            phanQuyenTinhNang.NhatKySuDung = updatePhanQuyenTinhNang.NhatKySuDung;
            phanQuyenTinhNang.PhanQuyen = updatePhanQuyenTinhNang.PhanQuyen;

            phanQuyenTinhNang.NgayCapNhat = DateTime.Now;
            phanQuyenTinhNang.NguoiCapNhat = updatePhanQuyenTinhNang.NguoiCapNhat;

            _context.SaveChanges();

            // Map entity -> response model
            return new PhanQuyenTinhNang_ResponeModel
            {
                Id = phanQuyenTinhNang.Id,
                NhomNguoiDung = phanQuyenTinhNang.NhomNguoiDung,

                DongHoTong = phanQuyenTinhNang.DongHoTong,
                CauHinhDht = phanQuyenTinhNang.CauHinhDht,

                Dsdma = phanQuyenTinhNang.Dsdma,
                NrwcongTy = phanQuyenTinhNang.NrwcongTy,
                Nrwdma = phanQuyenTinhNang.Nrwdma,
                DsngayDocSoBilling = phanQuyenTinhNang.DsngayDocSoBilling,

                NguoiDung = phanQuyenTinhNang.NguoiDung,
                NhomNguoiDungTinhNang = phanQuyenTinhNang.NhomNguoiDungTinhNang,
                NhatKySuDung = phanQuyenTinhNang.NhatKySuDung,
                PhanQuyen = phanQuyenTinhNang.PhanQuyen,

                NgayTao = phanQuyenTinhNang.NgayTao,
                NguoiTao = phanQuyenTinhNang.NguoiTao,
                NgayCapNhat = phanQuyenTinhNang.NgayCapNhat,
                NguoiCapNhat = phanQuyenTinhNang.NguoiCapNhat,
            };
        }

        /// API Delete
        [HttpDelete]
        public PhanQuyenTinhNang_ResponeModel delete(int id)
        {
            // Lấy entity từ DB
            var phanQuyenTinhNang = _context.PhanQuyenTinhNangs.FirstOrDefault(e => e.Id == id);

            if (phanQuyenTinhNang == null) return null;

            // Xóa
            _context.PhanQuyenTinhNangs.Remove(phanQuyenTinhNang);
            _context.SaveChanges();

            // Map sang ResponseModel để trả về
            return new PhanQuyenTinhNang_ResponeModel
            {
                Id = phanQuyenTinhNang.Id,
                NhomNguoiDung = phanQuyenTinhNang.NhomNguoiDung,

                DongHoTong = phanQuyenTinhNang.DongHoTong,
                CauHinhDht = phanQuyenTinhNang.CauHinhDht,

                Dsdma = phanQuyenTinhNang.Dsdma,
                NrwcongTy = phanQuyenTinhNang.NrwcongTy,
                Nrwdma = phanQuyenTinhNang.Nrwdma,
                DsngayDocSoBilling = phanQuyenTinhNang.DsngayDocSoBilling,

                NguoiDung = phanQuyenTinhNang.NguoiDung,
                NhomNguoiDungTinhNang = phanQuyenTinhNang.NhomNguoiDungTinhNang,
                NhatKySuDung = phanQuyenTinhNang.NhatKySuDung,
                PhanQuyen = phanQuyenTinhNang.PhanQuyen,

                NgayTao = phanQuyenTinhNang.NgayTao,
                NguoiTao = phanQuyenTinhNang.NguoiTao,
                NgayCapNhat = phanQuyenTinhNang.NgayCapNhat,
                NguoiCapNhat = phanQuyenTinhNang.NguoiCapNhat,
            };
        }
    }
}