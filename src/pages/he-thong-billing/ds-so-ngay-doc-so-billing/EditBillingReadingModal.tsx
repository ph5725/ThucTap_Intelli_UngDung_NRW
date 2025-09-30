// EditBillingReadingModal.tsx
// import type { BillingReading } from "../../../services/he-thong-billing/billingReadingService";
// import { billingReadingService } from "../../../services/he-thong-billing/billingReadingService";
// import { mockBillingReadings } from "../../../config/mockData";
import React, { useState, useEffect } from "react";
import "src/styles/ds-so-ngay-doc-so-billing/EditBillingReadingModal.css";
// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddDsNgayDocSoBillingRequest, DsNgayDocSoBillingResponse, UpdateDsNgayDocSoBillingRequest } from "src/types/he-thong-billing/ds-ngay-doc-so-billing";
import { ThongTinNguoiDung } from "src/types/authTypes";
// text
import { TextForms } from "src/constants/text";

interface EditBillingReadingModalProps {
  readingId: number | undefined; // id của record cần edit
  onClose: () => void;
  onSave: (updated: DsNgayDocSoBillingResponse) => void;
  useMock?: boolean; // true nếu muốn dùng dữ liệu giả
}

const EditBillingReadingModal: React.FC<EditBillingReadingModalProps> = ({
  readingId,
  onClose,
  onSave,
  useMock = false,
}) => {
  const [formData, setFormData] = useState<DsNgayDocSoBillingResponse | null>(null);
  // Dữ liệu người dùng nhập
  const [dataUpdate, setDataUpdate] = useState<Omit<
    UpdateDsNgayDocSoBillingRequest,
    | "NgayCapNhat"
    | "NguoiCapNhat"
  >>({
    Nam: 0,
    Ky: 0,
    SoNgayDocSoBilling: 0,
    GhiChu: "",
  });
  const [loading, setLoading] = useState(true);

  // Load dữ liệu ban đầu
  useEffect(() => {
    if (!readingId) {
      alert("Không có ID hợp lệ!");
      onClose();
      return;
    }
    const fetchReading = async () => {
      try {
        // const data = await billingReadingService.detail(readingId);
        const data = await getById<DsNgayDocSoBillingResponse>(apiUrls.DSNgayDocSoBilling.detail(readingId));
        setFormData(data);
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu BillingReading:", err);
        alert(TextForms.thongBao.khongTheTaiDuLieu);
        onClose();
      } finally {
        setLoading(false);
      }
    };
    fetchReading();

  }, [readingId, onClose, useMock]);
  // useEffect(() => {
  //   if (!readingId) {
  //     alert("Không có ID hợp lệ!");
  //     onClose();
  //     return;
  //   }
  //   if (useMock) {
  //     const mock = mockBillingReadings.find(r => r.id === readingId);
  //     if (!mock) {
  //       alert("Không tìm thấy dữ liệu mock!");
  //       onClose();
  //     } else setFormData(mock);
  //     setLoading(false);
  //   } else {
  //     const fetchReading = async () => {
  //       try {
  //         // const data = await billingReadingService.detail(readingId);
  //         const data = await getById<DsNgayDocSoBillingResponse>(apiUrls.DSNgayDocSoBilling.detail(readingId));
  //         setFormData(data);
  //       } catch (err) {
  //         console.error("❌ Lỗi tải dữ liệu BillingReading:", err);
  //         alert(TextForms.thongBao.khongTheTaiDuLieu);
  //         onClose();
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchReading();
  //   }
  // }, [readingId, onClose, useMock]);

  if (loading || !formData)
    return <div className="modal-overlay">{TextForms.thongBao.dangTaiDuLieu}</div>;

  // Xử lý thay đổi input
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

    setDataUpdate(prev => ({
      ...prev,
      [name]: name === "Nam" || name === "SoNgayDocSoBilling" || name === "Ky" ? Number(value) : value,
    }));
  };

  // Cập nhật dữ liệu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    // Lấy thông tin người dùng từ localStorage
    const nguoiDungStr = localStorage.getItem("nguoiDung");
    let nguoiDung: ThongTinNguoiDung | null = null;

    if (nguoiDungStr) {
      nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
      console.log("ID người dùng:", nguoiDung.id);
    }

    // Chuẩn bị object update có metadata
    const updated: UpdateDsNgayDocSoBillingRequest = {
      ...dataUpdate,
      NgayCapNhat: new Date().toISOString(),
      NguoiCapNhat: nguoiDung?.id ?? 0, // TODO: thay bằng user login thật từ Auth
    };

    try {
      const res = await updateData<UpdateDsNgayDocSoBillingRequest, DsNgayDocSoBillingResponse>(
        apiUrls.NguoiDung.update(formData.Id!),
        updated
      );
      onSave(res);
      alert(TextForms.thongBao.capNhatThanhCong);
      onClose();
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      alert(TextForms.thongBao.loiCapNhat);
    }

    // if (useMock) {
    //   // Cập nhật vào mock
    //   const index = mockBillingReadings.findIndex(r => r.id === updated.id);
    //   if (index >= 0) mockBillingReadings[index] = updated;

    //   onSave(updated);
    //   alert("Cập nhật mock thành công!");
    //   onClose();
    // } else {
    //   try {
    //     const res = await billingReadingService.update(updated.id, updated);
    //     onSave(res.data);
    //     alert(TextForms.thongBao.capNhatThanhCong);
    //     onClose();
    //   } catch (err) {
    //     console.error("❌ Lỗi cập nhật:", err);
    //     alert(TextForms.thongBao.loiCapNhat);
    //   }
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
                value={formData.Nam}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Kỳ:
              <input
                type="text"
                name="period"
                value={formData.Ky}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Ngày tạo:
              <input type="text" value={formData.NgayTao} readOnly />
            </label>

            <label>
              Ngày cập nhật:
              <input type="text" value={formData.NgayCapNhat || ""} readOnly />
            </label>

            <label>
              Người tạo:
              <input type="text" value={formData.NguoiTao || ""} readOnly />
            </label>

            <label>
              Người cập nhật:
              <input type="text" value={formData.NguoiCapNhat || ""} readOnly />
            </label>

            <label>
              Số ngày đọc:
              <input
                type="number"
                name="daysCount"
                value={formData.SoNgayDocSoBilling}
                onChange={handleChange}
                required
              />
            </label>

            <div className="modal-actions">
              <button type="submit" className="btn save">
                {TextForms.nut.luu}
              </button>
              <button type="button" className="btn close" onClick={onClose}>
                {TextForms.nut.dong}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBillingReadingModal;
