// src/pages/qlchdht/AddMeterConfigPage.tsx
// import "../../../styles/qltk/EditAccountModal.css";
// import { meterConfigService } from "../../../services/dong-ho-tong/meterConfigService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "src/styles/global.css";
import "src/styles/tai-khoan/EditAccountModal.css";
import "src/styles/cau-hinh-dht/EditMeterConfigModal.css";
import { FaTachometerAlt } from "react-icons/fa";
import Tabs from "src/components/tabQLDH/Tabs";
// service
import { createData,  } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddCauHinhDhtRequest, CauHinhDhtResponse,  } from "src/types/dong-ho-tong/cau-hinh-dht";
import { ThongTinNguoiDung } from "src/types/authTypes";
// text
import { TextForms } from "src/constants/text";

const AddMeterConfigPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Dữ liệu người dùng nhập
  const [formData, setFormData] = useState<Omit<
    AddCauHinhDhtRequest,
    | "ngayTao" | "nguoiTao"
  >>({
    maDoiTuong: 0,
    maDongHo: "0",
    ghiChu: "",
  });

  // Cập nhật formData khi người dùng nhập vào form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Submit form: Gọi API thêm dữ liệu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Lấy thông tin người dùng từ localStorage
      const nguoiDungStr = localStorage.getItem("nguoiDung");
      let nguoiDung: ThongTinNguoiDung | null = null;

      if (nguoiDungStr) {
        nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
        console.log("ID người dùng:", nguoiDung.id);
      }

      // Sinh metadata ở FE
      const payload = {
        ...formData,
        ngayTao: new Date().toISOString(),
        nguoiTao: (nguoiDung?.id ?? 0).toString(),

      };

      await createData<AddCauHinhDhtRequest, CauHinhDhtResponse>(
        apiUrls.CauHinhDHT.create, // URL endpoint
        payload                 // dữ liệu gửi đi
      );
      alert(TextForms.thongBao.themMoiThanhCong);
      navigate("/meter-config");
    } catch (error) {
      console.error("❌ Lỗi khi thêm mới cấu hình:", error);
      alert(TextForms.thongBao.loiThem);
    } finally {
      setLoading(false);
    }
  };

  // // Cập nhật formData khi người dùng nhập vào form
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value, type, checked } = e.target as HTMLInputElement;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     // user hiện tại (giả sử lấy từ localStorage hoặc context)
  //     const currentUser = localStorage.getItem("username") || "admin";

  //     // gắn metadata ở FE
  //     const payload = {
  //       ...formData,
  //       createdAt: new Date().toISOString(),
  //       createdBy: currentUser,
  //       updatedAt: null,
  //       updatedByUser: null,
  //     };

  //     await meterConfigService.create(payload);
  //     alert("✅ Thêm mới cấu hình đồng hồ thành công!");
  //     navigate("/meter-config");
  //   } catch (error) {
  //     console.error("❌ Lỗi khi thêm mới cấu hình:", error);
  //     alert("Xảy ra lỗi khi thêm mới!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
          <input
            name="objectCode"
            value={formData.maDoiTuong}
            onChange={handleChange}
            required
          />

          <label>Mã đồng hồ</label>
          <input
            name="meterCode"
            value={formData.maDongHo}
            onChange={handleChange}
            required
          />

          {/* <label>Khóa</label>
          <input
            type="checkbox"
            name="locked"
            checked={formData.locked}
            onChange={handleChange}
          /> */}

          <label>Ghi chú</label>
          <textarea
            name="note"
            value={formData.ghiChu}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn save" disabled={loading}>
            {loading ? "Đang lưu..." : TextForms.nut.themMoi}
          </button>
          <button type="button" className="btn close" onClick={() => navigate(-1)}>
            {TextForms.nut.huyBo}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeterConfigPage;
