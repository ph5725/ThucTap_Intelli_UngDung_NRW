// src/pages/qldh/DetailMeterModal.tsx
// import "../../../styles/qltk/EditAccountModal.css"; // dùng lại CSS modal
// import "../../../styles/qldh/DetailMeterModal.css";   // CSS riêng cho đồng hồ
import React from "react";
import "src/styles/global.css";
import "src/styles/tai-khoan/EditAccountModal.css"
import "src/styles/dong-ho-tong/DetailMeterModal.css"
// service

// import { apiUrls } from "src/services/apiUrls";
// interface
import {  DongHoTongResponse,  } from "src/types/dong-ho-tong/dong-ho-tong";
// text
import { TextForms } from "src/constants/text";

// export interface Meter {
//   id: number;
//   code: string;
//   name: string;
//   volume: number;
//   status: "Hoạt động" | "Cảnh báo" | "Lỗi";
//   locked?: boolean;
//   recordDate: string;
//   updatedDate: string;
//   updatedBy: string;
//   errorFlag: boolean;
//   createdAt: string;
//   updatedAt: string;
//   createdBy: string;
//   updatedByUser: string;
//   note: string;
// }

interface DetailMeterModalProps {
  meter: DongHoTongResponse | null;
  onClose: () => void;
}

const DetailMeterModal: React.FC<DetailMeterModalProps> = ({ meter, onClose }) => {
  if (!meter) return null;

  return (
    <div className="modal-overlay">
      <div className="modal detail-meter">

        <div className="text-user">
          <h3>Chi tiết đồng hồ</h3>
        </div>

        {/* nội dung cuộn */}
        <div className="modal-content-scroll">
          <label>Mã đồng hồ</label>
          <input type="text" value={meter.ma} readOnly />

          <label>Tên</label>
          <input type="text" value={meter.ten} readOnly />

          <label>Sản lượng (m³)</label>
          <input type="text" value={meter.sanLuong} readOnly />

          {/* <label>Trạng thái</label>
          <input type="text" value={meter.status} readOnly /> */}

          <label>Ngày ghi</label>
          <input type="text" value={meter.ngayGhi} readOnly />

          <label>Ngày chỉnh sửa</label>
          <input type="text" value={meter.ngayChinhSua} readOnly />

          <label>Người chỉnh sửa</label>
          <input type="text" value={meter.nguoiChinhSua} readOnly />

          <label>Đánh dấu lỗi</label>
          <input type="text" value={meter.danhDauLoi ? "Có" : "Không"} readOnly />

          <label>Ngày tạo</label>
          <input type="text" value={meter.ngayTao} readOnly />

          <label>Ngày cập nhật</label>
          <input type="text" value={meter.ngayCapNhat} readOnly />

          <label>Người tạo</label>
          <input type="text" value={meter.nguoiTao} readOnly />

          <label>Người cập nhật</label>
          <input type="text" value={meter.nguoiCapNhat} readOnly />

          <label>Ghi chú</label>
          <textarea value={meter.ghiChu} readOnly />
        </div>

        {/* chỉ có nút Đóng */}
        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>{TextForms.nut.dong}</button>
        </div>
      </div>
    </div>
  );
};

export default DetailMeterModal;
