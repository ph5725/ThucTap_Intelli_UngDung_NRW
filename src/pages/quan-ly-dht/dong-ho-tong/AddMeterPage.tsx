// src/pages/quan-ly-dong-ho/AddMeterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";
import { FaTachometerAlt } from "react-icons/fa";
import Tabs from "../../../components/tabQLDH/Tabs";
import { meterService, type Meter } from "../../../services/dong-ho-tong/meterService";

interface AddForm {
  code: string;
  name: string;
  volume: number;
  recordDate: string; // yyyy-mm-dd
  errorFlag: boolean;
  note: string;
}

const AddMeterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<AddForm>({
    code: "",
    name: "",
    volume: 0,
    recordDate: new Date().toISOString().slice(0, 10),
    errorFlag: false,
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked :
        type === "number" ? Number(value) :
        value,
    } as unknown as AddForm));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Lấy user hiện tại từ auth/localStorage (nếu có)
      const currentUser = (localStorage.getItem("currentUser") || "admin");

      // Tạo payload: FE set đầy đủ metadata (theo yêu cầu FE xử lý hết)
      const newMeter: Omit<Meter, "id"> = {
        code: formData.code,
        name: formData.name,
        volume: formData.volume,
        status: "Hoạt động",
        locked: false,

        // metadata sản lượng
        recordDate: formData.recordDate,
        updatedDate: "",   // tạo mới => chưa có chỉnh sửa sản lượng
        updatedBy: "",

        errorFlag: formData.errorFlag,
        note: formData.note,

        // metadata hệ thống (FE set vì bạn muốn FE xử lý)
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: currentUser,
        updatedByUser: currentUser,
      };

      await meterService.create(newMeter);
      alert("Đồng hồ đã được thêm thành công!");
      navigate(-1);
    } catch (err) {
      console.error("Lỗi khi thêm đồng hồ:", err);
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
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />

          <label>Tên đồng hồ</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Sản lượng (m³)</label>
          <input
            type="number"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
            required
          />

          <label>Ngày ghi</label>
          <input
            type="date"
            name="recordDate"
            value={formData.recordDate}
            onChange={handleChange}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              name="errorFlag"
              checked={formData.errorFlag}
              onChange={handleChange}
            />
            Đánh dấu lỗi
          </label>

          <label>Ghi chú</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
          ></textarea>
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
