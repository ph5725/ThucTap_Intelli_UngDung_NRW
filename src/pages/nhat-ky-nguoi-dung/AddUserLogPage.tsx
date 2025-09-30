import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
// import { userLogService, type UserLogCreate } from "../../../services/nguoi-dung/userLogService";

// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddNhatKySuDungRequest, NhatKySuDungResponse, UpdateNhatKySuDungRequest } from "src/types/nguoi-dung/nhat-ky-su-dung";
import { ThongTinNguoiDung } from "src/types/authTypes";

// text
import { TextForms } from "src/constants/text";

const AddUserLogPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<
    AddNhatKySuDungRequest,
    "NguoiTao" | "NgayTao"
  >>({
    TenNguoiDung: 0,
    HanhDong: "",
    TinhNang: "",
    DuLieu: "",
    GhiChu: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy thông tin người dùng từ localStorage
    const nguoiDungStr = localStorage.getItem("nguoiDung");
    let nguoiDung: ThongTinNguoiDung | null = null;

    if (nguoiDungStr) {
      nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
      console.log("ID người dùng:", nguoiDung.Id);
    }

    // Tạo payload JSON với metadata
    const payload: AddNhatKySuDungRequest = {
      ...formData,
      NgayTao: "FrontendUser",
      NguoiTao: nguoiDung?.Id ?? 0,
    };

    try {
      // await userLogService.create(payload);
      await createData<AddNhatKySuDungRequest, NhatKySuDungResponse>(
        apiUrls.NhatKySuDung.create, // URL endpoint
        payload                 // dữ liệu gửi đi
      );
      alert(TextForms.thongBao.themMoiThanhCong);
      navigate(-1);
    } catch (err) {
      console.error("❌ Lỗi thêm UserLog:", err);
      alert(TextForms.thongBao.loiThem);
    }
  };

  return (
    <div className="add-account-container">
      <div className="page-header">
        <FaBookReader className="page-icon" />
        <h2 className="page-title">THÊM MỚI NHẬT KÝ</h2>
      </div>

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Người dùng</label>
          <input type="text" name="user" value={formData.TenNguoiDung} onChange={handleChange} required />

          <label>Hành động</label>
          <input type="text" name="action" value={formData.HanhDong} onChange={handleChange} required />

          <label>Tính năng</label>
          <input type="text" name="feature" value={formData.TinhNang} onChange={handleChange} required />

          <label>Dữ liệu</label>
          <input type="text" name="data" value={formData.DuLieu} onChange={handleChange} />

          {/* <label>Trạng thái</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Chưa xác định">Chưa xác định</option>
            <option value="Thành công">Thành công</option>
            <option value="Thất bại">Thất bại</option>
          </select> */}

          <label>Ghi chú</label>
          <textarea name="note" value={formData.GhiChu} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn save">{TextForms.nut.luu}</button>
          <button type="button" className="btn close" onClick={() => navigate(-1)}>{TextForms.nut.huyBo}</button>
        </div>
      </form>
    </div>
  );
};

export default AddUserLogPage;
