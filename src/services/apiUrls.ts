export const apiUrls = {
    apiKey: '',
    clientType: '',

    // XÁC THỰC, BẢO MẬT
    // 1. Tài khoản
    TaiKhoan: {
        dangNhap: "/DangNhap/login", //POST
        dangXuat: "/logout",
        doiMatKhau: (tenTaiKhoan: string) => `/doiMatKhau?tenNguoiDung=${tenTaiKhoan}`,
        layTaiKhoanHienTai: (tenTaiKhoan: string) => `/doiMatKhau/${tenTaiKhoan}`,
    },

    // QUẢN LÝ NGƯỜI DÙNG
    // 2. Người dùng
    NguoiDung: {
        list: "/nguoiDung",                               // GET tất cả
        create: "/nguoiDung",                             // POST thêm mới
        detail: (id: number) => `/nguoiDung/${id}`,       // GET theo id
        update: (id: number) => `/nguoiDung/${id}`,       // PUT theo id
        lockUser: (id: number) => `/nguoiDung/${id}`,     // PUT theo id
        delete: (id: number) => `/nguoiDung/${id}`,       // DELETE theo id
    },
    // 3. Nhóm người dùng
    NhomNguoiDung: {
        list: "/nhomNguoiDung",                               // GET tất cả
        create: "/nhomNguoiDung",                             // POST thêm mới
        detail: (id: number) => `/nhomNguoiDung/${id}`,       // GET theo id
        update: (id: number) => `/nhomNguoiDung/${id}`,       // PUT theo id
        delete: (id: number) => `/nhomNguoiDung/${id}`,       // DELETE theo id
    },
    // 4. Nhật ký sử dụng
    NhatKySuDung: {
        list: "/nhatKySuDung",                          // GET tất cả
        create: "/nhatKySuDung",                             // POST thêm mới
        detail: (id: number) => `/nhatKySuDung/${id}`,       // GET theo id
        update: (id: number) => `/nhatKySuDung/${id}`,       // PUT theo id
        delete: (id: number) => `/nhatKySuDung/${id}`,       // DELETE theo id
    },

    // QUẢN LÝ PHÂN QUYỀN
    // 5. Phân quyền tính năng
    PhanQuyenTinhNang: {
        list: "/phanQuyenTinhNang",                       // GET tất cả
        create: "/phanQuyenTinhNang",                             // POST thêm mới
        detail: (id: number) => `/phanQuyenTinhNang/${id}`,       // GET theo id
        update: (id: number) => `/phanQuyenTinhNang/${id}`,       // PUT theo id
        delete: (id: number) => `/phanQuyenTinhNang/${id}`,       // DELETE theo id
    },
    // 6. Phân quyền dữ liệu
    PhanQuyenDuLieu: {
        list: "/phanQuyenDuLieu",                       // GET tất cả
        create: "/phanQuyenDuLieu",                             // POST thêm mới
        detail: (id: number) => `/phanQuyenDuLieu/${id}`,       // GET theo id
        update: (id: number) => `/phanQuyenDuLieu/${id}`,       // PUT theo id
        delete: (id: number) => `/phanQuyenDuLieu/${id}`,       // DELETE theo id
    },

    // QUẢN LÝ DỮ LIỆU SẢN LƯỢNG NGÀY CỦA CÁC ĐỒNG HỒ TỔNG
    // 7. Đồng hồ tổng
    DongHoTong: {
        list: "/dongHoTong",                            // GET tất cả
        create: "/dongHoTong",                             // POST thêm mới
        detail: (id: number) => `/dongHoTong/${id}`,       // GET theo id
        update: (id: number) => `/dongHoTong/${id}`,       // PUT theo id
        delete: (id: number) => `/dongHoTong/${id}`,       // DELETE theo id
        tongSanLuong: "/DongHoTong/TongSanLuong", // POST tổng sản lượng
    },
    // 8. Cấu hình đồng hồ tổng
    CauHinhDHT: {
        list: "/cauHinhDht",                            // GET tất cả
        create: "/cauHinhDht",                             // POST thêm mới
        detail: (id: number) => `/cauHinhDht/${id}`,       // GET theo id
        update: (id: number) => `/cauHinhDht/${id}`,       // PUT theo id
        delete: (id: number) => `/cauHinhDht/${id}`,       // DELETE theo id
    },

    // QUẢN LÝ SỐ NGÀY ĐỌC SỐ HỆ THỐNG BILLING
    // 9. Billing
    Billing: {
        list: "/billing",                               // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
        sanLuongTieuThu: "/Billing/GetSanLuong", // POST sản lượng tiêu thụ
    },
    // 10. DS Ngày đọc số Billing
    DSNgayDocSoBilling: {
        list: "/dsNgayDocSoBilling",                    // GET tất cả
        create: "/dsNgayDocSoBilling",                             // POST thêm mới
        detail: (id: number) => `/dsNgayDocSoBilling/${id}`,       // GET theo id
        update: (id: number) => `/dsNgayDocSoBilling/${id}`,       // PUT theo id
        delete: (id: number) => `/dsNgayDocSoBilling/${id}`,       // DELETE theo id
        soNgayDocSo: "/DsNgayDocSoBilling/GetSoNgayDocSo", // POST sản lượng tiêu thụ
    },
    //11. DS Ngày đọc số Billing chi tiết
    DSNgayDocSoBillingChiTiet: {
        list: "/dsNgayDocSoBillingChiTiet",             // GET tất cả
        create: "/dsNgayDocSoBillingChiTiet",                             // POST thêm mới
        detail: (id: number) => `/dsNgayDocSoBillingChiTiet/${id}`,       // GET theo id
        update: (id: number) => `/dsNgayDocSoBillingChiTiet/${id}`,       // PUT theo id
        delete: (id: number) => `/dsNgayDocSoBillingChiTiet/${id}`,       // DELETE theo id
    },

    // TÍNH TOÁN THẤT THOÁT NƯỚC CẤP CÔNG TY
    // 12. NRW Công ty
    NRWCongTy: {
        list: "/NrwCongTy",                             // GET tất cả
        create: "/NrwCongTy",                             // POST thêm mới
        detail: (id: number) => `/NrwCongTy/${id}`,       // GET theo id
        update: (id: number) => `/NrwCongTy/${id}`,       // PUT theo id
        delete: (id: number) => `/NrwCongTy/${id}`,       // DELETE theo id
    },
    // 13. NRW Công ty đầu vào chi tiết
    NRWCongTyDauVaoChiTiet: {
        list: "/nrwCongTyDauVaoChiTiet",                // GET tất cả
        create: "/nrwCongTyDauVaoChiTiet",                             // POST thêm mới
        detail: (id: number) => `/NrwCongTyDauVaoChiTiet/by-id/${id}`,       // GET theo id
        update: (id: number) => `/nrwCongTyDauVaoChiTiet/${id}`,       // PUT theo id
        delete: (id: number) => `/nrwCongTyDauVaoChiTiet/${id}`,       // DELETE theo id
        byMaDauVao: (maDauVao: number) => `/NrwCongTyDauVaoChiTiet/by-ma/${maDauVao}`,    
        deleteByMaDauVao: (maDauVao: number) => `NrwCongTyDauVaoChiTiet/by-maDauVao/${maDauVao}`,    // GET theo maDauVao
    },
    // 14. NRW Công ty tiêu thụ chi tiết
    NRWCongTyTieuThuChiTiet: {
        list: "/nrwCongTyTieuThuChiTiet",               // GET tất cả
        create: "/nrwCongTyTieuThuChiTiet",                             // POST thêm mới
        detail: (id: number) => `/nrwCongTyTieuThuChiTiet/${id}`,       // GET theo id
        update: (id: number) => `/nrwCongTyTieuThuChiTiet/${id}`,       // PUT theo id
        delete: (id: number) => `/nrwCongTyTieuThuChiTiet/${id}`,       // DELETE theo id
        byMaTieuThu: (maTieuThu: number) => `/NrwCongTyTieuThuChiTiet/by-ma/${maTieuThu}`,       // GET theo maTieuThu
        deleteByMaTieuThu: (maTieuThu: number) => `NrwCongTyTieuThuChiTiet/by-maTieuThu/${maTieuThu}`,  
    },

    // TÍNH TOÁN THẤT THOÁT NƯỚC CẤP DMA
    // 15. DS DMA
    DSDMA: {
        list: "/dsDma",                                 // GET tất cả
        create: "/dsDma",                             // POST thêm mới
        detail: (id: number) => `/dsDma/${id}`,       // GET theo id
        update: (id: number) => `/dsDma/${id}`,       // PUT theo id
        delete: (id: number) => `/dsDma/${id}`,       // DELETE theo id
    },
    // 16. NRW DMA
    NRWDMA: {
        list: "/nrwDma",                                // GET tất cả
        create: "/nrwDma",                             // POST thêm mới
        detail: (id: number) => `/nrwDma/${id}`,       // GET theo id
        update: (id: number) => `/nrwDma/${id}`,       // PUT theo id
        delete: (id: number) => `/nrwDma/${id}`,       // DELETE theo id
    },
    // 17. NRW DMA đầu vào chi tiết
    NRWDMADauVaoChiTiet: {
        list: "/nrwDmaDauVaoChiTiet",                   // GET tất cả
        create: "/nrwDmaDauVaoChiTiet",                             // POST thêm mới
        detail: (id: number) => `/nrwDmaDauVaoChiTiet/${id}`,       // GET theo id
        update: (id: number) => `/nrwDmaDauVaoChiTiet/${id}`,       // PUT theo id
        delete: (id: number) => `/nrwDmaDauVaoChiTiet/${id}`,       // DELETE theo id
    },
    // 18. NRW DMA tiêu thụ chi tiết
    NRWDMATieuThuChiTiet: {
        list: "/nrwDmaTieuThuChiTiet",                  // GET tất cả
        create: "/nrwDmaTieuThuChiTiet",                             // POST thêm mới
        detail: (id: number) => `/nrwDmaTieuThuChiTiet/${id}`,       // GET theo id
        update: (id: number) => `/nrwDmaTieuThuChiTiet/${id}`,       // PUT theo id
        delete: (id: number) => `/nrwDmaTieuThuChiTiet/${id}`,       // DELETE theo id
    },
};
