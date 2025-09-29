// src/pages/qlbilling/qlbilling/AddBillingReadingPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import Tabs from "../../../components/tabBilling/Tabs";
// import { billingReadingService, type BillingReading } from "../../../services/he-thong-billing/billingReadingService";

// service
import { createData, updateData, deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddDsNgayDocSoBillingRequest, DsNgayDocSoBillingResponse, UpdateDsNgayDocSoBillingRequest } from "src/types/he-thong-billing/ds-ngay-doc-so-billing";

// text
import { TextForms } from "src/constants/text";

const AddBillingReadingPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<BillingReading, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy">>({
    year: new Date().getFullYear(),
    period: "",
    daysCount: 30,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "year" || name === "daysCount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // FE tự sinh metadata khi Add
      const newRecord: BillingReading = {
        ...formData,
        id: 0, // BE có thể bỏ qua hoặc tự generate
        createdAt: new Date().toISOString(),
        createdBy: "currentUser", // TODO: thay bằng user đăng nhập thực tế
        daysCount: formData.daysCount,
      };

      await billingReadingService.create(newRecord);
      alert("Ngày số đọc đã được thêm thành công!");
      navigate("/billing-reading");
    } catch (error) {
      console.error("❌ Lỗi thêm mới:", error);
      alert("Thêm mới thất bại!");
    }
  };

  return (
    <div className="add-account-container">
      <div className="page-header">
        <FaBookReader className="page-icon" />
        <h2>Thêm Ngày Số Đọc Billing</h2>
      </div>

      <Tabs />

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Năm</label>
          <input type="number" name="year" value={formData.year} onChange={handleChange} required />

          <label>Kỳ</label>
          <input type="text" name="period" value={formData.period} onChange={handleChange} required />

          <label>Số ngày đọc</label>
          <input type="number" name="daysCount" value={formData.daysCount} onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn save">Lưu</button>
          <button type="button" className="btn close" onClick={() => navigate("/billing-reading")}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default AddBillingReadingPage;
