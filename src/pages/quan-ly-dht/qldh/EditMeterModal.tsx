import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
import { meterService, type Meter } from "../../../Service/meterService";
import { mockMeters } from "../../../config/mockData";
import "../../../styles/qldh/EditMeterModal.css";

interface EditMeterModalProps {
  meterId: number;
  onClose: () => void;
  onSave: (updated: Meter) => void;
  useMock?: boolean;
}

const EditMeterModal: React.FC<EditMeterModalProps> = ({ meterId, onClose, onSave, useMock = false }) => {
  const [formData, setFormData] = useState<Meter | null>(null);
  const [originalData, setOriginalData] = useState<Meter | null>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (useMock) {
      const found = mockMeters.find(m => m.id === meterId);
      if (found) {
        setFormData({ ...found });
        setOriginalData({ ...found });
      } else {
        alert("Không tìm thấy dữ liệu mock!");
        onClose();
      }
      setLoading(false);
    } else {
      const fetchDetail = async () => {
        try {
          const res = await meterService.getById(meterId);
          setFormData(res.data);
          setOriginalData(res.data);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu API:", error);
          alert("Không thể tải dữ liệu chi tiết!");
          onClose();
        } finally {
          setLoading(false);
        }
      };
      fetchDetail();
    }
  }, [meterId, useMock, onClose]);

  if (loading || !formData) return <div className="modal-overlay">Đang tải dữ liệu...</div>;

  const handleChange = <K extends keyof Meter>(field: K, value: Meter[K]) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !originalData) return;

    setLoading(true);
    try {
      const isVolumeChanged = formData.volume !== originalData.volume;

      const payload: Meter = {
        ...formData,
        updatedDate: isVolumeChanged ? new Date().toISOString().slice(0, 10) : formData.updatedDate,
        updatedBy: isVolumeChanged ? "admin" : formData.updatedBy,
        updatedAt: new Date().toISOString(),
        updatedByUser: "admin",
      };

      let updatedData: Meter;
      if (useMock) {
        const idx = mockMeters.findIndex(m => m.id === payload.id);
        if (idx !== -1) mockMeters[idx] = { ...payload };
        updatedData = payload;
        alert("✅ Cập nhật mock thành công!");
      } else {
        const res = await meterService.update(payload.id, payload);
        updatedData = res.data;
        alert("✅ Cập nhật thành công!");
      }

      onSave(updatedData);
      onClose();
    } catch (error) {
      console.error("❌ Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
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

        <form onSubmit={handleSubmit}>
          <label>Mã đồng hồ</label>
          <input value={formData.code} onChange={(e) => handleChange("code", e.target.value)} required />

          <label>Tên đồng hồ</label>
          <input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />

          <label>Sản lượng (m³)</label>
          <input type="number" value={formData.volume} onChange={(e) => handleChange("volume", Number(e.target.value))} required />

          {/* Metadata sản lượng */}
          <label>Ngày ghi</label>
          <input type="date" value={formData.recordDate} onChange={(e) => handleChange("recordDate", e.target.value)} />

          <label>Ngày chỉnh sửa sản lượng</label>
          <input type="text" value={formData.updatedDate || ""} readOnly />

          <label>Người chỉnh sửa sản lượng</label>
          <input type="text" value={formData.updatedBy || ""} readOnly />

          <label>Trạng thái</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value as Meter["status"])}
          >
            <option value="Hoạt động">Hoạt động</option>
            <option value="Cảnh báo">Cảnh báo</option>
            <option value="Lỗi">Lỗi</option>
          </select>

          <label>Đánh dấu lỗi</label>
          <select
            value={formData.errorFlag ? "Có" : "Không"}
            onChange={(e) => handleChange("errorFlag", e.target.value === "Có")}
          >
            <option value="Không">Không</option>
            <option value="Có">Có</option>
          </select>

          <label>Ghi chú</label>
          <textarea value={formData.note || ""} onChange={(e) => handleChange("note", e.target.value)} />

          {/* Metadata chung */}
          <label>Ngày tạo</label>
          <input type="text" value={formData.createdAt} readOnly />
          <label>Người tạo</label>
          <input type="text" value={formData.createdBy} readOnly />
          <label>Ngày cập nhật</label>
          <input type="text" value={formData.updatedAt} readOnly />
          <label>Người cập nhật</label>
          <input type="text" value={formData.updatedByUser} readOnly />

          <div className="modal-actions">
            <button type="submit" className="btn save" disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
            <button type="button" className="btn close" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMeterModal;
