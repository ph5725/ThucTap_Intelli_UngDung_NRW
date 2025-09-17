import React, { useState, useEffect } from "react";
import { meterConfigService, type MeterConfig } from "../../../config/meterConfigService";

interface Props {
  config: MeterConfig;
  onClose: () => void;
  onSave: (updated: MeterConfig) => void;
}

const EditMeterConfigModal: React.FC<Props> = ({ config, onClose, onSave }) => {
  const [formData, setFormData] = useState<MeterConfig>({ ...config });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(config);
  }, [config]);

  const handleChange = (field: keyof MeterConfig, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await meterConfigService.update(formData.id, formData);
      onSave(res.data);
      alert("Cập nhật thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Xảy ra lỗi khi cập nhật!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal edit-config">
        <div className="text-user">
          <h3>Chỉnh sửa cấu hình đồng hồ tổng</h3>
        </div>
        <div className="modal-content-scroll">
          <label>ID:
            <input type="text" value={formData.id} disabled />
          </label>
          <label>Mã đối tượng:
            <input value={formData.objectCode} onChange={e => handleChange("objectCode", e.target.value)} />
          </label>
          <label>Mã đồng hồ:
            <input value={formData.meterCode} onChange={e => handleChange("meterCode", e.target.value)} />
          </label>
          <label>Ngày cập nhật:
            <input type="date" value={formData.updatedAt} onChange={e => handleChange("updatedAt", e.target.value)} />
          </label>
          <label>Người cập nhật:
            <input value={formData.updatedByUser} onChange={e => handleChange("updatedByUser", e.target.value)} />
          </label>
          <label>Ghi chú:
            <textarea value={formData.note || ""} onChange={e => handleChange("note", e.target.value)} />
          </label>
        </div>

        <div className="modal-actions">
          <button className="btn save" onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
          <button className="btn close" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default EditMeterConfigModal;
