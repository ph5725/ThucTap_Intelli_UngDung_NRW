import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";
import { FaTachometerAlt } from "react-icons/fa";
import Tabs from "../../../components/tabQLDH/Tabs";
import { meterConfigService, type MeterConfig } from "../../../config/meterConfigService";

const AddMeterConfigPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<MeterConfig, "id" | "createdAt" | "createdBy">>({
    objectCode: "",
    meterCode: "",
    updatedAt: new Date().toISOString().slice(0, 10),
    updatedByUser: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newConfig: MeterConfig = {
      id: Date.now(),
      objectCode: formData.objectCode,
      meterCode: formData.meterCode,
      createdAt: new Date().toISOString().slice(0, 10),
      createdBy: "Admin",
      updatedAt: formData.updatedAt,
      updatedByUser: formData.updatedByUser,
      note: formData.note,
    };

    try {
      await meterConfigService.create(newConfig);
      alert("Thêm mới cấu hình thành công!");
      navigate("/meter-config"); // quay lại danh sách
    } catch (error) {
      console.error("Lỗi khi thêm cấu hình:", error);
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
          <input name="objectCode" value={formData.objectCode} onChange={handleChange} required />

          <label>Mã đồng hồ</label>
          <input name="meterCode" value={formData.meterCode} onChange={handleChange} required />

          <label>Ngày cập nhật</label>
          <input type="date" name="updatedAt" value={formData.updatedAt} onChange={handleChange} />

          <label>Người cập nhật</label>
          <input name="updatedByUser" value={formData.updatedByUser} onChange={handleChange} />

          <label>Ghi chú</label>
          <textarea name="note" value={formData.note} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn save" disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
          <button type="button" className="btn close" onClick={() => navigate(-1)}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default AddMeterConfigPage;
