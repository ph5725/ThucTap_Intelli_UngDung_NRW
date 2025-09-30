// src/pages/qlbilling/DetailBillingModal.tsx
// import { type Billing } from "../../../services/he-thong-billing/billingService";
import React from "react";
import "src/styles/global.css";
import "src/styles/billing/EditBillingModal.css";
import "src/styles/billing/DetailBillingModal.css";
// service
import { createData, updateData, deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddBillingRequest, BillingResponse, UpdateBillingRequest } from "src/types/he-thong-billing/billing";
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
            <ReadonlyField label="Sản lượng tiêu thụ" value={billing.SanLuongTieuThu} type="number" />
            <ReadonlyField label="Mã đối tượng" value={billing.MaDoiTuong} />
            <ReadonlyField label="Kỳ" value={billing.Ky} />
            <ReadonlyField label="Năm" value={billing.Nam} type="number" />
            <ReadonlyField label="Đợt" value={billing.Dot} />
            <ReadonlyField label="Từ ngày" value={billing.TuNgay} type="date" />
            <ReadonlyField label="Đến ngày" value={billing.DenNgay} type="date" />
            <ReadonlyField label="Ngày tạo" value={billing.NgayTao} />
            <ReadonlyField label="Ngày cập nhật" value={billing.NgayCapNhat} />
            <ReadonlyField label="Người tạo" value={billing.NguoiTao} />
            <ReadonlyField label="Người cập nhật" value={billing.NguoiCapNhat} />
            
            <label>
              Ghi chú:
              <textarea value={billing.GhiChu || ""} disabled />
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
