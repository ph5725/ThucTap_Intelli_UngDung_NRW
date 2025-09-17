// src/pages/qldh/AddMeterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";
import { FaTachometerAlt } from "react-icons/fa";
import Tabs from "../../../components/tabQLDH/Tabs";
import { meterService, type Meter } from "../../../config/meterService";

const AddMeterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Meter, "id" | "status" | "locked" | "createdBy" | "updatedByUser">>({
    code: "",
    name: "",
    volume: 0,
    recordDate: new Date().toISOString().slice(0, 10),
    updatedDate: new Date().toISOString().slice(0, 10),
    updatedBy: "admin",
    errorFlag: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newMeter: Meter = {
        ...formData,
        id: 0,               // backend sẽ sinh id
        status: "Hoạt động",
        locked: false,
        createdBy: "admin",
        updatedByUser: "admin",
      };
      await meterService.create(newMeter);
      alert("Đồng hồ đã được thêm thành công!");
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi thêm đồng hồ:", error);
      alert("Có lỗi xảy ra khi thêm đồng hồ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-account-container">
      <div className="page-header">
        <FaTachometerAlt className="page-icon" />
        <h2 className="page-title">THÊM MỚI ĐỒNG HỒ TỔNG</h2>
      </div>

      <Tabs />

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mã đồng hồ</label>
          <input type="text" name="code" value={formData.code} onChange={handleChange} required />

          <label>Tên đồng hồ</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Sản lượng (m³)</label>
          <input type="number" name="volume" value={formData.volume} onChange={handleChange} required />

          <label>Ngày ghi</label>
          <input type="date" name="recordDate" value={formData.recordDate} onChange={handleChange} />

          <label>Ngày chỉnh sửa</label>
          <input type="date" name="updatedDate" value={formData.updatedDate} onChange={handleChange} />

          <label>Người chỉnh sửa</label>
          <input type="text" name="updatedBy" value={formData.updatedBy} onChange={handleChange} />

          <label className="checkbox">
            <input type="checkbox" name="errorFlag" checked={formData.errorFlag} onChange={handleChange} />
            Đánh dấu lỗi
          </label>

          <label>Ghi chú</label>
          <textarea name="note" value={formData.note} onChange={handleChange}></textarea>
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

export default AddMeterPage;
