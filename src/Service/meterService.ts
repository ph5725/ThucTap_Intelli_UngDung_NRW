import api from "../config/api"; // axios instance

// Interface đồng hồ tổng
export interface Meter {
  id: number;
  code: string;
  name: string;
  volume: number;
  status: "Hoạt động" | "Cảnh báo" | "Lỗi";
  locked?: boolean;

  // 📌 Metadata sản lượng
  recordDate: string;        // ngày ghi sản lượng
  updatedDate: string;       // ngày chỉnh sửa sản lượng
  updatedBy: string;         // người chỉnh sửa sản lượng

  errorFlag: boolean;
  note: string;

  // 📌 Metadata hệ thống
  createdAt: string;         // ngày tạo
  createdBy: string;         // người tạo
  updatedAt: string;         // ngày cập nhật
  updatedByUser: string;     // người chỉnh sửa cuối cùng
}

const BASE_URL = "/dongHoTong";

export const meterService = {
  // Lấy tất cả đồng hồ
  getAll: () => api.get<Meter[]>(BASE_URL),

  // Lấy chi tiết 1 đồng hồ theo id
  getById: (id: number) => api.get<Meter>(`${BASE_URL}/${id}`),

  // Thêm mới đồng hồ
  create: (data: Omit<Meter, "id">) => {
    return api.post<Meter>(BASE_URL, data);
  },

  // Cập nhật đồng hồ
  update: (id: number, data: Partial<Meter>) => {
    return api.put<Meter>(`${BASE_URL}/${id}`, data);
  },

  // Xóa đồng hồ
  delete: (id: number) => api.delete(`${BASE_URL}/${id}`),
};
