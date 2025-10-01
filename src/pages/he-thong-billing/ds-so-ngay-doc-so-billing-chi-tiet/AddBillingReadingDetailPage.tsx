// src/pages/billing/AddBillingReadingDetailPage.tsx
// import "../../../styles/qltk/EditAccountModal.css";
// import {
//   type BillingReadingDetail,
//   billingReadingDetailService,
// } from "../../../services/he-thong-billing/billingReadingDetailService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "../../../components/tabBilling/Tabs";
import "src/styles/global.css";
import "src/styles/tai-khoan/EditAccountModal.css";
import "src/styles/ds-so-ngay-doc-so-billing-chi-tiet/EditBillingReadingDetailModal.css";
import { FaBookReader } from "react-icons/fa";
// service
import { createData,  } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddDsNgayDocSoBillingChiTietRequest, DsNgayDocSoBillingChiTietResponse,  } from "src/types/he-thong-billing/ds-ngay-doc-so-billing-chi-tiet";
import { ThongTinNguoiDung } from "src/types/authTypes";
// text
import { TextForms } from "src/constants/text";

const AddBillingReadingDetailPage: React.FC = () => {
  const navigate = useNavigate();

  // Form data không chứa metadata (FE sẽ tự sinh khi submit)
  const [formData, setFormData] = useState<
    Omit<
      AddDsNgayDocSoBillingChiTietRequest,
      | "ngayTao"
      | "nguoiTao"
    >
  >({
    maNgayDocSo: "0",
    nam: 0,
    ky: 0,
    dot: 0,
    soNgayDocSoDot: 0,
    ghiChu: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Nam" || name === "SoNgayDocSoDot" || name === "MaNgayDocSo" || name === "Ky" || name === "Dot" ? Number(value) : value,
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

      // FE tự thêm metadata khi tạo mới
      const metadata: AddDsNgayDocSoBillingChiTietRequest = {
      ...formData,
        ngayTao: new Date().toISOString(),                  // viết thường
        nguoiTao: (nguoiDung?.id ?? 0).toString(),         // string nếu backend yêu cầu
      };

      await createData<
        AddDsNgayDocSoBillingChiTietRequest,
        DsNgayDocSoBillingChiTietResponse
      >(
        apiUrls.DSNgayDocSoBillingChiTiet.create, // URL endpoint
        metadata                                  // dữ liệu gửi đi
      );

      alert(TextForms.thongBao.themMoiThanhCong);
      navigate("/billing-reading-detail");
    } catch (error) {
      console.error("❌ Lỗi thêm mới:", error);
      alert(TextForms.thongBao.loiThem);
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
              value={formData.maNgayDocSo}
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
              value={formData.nam}
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
              value={formData.ky}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Đợt</label>
            <input name="batch" value={formData.dot} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>
              Số ngày đọc <span className="required">*</span>
            </label>
            <input
              type="number"
              name="daysCount"
              value={formData.soNgayDocSoDot}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Ghi chú</label>
            <textarea
              name="note"
              value={formData.ghiChu}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="submit" className="btn save">
            {TextForms.nut.themMoi}
          </button>
          <button
            type="button"
            className="btn close"
            onClick={() => navigate("/billing-reading-detail")}
          >
            {TextForms.nut.dong}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBillingReadingDetailPage;
