// src/pages/nhatky/DetailUserLogModal.tsx
import React from "react";
import "../../../styles/global.css";
import "../../../styles/nhatky/EditUserLogModal.css";
import { type UserLog } from "../../../services/userLogService";

interface DetailUserLogModalProps {
  log: UserLog;
  onClose: () => void;
}

const DetailUserLogModal: React.FC<DetailUserLogModalProps> = ({ log, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal edit-userlog">
        <div className="text-user">
          <h3>Chi Tiết Nhật Ký Người Dùng</h3>
        </div>

        <div className="modal-content-scroll">
          <label>Người dùng</label>
          <input value={log.user} disabled />

          <label>Hành động</label>
          <input value={log.action} disabled />

          <label>Tính năng</label>
          <input value={log.feature} disabled />

          <label>Dữ liệu</label>
          <input value={log.data} disabled />

          <label>Trạng thái</label>
          <input value={log.status} disabled />

          <label>Người tạo</label>
          <input value={log.createdBy} disabled />

          <label>Người cập nhật</label>
          <input value={log.updatedByUser || ""} disabled />

          <label>Ngày tạo</label>
          <input value={log.createdAt} disabled />

          <label>Ngày cập nhật</label>
          <input value={log.updatedAt || ""} disabled />

          <label>Ghi chú</label>
          <textarea value={log.note || ""} disabled />
        </div>

        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default DetailUserLogModal;
