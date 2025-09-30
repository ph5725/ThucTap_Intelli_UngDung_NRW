// import "../../../styles/qltk/EditAccountModal.css";
import React, { useState, useEffect } from "react";
import "src/styles/global.css";
import "src/styles/tai-khoan/EditAccountModal.css"
import { NguoiDungResponse, UpdateNguoiDungRequest } from "src/types/nguoi-dung/nguoi-dung";
import { updateData } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// text
import { TextForms } from "src/constants/text";

interface EditAccountModalProps {
  account: NguoiDungResponse;
  onClose: () => void;
  onSave: (updated: NguoiDungResponse) => void;
  useMock?: boolean;
}

const EditAccountModal: React.FC<EditAccountModalProps> = ({
  account,
  onClose,
  onSave,
  useMock = false
}) => {
  const [formData, setFormData] = useState<NguoiDungResponse>({ ...account });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData(account);
  }, [account]);

  const handleChange = (field: keyof NguoiDungResponse, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (formData.Id == null && !useMock) {
      alert("ID người dùng không hợp lệ!");
      return;
    }

    setSaving(true);
    try {
      if (useMock) {
        // Cập nhật local
        onSave(formData);
      } else {
        // Tạo payload để gửi lên backend (chỉ các trường cần update)
        const payload: UpdateNguoiDungRequest = {
          Ten: formData.Ten,
          TenNguoiDung: formData.TenNguoiDung,
          Email: formData.Email,
          VaiTro: formData.VaiTro,
          Ma: "",
          CapPhep: false
        };

        const updated = await updateData<UpdateNguoiDungRequest, NguoiDungResponse>(
          apiUrls.NguoiDung.update(formData.Id),
          payload
        );

        onSave(updated);
      }
      onClose();
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert(TextForms.thongBao.loiCapNhat);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Chỉnh Sửa Tài Khoản</h3>

        <label>Tên tài khoản</label>
        <input
          value={formData.Ten}
          onChange={(e) => handleChange("Ten", e.target.value)}
        />

        <label>Họ tên</label>
        <input
          value={formData.TenNguoiDung}
          onChange={(e) => handleChange("TenNguoiDung", e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={formData.Email}
          onChange={(e) => handleChange("Email", e.target.value)}
        />

        <label>Vai trò</label>
        <select
          value={formData.VaiTro}
          onChange={(e) => handleChange("VaiTro", e.target.value)}
        >
          <option value="admin">Quản trị viên</option>
          <option value="user">Người dùng</option>
        </select>

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

export default EditAccountModal;
