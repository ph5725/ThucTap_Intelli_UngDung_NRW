import React from "react";
import "../../../styles/qltk/EditAccountModal.css";
import "../../../styles/global.css";
import type { UserInfo } from "../../../Service/userService";

interface DetailAccountModalProps {
  account: UserInfo;
  onClose: () => void;
}

const DetailAccountModal: React.FC<DetailAccountModalProps> = ({
  account,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="text-user">
          <h3>Chi Tiết Tài Khoản</h3>
        </div>

        {/* Tên tài khoản */}
        <label>Tên tài khoản</label>
        <input type="text" value={account.username} readOnly disabled />

        {/* Họ tên */}
        <label>Họ tên</label>
        <input type="text" value={account.fullname} readOnly disabled />

        {/* Email */}
        <label>Email</label>
        <input type="email" value={account.email} readOnly disabled />

        {/* Mật khẩu */}
        <label>Mật khẩu</label>
        <input type="password" value={account.password} readOnly disabled />

        {/* Vai trò */}
        <label>Vai trò</label>
        <select value={account.role} disabled>
          <option value="admin">Quản trị viên</option>
          <option value="user">Người dùng</option>
        </select>

        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailAccountModal;
