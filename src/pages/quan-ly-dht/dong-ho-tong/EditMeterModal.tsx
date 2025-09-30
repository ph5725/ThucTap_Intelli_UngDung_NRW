// import { meterService, type Meter } from "../../../services/dong-ho-tong/meterService";
// import { mockMeters } from "../../../config/mockData";
// import "../../../styles/qldh/EditMeterModal.css";
import React, { useState, useEffect } from "react";
import "src/styles/global.css";
import "src/styles/dong-ho-tong/EditMeterModal.css"
// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddDongHoTongRequest, DongHoTongResponse, UpdateDongHoTongRequest } from "src/types/dong-ho-tong/dong-ho-tong";
import { ThongTinNguoiDung } from "src/types/authTypes";
// text
import { TextForms } from "src/constants/text";

interface EditMeterModalProps {
  meterId: number;
  onClose: () => void;
  onSave: (updated: DongHoTongResponse) => void;
  useMock?: boolean;
}

const EditMeterModal: React.FC<EditMeterModalProps> = ({ meterId, onClose, onSave, useMock = false }) => {
  const [formData, setFormData] = useState<DongHoTongResponse | null>(null);
  // Dữ liệu người dùng nhập
  const [dataUpdate, setDataUpdate] = useState<Omit<
    UpdateDongHoTongRequest,
    "NgayChinhSua" | "NgayCapNhat" | "NguoiCapNhat" | "NguoiChinhSua"
  >>({
    Ma: "",
    Ten: "",
    SanLuong: 0,
    DanhDauLoi: false,
    GhiChu: "",
  });
  const [originalData, setOriginalData] = useState<DongHoTongResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Load dữ liệu ban đầu
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getById<DongHoTongResponse>(apiUrls.DongHoTong.detail(meterId));
        setFormData(res);
        setOriginalData(res);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu API:", error);
        alert(TextForms.thongBao.khongTheTaiDuLieu);
        onClose();
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [meterId, useMock, onClose]);

  if (loading || !formData) return <div className="modal-overlay">Đang tải dữ liệu...</div>;

  // Xử lý thay đổi input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev!,
      [name]:
        name === "DanhDauLoi"
          ? value === "Có"
          : name === "SanLuong"
            ? Number(value)
            : value,
    }));

    setDataUpdate((prev) => ({
      ...prev,
      [name]:
        name === "SanLuong"
          ? Number(value)
          : value,
    }));
  };

  // Cập nhật dữ liệu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !originalData) return;

    setLoading(true);
    try {
      // Lấy thông tin người dùng từ localStorage
      const nguoiDungStr = localStorage.getItem("nguoiDung");
      let nguoiDung: ThongTinNguoiDung | null = null;

      if (nguoiDungStr) {
        nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
        console.log("ID người dùng:", nguoiDung.id);
      }

      const payload = {
        ...formData,
        NgayChinhSua: new Date().toISOString(),
        NguoiChinhSua: nguoiDung?.id ?? 0, // có thể lấy từ context/token
        NgayCapNhat: new Date().toISOString(),
        NguoiCapNhat: nguoiDung?.id ?? 0, // có thể lấy từ context/token
      };

      const res = await updateData<UpdateDongHoTongRequest, DongHoTongResponse>(
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
  //     const found = mockMeters.find(m => m.id === meterId);
  //     if (found) {
  //       setFormData({ ...found });
  //       setOriginalData({ ...found });
  //     } else {
  //       alert("Không tìm thấy dữ liệu mock!");
  //       onClose();
  //     }
  //     setLoading(false);
  //   } else {
  //     const fetchDetail = async () => {
  //       try {
  //         const res = await meterService.getById(meterId);
  //         setFormData(res.data);
  //         setOriginalData(res.data);
  //       } catch (error) {
  //         console.error("Lỗi khi lấy dữ liệu API:", error);
  //         alert("Không thể tải dữ liệu chi tiết!");
  //         onClose();
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchDetail();
  //   }
  // }, [meterId, useMock, onClose]);

  // if (loading || !formData) return <div className="modal-overlay">Đang tải dữ liệu...</div>;

  // const handleChange = <K extends keyof Meter>(field: K, value: Meter[K]) => {
  //   setFormData(prev => prev ? { ...prev, [field]: value } : prev);
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!formData || !originalData) return;

  //   setLoading(true);
  //   try {
  //     const isVolumeChanged = formData.volume !== originalData.volume;

  //     const payload: Meter = {
  //       ...formData,
  //       updatedDate: isVolumeChanged ? new Date().toISOString().slice(0, 10) : formData.updatedDate,
  //       updatedBy: isVolumeChanged ? "admin" : formData.updatedBy,
  //       updatedAt: new Date().toISOString(),
  //       updatedByUser: "admin",
  //     };

  //     let updatedData: Meter;
  //     if (useMock) {
  //       const idx = mockMeters.findIndex(m => m.id === payload.id);
  //       if (idx !== -1) mockMeters[idx] = { ...payload };
  //       updatedData = payload;
  //       alert("✅ Cập nhật mock thành công!");
  //     } else {
  //       const res = await meterService.update(payload.id, payload);
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
      <div className="modal edit-meter">
        <div className="text-user">
          <h3>Chỉnh sửa đồng hồ</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Mã đồng hồ</label>
          <input value={formData.Ma}
            onChange={handleChange} required />

          <label>Tên đồng hồ</label>
          <input value={formData.Ten} onChange={handleChange} required />

          <label>Sản lượng (m³)</label>
          <input type="number" value={formData.SanLuong} onChange={handleChange}  required />

          {/* Metadata sản lượng */}
          <label>Ngày ghi</label>
          <input type="date" value={formData.NgayGhi} onChange={handleChange}  />

          <label>Ngày chỉnh sửa sản lượng</label>
          <input type="text" value={formData.NgayChinhSua || ""} readOnly />

          <label>Người chỉnh sửa sản lượng</label>
          <input type="text" value={formData.NguoiChinhSua || ""} readOnly />

          {/* <label>Trạng thái</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value as Meter["status"])}
          >
            <option value="Hoạt động">Hoạt động</option>
            <option value="Cảnh báo">Cảnh báo</option>
            <option value="Lỗi">Lỗi</option>
          </select> */}

          <label>Đánh dấu lỗi</label>
          <select
            name="DanhDauLoi"
            value={formData.DanhDauLoi ? "Có" : "Không"}
            onChange={handleChange}
          >
            <option value="Không">Không</option>
            <option value="Có">Có</option>
          </select>
          {/* <label>Đánh dấu lỗi</label>
          <select
            value={formData.DanhDauLoi ? "Có" : "Không"}
            onChange={(e) => handleChange("errorFlag", e.target.value === "Có")}
          >
            <option value="Không">Không</option>
            <option value="Có">Có</option>
          </select> */}

          <label>Ghi chú</label>
          <textarea value={formData.GhiChu || ""} onChange={handleChange}  />

          {/* Metadata chung */}
          <label>Ngày tạo</label>
          <input type="text" value={formData.NgayTao} readOnly />
          <label>Người tạo</label>
          <input type="text" value={formData.NguoiTao} readOnly />
          <label>Ngày cập nhật</label>
          <input type="text" value={formData.NgayCapNhat} readOnly />
          <label>Người cập nhật</label>
          <input type="text" value={formData.NgayCapNhat} readOnly />

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
