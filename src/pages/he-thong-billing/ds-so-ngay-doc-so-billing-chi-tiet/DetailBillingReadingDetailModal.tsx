import React from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";
// import type { BillingReadingDetail } from "../../../services/he-thong-billing/billingReadingDetailService";
import "../../../styles/songaydocbillingchitiet/DetailBillingReadingDetailModal.css"; // 👈 thêm css
// service
import { createData, updateData, deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddDsNgayDocSoBillingChiTietRequest, DsNgayDocSoBillingChiTietResponse, UpdateDsNgayDocSoBillingChiTietRequest } from "src/types/he-thong-billing/ds-ngay-doc-so-billing-chi-tiet";

// text
import { TextForms } from "src/constants/text";

interface Props {
  reading: BillingReadingDetail;
  onClose: () => void;
}

const DetailBillingReadingDetailModal: React.FC<Props> = ({ reading, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal detail-billing-reading-detail">

        <div className="text-user">
            <h3>Chi tiết ngày số đọc</h3>
        </div>
      

        <label>Mã ngày số đọc</label>
        <input type="text" value={reading.code} disabled />

        <label>Năm</label>
        <input type="number" value={reading.year} disabled />

        <label>Kỳ</label>
        <input type="text" value={reading.period} disabled />

        <label>Đợt</label>
        <input type="text" value={reading.batch} disabled />

        <label>Số ngày đọc</label>
        <input type="number" value={reading.daysCount} disabled />

        <label>Ghi chú</label>
        <textarea value={reading.note || ""} disabled />



        <label>Người tạo</label>
        <input type="text" value={reading.createdBy || ""} disabled />

        <label>Ngày tạo</label>
        <input type="date" value={reading.createdAt.slice(0, 10)} disabled />

        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default DetailBillingReadingDetailModal;
