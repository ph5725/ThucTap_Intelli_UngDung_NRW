// src/services/crudService.ts
import api from "src/services/api";



// Lấy danh sách
export const getList = async <TResponse>(
  url: string
): Promise<TResponse[]> => {
  const response = await api.get<TResponse[]>(url);
  return response.data;
};

// Lấy chi tiết
export const getById = async <TResponse>(
  url: string,
  // id: number | string
): Promise<TResponse> => {
  const response = await api.get<TResponse>(`${url}`);
  return response.data;
};

// Thêm mới
export const createData = async <TRequest, TResponse>(
  url: string,
  payload: TRequest
): Promise<TResponse> => {
  const response = await api.post<TResponse>(url, payload);
  return response.data;
};

// Cập nhật
export const updateData = async <TRequest, TResponse>(
  url: string,
  payload: TRequest
): Promise<TResponse> => {
  const response = await api.put<TResponse>(`${url}`, payload);
  return response.data;
};

// Xóa
export const deleteData = async (
  url: string,
//   id: number | string
): Promise<void> => {
  await api.delete(`${url}`);
};
