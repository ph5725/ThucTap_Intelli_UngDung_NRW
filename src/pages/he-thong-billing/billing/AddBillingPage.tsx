// import { billingService, type Billing } from "../../../services/he-thong-billing/billingService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBill } from "react-icons/fa";
import Tabs from "src/components/tabBilling/Tabs";
// service
import { createData,  } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddBillingRequest, BillingResponse,  } from "src/types/he-thong-billing/billing";
import { ThongTinNguoiDung } from "src/types/authTypes";
// text
import { TextForms } from "src/constants/text";

const AddBillingPage: React.FC = () => {
  const navigate = useNavigate();

  // Dữ liệu người dùng nhập
  const [formData, setFormData] = useState<Omit<
    AddBillingRequest,
    | "ngayTao" | "nguoiTao"
  >>({
    sanLuongTieuThu: 0,
    maDoiTuong: "",
    ky: 0,
    nam: 0,
    dot: 0,
    tuNgay: "",
    denNgay: "",
    ghiChu: "",
  });

  // Cập nhật formData khi người dùng nhập vào form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "SanLuongTieuThu" || name === "Ky" || name === "Nam" || name === "Dot"
        ? Number(value) // ép kiểu số cho các field numeric
        : value,
    }));
  };

  // Submit form: Gọi API thêm dữ liệu
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

      // Sinh metadata ở FE
      const metadata = {
        NgayTao: new Date().toISOString(), // hoặc format theo BE yêu cầu
        NguoiTao: (nguoiDung?.id ?? 0).toString(),
      };
      const payload: AddBillingRequest = {
        ...formData,
        ...metadata,
        ngayTao: "",
        nguoiTao: ""
      };

      await createData<AddBillingRequest, BillingResponse>(
        apiUrls.Billing.create, // URL endpoint
        payload                 // dữ liệu gửi đi
      );

      alert(TextForms.thongBao.themMoiThanhCong);
      navigate("/billing");
    } catch (err) {
      console.error(TextForms.thongBao.loiThem, err);
      alert("Thêm thất bại!");
    }
  };

  // // Cập nhật formData khi người dùng nhập vào form
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const {name, value} = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: name === "consumption" || name === "year" ? Number(value) : value,
  //   }));
  // };

  // // Submit form: Gọi API thêm dữ liệu
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     // Sinh metadata ở FE
  //     const metadata = {
  //       id: Date.now(), // hoặc uuid nếu muốn unique hơn
  //       createdAt: new Date().toISOString(),
  //       createdBy: "currentUser", // TODO: thay bằng user login thật
  //     };

  //     const payload: Billing = {
  //       ...formData,
  //       ...metadata,
  //     };

  //     await billingService.create(payload);
  //     alert("✅ Hóa đơn đã được thêm thành công!");
  //     navigate("/billing");
  //   } catch (err) {
  //     console.error("❌ Lỗi thêm Billing:", err);
  //     alert("Thêm thất bại!");
  //   }
  // };

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
            value={formData.sanLuongTieuThu}
            onChange={handleChange}
            required
          />

          <label>Mã đối tượng</label>
          <input
            type="text"
            name="objectCode"
            value={formData.maDoiTuong}
            onChange={handleChange}
            required
          />

          <label>Kỳ</label>
          <input
            type="text"
            name="period"
            value={formData.ky}
            onChange={handleChange}
            required
          />

          <label>Năm</label>
          <input
            type="number"
            name="year"
            value={formData.nam}
            onChange={handleChange}
            required
          />

          <label>Đợt</label>
          <input
            type="text"
            name="batch"
            value={formData.dot}
            onChange={handleChange}
          />

          <label>Từ ngày</label>
          <input
            type="date"
            name="fromDate"
            value={formData.tuNgay}
            onChange={handleChange}
          />

          <label>Đến ngày</label>
          <input
            type="date"
            name="toDate"
            value={formData.denNgay}
            onChange={handleChange}
          />

          <label>Ghi chú</label>
          <textarea
            name="note"
            value={formData.ghiChu}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn save">
            {TextForms.nut.luu}
          </button>
          <button
            type="button"
            className="btn close"
            onClick={() => navigate(-1)}
          >
            {TextForms.nut.huyBo}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBillingPage;
