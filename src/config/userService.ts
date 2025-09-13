// src/services/userService.ts
import api from "../config/api";
import { apiUrls } from "../config/apiUrls";

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
  getAll: () => api.get(apiUrls.NguoiDung.list),
  getById: (id: number) => api.get(apiUrls.NguoiDung.detail(id)),
  create: (data: Partial<UserInfo>) => api.post(apiUrls.NguoiDung.create, data),
  update: (id: number, data: Partial<UserInfo>) =>
    api.put(apiUrls.NguoiDung.update(id), data),
  delete: (id: number) => api.delete(apiUrls.NguoiDung.delete(id)),
};
