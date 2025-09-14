import React, { useState, useEffect } from "react";
import "../../../styles/qltk/EditAccountModal.css";
import "../../../styles/global.css";

interface Account {
  id: number;
  username: string;   // Tên tài khoản
  password: string;   // Mật khẩu
  role: string;       // Vai trò
  locked?: boolean;   // Trạng thái khóa
}

interface EditAccountModalProps {
  account: Account;
  onClose: () => void;
  onSave: (updated: Account) => void;
}

const EditAccountModal: React.FC<EditAccountModalProps> = ({ account, onClose, onSave }) => {
  const [formData, setFormData] = useState<Account>(account);

  // đồng bộ state với prop account
  useEffect(() => {
    setFormData(account);
  }, [account]);

  const handleChange = (field: keyof Account, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

          <div className="text-user">
            <h3>Chỉnh Sửa Tài Khoản</h3>
          </div>

        {/* Tên tài khoản */}
        <label>Tên tài khoản</label>
        <input
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        {/* Mật khẩu */}
        <label>Mật khẩu</label>
        <input
          type="text"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          
        />

       

        {/* Vai trò */}
        <label>Vai trò</label>
        <select
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
        >
          <option value="admin">Quản trị viên</option>
          <option value="user">Người dùng</option>
          <option value="guest">Khách</option>
        </select>

        <div className="modal-actions">
          <button className="btn save" onClick={() => onSave(formData)}>
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

export default EditAccountModal;
