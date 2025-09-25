// src/pages/qlchdht/AddMeterConfigPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";
import { FaTachometerAlt } from "react-icons/fa";
import Tabs from "../../../components/tabQLDH/Tabs";
import { meterConfigService } from "../../../Service/meterConfigService";

const AddMeterConfigPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // chỉ khởi tạo field cần nhập
  const [formData, setFormData] = useState({
    objectCode: "",
    meterCode: "",
    note: "",
    locked: false,
    errorFlag: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // user hiện tại (giả sử lấy từ localStorage hoặc context)
      const currentUser = localStorage.getItem("username") || "admin";

      // gắn metadata ở FE
      const payload = {
        ...formData,
        createdAt: new Date().toISOString(),
        createdBy: currentUser,
        updatedAt: null,
        updatedByUser: null,
      };

      await meterConfigService.create(payload);
      alert("✅ Thêm mới cấu hình đồng hồ thành công!");
      navigate("/meter-config");
    } catch (error) {
      console.error("❌ Lỗi khi thêm mới cấu hình:", error);
      alert("Xảy ra lỗi khi thêm mới!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-account-container">
      <div className="page-header">
        <FaTachometerAlt className="page-icon" />
        <h2 className="page-title">THÊM MỚI CẤU HÌNH ĐỒNG HỒ TỔNG</h2>
      </div>

      <Tabs />

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mã đối tượng</label>
          <input
            name="objectCode"
            value={formData.objectCode}
            onChange={handleChange}
            required
          />

          <label>Mã đồng hồ</label>
          <input
            name="meterCode"
            value={formData.meterCode}
            onChange={handleChange}
            required
          />

          <label>Khóa</label>
          <input
            type="checkbox"
            name="locked"
            checked={formData.locked}
            onChange={handleChange}
          />

          <label>Ghi chú</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn save" disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
          <button type="button" className="btn close" onClick={() => navigate(-1)}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeterConfigPage;
