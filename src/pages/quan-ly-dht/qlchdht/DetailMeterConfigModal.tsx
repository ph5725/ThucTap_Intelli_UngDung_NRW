// src/pages/qlchdht/DetailMeterConfigModal.tsx
import React from "react";
import type { MeterConfig } from "./MeterConfigPage";
import "../../../styles/global.css";

interface Props {
  config: MeterConfig;
  onClose: () => void;
}

const DetailMeterConfigModal: React.FC<Props> = ({ config, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Chi tiết cấu hình đồng hồ tổng</h3>

        <label>ID:
          <input type="text" value={config.id} disabled />
        </label>
        <label>Mã đối tượng:
          <input type="text" value={config.objectCode} disabled />
        </label>
        <label>Mã đồng hồ:
          <input type="text" value={config.meterCode} disabled />
        </label>
        <label>Ngày tạo:
          <input type="text" value={config.createdAt} disabled />
        </label>
        <label>Ngày cập nhật:
          <input type="text" value={config.updatedAt || ""} disabled />
        </label>
        <label>Người tạo:
          <input type="text" value={config.createdBy || ""} disabled />
        </label>
        <label>Người cập nhật:
          <input type="text" value={config.updatedByUser || ""} disabled />
        </label>
        <label>Ghi chú:
          <textarea value={config.note || ""} disabled />
        </label>

        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default DetailMeterConfigModal;
