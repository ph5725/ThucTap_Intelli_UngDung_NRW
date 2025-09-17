// src/config/userService.ts
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

  create: (data: Partial<UserInfo> | FormData) =>
    api.post("/nguoiDung", data, {
      headers:
        data instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
    }),

  update: (id: number, data: Partial<UserInfo> | FormData) =>
    api.put(`/nguoiDung/${id}`, data, {
      headers:
        data instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
    }),

  delete: (id: number) => api.delete(`/nguoiDung/${id}`),
};
