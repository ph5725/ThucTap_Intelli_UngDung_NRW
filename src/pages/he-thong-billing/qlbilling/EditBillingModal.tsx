// src/pages/qlbilling/qlbilling/EditBillingModal.tsx
import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
import { billingService, type Billing, type UpdateBillingDTO } from "../../../Service/billingService";
import { mockBillings } from "../../../config/mockData";

interface EditBillingModalProps {
  billingId: number;
  onClose: () => void;
  onSave: (updated: Billing) => void;
  useMock?: boolean; // true để dùng mock data
}

const EditBillingModal: React.FC<EditBillingModalProps> = ({
  billingId,
  onClose,
  onSave,
  useMock = true,
}) => {
  const [form, setForm] = useState<Billing | null>(null);
  const [loading, setLoading] = useState(true);

  // Load dữ liệu ban đầu
  useEffect(() => {
    if (useMock) {
      const billing = mockBillings.find(b => b.id === billingId);
      if (!billing) {
        alert("Không tìm thấy dữ liệu mock!");
        onClose();
      } else setForm(billing);
      setLoading(false);
    } else {
      const fetchBilling = async () => {
        try {
          const res = await billingService.getById(billingId);
          setForm(res.data);
        } catch (err) {
          console.error("❌ Lỗi lấy dữ liệu Billing:", err);
          alert("Không lấy được dữ liệu hóa đơn!");
          onClose();
        } finally {
          setLoading(false);
        }
      };
      fetchBilling();
    }
  }, [billingId, onClose, useMock]);

  if (loading || !form) return <div className="modal-overlay">Đang tải dữ liệu...</div>;

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev!,
      [name]: name === "year" || name === "consumption" ? Number(value) : value,
    }));
  };

  // Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    if (useMock) {
      const updated: Billing = {
        ...form,
        updatedAt: new Date().toISOString(),
        updatedByUser: "mockUser",
      };
      const index = mockBillings.findIndex(b => b.id === updated.id);
      if (index >= 0) mockBillings[index] = updated;
      onSave(updated);
      alert("Cập nhật mock thành công!");
      onClose();
    } else {
      try {
        // chỉ tạo DTO cần thiết
        const payload: UpdateBillingDTO = {
          consumption: form.consumption,
          objectCode: form.objectCode,
          period: form.period,
          year: form.year,
          batch: form.batch,
          fromDate: form.fromDate,
          toDate: form.toDate,
          note: form.note,
          updatedAt: new Date().toISOString(),
          updatedByUser: "currentUser", // FE sinh
        };

        const res = await billingService.update(form.id, payload);
        onSave(res.data);
        alert("Cập nhật thành công!");
        onClose();
      } catch (err) {
        console.error("❌ Lỗi cập nhật Billing:", err);
        alert("Cập nhật thất bại!");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal edit-billing">

        <div className="text-user">
        <h3>Chỉnh Sửa Hóa Đơn</h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <label>Mã đối tượng:</label>
          <input name="objectCode" value={form.objectCode} onChange={handleChange} required />

          <label>Sản lượng tiêu thụ:</label>
          <input type="number" name="consumption" value={form.consumption} onChange={handleChange} required />

          <label>Kỳ:</label>
          <input name="period" value={form.period} onChange={handleChange} required />

          <label>Năm:</label>
          <input type="number" name="year" value={form.year} onChange={handleChange} required />

          <label>Đợt:</label>
          <input name="batch" value={form.batch} onChange={handleChange} />

          <label>Từ ngày:</label>
          <input type="date" name="fromDate" value={form.fromDate} onChange={handleChange} />

          <label>Đến ngày:</label>
          <input type="date" name="toDate" value={form.toDate} onChange={handleChange} />

          <label>Ghi chú:</label>
          <textarea name="note" value={form.note} onChange={handleChange} />

          {/* Metadata hiển thị chỉ đọc */}

          <label>Ngày tạo:</label>
          <input type="text" value={form.createdAt} readOnly />

          <label>Người tạo:</label>
          <input type="text" value={form.createdBy} readOnly />

          <label>Ngày cập nhật:</label>
          <input type="text" value={form.updatedAt || ""} readOnly />

          <label>Người cập nhật:</label>
          <input type="text" value={form.updatedByUser || ""} readOnly />

          <div className="modal-actions">
            <button type="submit" className="btn save">Lưu</button>
            <button type="button" className="btn close" onClick={onClose}>Đóng</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBillingModal;
