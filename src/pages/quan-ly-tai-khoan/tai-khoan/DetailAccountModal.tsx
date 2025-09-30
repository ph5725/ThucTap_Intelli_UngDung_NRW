// import "../../../styles/qltk/EditAccountModal.css";
import React from "react";
import "src/styles/tai-khoan/EditAccountModal.css"
import "src/styles/global.css";
import { NguoiDungResponse } from "src/types/nguoi-dung/nguoi-dung";
// import type { UserInfo } from "../../../services/nguoi-dung/userService";

interface DetailAccountModalProps {
  account: NguoiDungResponse;
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
        <input type="text" value={account.Ten} readOnly disabled />

        {/* Họ tên */}
        <label>Họ tên</label>
        <input type="text" value={account.TenNguoiDung} readOnly disabled />

        {/* Email */}
        <label>Email</label>
        <input type="email" value={account.Email} readOnly disabled />

        {/* Vai trò */}
        <label>Vai trò</label>
        <select value={account.VaiTro} disabled>
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
