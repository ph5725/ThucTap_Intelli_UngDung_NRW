import { createData, updateData, deleteData, getMa } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddNrwCongTyTieuThuChiTietRequest, NrwCongTyTieuThuChiTietResponse, UpdateNrwCongTyTieuThuChiTietRequest } from 'src/types/nrw-cong-ty/nrw-cong-ty-tieu-thu-chi-tiet';
import { ThongTinNguoiDung } from "src/types/authTypes";
//option
import {NGUON_TIEU_THU} from "src/constants/options"

export async function AddTieuThuChiTiet(maDoiTuong: number, ky: number, nam: number, sanLuong: number) {
    const now = new Date().toISOString().split('T')[0];
    const nguonTieuThu: string[] = NGUON_TIEU_THU;
    try {
        // Lấy người dùng từ localStorage
        const nguoiDungStr = localStorage.getItem("nguoiDung");
        let nguoiDung: ThongTinNguoiDung | null = null;
        if (nguoiDungStr) {
            nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
        }

        const responses: NrwCongTyTieuThuChiTietResponse[] = [];
        // Tạo 5 dòng mặc định
        for (let i = 0; i < 6; i++) {
            const payload: AddNrwCongTyTieuThuChiTietRequest = {
                MaTieuThu: maDoiTuong,
                Ky: ky,
                Nam: nam,
                Nguon: nguonTieuThu[i],
                ToanTu: "plus",
                GiaTri: i === 0 ? sanLuong : 0,
                ThuTuHienThi: i + 1, // Tăng từ 1 đến 4
                GhiChu: "",
                NgayTao: now,
                NguoiTao: nguoiDung?.id ?? 1,
            };

            const response = await createData<AddNrwCongTyTieuThuChiTietRequest, NrwCongTyTieuThuChiTietResponse>(apiUrls.NRWCongTyTieuThuChiTiet.create, payload);
            responses.push(response);
        }

        return responses;
    } catch (error) {
        console.error("Lỗi thêm tiêu thụ chi tiết", error);
        throw error;
    }
}
