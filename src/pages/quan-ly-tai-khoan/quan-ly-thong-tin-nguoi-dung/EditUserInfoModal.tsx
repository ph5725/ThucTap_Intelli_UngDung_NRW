import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";
import "../../../styles/qlttnd/EditUserInfoModal.css";
import { userService, type UserInfo } from "../../../Service/userService";

interface EditUserInfoModalProps {
  userId: number;               // id luôn tồn tại
  onClose: () => void;
  onSave: (updated: UserInfo) => void;
  useMock?: boolean;
  account?: UserInfo;           // dùng để mock hoặc từ AccountManagement
}

const EditUserInfoModal: React.FC<EditUserInfoModalProps> = ({ userId, onClose, onSave, useMock = false, account }) => {
  const [formData, setFormData] = useState<UserInfo | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loadingApi, setLoadingApi] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingApi(true);
      try {
        let userData: UserInfo;

        if (useMock) {
          userData = account ? { ...account, locked: account.locked ?? false } : {
            id: userId,
            code: "U001",
            username: "mockuser",
            fullname: "Mock User",
            password: "123",
            email: "mock@example.com",
            role: "user",
            permissions: ["read"],
            avatar: "",
            locked: false,
            metadata: {
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              createdBy: "Mock",
              updatedBy: "Mock",
            },
          };
        } else {
          const res = await userService.getById(userId);
          userData = { ...res.data, locked: res.data.locked ?? false };
    }

        setFormData(userData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu user:", error);
        alert("Không thể tải thông tin người dùng!");
        onClose();
      } finally {
        setLoadingApi(false);
      }
    };
    fetchUser();
  }, [userId, useMock, account, onClose]);

  const handleChange = <K extends keyof UserInfo>(field: K, value: UserInfo[K]) => {
    if (!formData) return;
    setFormData(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      handleChange("avatar", URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    if (!formData || formData.id === undefined) return; // đảm bảo id tồn tại
    setSaving(true);
    try {
      const payload = new FormData();
      payload.append("code", formData.code);
      payload.append("username", formData.username);
      payload.append("fullname", formData.fullname);
      payload.append("password", formData.password);
      payload.append("email", formData.email);
      payload.append("role", formData.role);
      formData.permissions.forEach(p => payload.append("permissions[]", p));
      if (selectedFile) payload.append("avatar", selectedFile);
      payload.append("metadata", JSON.stringify(formData.metadata));
      payload.append("locked", formData.locked.toString());

      const res = await userService.update(formData.id, payload);
      const updatedFromBackend: UserInfo = res.data;

      setFormData(updatedFromBackend);
      onSave(updatedFromBackend);

      alert("Cập nhật thông tin thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    } finally {
      setSaving(false);
    }
  };

  if (loadingApi || !formData) {
    return <div className="modal-overlay">Đang tải dữ liệu...</div>;
  }

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
          <select value={formData.role} onChange={e => handleChange("role", e.target.value)}>
            <option value="admin">Quản trị viên</option>
            <option value="user">Người dùng</option>
            <option value="guest">Khách</option>
          </select>

          <label>Cấp phép</label>
          <input
            type="text"
            value={formData.permissions.join(", ")}
            onChange={e => handleChange("permissions", e.target.value.split(",").map(p => p.trim()))}
          />

          <label>Ảnh đại diện</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {formData.avatar && <img src={formData.avatar} alt="Avatar Preview" style={{ width: 80, borderRadius: 8, marginTop: 10 }} />}

          <label>Khóa</label>
          <input type="checkbox" checked={formData.locked} onChange={e => handleChange("locked", e.target.checked)} />

          <label>Ngày tạo</label>
          <input value={formData.metadata.createdAt} readOnly />

          <label>Ngày cập nhật</label>
          <input value={formData.metadata.updatedAt} readOnly />

          <label>Người tạo</label>
          <input value={formData.metadata.createdBy} readOnly />

          <label>Người cập nhật</label>
          <input value={formData.metadata.updatedBy} readOnly />
        </div>

        <div className="modal-actions">
          <button className="btn save" onClick={handleSave} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
          <button className="btn close" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfoModal;
