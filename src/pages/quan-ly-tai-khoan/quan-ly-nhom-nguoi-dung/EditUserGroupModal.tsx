import React, { useState } from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";
import { userGroupService, type UserGroup } from "../../../services/userGroupService";

interface EditUserGroupModalProps {
  group: UserGroup;
  onClose: () => void;
  onSave: () => void; // reload list
}

const EditUserGroupModal: React.FC<EditUserGroupModalProps> = ({ group, onClose, onSave }) => {
  const [formData, setFormData] = useState<UserGroup>({ ...group });

  const handleChange = <K extends keyof UserGroup>(field: K, value: UserGroup[K]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      // 🔹 Frontend tự sinh updatedAt
      const payload = {
        groupName: formData.groupName,
        members: formData.members,
        note: formData.note,
        updatedAt: new Date().toISOString(),
        createdAt: formData.createdAt, // giữ nguyên
      };

      await userGroupService.update(formData.id, payload);

      onSave();
      onClose();
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật nhóm:", error);
      alert("Có lỗi xảy ra khi cập nhật nhóm!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="text-user">
          <h3>Chỉnh Sửa Nhóm Người Dùng</h3>
        </div>

        <label>Nhóm Người Dùng</label>
        <input
          type="text"
          value={formData.groupName}
          onChange={(e) => handleChange("groupName", e.target.value)}
        />

        <label>Thành Viên</label>
        <input
          type="text"
          value={formData.members}
          onChange={(e) => handleChange("members", e.target.value)}
          placeholder="Nhập danh sách thành viên, cách nhau bằng dấu phẩy"
        />

        <label>Ngày Tạo</label>
        <input type="date" value={formData.createdAt} readOnly />

        <label>Ngày Cập Nhật</label>
        <input type="date" value={formData.updatedAt} readOnly />

        <label>Ghi Chú</label>
        <textarea
          value={formData.note}
          onChange={(e) => handleChange("note", e.target.value)}
          rows={3}
        />

        <div className="form-actions">
          <button className="btn save" onClick={handleSave}>Lưu</button>
          <button className="btn close" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserGroupModal;
