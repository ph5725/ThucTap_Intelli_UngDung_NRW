import React from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";

export interface NhomNguoiDungResponse {
  Id: number;
  NhomNguoiDung1: string;
  ThanhVien?: string;
  GhiChu?: string;
  NgayTao: string;
  NgayCapNhat?: string;
  NguoiTao?: string;
  NguoiCapNhat?: string;
}

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
        <input type="text" value={group.NhomNguoiDung1} readOnly />

        <label>Thành Viên</label>
        <input type="text" value={group.ThanhVien} readOnly />

        <label>Ngày Tạo</label>
        <input type="date" value={group.NgayTao} readOnly />

        <label>Ngày Cập Nhật</label>
        <input type="date" value={group.NgayCapNhat} readOnly />

        <label>Ghi Chú</label>
        <textarea value={group.GhiChu} readOnly rows={3} />

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
