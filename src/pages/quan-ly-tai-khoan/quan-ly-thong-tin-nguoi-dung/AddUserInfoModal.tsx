import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css"; 
import "../../../styles/qlttnd/EditUserInfoModal.css";
import { FaUser } from "react-icons/fa";
import Tabs from "../../../components/tabQLTK/Tabs";
import { userService, type UserInfo } from "../../../Service/userService";

const AddUserInfoPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<UserInfo, "metadata"> & { metadata?: UserInfo["metadata"] }>({
    code: "",
    username: "",
    fullname: "",
    password: "",
    email: "",
    role: "user",
    permissions: [],
    avatar: "",
    locked: false,
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFormData({ ...formData, avatar: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date().toISOString();
    const metadata = {
      createdAt: now,
      updatedAt: now,
      createdBy: "FrontendUser",
      updatedBy: "FrontendUser",
    };

    try {
      const payload = new FormData();
      payload.append("code", formData.code);
      payload.append("username", formData.username);
      payload.append("fullname", formData.fullname);
      payload.append("password", formData.password);
      payload.append("email", formData.email);
      payload.append("role", formData.role);
      formData.permissions.forEach(p => payload.append("permissions[]", p));
      if (file) payload.append("avatar", file);
      payload.append("metadata", JSON.stringify(metadata));

      const res = await userService.create(payload);

      alert("Người dùng đã được thêm thành công!");
      console.log("API response:", res.data);
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
      alert("Thêm người dùng thất bại!");
    }
  };

  return (
    <div className="add-account-container">
      <div className="page-header">
        <FaUser className="page-icon" />
        <h2 className="page-title">DANH SÁCH NGƯỜI DÙNG</h2>
      </div>

      <Tabs />

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="textform">
            <label>Thêm Mới Người Dùng</label>
          </div>

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
            onChange={(e) =>
              setFormData({ ...formData, permissions: e.target.value.split(",").map((p) => p.trim()) })
            }
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
        </div>

        <div className="form-actions">
          <button type="submit" className="btn save">Lưu</button>
          <button type="button" className="btn close" onClick={() => navigate(-1)}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default AddUserInfoPage;
