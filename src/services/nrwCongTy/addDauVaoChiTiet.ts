import { createData, updateData, deleteData, getMa } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddNrwCongTyDauVaoChiTietRequest, NrwCongTyDauVaoChiTietResponse, UpdateNrwCongTyDauVaoChiTietRequest } from 'src/types/nrw-cong-ty/nrw-cong-ty-dau-vao-chi-tiet';
import { ThongTinNguoiDung } from "src/types/authTypes";
//option
import {NGUON_DAU_VAO} from "src/constants/options"

export async function AddDauVaoChiTiet(maDoiTuong: number, ky: number, nam: number, sanLuong: number) {
    const now = new Date().toISOString().split('T')[0];
    const nguonDauVao: string[] = NGUON_DAU_VAO;
    try {
        // Lấy người dùng từ localStorage
        const nguoiDungStr = localStorage.getItem("nguoiDung");
        let nguoiDung: ThongTinNguoiDung | null = null;
        if (nguoiDungStr) {
            nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
        }

        const responses: NrwCongTyDauVaoChiTietResponse[] = [];
        // Tạo 5 dòng mặc định
        for (let i = 0; i < 5; i++) {
            const payload: AddNrwCongTyDauVaoChiTietRequest = {
                MaDauVao: maDoiTuong,
                Ky: ky,
                Nam: nam,
                Nguon: nguonDauVao[i],
                ToanTu: i % 2 === 0 ? "plus" : "minus", // Dòng 1 và 3: plus, dòng 2 và 4: minus
                GiaTri: i === 0 ? sanLuong : 0,
                ThuTuHienThi: i + 1, // Tăng từ 1 đến 4
                GhiChu: "",
                NgayTao: now,
                NguoiTao: nguoiDung?.id ?? 1,
            };

            const response = await createData<AddNrwCongTyDauVaoChiTietRequest, NrwCongTyDauVaoChiTietResponse>(apiUrls.NRWCongTyDauVaoChiTiet.create, payload);
            responses.push(response);
        }

        return responses;
    } catch (error) {
        console.error("Lỗi thêm đầu vào chi tiết", error);
        throw error;
    }
}

// export async function AddDauVaoChiTiet(maDoiTuong: number, ky: number, nam: number) {
//     const now = new Date().toISOString().split('T')[0]
//     try {
//         // Lấy người dùng từ localStorage
//         const nguoiDungStr = localStorage.getItem("nguoiDung");
//         let nguoiDung: ThongTinNguoiDung | null = null;
//         if (nguoiDungStr) {
//             nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
//         }

//         // Merge payload với các thông tin chung
//         const payload: AddNrwCongTyDauVaoChiTietRequest = {
//             MaDauVao: maDoiTuong,
//             Ky: ky,
//             Nam: nam,
//             Nguon: "Sản lượng đồng hồ tổng",
//             ToanTu: "plus",
//             GiaTri: 0,
//             ThuTuHienThi: 1,
//             GhiChu: "",
//             NgayTao: now,
//             NguoiTao: nguoiDung?.id ?? 1,
//         };

//         const response = await createData<AddNrwCongTyDauVaoChiTietRequest, NrwCongTyDauVaoChiTietResponse>(apiUrls.NRWCongTyDauVaoChiTiet.create, payload);
//         return response;
//     } catch (error) {
//         console.error("Lỗi thêm đầu vào chi tiết", error);
//         throw error;
//     }
// }
