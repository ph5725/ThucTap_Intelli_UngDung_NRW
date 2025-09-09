export const apiUrls = {
    apiKey: '',
    clientType: '',

    // XÁC THỰC, BẢO MẬT
    // 1. Tài khoản
    TaiKhoan: {
        dangNhap: "",
        dangXuat: "",
        doiMatKhau: "",
    },

    // QUNẢN LÝ NGƯỜI DÙNG
    // 2. Người dùng
    NguoiDung: {
        list: "/nguoiDung",                               // GET tất cả
        create: "/nguoiDung",                             // POST thêm mới
        detail: (id: number) => `/nguoiDung/${id}`,       // GET theo id
        update: (id: number) => `/nguoiDung/${id}`,       // PUT theo id
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
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },

    // QUẢN LÝ PHÂN QUYỀN
    // 5. Phân quyền tính năng
    PhanQuyenTinhNang: {
        list: "/phanQuyenSuDung",                       // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },
    // 6. Phân quyền dữ liệu
    PhanQuyenDuLieu: {
        list: "/phanQuyenDuLieu",                       // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },

    // QUẢN LÝ DỮ LIỆU SẢN LƯỢNG NGÀY CỦA CÁC ĐỒNG HỒ TỔNG
    // 7. Đồng hồ tổng
    DongHoTong: {
        list: "/dongHoTong",                            // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },
    // 8. Cấu hình đồng hồ tổng
    CauHinhDHT: {
        list: "/cauHinhDht",                            // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },

    // QUẢN LÝ SỐ NGÀY ĐỌC SỐ HỆ THỐNG BILLING
    // 9. Billing
    Billing: {
        list: "/billing",                               // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },
    // 10. DS Ngày đọc số Billing
    DSNgayDocSoBilling: {
        list: "/dsNgayDocSoBilling",                    // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },
    //11. DS Ngày đọc số Billing chi tiết
    DSNgayDocSoBillingChiTiet: {
        list: "/dsNgayDocSoBillingChiTiet",             // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },

    // TÍNH TOÁN THẤT THOÁT NƯỚC CẤP CÔNG TY
    // 12. NRW Công ty
    NRWCongTy: {
        list: "/nrwCongTy",                             // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },
    // 13. NRW Công ty đầu vào chi tiết
    NRWCongTyDauVaoChiTiet: {
        list: "/nrwCongTyDauVaoChiTiet",                // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },
    // 14. NRW Công ty tiêu thụ chi tiết
    NRWCongTyTieuThuChiTiet: {
        list: "/nrwCongTyTieuThuChiTiet",               // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },

    // TÍNH TOÁN THẤT THOÁT NƯỚC CẤP DMA
    // 15. DS DMA
    DSDMA: {
        list: "/dsDma",                                 // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },
    // 16. NRW DMA
    NRWDMA: {
        list: "/nrwDma",                                // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },
    // 17. NRW DMA đầu vào chi tiết
    NRWDMADauVaoChiTiet: {
        list: "/nrwDmaDauVaoChiTiet",                   // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },
    // 18. NRW DMA tiêu thụ chi tiết
    NRWDMATieuThuChiTiet: {
        list: "/nrwDmaTieuThuChiTiet",                  // GET tất cả
        create: "/billing",                             // POST thêm mới
        detail: (id: number) => `/billing/${id}`,       // GET theo id
        update: (id: number) => `/billing/${id}`,       // PUT theo id
        delete: (id: number) => `/billing/${id}`,       // DELETE theo id
    },
};
