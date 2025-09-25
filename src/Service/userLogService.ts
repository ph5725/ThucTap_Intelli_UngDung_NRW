// src/Service/userLogService.ts
import api from "../config/api";

// Kiểu đầy đủ (server trả về)
export interface UserLog {
  id: number;
  user: string;
  action: string;
  feature: string;
  data?: string;
  status: "Thành công" | "Thất bại" | "Chưa xác định";
  createdBy: string;
  updatedByUser?: string;
  createdAt: string;
  updatedAt?: string;
  note?: string;
}

// Kiểu tạo mới (FE gửi lên, bao gồm metadata FE tự sinh)
export type UserLogCreate = Omit<UserLog, "id">;

// Kiểu update (FE chỉ gửi những field cần thay đổi)
export type UserLogUpdate = Partial<Omit<UserLog, "id" | "createdAt" | "createdBy">>;

export const userLogService = {
  getAll: () => api.get<UserLog[]>("/nhatKySuDung"),
  getById: (id: number) => api.get<UserLog>(`/nhatKySuDung/${id}`),
  create: (data: UserLogCreate) => api.post<UserLog>("/nhatKySuDung", data),
  update: (id: number, data: UserLogUpdate) => api.put<UserLog>(`/nhatKySuDung/${id}`, data),
  delete: (id: number) => api.delete<void>(`/nhatKySuDung/${id}`),
};
