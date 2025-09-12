import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import "../../styles/qltk/EditAccountModal.css"; // dùng cho form
import "../../styles/qlttnd/EditUserInfoModal.css";
import { FaUser } from "react-icons/fa";
import Tabs from "../../components/tabQLTK/Tabs";

interface UserInfo {
  id: string;
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

const AddUserInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserInfo>({
    id: Date.now().toString(),
    code: "",
    username: "",
    fullname: "",
    password: "",
    email: "",
    role: "user",
    permissions: [],
    avatar: "",
    createdAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
    createdBy: "admin",
    updatedBy: "admin",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, avatar: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dữ liệu thêm mới:", formData);
    alert("Người dùng đã được thêm thành công!");
    navigate(-1); // quay về trang trước
  };

  return (
    <div className="add-account-container">
      {/* Header */}
      <div className="page-header">
        <FaUser className="page-icon" />
        <h2 className="page-title">DANH SÁCH NGƯỜI DÙNG</h2>
      </div>

      {/* Tabs */}
      <Tabs />

      {/* Form */}
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="textform">
            <label>Thêm Mới Người Dùng</label>
          </div>

          <label>ID</label>
          <input type="text" name="id" value={formData.id} disabled />

          <label>Mã</label>
          <input type="text" name="code" value={formData.code} onChange={handleChange} required />

          <label>Tên Tài Khoản</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />

          <label>Tên Người Dùng</label>
          <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />

          <label>Mật Khẩu</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Vai Trò</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="admin">Quản trị viên</option>
            <option value="user">Người dùng</option>
            <option value="guest">Khách</option>
          </select>

          <label>Cấp Phép</label>
          <input
            type="text"
            name="permissions"
            value={formData.permissions.join(", ")}
            onChange={(e) => setFormData({ ...formData, permissions: e.target.value.split(",").map(p => p.trim()) })}
            placeholder="Nhập các quyền, cách nhau bằng dấu phẩy"
          />

          <label>Ảnh Đại Diện</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {formData.avatar && (
            <img
              src={formData.avatar}
              alt="Avatar Preview"
              style={{ width: 80, marginTop: 10, borderRadius: 8 }}
            />
          )}

          <label>Ngày Tạo</label>
          <input type="date" name="createdAt" value={formData.createdAt} onChange={handleChange} />

          <label>Ngày Cập Nhật</label>
          <input type="date" name="updatedAt" value={formData.updatedAt} onChange={handleChange} />

          <label>Người Tạo</label>
          <input type="text" name="createdBy" value={formData.createdBy} onChange={handleChange} />

          <label>Người Cập Nhật</label>
          <input type="text" name="updatedBy" value={formData.updatedBy} onChange={handleChange} />
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn save">Lưu</button>
          <button type="button" className="btn close" onClick={() => navigate(-1)}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default AddUserInfoPage;
