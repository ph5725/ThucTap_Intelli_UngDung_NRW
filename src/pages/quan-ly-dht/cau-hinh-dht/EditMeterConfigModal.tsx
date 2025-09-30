// src/pages/quan-ly-dht/qlchdht/EditMeterConfigModal.tsx
import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
import "../../../styles/cau-hinh-dht/EditMeterConfigModal.css";
// import { meterConfigService, type MeterConfig } from "../../../services/dong-ho-tong/meterConfigService";
// import { mockMeterConfigs } from "../../../config/mockData"; // mockMeters chứa list đồng hồ

// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddCauHinhDhtRequest, CauHinhDhtResponse, UpdateCauHinhDhtRequest } from "src/types/dong-ho-tong/cau-hinh-dht";
import { ThongTinNguoiDung } from "src/types/authTypes";

// text
import { TextForms } from "src/constants/text";

interface Props {
  configId: number;
  onClose: () => void;
  onSave: (updated: CauHinhDhtResponse) => void;
  useMock?: boolean;
}

const EditMeterConfigModal: React.FC<Props> = ({ configId, onClose, onSave, useMock = false }) => {
  const [formData, setFormData] = useState<CauHinhDhtResponse | null>(null);
  // Dữ liệu người dùng nhập
  const [dataUpdate, setDataUpdate] = useState<Omit<
    UpdateCauHinhDhtRequest,
    | "NgayCapNhat"
    | "NguoiCapNhat"
  >>({
    MaDoiTuong: 0,
    MaDongHo: 0,
    GhiChu: "",
  });
  const [loading, setLoading] = useState(false);

  // Load dữ liệu ban đầu
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getById<CauHinhDhtResponse>(apiUrls.CauHinhDHT.detail(configId));
        setFormData(res);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu API:", error);
        alert(TextForms.thongBao.khongTheTaiDuLieu);
        onClose();
      }
    };
    fetchDetail();

  }, [configId, useMock, onClose]);

  if (!formData || loading) {
    return <div className="modal-overlay">Đang tải dữ liệu...</div>;
  }

  // Xử lý thay đổi input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev!,
      [name]: value,
    }));

    setDataUpdate((prev) => ({
      ...prev,
      [name]:
        name === "MaDongHo" || name === "MaDoiTuong"
          ? Number(value)
          : value,
    }));
  };


  // Cập nhật dữ liệu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setLoading(true);

    try {
      // Lấy thông tin người dùng từ localStorage
      const nguoiDungStr = localStorage.getItem("nguoiDung");
      let nguoiDung: ThongTinNguoiDung | null = null;

      if (nguoiDungStr) {
        nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
        console.log("ID người dùng:", nguoiDung.Id);
      }

      // gửi lên API với meterCode là number (id)
      const payload = {
        ...dataUpdate,
        NgayCapNhat: new Date().toISOString(),
        NguoiCapNhat: nguoiDung?.Id ?? 0, // có thể lấy từ context/token
      };

      const res = await updateData<UpdateCauHinhDhtRequest, CauHinhDhtResponse>(
        apiUrls.NguoiDung.update(formData.Id!),
        payload
      );
      alert(TextForms.thongBao.capNhatThanhCong);
      onSave(res);
      onClose();
    } catch (error) {
      console.error("❌ Lỗi cập nhật:", error);
      alert(TextForms.thongBao.loiCapNhat);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (useMock) {
  //     const found = mockMeterConfigs.find(m => m.id === configId);
  //     if (found) setFormData(found);
  //     else { alert("Không tìm thấy dữ liệu mock!"); onClose(); }
  //   } else {
  //     const fetchDetail = async () => {
  //       try {
  //         const res = await meterConfigService.getById(configId);
  //         setFormData(res.data);
  //       } catch (error) {
  //         console.error("Lỗi khi lấy dữ liệu API:", error);
  //         alert("Không thể tải dữ liệu chi tiết!");
  //         onClose();
  //       }
  //     };
  //     fetchDetail();
  //   }
  // }, [configId, useMock, onClose]);

  // if (!formData || loading) {
  //   return <div className="modal-overlay">Đang tải dữ liệu...</div>;
  // }

  // const handleChange = <K extends keyof MeterConfig>(field: K, value: unknown) => {
  //   setFormData(prev => prev ? { ...prev, [field]: value } : prev);
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!formData) return;
  //   setLoading(true);

  //   try {
  //     let updatedData: MeterConfig;

  //     if (useMock) {
  //       const idx = mockMeterConfigs.findIndex(m => m.id === formData.id);
  //       if (idx !== -1) {
  //         mockMeterConfigs[idx] = {
  //           ...formData,
  //           updatedAt: new Date().toISOString(),
  //           updatedByUser: "mock-admin"
  //         };
  //         updatedData = mockMeterConfigs[idx];
  //       } else updatedData = formData;

  //       alert("✅ Cập nhật mock thành công!");
  //     } else {
  //       // gửi lên API với meterCode là number (id)
  //       const payload = {
  //         objectCode: formData.objectCode,
  //         meterCode: formData.meterCode,
  //         note: formData.note,
  //         locked: formData.locked || false,
  //         updatedAt: new Date().toISOString(),
  //         updatedByUser: "current-user" // có thể lấy từ context/token
  //       };
  //       const res = await meterConfigService.update(formData.id, payload);
  //       updatedData = res.data;
  //       alert("✅ Cập nhật thành công!");
  //     }

  //     onSave(updatedData);
  //     onClose();
  //   } catch (error) {
  //     console.error("❌ Lỗi cập nhật:", error);
  //     alert("Cập nhật thất bại!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
            value={formData.MaDoiTuong}
            onChange={handleChange}
          />

          <label>Mã đồng hồ</label>
          <input type="text" value={formData.MaDongHo} readOnly />


          <label>Ghi chú</label>
          <textarea
            name="note"
            value={formData.GhiChu || ""}
            onChange={handleChange}
          />

          {/* Metadata readonly */}
          <label>Ngày tạo</label>
          <input type="text" value={formData.NgayTao} readOnly />
          <label>Người tạo</label>
          <input type="text" value={formData.NguoiTao} readOnly />
          <label>Ngày cập nhật</label>
          <input type="text" value={formData.NgayCapNhat || ""} readOnly />
          <label>Người cập nhật</label>
          <input type="text" value={formData.NguoiCapNhat || ""} readOnly />

          {/* <label>Khóa</label>
          <input
            type="checkbox"
            checked={formData.locked || false}
            onChange={(e) => handleChange("locked", e.target.checked)}
          /> */}

          <div className="modal-actions">
            <button type="submit" className="btn save" disabled={loading}>
              {loading ? "Đang lưu..." : TextForms.nut.luu}
            </button>
            <button type="button" className="btn close" onClick={onClose}>
              {TextForms.nut.luu}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMeterConfigModal;
