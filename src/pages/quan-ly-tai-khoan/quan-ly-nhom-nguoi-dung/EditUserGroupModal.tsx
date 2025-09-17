import React, { useState } from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";

export interface UserGroup {
  id: number;
  groupName: string;
  members: string;
  createdAt: string;
  updatedAt: string;
  note: string;
}

interface EditUserGroupModalProps {
  group: UserGroup;
  onClose: () => void;
  onSave: () => void; // ✅ đổi lại cho đồng bộ
}

const EditUserGroupModal: React.FC<EditUserGroupModalProps> = ({ group, onClose, onSave }) => {
  const [formData, setFormData] = useState<UserGroup>({ ...group });

  const handleChange = <K extends keyof UserGroup>(field: K, value: UserGroup[K]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      // 🔹 Bạn có thể gọi API update ở đây nếu muốn
      // await userGroupService.update(formData.id, formData);

      console.log("Cập nhật nhóm:", formData);
      onSave(); // ✅ gọi lại props
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
        <input
          type="date"
          value={formData.createdAt}
          onChange={(e) => handleChange("createdAt", e.target.value)}
        />

        <label>Ngày Cập Nhật</label>
        <input
          type="date"
          value={formData.updatedAt}
          onChange={(e) => handleChange("updatedAt", e.target.value)}
        />

        <label>Ghi Chú</label>
        <textarea
          value={formData.note}
          onChange={(e) => handleChange("note", e.target.value)}
          rows={3}
        />

        <div className="form-actions">
          <button className="btn save" onClick={handleSave}>
            Lưu
          </button>
          <button className="btn close" onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserGroupModal;
