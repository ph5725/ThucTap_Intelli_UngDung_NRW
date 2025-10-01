// import "../../../styles/qltk/EditAccountModal.css";
import React from "react";
import "src/styles/global.css";
import "src/styles/tai-khoan/EditAccountModal.css"
import { NhomNguoiDungResponse } from "src/types/nguoi-dung/nhom-nguoi-dung";



interface DetailUserGroupModalProps {
  group: NhomNguoiDungResponse;
  onClose: () => void;
}

const DetailUserGroupModal: React.FC<DetailUserGroupModalProps> = ({ group, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="text-user">
              <h3>Chi Tiết Nhóm Người Dùng</h3>
             </div>

        <label>Nhóm Người Dùng</label>
        <input type="text" value={group.nhomNguoiDung1} readOnly />

        <label>Thành Viên</label>
        <input type="text" value={group.thanhVien} readOnly />

        <label>Ngày Tạo</label>
        <input type="date" value={group.ngayTao} readOnly />

        <label>Ngày Cập Nhật</label>
        <input type="date" value={group.ngayCapNhat} readOnly />

        <label>Người Tạo</label>
        <input type="date" value={group.nguoiTao} readOnly />

        <label>Người Cập Nhật</label>
        <input type="date" value={group.nguoiCapNhat} readOnly />

        <label>Ghi Chú</label>
        <textarea value={group.ghiChu} readOnly rows={3} />

        <div className="form-actions">
          <button className="btn close" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailUserGroupModal;
