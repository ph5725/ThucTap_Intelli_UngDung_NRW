// src/config/permissionFeatureService.ts
import api from "../config/api";

export interface Role {
  id: number;
  name: string;
}

export interface Feature {
  id: number;
  name: string;
}

export interface FeaturePermissionPayload {
  roleId: number;
  feature: string; // backend trả tên feature
  permissions: {
    view: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export const permissionFeatureService = {
  getFeatures: () => api.get<Feature[]>("/phanQuyenTinhNang/list"),
  getPermissions: () =>
    api.get<FeaturePermissionPayload[]>("/phanQuyenTinhNang/list"),
  applyPermissions: (payload: FeaturePermissionPayload[]) =>
    api.post("/phanQuyenTinhNang", payload),
};
