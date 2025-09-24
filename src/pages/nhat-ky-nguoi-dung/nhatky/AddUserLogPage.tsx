import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { userLogService, type UserLogCreate } from "../../../Service/userLogService";

const AddUserLogPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<UserLogCreate, "createdBy" | "updatedByUser" | "createdAt" | "updatedAt">>({
    user: "",
    action: "",
    feature: "",
    data: "",
    status: "Thành công",
    note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tạo payload JSON với metadata
    const payload: UserLogCreate = {
      ...formData,
      createdBy: "FrontendUser",
      updatedByUser: "FrontendUser",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await userLogService.create(payload);
      alert("Nhật ký đã được thêm thành công!");
      navigate(-1);
    } catch (err) {
      console.error("❌ Lỗi thêm UserLog:", err);
      alert("Thêm thất bại!");
    }
  };

  return (
    <div className="add-account-container">
      <div className="page-header">
        <FaBookReader className="page-icon" />
        <h2 className="page-title">THÊM MỚI NHẬT KÝ</h2>
      </div>

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Người dùng</label>
          <input type="text" name="user" value={formData.user} onChange={handleChange} required />

          <label>Hành động</label>
          <input type="text" name="action" value={formData.action} onChange={handleChange} required />

          <label>Tính năng</label>
          <input type="text" name="feature" value={formData.feature} onChange={handleChange} required />

          <label>Dữ liệu</label>
          <input type="text" name="data" value={formData.data} onChange={handleChange} />

          <label>Trạng thái</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Chưa xác định">Chưa xác định</option>
            <option value="Thành công">Thành công</option>
            <option value="Thất bại">Thất bại</option>
          </select>

          <label>Ghi chú</label>
          <textarea name="note" value={formData.note} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn save">Lưu</button>
          <button type="button" className="btn close" onClick={() => navigate(-1)}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default AddUserLogPage;
