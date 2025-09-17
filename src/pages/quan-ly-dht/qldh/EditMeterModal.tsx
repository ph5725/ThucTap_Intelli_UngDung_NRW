// src/pages/qldh/EditMeterModal.tsx
import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
import "../../../styles/qldh/EditMeterModal.css";
import { meterService, type Meter } from "../../../config/meterService";

interface EditMeterModalProps {
  meter: Meter | null;
  onClose: () => void;
  onSave: (updated: Meter) => void;
}

const EditMeterModal: React.FC<EditMeterModalProps> = ({ meter, onClose, onSave }) => {
  const emptyMeter: Meter = {
    id: 0,
    code: "",
    name: "",
    volume: 0,
    status: "Hoạt động",
    locked: false,
    recordDate: "",
    updatedDate: "",
    updatedBy: "",
    errorFlag: false,
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedByUser: "",
    note: "",
  };

  const [formData, setFormData] = useState<Meter>(meter || emptyMeter);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(meter || emptyMeter);
  }, [meter]);

  const handleChange = <K extends keyof Meter>(field: K, value: Meter[K]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.id) return alert("Thiếu ID để cập nhật đồng hồ!");
    setLoading(true);
    try {
      const updated = await meterService.update(formData.id, formData);
      onSave(updated.data);
      alert("Cập nhật đồng hồ thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật đồng hồ:", error);
      alert("Có lỗi xảy ra khi cập nhật đồng hồ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal edit-meter">
        <div className="text-user">
          <h3>Chỉnh sửa đồng hồ</h3>
        </div>

        <div className="modal-content-scroll">
          <label>Mã đồng hồ</label>
          <input value={formData.code} onChange={(e) => handleChange("code", e.target.value)} />

          <label>Tên</label>
          <input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />

          <label>Sản lượng (m³)</label>
          <input type="number" value={formData.volume} onChange={(e) => handleChange("volume", Number(e.target.value))} />

          <label>Trạng thái</label>
          <select value={formData.status} onChange={(e) => handleChange("status", e.target.value as Meter["status"])}>
            <option value="Hoạt động">Hoạt động</option>
            <option value="Cảnh báo">Cảnh báo</option>
            <option value="Lỗi">Lỗi</option>
          </select>

          <label>Ngày ghi</label>
          <input type="date" value={formData.recordDate} onChange={(e) => handleChange("recordDate", e.target.value)} />

          <label>Ngày chỉnh sửa</label>
          <input type="date" value={formData.updatedDate} onChange={(e) => handleChange("updatedDate", e.target.value)} />

          <label>Người chỉnh sửa</label>
          <input type="text" value={formData.updatedBy} onChange={(e) => handleChange("updatedBy", e.target.value)} />

          <label className="checkbox">
            <input type="checkbox" checked={formData.errorFlag} onChange={(e) => handleChange("errorFlag", e.target.checked)} />
            Đánh dấu lỗi
          </label>

          <label>Ghi chú</label>
          <textarea value={formData.note} onChange={(e) => handleChange("note", e.target.value)} />

          {/* Read-only info */}
          <label>Ngày tạo</label>
          <input type="text" value={formData.createdAt} readOnly />
          <label>Ngày cập nhật</label>
          <input type="text" value={formData.updatedAt} readOnly />
          <label>Người tạo</label>
          <input type="text" value={formData.createdBy} readOnly />
          <label>Người cập nhật</label>
          <input type="text" value={formData.updatedByUser} readOnly />
        </div>

        <div className="modal-actions">
          <button className="btn save" onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
          <button className="btn close" onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMeterModal;
