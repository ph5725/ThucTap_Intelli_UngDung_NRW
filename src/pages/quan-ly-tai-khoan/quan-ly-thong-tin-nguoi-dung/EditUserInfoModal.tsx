import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
import "../../../styles/tai-khoan/EditAccountModal.css";
import "../../../styles/nguoi-dung/EditUserInfoModal.css";
import { NguoiDungResponse, UpdateNguoiDungRequest} from "src/types/nguoi-dung/nguoi-dung";
//crud
import { getById, updateData } from "src/services/crudService";
//Urls
import { apiUrls } from "src/services/apiUrls";
// text
import { TextForms } from "src/constants/text";

interface EditUserInfoModalProps {
  userId: number;               // id luôn tồn tại
  onClose: () => void;
  onSave: (updated: NguoiDungResponse) => void;
}

const EditUserInfoModal: React.FC<EditUserInfoModalProps> = ({ userId, onClose, onSave }) => {
  const [formData, setFormData] = useState<NguoiDungResponse | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loadingApi, setLoadingApi] = useState(false);
  const [saving, setSaving] = useState(false);

  // Lấy dữ liệu user theo id
  useEffect(() => {
    const fetchUser = async () => {
      setLoadingApi(true);
      try {
        const userData: NguoiDungResponse = await getById<NguoiDungResponse>(
          apiUrls.NguoiDung.detail(userId),
          userId
        );
        setFormData(userData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu user:", error);
        alert(TextForms.thongBao.khongTheTaiDuLieu);
        onClose();
      } finally {
        setLoadingApi(false);
      }
    };
    fetchUser();
  }, [userId, onClose]);

  
  const handleChange = <K extends keyof NguoiDungResponse>(field: K, value: NguoiDungResponse[K]) => {
    if (!formData) return;
    setFormData(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      handleChange("AnhDaiDien", URL.createObjectURL(e.target.files[0]));
    }
  };

const handleSave = async () => {
  if (!formData || !formData.Id) return; // đảm bảo formData hợp lệ

  setSaving(true);
  try {
    // 🔹 Chuẩn bị payload cập nhật
    const payload: UpdateNguoiDungRequest = {
      Ma: formData.Ma,
      Ten: formData.Ten,
      TenNguoiDung: formData.TenNguoiDung,
      Email: formData.Email,
      VaiTro: formData.VaiTro,
      CapPhep: formData.CapPhep,
      AnhDaiDien: formData.AnhDaiDien,
      NgayCapNhat: new Date().toISOString(),
      NguoiCapNhat: formData.NguoiCapNhat || "", // nếu null/undefined, gửi chuỗi rỗng
    };

    // 🔹 Nếu có file avatar, dùng FormData
    let body: FormData | UpdateNguoiDungRequest = payload;
    if (selectedFile) {
      const form = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) form.append(key, String(value));
      });
      form.append("AnhDaiDien", selectedFile);
      body = form;
    }

    // 🔹 Gọi API update
    const updated: NguoiDungResponse = await updateData<typeof body, NguoiDungResponse>(
      apiUrls.NguoiDung.update(formData.Id),
      body
    );

    setFormData(updated);
    onSave(updated);
    alert(TextForms.thongBao.capNhatThanhCong);
    onClose();
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    alert(TextForms.thongBao.loiCapNhat);
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
        <h3>Chỉnh sửa thông tin người dùng</h3>
        <div className="modal-content-scroll">
          <label>Mã</label>
          <input value={formData.Ma} onChange={e => handleChange("Ma", e.target.value)} />

          <label>Tên tài khoản</label>
          <input value={formData.Ten} onChange={e => handleChange("Ten", e.target.value)} />

          <label>Tên người dùng</label>
          <input value={formData.TenNguoiDung} onChange={e => handleChange("TenNguoiDung", e.target.value)} />

          <label>Email</label>
          <input type="email" value={formData.Email} onChange={e => handleChange("Email", e.target.value)} />

          <label>Vai trò</label>
          <select value={formData.VaiTro} onChange={e => handleChange("VaiTro", e.target.value)}>
            <option value="admin">Quản trị viên</option>
            <option value="user">Người dùng</option>
            <option value="guest">Khách</option>
          </select>

          <label>Ảnh đại diện</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {formData.AnhDaiDien && <img src={formData.AnhDaiDien} alt="Avatar Preview" style={{ width: 80, borderRadius: 8, marginTop: 10 }} />}

          <label>Ngày tạo</label>
          <input value={formData.NgayTao} readOnly />

          <label>Ngày cập nhật</label>
          <input value={formData.NgayCapNhat} readOnly />

          <label>Người tạo</label>
          <input value={formData.NguoiTao} readOnly />

          <label>Người cập nhật</label>
          <input value={formData.NguoiCapNhat} readOnly />
        </div>

        <div className="modal-actions">
          <button className="btn save" onClick={handleSave} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
          <button className="btn close" onClick={onClose}>{TextForms.nut.huyBo}</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfoModal;
