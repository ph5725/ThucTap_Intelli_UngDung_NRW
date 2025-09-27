// src/config/permissionDataService.ts
import api from "../config/api";

// Role
export interface Role {
  id: number;
  name: string;
}

// Dữ liệu
export interface DataItem {
  id: number;
  name: string;
}

// Payload phân quyền dữ liệu
export interface PermissionPayload {
  roleId: number;
  dataId: number;
  permissions: {
    view: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export const permissionDataService = {
  getRoles: () => api.get<Role[]>("/roles"),
  getDataItems: () => api.get<DataItem[]>("/phanQuyenDuLieu"),
  getPermissions: () => api.get<PermissionPayload[]>("/phanQuyenDuLieu/permissions"),
  applyPermissions: (payload: PermissionPayload[]) =>
    api.post("/phanQuyenDuLieu", payload),
};
