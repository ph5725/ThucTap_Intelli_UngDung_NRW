import React, { useState } from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css"; // dùng lại css modal
import "../../../styles/qlttnd/EditUserInfoModal.css"; 
import { userService } from "../../../config/userService";

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

interface EditUserInfoModalProps {
  user: UserInfo;
  onClose: () => void;
  onSave: (updated: UserInfo) => void;
}

const EditUserInfoModal: React.FC<EditUserInfoModalProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState<UserInfo>(user);

  const handleChange = <K extends keyof UserInfo>(field: K, value: UserInfo[K]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleChange("avatar", URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    try {
      await userService.update(formData.id, formData);
      onSave(formData); // callback cho parent cập nhật state
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal edit-user">

        <div className="text-user">
          <h3>Chỉnh sửa thông tin người dùng</h3>
        </div>
        
        {/* container cuộn */}
        <div className="modal-content-scroll">
          <label>Mã</label>
          <input value={formData.code} onChange={(e) => handleChange("code", e.target.value)} />

          <label>Tên tài khoản</label>
          <input value={formData.username} onChange={(e) => handleChange("username", e.target.value)} />

          <label>Tên người dùng</label>
          <input value={formData.fullname} onChange={(e) => handleChange("fullname", e.target.value)} />

          <label>Mật khẩu</label>
          <input
            type="text" // luôn hiển thị mật khẩu
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <label>Email</label>
          <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />

          <label>Vai trò</label>
          <select
            className="role-select" 
            style={{ width: "426px"}}   
            value={formData.role} 
            onChange={(e) => handleChange("role", e.target.value)}
          >
            <option value="admin">Quản trị viên</option>
            <option value="user">Người dùng</option>
            <option value="guest">Khách</option>
          </select>

          <label>Cấp phép</label>
          <input
            type="text"
            value={formData.permissions.join(", ")} // chuyển mảng thành chuỗi
            onChange={(e) =>
              handleChange("permissions", e.target.value.split(",").map((p) => p.trim()))
            }
            placeholder="Nhập các quyền, cách nhau bằng dấu phẩy"
          />

          <label>Ảnh đại diện</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {formData.avatar && (
            <img
              src={formData.avatar}
              alt="Avatar Preview"
              style={{ width: "80px", marginTop: "10px", borderRadius: "8px" }}
            />
          )}

          <label>Ngày tạo</label>
          <input type="text" value={formData.createdAt} readOnly />

          <label>Ngày cập nhật</label>
          <input type="text" value={formData.updatedAt} readOnly />

          <label>Người tạo</label>
          <input type="text" value={formData.createdBy} readOnly />

          <label>Người cập nhật</label>
          <input type="text" value={formData.updatedBy} readOnly />
        </div>

        {/* nút cố định dưới cùng */}
        <div className="modal-actions">
          <button className="btn save" onClick={handleSave}>Lưu</button>
          <button className="btn close" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfoModal;
