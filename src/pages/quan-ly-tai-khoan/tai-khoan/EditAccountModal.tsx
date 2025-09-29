import React, { useState, useEffect } from "react";
import "../../../styles/qltk/EditAccountModal.css";
import "../../../styles/global.css";
import { userService, type UserInfo } from "../../../services/nguoi-dung/userService";

interface EditAccountModalProps {
  account: UserInfo;
  onClose: () => void;
  onSave: (updated: UserInfo) => void;
  useMock?: boolean;
}

const EditAccountModal: React.FC<EditAccountModalProps> = ({
  account,
  onClose,
  onSave,
  useMock = false
}) => {
  const [formData, setFormData] = useState<UserInfo>(account);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData(account);
  }, [account]);

  const handleChange = (field: keyof UserInfo, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
  setSaving(true);
  if (useMock) {
    onSave(formData); // chỉ update local
  } else {
    try {
      const res = await userService.update(formData.id!, formData);
      onSave(res.data); // update từ backend
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    }
  }
  setSaving(false);
  onClose();
};


  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Chỉnh Sửa Tài Khoản</h3>

        <label>Tên tài khoản</label>
        <input
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        <label>Họ tên</label>
        <input
          value={formData.fullname}
          onChange={(e) => handleChange("fullname", e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <label>Mật khẩu</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <label>Vai trò</label>
        <select
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
        >
          <option value="admin">Quản trị viên</option>
          <option value="user">Người dùng</option>
        </select>

        <div className="modal-actions">
          <button className="btn save" onClick={handleSave} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
          <button className="btn close" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default EditAccountModal;
