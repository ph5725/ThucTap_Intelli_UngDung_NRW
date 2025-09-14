import api from "../config/api";

export interface UserInfo {
  id: number;
  code: string;
  username: string;
  fullname: string;
  password: string;
  email: string;
  role: string;
  permissions: string[];
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export const userService = {
  getAll: () => api.get("/nguoiDung"),
  getById: (id: number) => api.get(`/nguoiDung/${id}`),
  create: (data: Partial<UserInfo>) => api.post("/nguoiDung", data),
  update: (id: number, data: Partial<UserInfo>) => api.put(`/nguoiDung/${id}`, data),
  delete: (id: number) => api.delete(`/nguoiDung/${id}`),
};
