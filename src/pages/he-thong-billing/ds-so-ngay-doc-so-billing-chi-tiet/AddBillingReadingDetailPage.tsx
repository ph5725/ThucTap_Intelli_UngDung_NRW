// src/pages/billing/AddBillingReadingDetailPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "../../../components/tabBilling/Tabs";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";
import { FaBookReader } from "react-icons/fa";
// import {
//   type BillingReadingDetail,
//   billingReadingDetailService,
// } from "../../../services/he-thong-billing/billingReadingDetailService";

// service
import { createData, updateData, deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddDsNgayDocSoBillingChiTietRequest, DsNgayDocSoBillingChiTietResponse, UpdateDsNgayDocSoBillingChiTietRequest } from "src/types/he-thong-billing/ds-ngay-doc-so-billing-chi-tiet";

// text
import { TextForms } from "src/constants/text";

const AddBillingReadingDetailPage: React.FC = () => {
  const navigate = useNavigate();

  // Form data không chứa metadata (FE sẽ tự sinh khi submit)
  const [formData, setFormData] = useState<
    Omit<
      BillingReadingDetail,
      | "id"
      | "createdAt"
      | "createdBy"
      | "updatedAt"
      | "updatedBy"
      | "updatedAtReading"
      | "updatedByReading"
    >
  >({
    code: "",
    year: new Date().getFullYear(),
    period: "",
    batch: "",
    daysCount: 0,
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "daysCount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // FE tự thêm metadata khi tạo mới
      const metadata = {
        createdAt: new Date().toISOString(),
        createdBy: "currentUser", // 👉 sau này thay bằng user login thực tế
      };

      await billingReadingDetailService.create({
        ...formData,
        ...metadata,
      });

      alert("✅ Thêm mới thành công!");
      navigate("/billing-reading-detail");
    } catch (error) {
      console.error("❌ Lỗi thêm mới:", error);
      alert("❌ Thêm thất bại!");
    }
  };

  return (
    <div className="add-account-container">
      {/* Header */}
      <div className="page-header">
        <FaBookReader className="page-icon" />
        <h2 className="page-title">THÊM NGÀY SỐ ĐỌC BILLING</h2>
      </div>

      <Tabs />

      {/* Form */}
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>
              Mã ngày số đọc <span className="required">*</span>
            </label>
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Năm <span className="required">*</span>
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Kỳ <span className="required">*</span>
            </label>
            <input
              name="period"
              value={formData.period}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Đợt</label>
            <input name="batch" value={formData.batch} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>
              Số ngày đọc <span className="required">*</span>
            </label>
            <input
              type="number"
              name="daysCount"
              value={formData.daysCount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Ghi chú</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="submit" className="btn save">
            Lưu
          </button>
          <button
            type="button"
            className="btn close"
            onClick={() => navigate("/billing-reading-detail")}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBillingReadingDetailPage;
