// import "../../../styles/qltk/EditAccountModal.css"; 
// import "../../../styles/qlttnd/EditUserInfoModal.css";
// import { userService, type UserInfo } from "../../../services/nguoi-dung/userService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "src/styles/global.css";
import "src/styles/tai-khoan/EditAccountModal.css"
import "src/styles/nguoi-dung/EditUserInfoModal.css"
import { FaUser } from "react-icons/fa";
import Tabs from "src/components/tabQLTK/Tabs";
// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddNguoiDungRequest, NguoiDungResponse, UpdateNguoiDungRequest } from "src/types/nguoi-dung/nguoi-dung";
import { ThongTinNguoiDung } from "src/types/authTypes";
// text
import { TextForms } from "src/constants/text";

const AddUserInfoPage: React.FC = () => {
  const navigate = useNavigate();
  // Dữ liệu người dùng nhập
  const [formData, setFormData] = useState<Omit<
    AddNguoiDungRequest,
    | "NgayTao" | "NguoiTao"
  >>({
    Ma: "",
    Ten: "",
    TenNguoiDung: "",
    MatKhau: "",
    Email: "",
    VaiTro: "",
    CapPhep: true,
    AnhDaiDien: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFormData({ ...formData, AnhDaiDien: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Lấy thông tin người dùng từ localStorage
      const nguoiDungStr = localStorage.getItem("nguoiDung");
      let nguoiDung: ThongTinNguoiDung | null = null;

      if (nguoiDungStr) {
        nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
        console.log("ID người dùng:", nguoiDung.tenNguoiDung);
      }
      const now = new Date().toISOString();
      const payload = {
        ...formData,
        NgayTao: now,
        NguoiTao: nguoiDung?.tenNguoiDung ?? "",
      };
      // const payload = new FormData();
      // payload.append("code", formData.code);
      // payload.append("username", formData.username);
      // payload.append("fullname", formData.fullname);
      // payload.append("password", formData.password);
      // payload.append("email", formData.email);
      // payload.append("role", formData.role);
      // formData.permissions.forEach(p => payload.append("permissions[]", p));
      // if (file) payload.append("avatar", file);
      // payload.append("metadata", JSON.stringify(metadata));

      // const res = await userService.create(payload);
      const res = await createData<AddNguoiDungRequest, NguoiDungResponse>(
        apiUrls.NguoiDung.create, // URL endpoint
        payload                 // dữ liệu gửi đi
      );
      alert(TextForms.thongBao.themMoiThanhCong);
      console.log("API response:", res);
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
      alert(TextForms.thongBao.loiThem);
    }
  };

  return (
    <div className="add-account-container">
      <div className="page-header">
        <FaUser className="page-icon" />
        <h2 className="page-title">DANH SÁCH NGƯỜI DÙNG</h2>
      </div>

      <Tabs />

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="textform">
            <label>Thêm Mới Người Dùng</label>
          </div>

          <label>Mã</label>
          <input type="text" name="code" value={formData.Ma} onChange={handleChange} required />

          <label>Tên Tài Khoản</label>
          <input type="text" name="username" value={formData.TenNguoiDung} onChange={handleChange} required />

          <label>Tên Người Dùng</label>
          <input type="text" name="fullname" value={formData.Ten} onChange={handleChange} required />

          {/* <label>Mật Khẩu</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required /> */}

          <label>Email</label>
          <input type="email" name="email" value={formData.Email} onChange={handleChange} required />

          <label>Vai Trò</label>
          <select name="role" value={formData.VaiTro} onChange={handleChange}>
            <option value="admin">Quản trị viên</option>
            <option value="user">Người dùng</option>
            <option value="guest">Khách</option>
          </select>

          <label>Cấp Phép</label>
          <input
            type="checkbox"
            name="CapPhep"
            checked={formData.CapPhep}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                CapPhep: e.target.checked,
              }))
            }
          />
          {/* <input
            type="text"
            name="permissions"
            value={formData.permissions.join(", ")}
            onChange={(e) =>
              setFormData({ ...formData, permissions: e.target.value.split(",").map((p) => p.trim()) })
            }
            placeholder="Nhập các quyền, cách nhau bằng dấu phẩy"
          /> */}

          <label>Ảnh Đại Diện</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {formData.AnhDaiDien && (
            <img
              src={formData.AnhDaiDien}
              alt="Avatar Preview"
              style={{ width: 80, marginTop: 10, borderRadius: 8 }}
            />
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn save">Lưu</button>
          <button type="button" className="btn close" onClick={() => navigate(-1)}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default AddUserInfoPage;
