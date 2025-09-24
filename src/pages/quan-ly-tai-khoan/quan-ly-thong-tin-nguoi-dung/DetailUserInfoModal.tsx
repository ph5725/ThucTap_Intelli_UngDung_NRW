import React from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css"; 
import "../../../styles/qlttnd/EditUserInfoModal.css"; 
import "../../../styles/qlttnd/DetailUserInfoModal.css";

interface UserInfo {
  id: number;
  code: string;
  username: string;
  fullname: string;
  password: string;
  email: string;
  role: string;
  permissions: string[];
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

interface DetailUserInfoModalProps {
  user: UserInfo;
  onClose: () => void;
}

const DetailUserInfoModal: React.FC<DetailUserInfoModalProps> = ({ user, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal detail-user">
        <div className="text-user">
          <h3>Chi tiết người dùng</h3>
        </div>

        {/* container cuộn */}
        <div className="modal-content-scroll">
          <label>Mã</label>
          <input value={user.code} readOnly />

          <label>Tên tài khoản</label>
          <input value={user.username} readOnly />

          <label>Tên người dùng</label>
          <input value={user.fullname} readOnly />

          <label>Mật khẩu</label>
          <input type="text" value={user.password} readOnly />

          <label>Email</label>
          <input type="email" value={user.email} readOnly />

          <label>Vai trò</label>
          <input type="text" value={user.role} readOnly />

          <label>Cấp phép</label>
          <input type="text" value={user.permissions.join(", ")} readOnly />

          <label>Ảnh đại diện</label>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              style={{ width: "80px", marginTop: "10px", borderRadius: "8px" }}
            />
          ) : (
            <p>Chưa có</p>
          )}

          <label>Ngày tạo</label>
          <input type="text" value={user.createdAt} readOnly />

          <label>Ngày cập nhật</label>
          <input type="text" value={user.updatedAt} readOnly />

          <label>Người tạo</label>
          <input type="text" value={user.createdBy} readOnly />

          <label>Người cập nhật</label>
          <input type="text" value={user.updatedBy} readOnly />
        </div>

        {/* nút đóng */}
        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default DetailUserInfoModal;
