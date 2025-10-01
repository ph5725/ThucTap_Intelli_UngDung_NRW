// src/pages/qlchdht/DetailMeterConfigModal.tsx
// import type { MeterConfig } from "../../../services/dong-ho-tong/meterConfigService";
// import "../../../styles/qlchdht/EditMeterConfigModal.css";
// import "../../../styles/qlchdht/DetailMeterConfigModal.css";
import React from "react";
import "src/styles/global.css";
import "src/styles/cau-hinh-dht/EditMeterConfigModal.css"
import "src/styles/cau-hinh-dht/DetailMeterConfigModal.css"
// service
// import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
// import { apiUrls } from "src/services/apiUrls";
// // interface
import {  CauHinhDhtResponse  } from "src/types/dong-ho-tong/cau-hinh-dht";;
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
          <input type="text" value={config.maDoiTuong} readOnly />

          <label>Mã đồng hồ</label>
          <input type="text" value={config.maDongHo} readOnly />

          <label>Ghi chú</label>
          <textarea value={config.ghiChu || ""} readOnly />

          {/* Metadata readonly */}
          <label>Ngày tạo</label>
          <input type="text" value={config.ngayTao} readOnly />
          <label>Người tạo</label>
          <input type="text" value={config.nguoiTao} readOnly />
          <label>Ngày cập nhật</label>
          <input type="text" value={config.ngayCapNhat} readOnly />
          <label>Người cập nhật</label>
          <input type="text" value={config.nguoiCapNhat} readOnly />
        </div>

        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>{TextForms.nut.dong}</button>
        </div>
      </div>
    </div>
  );
};

export default DetailMeterConfigModal;
