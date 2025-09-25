// EditBillingReadingModal.tsx
import React, { useState, useEffect } from "react";
import type { BillingReading } from "../../../Service/billingReadingService";
import { billingReadingService } from "../../../Service/billingReadingService";
import { mockBillingReadings } from "../../../config/mockData";
import "../../../styles/songaydocbilling/EditBillingReadingModal.css";

interface EditBillingReadingModalProps {
  readingId: number | undefined; // id của record cần edit
  onClose: () => void;
  onSave: (updated: BillingReading) => void;
  useMock?: boolean; // true nếu muốn dùng dữ liệu giả
}

const EditBillingReadingModal: React.FC<EditBillingReadingModalProps> = ({
  readingId,
  onClose,
  onSave,
  useMock = false,
}) => {
  const [formData, setFormData] = useState<BillingReading | null>(null);
  const [loading, setLoading] = useState(true);

  // Load dữ liệu
  useEffect(() => {
    if (!readingId) {
      alert("Không có ID hợp lệ!");
      onClose();
      return;
    }

    if (useMock) {
      const mock = mockBillingReadings.find(r => r.id === readingId);
      if (!mock) {
        alert("Không tìm thấy dữ liệu mock!");
        onClose();
      } else setFormData(mock);
      setLoading(false);
    } else {
      const fetchReading = async () => {
        try {
          const data = await billingReadingService.detail(readingId);
          setFormData(data);
        } catch (err) {
          console.error("❌ Lỗi tải dữ liệu BillingReading:", err);
          alert("Không lấy được dữ liệu ngày số đọc!");
          onClose();
        } finally {
          setLoading(false);
        }
      };
      fetchReading();
    }
  }, [readingId, onClose, useMock]);

  if (loading || !formData)
    return <div className="modal-overlay">Đang tải dữ liệu...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev =>
      prev
        ? {
            ...prev,
            [name]:
              name === "year" || name === "daysCount" ? Number(value) : value,
          }
        : null
    );
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData) return;

  // Chuẩn bị object update có metadata
  const updated: BillingReading = {
    ...formData,
    updatedAt: new Date().toISOString(),
    updatedBy: "currentUser", // TODO: thay bằng user login thật từ Auth
  };

  if (useMock) {
    // Cập nhật vào mock
    const index = mockBillingReadings.findIndex(r => r.id === updated.id);
    if (index >= 0) mockBillingReadings[index] = updated;

    onSave(updated);
    alert("Cập nhật mock thành công!");
    onClose();
  } else {
    try {
      const res = await billingReadingService.update(updated.id, updated);
      onSave(res.data);
      alert("Cập nhật thành công!");
      onClose();
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      alert("Cập nhật thất bại!");
    }
  }
};


  return (
    <div className="modal-overlay">
      <div className="modal edit-billing-reading">
        <div className="text-user">
          <h3>Chỉnh Sửa Ngày Số Đọc</h3>
        </div>

        <div className="modal-content-scroll">
          <form onSubmit={handleSubmit}>
            <label>
              Năm:
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Kỳ:
              <input
                type="text"
                name="period"
                value={formData.period}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Ngày tạo:
              <input type="text" value={formData.createdAt} readOnly />
            </label>

            <label>
              Ngày cập nhật:
              <input type="text" value={formData.updatedAt || ""} readOnly />
            </label>

            <label>
              Người tạo:
              <input type="text" value={formData.createdBy || ""} readOnly />
            </label>

            <label>
              Người cập nhật:
              <input type="text" value={formData.updatedBy || ""} readOnly />
            </label>

            <label>
              Số ngày đọc:
              <input
                type="number"
                name="daysCount"
                value={formData.daysCount}
                onChange={handleChange}
                required
              />
            </label>

            <div className="modal-actions">
              <button type="submit" className="btn save">
                Lưu
              </button>
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

export default EditBillingReadingModal;
