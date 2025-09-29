import React from "react";
import "../../../styles/global.css";
import type { BillingReading } from "../../../services/he-thong-billing/billingReadingService";

interface DetailBillingReadingModalProps {
  reading: BillingReading;
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
              <input type="number" value={reading.year} disabled />
            </label>

            <label>Kỳ:
              <input type="text" value={reading.period} disabled />
            </label>

            <label>Ngày tạo:
              <input type="text" value={reading.createdAt} disabled />
            </label>

            <label>Ngày cập nhật:
              <input type="text" value={reading.updatedAt || "-"} disabled />
            </label>

            <label>Người tạo:
              <input type="text" value={reading.createdBy || "-"} disabled />
            </label>

            <label>Người cập nhật:
              <input type="text" value={reading.updatedBy || "-"} disabled />
            </label>

            <label>Số ngày đọc:
              <input type="number" value={reading.daysCount} disabled />
            </label>

            <div className="modal-actions">
              <button type="button" className="btn close" onClick={onClose}>Đóng</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailBillingReadingModal;
