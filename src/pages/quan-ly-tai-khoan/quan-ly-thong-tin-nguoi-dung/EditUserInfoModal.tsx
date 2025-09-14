import React, { useState } from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";
import "../../../styles/qlttnd/EditUserInfoModal.css";
import api from "../../../config/api";

interface UserInfo {
  id: number;
  code: string;
  username: string;
  fullname: string;
  password: string;
  email: string;
  role: string;
  permissions: string[];
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

interface EditUserInfoModalProps {
  user: UserInfo;
  onClose: () => void;
  onSave: (updated: UserInfo) => void;
}

const EditUserInfoModal: React.FC<EditUserInfoModalProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState<UserInfo>(user);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = <K extends keyof UserInfo>(field: K, value: UserInfo[K]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      handleChange("avatar", URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    try {
      const payload = new FormData();
      payload.append("code", formData.code);
      payload.append("username", formData.username);
      payload.append("fullname", formData.fullname);
      payload.append("password", formData.password);
      payload.append("email", formData.email);
      payload.append("role", formData.role);
      formData.permissions.forEach(p => payload.append("permissions[]", p));

      if (selectedFile) {
        payload.append("avatar", selectedFile);
      }

      const res = await api.put(`/nguoiDung/${formData.id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSave({
        ...formData,
        updatedAt: new Date().toISOString(), // cập nhật thời gian mới
        avatar: res.data.avatar || formData.avatar,
      });
      onClose();
    } catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Lỗi cập nhật:", error.message);
    alert("Cập nhật thất bại: " + error.message);
  } else if (typeof error === "object" && error !== null && "response" in error) {
    // nếu axios trả về object có response
    const e = error as { response?: { data?: { message?: string } } };
    console.error("Lỗi cập nhật:", e.response?.data);
    alert("Cập nhật thất bại: " + (e.response?.data?.message || "Không xác định"));
  } else {
    console.error("Lỗi không xác định:", error);
    alert("Cập nhật thất bại: Không xác định");
  }
}
  };

  return (
    <div className="modal-overlay">
      <div className="modal edit-user">
        <div className="text-user">
          <h3>Chỉnh sửa thông tin người dùng</h3>
        </div>

        <div className="modal-content-scroll">
          <label>Mã</label>
          <input value={formData.code} onChange={e => handleChange("code", e.target.value)} />

          <label>Tên tài khoản</label>
          <input value={formData.username} onChange={e => handleChange("username", e.target.value)} />

          <label>Tên người dùng</label>
          <input value={formData.fullname} onChange={e => handleChange("fullname", e.target.value)} />

          <label>Mật khẩu</label>
          <input type="text" value={formData.password} onChange={e => handleChange("password", e.target.value)} />

          <label>Email</label>
          <input type="email" value={formData.email} onChange={e => handleChange("email", e.target.value)} />

          <label>Vai trò</label>
          <select value={formData.role} onChange={e => handleChange("role", e.target.value)} style={{ width: "426px" }}>
            <option value="admin">Quản trị viên</option>
            <option value="user">Người dùng</option>
            <option value="guest">Khách</option>
          </select>

          <label>Cấp phép</label>
          <input
            type="text"
            value={formData.permissions.join(", ")}
            onChange={e => handleChange("permissions", e.target.value.split(",").map(p => p.trim()))}
            placeholder="Nhập các quyền, cách nhau bằng dấu phẩy"
          />

          <label>Ảnh đại diện</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {formData.avatar && <img src={formData.avatar} alt="Avatar Preview" style={{ width: "80px", marginTop: "10px", borderRadius: "8px" }} />}

          <label>Ngày tạo</label>
          <input value={formData.createdAt} readOnly />
          <label>Ngày cập nhật</label>
          <input value={formData.updatedAt} readOnly />
          <label>Người tạo</label>
          <input value={formData.createdBy} readOnly />
          <label>Người cập nhật</label>
          <input value={formData.updatedBy} readOnly />
        </div>

        <div className="modal-actions">
          <button className="btn save" onClick={handleSave}>Lưu</button>
          <button className="btn close" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfoModal;
