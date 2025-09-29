// src/pages/qlchdht/DetailMeterConfigModal.tsx
import React from "react";
import "../../../styles/global.css";
import "../../../styles/qlchdht/EditMeterConfigModal.css";
import "../../../styles/qlchdht/DetailMeterConfigModal.css";
import type { MeterConfig } from "../../../services/dong-ho-tong/meterConfigService";

interface Props {
  config: MeterConfig;
  onClose: () => void;
}

const DetailMeterConfigModal: React.FC<Props> = ({ config, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal detail-config">
        <div className="text-user">
          <h3>Chi tiết cấu hình đồng hồ</h3>
        </div>

        <div className="modal-content-scroll">
          <label>Mã đối tượng</label>
          <input type="text" value={config.objectCode} readOnly />

          <label>Mã đồng hồ</label>
          <input type="text" value={config.meterCode} readOnly />

          <label>Ghi chú</label>
          <textarea value={config.note || ""} readOnly />

          {/* Metadata readonly */}
          <label>Ngày tạo</label>
          <input type="text" value={config.createdAt} readOnly />
          <label>Người tạo</label>
          <input type="text" value={config.createdBy} readOnly />
          <label>Ngày cập nhật</label>
          <input type="text" value={config.updatedAt} readOnly />
          <label>Người cập nhật</label>
          <input type="text" value={config.updatedByUser} readOnly />
        </div>

        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default DetailMeterConfigModal;
