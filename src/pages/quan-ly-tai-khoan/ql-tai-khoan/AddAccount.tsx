import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/global.css";
import "../../../styles/qltk/AddAccount.css";
import { FaUser} from "react-icons/fa";
import Tabs from "../../../components/tabQLTK/Tabs";


const AddAccount: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    password: "",
    role: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dữ liệu thêm mới:", formData);
    alert("Tài khoản đã được thêm thành công!");
  };

  return (
    <div className="add-account-container">
     {/* Header */}
           <div className="page-header">
             <FaUser className="page-icon" />
             <h2 className="page-title">DANH SÁCH TÀI KHOẢN</h2>
           </div>
     
           {/* Tabs Chuyển Trang */}
           <Tabs />

      {/* Form */}
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="textform">
              <label>Thêm Mới Tài Khoản</label>
          </div>
          


          <label>ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Tên Tài Khoản</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mật Khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Vai Trò</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="admin">Quản trị viên</option>
            <option value="user">Người dùng</option>
          </select>
        </div>

        {/* Nút Lưu - Hủy */}
        <div className="form-actions">
          <button type="submit" className="btn save">Lưu</button>
          <button type="button" className="btn close" onClick={() => navigate(-1)}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default AddAccount;
