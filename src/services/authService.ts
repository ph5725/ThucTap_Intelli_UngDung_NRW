import api from "src/config/api";
import { apiUrls } from "src/config/apiUrls";
import { LoginResponse } from "src/types/authTypes";

// Kiểu dữ liệu đầu vào
export interface LoginPayload {
  tenNguoiDung: string;
  matKhau: string;
}

// Hàm đăng nhập
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(apiUrls.TaiKhoan.dangNhap, payload);

    // Lưu token vào localStorage (hoặc sessionStorage nếu muốn)
    if (response.data.token) {
      localStorage.setItem("access_token", response.data.token);
    }

    // Lưu luôn thông tin user nếu cần
    localStorage.setItem("user_info", JSON.stringify(response.data.nguoiDung));

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Đăng nhập thất bại" };
  }
};
