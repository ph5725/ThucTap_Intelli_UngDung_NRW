import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/global.css";
import "../../../styles/qltk/AccountManagement.css";
import Tabs from "../../../components/tabQLTK/Tabs";
import { FaUser } from "react-icons/fa";
import { userGroupService } from "../../../services/nguoi-dung/userGroupService";

const AddUserGroupPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    groupName: "",
    members: "",
    note: "",
  });

  const handleChange = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🔹 Frontend tự sinh createdAt + updatedAt
      const now = new Date().toISOString();
      const payload = {
        groupName: formData.groupName,
        members: formData.members,
        note: formData.note,
        createdAt: now,
        updatedAt: now,
      };

      await userGroupService.create(payload);

      alert("✅ Nhóm người dùng đã được thêm thành công!");
      navigate(-1);
    } catch (error) {
      console.error("❌ Lỗi khi thêm nhóm:", error);
      alert("Có lỗi xảy ra khi thêm nhóm!");
    }
  };

  return (
    <div className="add-account-container">
      <div className="page-header">
        <FaUser className="page-icon" />
        <h2 className="page-title">THÊM NHÓM NGƯỜI DÙNG</h2>
      </div>

      <Tabs />

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nhóm Người Dùng</label>
          <input
            type="text"
            value={formData.groupName}
            onChange={(e) => handleChange("groupName", e.target.value)}
            required
          />

          <label>Thành Viên</label>
          <input
            type="text"
            value={formData.members}
            onChange={(e) => handleChange("members", e.target.value)}
            placeholder="Nhập danh sách thành viên, cách nhau bằng dấu phẩy"
          />

          <label>Ghi Chú</label>
          <textarea
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
            rows={3}
          />

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
