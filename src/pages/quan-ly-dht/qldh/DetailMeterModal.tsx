// src/pages/qldh/DetailMeterModal.tsx
import React from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css"; // dùng lại CSS modal
import "../../../styles/qldh/EditMeterModal.css";   // CSS riêng cho đồng hồ

export interface Meter {
  id: number;
  code: string;
  name: string;
  volume: number;
  status: "Hoạt động" | "Cảnh báo" | "Lỗi";
  locked?: boolean;
  recordDate: string;
  updatedDate: string;
  updatedBy: string;
  errorFlag: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedByUser: string;
  note: string;
}

interface DetailMeterModalProps {
  meter: Meter | null;
  onClose: () => void;
}

const DetailMeterModal: React.FC<DetailMeterModalProps> = ({ meter, onClose }) => {
  if (!meter) return null;

  return (
    <div className="modal-overlay">
      <div className="modal edit-meter">

        <div className="text-user">
          <h3>Chi tiết đồng hồ</h3>
        </div>

        {/* nội dung cuộn */}
        <div className="modal-content-scroll">
          <label>Mã đồng hồ</label>
          <input type="text" value={meter.code} readOnly />

          <label>Tên</label>
          <input type="text" value={meter.name} readOnly />

          <label>Sản lượng (m³)</label>
          <input type="text" value={meter.volume} readOnly />

          <label>Trạng thái</label>
          <input type="text" value={meter.status} readOnly />

          <label>Ngày ghi</label>
          <input type="text" value={meter.recordDate} readOnly />

          <label>Ngày chỉnh sửa</label>
          <input type="text" value={meter.updatedDate} readOnly />

          <label>Người chỉnh sửa</label>
          <input type="text" value={meter.updatedBy} readOnly />

          <label>Đánh dấu lỗi</label>
          <input type="text" value={meter.errorFlag ? "Có" : "Không"} readOnly />

          <label>Ngày tạo</label>
          <input type="text" value={meter.createdAt} readOnly />

          <label>Ngày cập nhật</label>
          <input type="text" value={meter.updatedAt} readOnly />

          <label>Người tạo</label>
          <input type="text" value={meter.createdBy} readOnly />

          <label>Người cập nhật</label>
          <input type="text" value={meter.updatedByUser} readOnly />

          <label>Ghi chú</label>
          <textarea value={meter.note} readOnly />
        </div>

        {/* chỉ có nút Đóng */}
        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default DetailMeterModal;
