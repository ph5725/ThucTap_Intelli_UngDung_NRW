// src/pages/quan-ly-tai-khoan/quan-ly-nhom-nguoi-dung/AddUserGroupPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/global.css";
import "../../../styles/qltk/AccountManagement.css";
import Tabs from "../../../components/tabQLTK/Tabs";
import { FaUser } from "react-icons/fa";
import type { UserGroup } from "./EditUserGroupModal"; // dùng chung interface
 // dùng chung interface

const AddUserGroupPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<UserGroup, "id">>({
    groupName: "",
    members: "",
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
    note: "",
  });

  const handleChange = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🔹 Sau này sẽ thay bằng API call
      // await userGroupService.create(formData);
      console.log("Dữ liệu thêm mới:", formData);

      alert("Nhóm người dùng đã được thêm thành công!");
      navigate(-1); // quay lại trang trước
    } catch (error) {
      console.error("Lỗi khi thêm nhóm:", error);
      alert("Có lỗi xảy ra khi thêm nhóm!");
    }
  };

  return (
    <div className="add-account-container">
      {/* Header */}
      <div className="page-header">
        <FaUser className="page-icon" />
        <h2 className="page-title">THÊM NHÓM NGƯỜI DÙNG</h2>
      </div>

      {/* Tabs */}
      <Tabs />

      {/* Form */}
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nhóm Người Dùng</label>
          <input
            type="text"
            value={formData.groupName}
            onChange={(e) => handleChange("groupName", e.target.value)}
          />

          <label>Thành Viên</label>
          <input
            type="text"
            value={formData.members}
            onChange={(e) => handleChange("members", e.target.value)}
            placeholder="Nhập danh sách thành viên, cách nhau bằng dấu phẩy"
          />

          <label>Ngày Tạo</label>
          <input
            type="date"
            value={formData.createdAt}
            onChange={(e) => handleChange("createdAt", e.target.value)}
          />

          <label>Ngày Cập Nhật</label>
          <input
            type="date"
            value={formData.updatedAt}
            onChange={(e) => handleChange("updatedAt", e.target.value)}
          />

          <label>Ghi Chú</label>
          <textarea
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
            rows={3}
          />

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn save">Lưu</button>
            <button type="button" className="btn close" onClick={() => navigate(-1)}>Hủy</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUserGroupPage;
