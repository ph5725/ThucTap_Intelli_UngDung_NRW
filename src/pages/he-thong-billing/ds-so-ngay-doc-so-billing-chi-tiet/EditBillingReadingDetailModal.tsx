// src/pages/billing/EditBillingReadingDetailModal.tsx
import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";
import "../../../styles/songaydocbillingchitiet/EditBillingReadingDetailModal.css";
// import {
//   type BillingReadingDetail,
//   billingReadingDetailService,
// } from "../../../services/he-thong-billing/billingReadingDetailService";
import { mockBillingReadingDetails } from "../../../config/mockData";

// service
import { createData, updateData, deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddDsNgayDocSoBillingChiTietRequest, DsNgayDocSoBillingChiTietResponse, UpdateDsNgayDocSoBillingChiTietRequest } from "src/types/he-thong-billing/ds-ngay-doc-so-billing-chi-tiet";

// text
import { TextForms } from "src/constants/text";

interface Props {
  readingId: number;
  onClose: () => void;
  onSave: (updated: BillingReadingDetail) => void;
  useMock?: boolean;
}

const EditBillingReadingDetailModal: React.FC<Props> = ({
  readingId,
  onClose,
  onSave,
  useMock,
}) => {
  const [formData, setFormData] = useState<BillingReadingDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Load chi tiết
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (useMock) {
          const mock = mockBillingReadingDetails.find((r) => r.id === readingId);
          if (!mock) throw new Error("Không tìm thấy dữ liệu mock");
          setFormData(mock);
        } else {
          const data = await billingReadingDetailService.detail(readingId);
          setFormData(data);
        }
      } catch (error) {
        console.error("❌ Lỗi tải dữ liệu:", error);
        alert("Không tải được dữ liệu!");
        onClose();
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [readingId, onClose, useMock]);

  if (loading || !formData) {
    return <div className="modal-overlay">Đang tải dữ liệu...</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: name === "year" || name === "daysCount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      const now = new Date().toISOString();
      const currentUser = "admin"; // 👉 sau này thay bằng user login thật

      const payload: BillingReadingDetail = {
        ...formData,
        updatedAt: now,
        updatedBy: currentUser,
      };

      if (useMock) {
        onSave(payload);
        alert("✅ Cập nhật mock thành công!");
      } else {
        const updated = await billingReadingDetailService.update(
          readingId,
          payload
        );
        onSave(updated);
        alert("✅ Cập nhật thành công!");
      }
      onClose();
    } catch (error) {
      console.error("❌ Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal edit-billing-reading-detail">
        <div className="text-user">
          <h3>Chỉnh sửa ngày số đọc</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Mã ngày số đọc</label>
          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />

          <label>Năm</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />

          <label>Kỳ</label>
          <input
            name="period"
            value={formData.period}
            onChange={handleChange}
            required
          />

          <label>Đợt</label>
          <input name="batch" value={formData.batch} onChange={handleChange} />

          <label>Số ngày đọc</label>
          <input
            type="number"
            name="daysCount"
            value={formData.daysCount}
            onChange={handleChange}
            required
          />

          <label>Ghi chú</label>
          <textarea
            name="note"
            value={formData.note || ""}
            onChange={handleChange}
          />

          {/* Metadata hiển thị */}
          <label>Ngày tạo:</label>
          <input type="text" value={formData.createdAt} readOnly />
          <label>Người tạo:</label>
          <input type="text" value={formData.createdBy || ""} readOnly />
          <label>Ngày cập nhật:</label>
          <input type="text" value={formData.updatedAt || ""} readOnly />
          <label>Người cập nhật:</label>
          <input type="text" value={formData.updatedBy || ""} readOnly />

          <div className="modal-actions">
            <button type="submit" className="btn save">
              Lưu
            </button>
            <button type="button" className="btn close" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBillingReadingDetailModal;
