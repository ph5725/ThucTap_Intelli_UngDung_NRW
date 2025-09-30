import api from "src/services/api";
import { apiUrls } from "src/services/apiUrls";
import { DangNhapResponse } from "src/types/authTypes";
import { DangNhapRequest } from "src/types/authTypes";

// Hàm đăng nhập
export const login = async (payload: DangNhapRequest): Promise<DangNhapResponse> => {
  try {
    console.log("Đang gọi api đăng nhập");
    const response = await api.post<DangNhapResponse>(apiUrls.TaiKhoan.dangNhap, payload);

    /* Lưu vào localStorage */
    // Lưu token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    console.log("Kết quả token: ", response.data.token);
    console.log("Kết quả id người dùng: ", response.data.nguoiDung.id);
    // Lưu thời gian hết hạn
    localStorage.setItem("token_exp", response.data.expiresIn.toString());

    // Lưu thông tin người dùng
    localStorage.setItem("nguoiDung", JSON.stringify(response.data.nguoiDung));

    // Lưu nhóm người dùng
    localStorage.setItem("nhomNguoiDung", JSON.stringify(response.data.nhomNguoiDung));

    // Lưu phân quyền dữ liệu
    localStorage.setItem("phanQuyenDuLieu", JSON.stringify(response.data.phanQuyenDuLieu));

    // Lưu phân quyền tính năng
    localStorage.setItem("phanQuyenTinhNang", JSON.stringify(response.data.phanQuyenTinhNang));

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response?.data || { message: "Đăng nhập thất bại" };
  }
};

