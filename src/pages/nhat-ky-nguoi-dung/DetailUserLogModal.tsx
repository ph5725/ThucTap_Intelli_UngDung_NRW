// src/pages/nhatky/DetailUserLogModal.tsx
import React from "react";
import "../../styles/global.css";
import "../../styles/nhat-ky/EditUserLogModal.css";
// import { type UserLog } from "../../../services/nguoi-dung/userLogService";
// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddNhatKySuDungRequest, NhatKySuDungResponse, UpdateNhatKySuDungRequest } from "src/types/nguoi-dung/nhat-ky-su-dung";

// text
import { TextForms } from "src/constants/text";

interface DetailUserLogModalProps {
  log: NhatKySuDungResponse;
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
          <input value={log.TenNguoiDung} disabled />

          <label>Hành động</label>
          <input value={log.HanhDong} disabled />

          <label>Tính năng</label>
          <input value={log.TinhNang} disabled />

          <label>Dữ liệu</label>
          <input value={log.DuLieu} disabled />

          {/* <label>Trạng thái</label>
          <input value={log.status} disabled /> */}

          <label>Người tạo</label>
          <input value={log.NguoiTao} disabled />

          <label>Người cập nhật</label>
          <input value={log.NgayCapNhat || ""} disabled />

          <label>Ngày tạo</label>
          <input value={log.NgayTao} disabled />

          <label>Ngày cập nhật</label>
          <input value={log.NgayCapNhat || ""} disabled />

          <label>Ghi chú</label>
          <textarea value={log.GhiChu || ""} disabled />
        </div>

        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>{TextForms.nut.dong}</button>
        </div>
      </div>
    </div>
  );
};

export default DetailUserLogModal;
