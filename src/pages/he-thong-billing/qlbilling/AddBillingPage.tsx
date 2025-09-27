import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBill } from "react-icons/fa";
import Tabs from "../../../components/tabBilling/Tabs";
import { billingService, type Billing } from "../../../services/billingService";

const AddBillingPage: React.FC = () => {
  const navigate = useNavigate();

  // Dữ liệu người dùng nhập
  const [formData, setFormData] = useState<Omit<
    Billing,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "createdBy"
    | "updatedByUser"
    | "updatedAtReading"
    | "updatedByReading"
  >>({
    consumption: 0,
    objectCode: "",
    period: "",
    year: new Date().getFullYear(),
    batch: "",
    fromDate: "",
    toDate: "",
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "consumption" || name === "year" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Sinh metadata ở FE
      const metadata = {
        id: Date.now(), // hoặc uuid nếu muốn unique hơn
        createdAt: new Date().toISOString(),
        createdBy: "currentUser", // TODO: thay bằng user login thật
      };

      const payload: Billing = {
        ...formData,
        ...metadata,
      };

      await billingService.create(payload);
      alert("✅ Hóa đơn đã được thêm thành công!");
      navigate("/billing");
    } catch (err) {
      console.error("❌ Lỗi thêm Billing:", err);
      alert("Thêm thất bại!");
    }
  };

  return (
    <div className="add-account-container">
      <div className="page-header">
        <FaMoneyBill className="page-icon" />
        <h2>THÊM MỚI BILLING</h2>
      </div>

      <Tabs />

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Sản lượng tiêu thụ (m³)</label>
          <input
            type="number"
            name="consumption"
            value={formData.consumption}
            onChange={handleChange}
            required
          />

          <label>Mã đối tượng</label>
          <input
            type="text"
            name="objectCode"
            value={formData.objectCode}
            onChange={handleChange}
            required
          />

          <label>Kỳ</label>
          <input
            type="text"
            name="period"
            value={formData.period}
            onChange={handleChange}
            required
          />

          <label>Năm</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />

          <label>Đợt</label>
          <input
            type="text"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
          />

          <label>Từ ngày</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
          />

          <label>Đến ngày</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
          />

          <label>Ghi chú</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn save">
            Lưu
          </button>
          <button
            type="button"
            className="btn close"
            onClick={() => navigate(-1)}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBillingPage;
