import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
import "../../../styles/nhatky/EditUserLogModal.css";
import { userLogService, type UserLog } from "../../../services/nguoi-dung/userLogService";
import { mockUserLogs } from "../../config/mockData";

interface EditUserLogModalProps {
  logId: number;                // id record cần edit
  onClose: () => void;
  onSave: (updated: UserLog) => void;
  useMock?: boolean;            // true: dùng mock, false: gọi API
}

const EditUserLogModal: React.FC<EditUserLogModalProps> = ({ logId, onClose, onSave, useMock = false }) => {
  const [form, setForm] = useState<Omit<UserLog, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedByUser">>({
    user: "",
    action: "",
    feature: "",
    data: "",
    status: "Thành công",
    note: "",
  });
  const [metadata, setMetadata] = useState<Pick<UserLog, "createdAt" | "createdBy" | "updatedAt" | "updatedByUser">>({
    createdAt: "",
    createdBy: "",
    updatedAt: "",
    updatedByUser: "",
  });

  const [loadingApi, setLoadingApi] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchLog = async () => {
      if (useMock) {
        const log = mockUserLogs.find(l => l.id === logId);
        if (!log) return;
        setForm({
          user: log.user,
          action: log.action,
          feature: log.feature,
          data: log.data ?? "",
          status: log.status,
          note: log.note ?? "",
        });
        setMetadata({
          createdAt: log.createdAt,
          createdBy: log.createdBy,
          updatedAt: log.updatedAt ?? "",
          updatedByUser: log.updatedByUser ?? "",
        });
      } else {
        setLoadingApi(true);
        try {
          const res = await userLogService.getById(logId);
          const log = res.data;
          setForm({
            user: log.user,
            action: log.action,
            feature: log.feature,
            data: log.data ?? "",
            status: log.status,
            note: log.note ?? "",
          });
          setMetadata({
            createdAt: log.createdAt,
            createdBy: log.createdBy,
            updatedAt: log.updatedAt ?? "",
            updatedByUser: log.updatedByUser ?? "",
          });
        } catch (err) {
          console.error("❌ Lỗi tải UserLog:", err);
          alert("Không thể tải dữ liệu nhật ký!");
          onClose();
        } finally {
          setLoadingApi(false);
        }
      }
    };
    fetchLog();
  }, [logId, useMock, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (useMock) {
        // Cập nhật mock
        const updated = { ...mockUserLogs.find(l => l.id === logId)!, ...form };
        onSave(updated as UserLog);
      } else {
        const res = await userLogService.update(logId, form);
        onSave(res.data);
      }
      alert("Cập nhật nhật ký thành công!");
      onClose();
    } catch (err) {
      console.error("❌ Lỗi cập nhật UserLog:", err);
      alert("Cập nhật thất bại!");
    } finally {
      setSaving(false);
    }
  };

  if (loadingApi) {
    return <div className="modal-overlay">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal edit-userlog">
        <h3>Chỉnh Sửa Nhật Ký</h3>
        <div className="modal-content-scroll">
          <label>Người dùng</label>
          <input name="user" value={form.user} onChange={handleChange} required />

          <label>Hành động</label>
          <input name="action" value={form.action} onChange={handleChange} required />

          <label>Tính năng</label>
          <input name="feature" value={form.feature} onChange={handleChange} required />

          <label>Dữ liệu</label>
          <input name="data" value={form.data} onChange={handleChange} />

          <label>Trạng thái</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Chưa xác định">Chưa xác định</option>
            <option value="Thành công">Thành công</option>
            <option value="Thất bại">Thất bại</option>
          </select>

          <label>Ghi chú</label>
          <textarea name="note" value={form.note} onChange={handleChange} />

          {/* Metadata read-only */}
          <label>Người tạo</label>
          <input type="text" value={metadata.createdBy} readOnly />
          <label>Ngày tạo</label>
          <input type="text" value={metadata.createdAt} readOnly />
          <label>Người cập nhật</label>
          <input type="text" value={metadata.updatedByUser} readOnly />
          <label>Ngày cập nhật</label>
          <input type="text" value={metadata.updatedAt} readOnly />

          <div className="modal-actions">
            <button className="btn save" onClick={handleSave} disabled={saving}>
              {saving ? "Đang lưu..." : "Lưu"}
            </button>
            <button className="btn close" onClick={onClose}>Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserLogModal;
