// src/pages/qlbilling/DetailBillingModal.tsx
// import { type Billing } from "../../../services/he-thong-billing/billingService";
import React from "react";
import "src/styles/global.css";
import "src/styles/billing/DetailBillingModal.css";
// service
// import { createData, updateData, deleteData, getList } from "src/services/crudService";
// import { apiUrls } from "src/services/apiUrls";
// interface
import {  BillingResponse,  } from "src/types/he-thong-billing/billing";
// text
import { TextForms } from "src/constants/text";

interface DetailBillingModalProps {
  billing: BillingResponse;
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
            <ReadonlyField label="Sản lượng tiêu thụ" value={billing.sanLuongTieuThu} type="number" />
            <ReadonlyField label="Mã đối tượng" value={billing.maDoiTuong} />
            <ReadonlyField label="Kỳ" value={billing.ky} />
            <ReadonlyField label="Năm" value={billing.nam} type="number" />
            <ReadonlyField label="Đợt" value={billing.dot} />
            <ReadonlyField label="Từ ngày" value={billing.tuNgay} type="date" />
            <ReadonlyField label="Đến ngày" value={billing.denNgay} type="date" />
            <ReadonlyField label="Ngày tạo" value={billing.ngayTao} />
            <ReadonlyField label="Ngày cập nhật" value={billing.ngayCapNhat} />
            <ReadonlyField label="Người tạo" value={billing.nguoiTao} />
            <ReadonlyField label="Người cập nhật" value={billing.nguoiCapNhat} />
            
            <label>
              Ghi chú:
              <textarea value={billing.ghiChu || ""} disabled />
            </label>

            <div className="modal-actions">
              <button type="button" className="btn close" onClick={onClose}>
                {TextForms.nut.dong}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailBillingModal;
