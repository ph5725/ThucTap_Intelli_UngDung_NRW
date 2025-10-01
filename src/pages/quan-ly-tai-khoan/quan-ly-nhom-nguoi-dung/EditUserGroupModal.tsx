import React, { useState } from "react";
import { NhomNguoiDungResponse, UpdateNhomNguoiDungRequest } from "src/types/nguoi-dung/nhom-nguoi-dung";
import { updateData } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
import { TextForms } from "src/constants/text";

interface EditUserGroupModalProps {
  userId: number;
  group: NhomNguoiDungResponse; // <-- dùng NhomNguoiDungResponse
  onClose: () => void;
  onSave: (updated: NhomNguoiDungResponse) => void;
}

const EditUserGroupModal: React.FC<EditUserGroupModalProps> = ({ group, onClose, onSave }) => {
  const [formData, setFormData] = useState<NhomNguoiDungResponse>({ ...group });

  const handleChange = <K extends keyof NhomNguoiDungResponse>(field: K, value: NhomNguoiDungResponse[K]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (!formData?.id) return;

    try {
      // Tạo payload gửi lên backend
      const userId = localStorage.getItem("userId"); 
      const payload: UpdateNhomNguoiDungRequest = {
        nhomNguoiDung1: formData.nhomNguoiDung1,
        thanhVien: formData.thanhVien,
        ghiChu: formData.ghiChu,
        ngayCapNhat: new Date().toISOString(),
        nguoiCapNhat: String(userId),
      };

      // URL update dựa vào Id
      const url = apiUrls.NhomNguoiDung.update(formData.id);

      // Gọi API
      const updated: NhomNguoiDungResponse = await updateData<UpdateNhomNguoiDungRequest, NhomNguoiDungResponse>(
        url,
        payload
      );

      onSave(updated);
      onClose();
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật nhóm:", error);
      alert(TextForms.thongBao.loiCapNhat);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Chỉnh Sửa Nhóm Người Dùng</h3>
        <label>Nhóm Người Dùng</label>
        <input value={formData.nhomNguoiDung1} onChange={e => handleChange("nhomNguoiDung1", e.target.value)} />
        <label>Thành Viên</label>
        <input value={formData.thanhVien} onChange={e => handleChange("thanhVien", e.target.value)} />
        <label>Ghi Chú</label>
        <textarea value={formData.ghiChu} onChange={e => handleChange("ghiChu", e.target.value)} rows={3} />

        <label>Ngày Tạo</label>
        <input type="text" value={formData.ngayTao} readOnly />
        <label>Ngày Cập Nhật</label>
        <input type="text" value={formData.ngayCapNhat} readOnly />
        <label>Ngày Tao</label>
        <input type="text" value={formData.nguoiTao} readOnly />
        <label>Người Cập Nhật</label>
        <input type="text" value={formData.nguoiCapNhat} readOnly />
        <div className="form-actions">
          <button className="btn save" onClick={handleSave}>{TextForms.nut.luu}</button>
          <button className="btn close" onClick={onClose}>{TextForms.nut.huyBo}</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserGroupModal;
