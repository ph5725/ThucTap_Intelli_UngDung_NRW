// src/pages/qlchdht/DetailMeterConfigModal.tsx
import React from "react";
import "../../../styles/global.css";
import "../../../styles/qlchdht/EditMeterConfigModal.css";
import "../../../styles/qlchdht/DetailMeterConfigModal.css";
// import type { MeterConfig } from "../../../services/dong-ho-tong/meterConfigService";
// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddCauHinhDhtRequest, CauHinhDhtResponse, UpdateCauHinhDhtRequest } from "src/types/dong-ho-tong/cau-hinh-dht";;

// text
import { TextForms } from "src/constants/text";

interface Props {
  config: CauHinhDhtResponse;
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
          <input type="text" value={config.MaDoiTuong} readOnly />

          <label>Mã đồng hồ</label>
          <input type="text" value={config.MaDongHo} readOnly />

          <label>Ghi chú</label>
          <textarea value={config.GhiChu || ""} readOnly />

          {/* Metadata readonly */}
          <label>Ngày tạo</label>
          <input type="text" value={config.NgayTao} readOnly />
          <label>Người tạo</label>
          <input type="text" value={config.NguoiTao} readOnly />
          <label>Ngày cập nhật</label>
          <input type="text" value={config.NgayCapNhat} readOnly />
          <label>Người cập nhật</label>
          <input type="text" value={config.NguoiCapNhat} readOnly />
        </div>

        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>{TextForms.nut.dong}</button>
        </div>
      </div>
    </div>
  );
};

export default DetailMeterConfigModal;
