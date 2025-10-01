// src/pages/nhatky/DetailUserLogModal.tsx
// import "../../../styles/nhatky/EditUserLogModal.css";
// import { type UserLog } from "../../../services/nguoi-dung/userLogService";
import React from "react";
import "src/styles/global.css";
import "src/styles/nhat-ky/DetailUserLogModal.css";

// service
// import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
// import { apiUrls } from "src/services/apiUrls";
// interface
import {  NhatKySuDungResponse, } from "src/types/nguoi-dung/nhat-ky-su-dung";
// text
import { TextForms } from "src/constants/text";

interface DetailUserLogModalProps {
  log: NhatKySuDungResponse;
  onClose: () => void;
}

const DetailUserLogModal: React.FC<DetailUserLogModalProps> = ({ log, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal detail-userlog">
        <div className="text-user">
          <h3>Chi Tiết Nhật Ký Người Dùng</h3>
        </div>

        <div className="modal-content-scroll">
          <label>Người dùng</label>
          <input value={log.tenNguoiDung} disabled />

          <label>Hành động</label>
          <input value={log.hanhDong} disabled />

          <label>Tính năng</label>
          <input value={log.tinhNang} disabled />

          <label>Dữ liệu</label>
          <input value={log.duLieu} disabled />

          {/* <label>Trạng thái</label>
          <input value={log.status} disabled /> */}

          <label>Người tạo</label>
          <input value={log.nguoiTao} disabled />

          <label>Người cập nhật</label>
          <input value={log.ngayCapNhat || ""} disabled />

          <label>Ngày tạo</label>
          <input value={log.ngayTao} disabled />

          <label>Ngày cập nhật</label>
          <input value={log.ngayCapNhat || ""} disabled />

          <label>Ghi chú</label>
          <textarea value={log.ghiChu || ""} disabled />
        </div>

        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>{TextForms.nut.dong}</button>
        </div>
      </div>
    </div>
  );
};

export default DetailUserLogModal;
