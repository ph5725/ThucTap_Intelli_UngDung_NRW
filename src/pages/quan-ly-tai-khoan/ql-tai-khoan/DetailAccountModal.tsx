import React from "react";
import "../../../styles/qltk/AccountManagement.css";

interface Account {
  id: number;
  username: string;   // Tên tài khoản
  password: string;   // Mật khẩu
  role: string;       // Vai trò
  locked?: boolean;   // Trạng thái khóa
}

interface DetailAccountModalProps {
  account: Account;
  onClose: () => void;
}

const DetailAccountModal: React.FC<DetailAccountModalProps> = ({ account, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        
          <div className="text-user">
            <h3>Chi Tiết Tài Khoản</h3>
          </div>

        <div className="modal-field">
          <span className="label">ID:</span>
          <span className="value">{account.id}</span>
        </div>

        <div className="modal-field">
          <span className="label">Tên tài khoản:</span>
          <span className="value">{account.username}</span>
        </div>

        <div className="modal-field">
          <span className="label">Mật khẩu:</span>
          <span className="value">{account.password}</span>
        </div>

        <div className="modal-field">
          <span className="label">Vai trò:</span>
          <span className="value">{account.role}</span>
        </div>

        <div className="modal-field">
          <span className="label">Trạng thái:</span>
          <span className="value">{account.locked ? "Bị khóa" : "Đang hoạt động"}</span>
        </div>

        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default DetailAccountModal;
