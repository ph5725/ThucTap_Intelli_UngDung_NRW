import React from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";

interface UserGroup {
  id: number;
  groupName: string;
  members: string;
  createdAt: string;
  updatedAt: string;
  note: string;
}

interface DetailUserGroupModalProps {
  group: UserGroup;
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
        <input type="text" value={group.groupName} readOnly />

        <label>Thành Viên</label>
        <input type="text" value={group.members} readOnly />

        <label>Ngày Tạo</label>
        <input type="date" value={group.createdAt} readOnly />

        <label>Ngày Cập Nhật</label>
        <input type="date" value={group.updatedAt} readOnly />

        <label>Ghi Chú</label>
        <textarea value={group.note} readOnly rows={3} />

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
