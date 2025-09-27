// src/pages/qlbilling/DetailBillingModal.tsx
import React from "react";
import "../../../styles/global.css";
import "../../../styles/qlbiling/EditBillingModal.css";
import "../../../styles/qlbiling/DetailBillingModal.css";
import { type Billing } from "../../../services/billingService";

interface DetailBillingModalProps {
  billing: Billing;
  onClose: () => void;
}

// Component con cho field read-only
const ReadonlyField: React.FC<{ label: string; value?: string | number; type?: string }> = ({
  label,
  value,
  type = "text",
}) => (
  <label>
    {label}:
    <input type={type} value={value || ""} disabled />
  </label>
);

const DetailBillingModal: React.FC<DetailBillingModalProps> = ({ billing, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal detail-billing">
        <div className="text-user">
          <h3>Chi Tiết Hóa Đơn</h3>
        </div>

        <div className="modal-content-scroll">
          <form>
            <ReadonlyField label="Sản lượng tiêu thụ" value={billing.consumption} type="number" />
            <ReadonlyField label="Mã đối tượng" value={billing.objectCode} />
            <ReadonlyField label="Kỳ" value={billing.period} />
            <ReadonlyField label="Năm" value={billing.year} type="number" />
            <ReadonlyField label="Đợt" value={billing.batch} />
            <ReadonlyField label="Từ ngày" value={billing.fromDate} type="date" />
            <ReadonlyField label="Đến ngày" value={billing.toDate} type="date" />
            <ReadonlyField label="Ngày tạo" value={billing.createdAt} />
            <ReadonlyField label="Ngày cập nhật" value={billing.updatedAt} />
            <ReadonlyField label="Người tạo" value={billing.createdBy} />
            <ReadonlyField label="Người cập nhật" value={billing.updatedByUser} />
            
            <label>
              Ghi chú:
              <textarea value={billing.note || ""} disabled />
            </label>

            <div className="modal-actions">
              <button type="button" className="btn close" onClick={onClose}>
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailBillingModal;
