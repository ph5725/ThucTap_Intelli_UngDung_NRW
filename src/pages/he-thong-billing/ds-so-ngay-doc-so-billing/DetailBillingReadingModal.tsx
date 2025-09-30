// import type { BillingReading } from "../../../services/he-thong-billing/billingReadingService";
import React from "react";
import "src/styles/global.css";
// service
import { createData, updateData, deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddDsNgayDocSoBillingRequest, DsNgayDocSoBillingResponse, UpdateDsNgayDocSoBillingRequest } from "src/types/he-thong-billing/ds-ngay-doc-so-billing";
// text
import { TextForms } from "src/constants/text";

interface DetailBillingReadingModalProps {
  reading: DsNgayDocSoBillingResponse;
  onClose: () => void;
}

const DetailBillingReadingModal: React.FC<DetailBillingReadingModalProps> = ({ reading, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal edit-billing-reading">
        <div className="text-user"><h3>Chi Tiết Ngày Số Đọc</h3></div>

        <div className="modal-content-scroll">
          <form>
            <label>Năm:
              <input type="number" value={reading.Nam} disabled />
            </label>

            <label>Kỳ:
              <input type="text" value={reading.Ky} disabled />
            </label>

            <label>Ngày tạo:
              <input type="text" value={reading.NgayTao} disabled />
            </label>

            <label>Ngày cập nhật:
              <input type="text" value={reading.NgayCapNhat || "-"} disabled />
            </label>

            <label>Người tạo:
              <input type="text" value={reading.NguoiTao || "-"} disabled />
            </label>

            <label>Người cập nhật:
              <input type="text" value={reading.NguoiCapNhat || "-"} disabled />
            </label>

            <label>Số ngày đọc:
              <input type="number" value={reading.SoNgayDocSoBilling} disabled />
            </label>

            <div className="modal-actions">
              <button type="button" className="btn close" onClick={onClose}>{TextForms.nut.dong}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailBillingReadingModal;
