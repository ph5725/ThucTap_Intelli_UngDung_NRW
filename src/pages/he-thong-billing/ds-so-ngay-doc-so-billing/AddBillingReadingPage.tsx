// src/pages/qlbilling/qlbilling/AddBillingReadingPage.tsx
// import { billingReadingService, type BillingReading } from "../../../services/he-thong-billing/billingReadingService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import Tabs from "src/components/tabBilling/Tabs";
// service
import { createData,  } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddDsNgayDocSoBillingRequest, DsNgayDocSoBillingResponse,  } from "src/types/he-thong-billing/ds-ngay-doc-so-billing";
import { ThongTinNguoiDung } from "src/types/authTypes";
// text
import { TextForms } from "src/constants/text";

const AddBillingReadingPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<
    AddDsNgayDocSoBillingRequest,
    | "ngayTao" | "nguoiTao"
  >>({
    nam: new Date().getFullYear(),
    ky: 0,
    soNgayDocSoBilling: 30,
    ghiChu: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "nam" || name === "soNgayDocSoBilling" || name === "ky"  ? Number(value) : value,
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
        console.log("ID người dùng:", nguoiDung.id);
      }

      // FE tự sinh metadata khi Add
      const newRecord: AddDsNgayDocSoBillingRequest = {
        ...formData,
        ngayTao: new Date().toISOString(),
        nguoiTao: nguoiDung?.id ?? 0,
      };

      // await billingReadingService.create(newRecord);
      await createData<AddDsNgayDocSoBillingRequest, DsNgayDocSoBillingResponse>(
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
          <input type="number" name="year" value={formData.nam} onChange={handleChange} required />

          <label>Kỳ</label>
          <input type="text" name="period" value={formData.ky} onChange={handleChange} required />

          <label>Số ngày đọc</label>
          <input type="number" name="daysCount" value={formData.soNgayDocSoBilling} onChange={handleChange} required />
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
