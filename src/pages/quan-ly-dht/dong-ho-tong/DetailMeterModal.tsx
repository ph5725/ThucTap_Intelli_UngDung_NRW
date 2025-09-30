// src/pages/qldh/DetailMeterModal.tsx
import React from "react";
import "../../../styles/global.css";
import "../../../styles/tai-khoan/EditAccountModal.css"; // dùng lại CSS modal
import "../../../styles/dong-ho-tong/DetailMeterModal.css";   // CSS riêng cho đồng hồ

// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddDongHoTongRequest, DongHoTongResponse, UpdateDongHoTongRequest } from "src/types/dong-ho-tong/dong-ho-tong";

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
          <input type="text" value={meter.Ma} readOnly />

          <label>Tên</label>
          <input type="text" value={meter.Ten} readOnly />

          <label>Sản lượng (m³)</label>
          <input type="text" value={meter.SanLuong} readOnly />

          {/* <label>Trạng thái</label>
          <input type="text" value={meter.status} readOnly /> */}

          <label>Ngày ghi</label>
          <input type="text" value={meter.NgayGhi} readOnly />

          <label>Ngày chỉnh sửa</label>
          <input type="text" value={meter.NgayChinhSua} readOnly />

          <label>Người chỉnh sửa</label>
          <input type="text" value={meter.NguoiChinhSua} readOnly />

          <label>Đánh dấu lỗi</label>
          <input type="text" value={meter.DanhDauLoi ? "Có" : "Không"} readOnly />

          <label>Ngày tạo</label>
          <input type="text" value={meter.NgayTao} readOnly />

          <label>Ngày cập nhật</label>
          <input type="text" value={meter.NgayCapNhat} readOnly />

          <label>Người tạo</label>
          <input type="text" value={meter.NguoiTao} readOnly />

          <label>Người cập nhật</label>
          <input type="text" value={meter.NguoiCapNhat} readOnly />

          <label>Ghi chú</label>
          <textarea value={meter.GhiChu} readOnly />
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
