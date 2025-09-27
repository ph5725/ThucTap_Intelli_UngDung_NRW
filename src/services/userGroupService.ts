// src/services/userGroupService.ts
import api from "../config/api";

export interface UserGroup {
  id: number;
  groupName: string;
  members: string;
  createdAt: string;
  updatedAt: string;
  note: string;
}

export const userGroupService = {
  getAll: () => api.get<UserGroup[]>("/nhomNguoiDung"),
  getById: (id: number) => api.get<UserGroup>(`/nhomNguoiDung/${id}`),
  create: (data: Partial<UserGroup>) => api.post("/nhomNguoiDung", data),
  update: (id: number, data: Partial<UserGroup>) =>
    api.put(`/nhomNguoiDung/${id}`, data),
  delete: (id: number) => api.delete(`/nhomNguoiDung/${id}`),
};
