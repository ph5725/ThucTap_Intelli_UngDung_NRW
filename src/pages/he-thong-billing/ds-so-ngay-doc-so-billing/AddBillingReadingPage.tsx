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
import { ThongTinNguoiDung } from "src/types/authTypes";

// text
import { TextForms } from "src/constants/text";

const AddBillingReadingPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<
    AddDsNgayDocSoBillingRequest,
    | "NgayTao" | "NguoiTao"
  >>({
    Nam: new Date().getFullYear(),
    Ky: 0,
    SoNgayDocSoBilling: 30,
    GhiChu: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "Nam" || name === "SoNgayDocSoBilling" || name === "Ky"  ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Lấy thông tin người dùng từ localStorage
      const nguoiDungStr = localStorage.getItem("nguoiDung");
      let nguoiDung: ThongTinNguoiDung | null = null;

      if (nguoiDungStr) {
        nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
        console.log("ID người dùng:", nguoiDung.Id);
      }

      // FE tự sinh metadata khi Add
      const newRecord: AddDsNgayDocSoBillingRequest = {
        ...formData,
        NgayTao: new Date().toISOString(),
        NguoiTao: nguoiDung?.Id ?? 0,
      };

      // await billingReadingService.create(newRecord);
      const res = await createData<AddDsNgayDocSoBillingRequest, DsNgayDocSoBillingResponse>(
        apiUrls.Billing.create, // URL endpoint
        newRecord               // dữ liệu gửi đi
      );

      alert(TextForms.thongBao.themMoiThanhCong);
      navigate("/billing-reading");
    } catch (error) {
      console.error("❌ Lỗi thêm mới:", error);
      alert(TextForms.thongBao.loiThem);
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
          <input type="number" name="year" value={formData.Nam} onChange={handleChange} required />

          <label>Kỳ</label>
          <input type="text" name="period" value={formData.Ky} onChange={handleChange} required />

          <label>Số ngày đọc</label>
          <input type="number" name="daysCount" value={formData.SoNgayDocSoBilling} onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn save">{TextForms.nut.luu}</button>
          <button type="button" className="btn close" onClick={() => navigate("/billing-reading")}>{TextForms.nut.huyBo}</button>
        </div>
      </form>
    </div>
  );
};

export default AddBillingReadingPage;
