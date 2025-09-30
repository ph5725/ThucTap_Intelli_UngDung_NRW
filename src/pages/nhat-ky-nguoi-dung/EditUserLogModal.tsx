import React, { useState, useEffect } from "react";
import "../../styles/global.css";
import "../../styles/nhat-ky/EditUserLogModal.css";
// import { userLogService, type UserLog } from "../../../services/nguoi-dung/userLogService";
// import { mockUserLogs } from "../../config/mockData";

// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddNhatKySuDungRequest, NhatKySuDungResponse, UpdateNhatKySuDungRequest } from "src/types/nguoi-dung/nhat-ky-su-dung";
import { ThongTinNguoiDung } from "src/types/authTypes";

// text
import { TextForms } from "src/constants/text";

interface EditUserLogModalProps {
  logId: number;                // id record cần edit
  onClose: () => void;
  onSave: (updated: NhatKySuDungResponse) => void;
  useMock?: boolean;            // true: dùng mock, false: gọi API
}

const EditUserLogModal: React.FC<EditUserLogModalProps> = ({ logId, onClose, onSave, useMock = false }) => {
  // const [form, setForm] = useState<Omit<
  // UpdateNhatKySuDungRequest, 
  // "NguoiCapNhat" | "NgayCapNhat" >>({
  //   TenNguoiDung: 0,
  //   HanhDong: "",
  //   TinhNang: "",
  //   DuLieu: "",
  //   GhiChu: "",
  // });
  // const [metadata, setMetadata] = useState<Pick<UpdateNhatKySuDungRequest, "createdAt" | "createdBy" | "updatedAt" | "updatedByUser">>({
  //   createdAt: "",
  //   createdBy: "",
  //   updatedAt: "",
  //   updatedByUser: "",
  // });
  const [form, setForm] = useState<NhatKySuDungResponse | null>(null);
  // Dữ liệu người dùng nhập
  const [dataUpdate, setDataUpdate] = useState<Omit<
    UpdateNhatKySuDungRequest,
    "NguoiCapNhat" | "NgayCapNhat">>({
      TenNguoiDung: 0,
      HanhDong: "",
      TinhNang: "",
      DuLieu: "",
      GhiChu: "",
    });

  const [loadingApi, setLoadingApi] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load dữ liệu ban đầu
  useEffect(() => {
    const fetchLog = async () => {
      setLoadingApi(true);
      try {
        // const res = await userLogService.getById(logId);
        const res = await getById<NhatKySuDungResponse>(apiUrls.NhatKySuDung.detail(logId));;
        const log = res;
        setForm(res);
      } catch (err) {
        console.error("❌ Lỗi tải UserLog:", err);
        alert(TextForms.thongBao.khongTheTaiDuLieu);
        onClose();
      } finally {
        setLoadingApi(false);
      }
    };
    fetchLog();
  }, [logId, useMock, onClose]);

  // Xử lý thay đổi input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // setForm(prev => ({ ...prev, [name]: value }));
    setForm(prev => prev ? { ...prev, TenNguoiDung: value } : prev);
  };

  // Cập nhật dữ liệu
  const handleSave = async () => {
    setSaving(true);
    if (!form) return;

    try {
      // Lấy thông tin người dùng từ localStorage
      const nguoiDungStr = localStorage.getItem("nguoiDung");
      let nguoiDung: ThongTinNguoiDung | null = null;

      if (nguoiDungStr) {
        nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
        console.log("ID người dùng:", nguoiDung.Id);
      }

      const now = new Date().toISOString();
      const currentUser = nguoiDung?.Id ?? 0; // 👉 sau này thay bằng user login thật

      const payload: UpdateNhatKySuDungRequest = {
        ...dataUpdate,
        NgayCapNhat: now,
        NguoiCapNhat: currentUser,
      };

      //  const res = await userLogService.update(logId, form);
      const res = await updateData<UpdateNhatKySuDungRequest, NhatKySuDungResponse>(
        apiUrls.NhatKySuDung.update(form.Id!),
        payload
      );

      onSave(res);
      alert("Cập nhật nhật ký thành công!");
      onClose();
    } catch (err) {
      console.error("❌ Lỗi cập nhật UserLog:", err);
      alert("Cập nhật thất bại!");
    } finally {
      setSaving(false);
    }
  };

  // useEffect(() => {
  //   const fetchLog = async () => {
  //     if (useMock) {
  //       const log = mockUserLogs.find(l => l.id === logId);
  //       if (!log) return;
  //       setForm({
  //         user: log.user,
  //         action: log.action,
  //         feature: log.feature,
  //         data: log.data ?? "",
  //         status: log.status,
  //         note: log.note ?? "",
  //       });
  //       setMetadata({
  //         createdAt: log.createdAt,
  //         createdBy: log.createdBy,
  //         updatedAt: log.updatedAt ?? "",
  //         updatedByUser: log.updatedByUser ?? "",
  //       });
  //     } else {
  //       setLoadingApi(true);
  //       try {
  //         const res = await userLogService.getById(logId);
  //         const log = res.data;
  //         setForm({
  //           user: log.user,
  //           action: log.action,
  //           feature: log.feature,
  //           data: log.data ?? "",
  //           status: log.status,
  //           note: log.note ?? "",
  //         });
  //         setMetadata({
  //           createdAt: log.createdAt,
  //           createdBy: log.createdBy,
  //           updatedAt: log.updatedAt ?? "",
  //           updatedByUser: log.updatedByUser ?? "",
  //         });
  //       } catch (err) {
  //         console.error("❌ Lỗi tải UserLog:", err);
  //         alert("Không thể tải dữ liệu nhật ký!");
  //         onClose();
  //       } finally {
  //         setLoadingApi(false);
  //       }
  //     }
  //   };
  //   fetchLog();
  // }, [logId, useMock, onClose]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setForm(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSave = async () => {
  //   setSaving(true);
  //   try {
  //     if (useMock) {
  //       // Cập nhật mock
  //       const updated = { ...mockUserLogs.find(l => l.id === logId)!, ...form };
  //       onSave(updated as UserLog);
  //     } else {
  //       const res = await userLogService.update(logId, form);
  //       onSave(res.data);
  //     }
  //     alert("Cập nhật nhật ký thành công!");
  //     onClose();
  //   } catch (err) {
  //     console.error("❌ Lỗi cập nhật UserLog:", err);
  //     alert("Cập nhật thất bại!");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  if (loadingApi) {
    return <div className="modal-overlay">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal edit-userlog">
        <h3>Chỉnh Sửa Nhật Ký</h3>
        <div className="modal-content-scroll">
          <label>Người dùng</label>
          <input name="user" value={form?.TenNguoiDung} onChange={handleChange} required />

          <label>Hành động</label>
          <input name="action" value={form?.HanhDong} onChange={handleChange} required />

          <label>Tính năng</label>
          <input name="feature" value={form?.TinhNang} onChange={handleChange} required />

          <label>Dữ liệu</label>
          <input name="data" value={form?.DuLieu} onChange={handleChange} />

          {/* <label>Trạng thái</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Chưa xác định">Chưa xác định</option>
            <option value="Thành công">Thành công</option>
            <option value="Thất bại">Thất bại</option>
          </select> */}

          <label>Ghi chú</label>
          <textarea name="note" value={form?.GhiChu} onChange={handleChange} />

          {/* Metadata read-only */}
          <label>Người cập nhật</label>
          <input type="text" value={form?.NguoiCapNhat} readOnly />
          <label>Ngày cập nhật</label>
          <input type="text" value={form?.NgayCapNhat} readOnly />

          <div className="modal-actions">
            <button className="btn save" onClick={handleSave} disabled={saving}>
              {saving ? "Đang lưu..." : TextForms.nut.luu}
            </button>
            <button className="btn close" onClick={onClose}>{TextForms.nut.dong}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserLogModal;
