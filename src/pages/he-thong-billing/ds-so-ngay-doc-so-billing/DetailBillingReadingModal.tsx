// import type { BillingReading } from "../../../services/he-thong-billing/billingReadingService";
import React from "react";
import "src/styles/global.css";
// service
// import { createData, updateData, deleteData, getList } from "src/services/crudService";
// import { apiUrls } from "src/services/apiUrls";
// 
// interface
import { DsNgayDocSoBillingResponse,  } from "src/types/he-thong-billing/ds-ngay-doc-so-billing";
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
              <input type="number" value={reading.nam} disabled />
            </label>

            <label>Kỳ:
              <input type="text" value={reading.ky} disabled />
            </label>

            <label>Ngày tạo:
              <input type="text" value={reading.ngayTao} disabled />
            </label>

            <label>Ngày cập nhật:
              <input type="text" value={reading.ngayCapNhat || "-"} disabled />
            </label>

            <label>Người tạo:
              <input type="text" value={reading.nguoiTao || "-"} disabled />
            </label>

            <label>Người cập nhật:
              <input type="text" value={reading.nguoiCapNhat || "-"} disabled />
            </label>

            <label>Số ngày đọc:
              <input type="number" value={reading.soNgayDocSoBilling} disabled />
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
