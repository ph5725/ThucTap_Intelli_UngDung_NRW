// src/pages/quan-ly-dht/qlchdht/EditMeterConfigModal.tsx
import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
import "../../../styles/qlchdht/EditMeterConfigModal.css";
import { meterConfigService, type MeterConfig } from "../../../services/dong-ho-tong/meterConfigService";
import { mockMeterConfigs } from "../../../config/mockData"; // mockMeters chứa list đồng hồ

interface Props {
  configId: number;
  onClose: () => void;
  onSave: (updated: MeterConfig) => void;
  useMock?: boolean;
}

const EditMeterConfigModal: React.FC<Props> = ({ configId, onClose, onSave, useMock = false }) => {
  const [formData, setFormData] = useState<MeterConfig | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (useMock) {
      const found = mockMeterConfigs.find(m => m.id === configId);
      if (found) setFormData(found);
      else { alert("Không tìm thấy dữ liệu mock!"); onClose(); }
    } else {
      const fetchDetail = async () => {
        try {
          const res = await meterConfigService.getById(configId);
          setFormData(res.data);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu API:", error);
          alert("Không thể tải dữ liệu chi tiết!");
          onClose();
        }
      };
      fetchDetail();
    }
  }, [configId, useMock, onClose]);

  if (!formData || loading) {
    return <div className="modal-overlay">Đang tải dữ liệu...</div>;
  }

  const handleChange = <K extends keyof MeterConfig>(field: K, value: unknown) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setLoading(true);

    try {
      let updatedData: MeterConfig;

      if (useMock) {
        const idx = mockMeterConfigs.findIndex(m => m.id === formData.id);
        if (idx !== -1) {
          mockMeterConfigs[idx] = { 
            ...formData, 
            updatedAt: new Date().toISOString(), 
            updatedByUser: "mock-admin" 
          };
          updatedData = mockMeterConfigs[idx];
        } else updatedData = formData;

        alert("✅ Cập nhật mock thành công!");
      } else {
        // gửi lên API với meterCode là number (id)
        const payload = {
          objectCode: formData.objectCode,
          meterCode: formData.meterCode,
          note: formData.note,
          locked: formData.locked || false,
          updatedAt: new Date().toISOString(),
          updatedByUser: "current-user" // có thể lấy từ context/token
        };
        const res = await meterConfigService.update(formData.id, payload);
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
      <div className="modal edit-config">
        <div className="text-user">
        <h3>Chỉnh sửa cấu hình đồng hồ</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Mã đối tượng</label>
          <input
            type="text"
            value={formData.objectCode}
            onChange={(e) => handleChange("objectCode", e.target.value)}
          />

            <label>Mã đồng hồ</label>
            <input type="text" value={formData.meterCode} readOnly />


          <label>Ghi chú</label>
          <textarea
            value={formData.note || ""}
            onChange={(e) => handleChange("note", e.target.value)}
          />

          {/* Metadata readonly */}
          <label>Ngày tạo</label>
          <input type="text" value={formData.createdAt} readOnly />
          <label>Người tạo</label>
          <input type="text" value={formData.createdBy} readOnly />
          <label>Ngày cập nhật</label>
          <input type="text" value={formData.updatedAt || ""} readOnly />
          <label>Người cập nhật</label>
          <input type="text" value={formData.updatedByUser || ""} readOnly />

          <label>Khóa</label>
          <input
            type="checkbox"
            checked={formData.locked || false}
            onChange={(e) => handleChange("locked", e.target.checked)}
          />

          <div className="modal-actions">
            <button type="submit" className="btn save" disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu"}
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

export default EditMeterConfigModal;
