// src/pages/billing/EditBillingReadingDetailModal.tsx
import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
import "../../../styles/tai-khoan/EditAccountModal.css";
import "../../../styles/ds-so-ngay-doc-so-billing-chi-tiet/EditBillingReadingDetailModal.css";
// import {
//   type BillingReadingDetail,
//   billingReadingDetailService,
// } from "../../../services/he-thong-billing/billingReadingDetailService";
// import { mockBillingReadingDetails } from "../../../config/mockData";

// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddDsNgayDocSoBillingChiTietRequest, DsNgayDocSoBillingChiTietResponse, UpdateDsNgayDocSoBillingChiTietRequest } from "src/types/he-thong-billing/ds-ngay-doc-so-billing-chi-tiet";
import { ThongTinNguoiDung } from "src/types/authTypes";

// text
import { TextForms } from "src/constants/text";

interface Props {
  readingId: number;
  onClose: () => void;
  onSave: (updated: DsNgayDocSoBillingChiTietResponse) => void;
  useMock?: boolean;
}

const EditBillingReadingDetailModal: React.FC<Props> = ({
  readingId,
  onClose,
  onSave,
  useMock,
}) => {
  const [formData, setFormData] = useState<DsNgayDocSoBillingChiTietResponse | null>(null);
  // Dữ liệu người dùng nhập
  const [dataUpdate, setDataUpdate] = useState<Omit<
    UpdateDsNgayDocSoBillingChiTietRequest,
    | "NgayCapNhat"
    | "NguoiCapNhat"
  >>({
    MaNgayDocSo: 0,
    Nam: 0,
    Ky: 0,
    Dot: 0,
    SoNgayDocSoDot: 0,
    GhiChu: "",
  });
  const [loading, setLoading] = useState(true);

  // Load dữ liệu ban 
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // const data = await billingReadingDetailService.detail(readingId);
        const data = await getById<DsNgayDocSoBillingChiTietResponse>(apiUrls.DSNgayDocSoBillingChiTiet.detail(readingId));;
        setFormData(data);
      } catch (error) {
        console.error("❌ Lỗi tải dữ liệu:", error);
        alert(TextForms.thongBao.khongTheTaiDuLieu);
        onClose();
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [readingId, onClose, useMock]);
  // useEffect(() => {
  //   const fetchDetail = async () => {
  //     try {
  //       if (useMock) {
  //         const mock = mockBillingReadingDetails.find((r) => r.id === readingId);
  //         if (!mock) throw new Error("Không tìm thấy dữ liệu mock");
  //         setFormData(mock);
  //       } else {
  //         // const data = await billingReadingDetailService.detail(readingId);
  //         const data = await getById<DsNgayDocSoBillingChiTietResponse>(apiUrls.DSNgayDocSoBillingChiTiet.detail(readingId));;
  //         setFormData(data);
  //       }
  //     } catch (error) {
  //       console.error("❌ Lỗi tải dữ liệu:", error);
  //       alert(TextForms.thongBao.khongTheTaiDuLieu);
  //       onClose();
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchDetail();
  // }, [readingId, onClose, useMock]);

  if (loading || !formData) {
    return <div className="modal-overlay">{TextForms.thongBao.dangTaiDuLieu}</div>;
  }

  // Xử lý thay đổi input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: name === "nam" || name === "SoNgayDocSoDot" ? Number(value) : value,
    }));

    setDataUpdate((prev) => ({
      ...prev,
      [name]: name === "Nam" || name === "SoNgayDocSoDot" || name === "MaNgayDocSo" || name === "Ky" || name === "Dot" ? Number(value) : value,
    }));
  };

  // Cập nhật dữ liệu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

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

      const payload: UpdateDsNgayDocSoBillingChiTietRequest = {
        ...dataUpdate,
        NgayCapNhat: now,
        NguoiCapNhat: currentUser,
      };

      const res = await updateData<UpdateDsNgayDocSoBillingChiTietRequest, DsNgayDocSoBillingChiTietResponse>(
        apiUrls.NguoiDung.update(formData.Id!),
        payload
      );
      onSave(res);
      alert("✅ Cập nhật thành công!");

      onClose();
    } catch (error) {
      console.error("❌ Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    }

    //   if (useMock) {
    //     onSave(payload);
    //     alert("✅ Cập nhật mock thành công!");
    //   } else {
    //     const updated = await billingReadingDetailService.update(
    //       readingId,
    //       payload
    //     );
    //     onSave(updated);
    //     alert("✅ Cập nhật thành công!");
    //   }
    //   onClose();
    // } catch (error) {
    //   console.error("❌ Lỗi cập nhật:", error);
    //   alert("Cập nhật thất bại!");
    // }
  };

  return (
    <div className="modal-overlay">
      <div className="modal edit-billing-reading-detail">
        <div className="text-user">
          <h3>Chỉnh sửa ngày số đọc</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Mã ngày số đọc</label>
          <input
            name="code"
            value={formData.MaNgayDocSo}
            onChange={handleChange}
            required
          />

          <label>Năm</label>
          <input
            type="number"
            name="year"
            value={formData.Nam}
            onChange={handleChange}
            required
          />

          <label>Kỳ</label>
          <input
            name="period"
            value={formData.Ky}
            onChange={handleChange}
            required
          />

          <label>Đợt</label>
          <input name="batch" value={formData.Dot} onChange={handleChange} />

          <label>Số ngày đọc</label>
          <input
            type="number"
            name="daysCount"
            value={formData.SoNgayDocSoDot}
            onChange={handleChange}
            required
          />

          <label>Ghi chú</label>
          <textarea
            name="note"
            value={formData.GhiChu || ""}
            onChange={handleChange}
          />

          {/* Metadata hiển thị */}
          <label>Ngày tạo:</label>
          <input type="text" value={formData.NgayTao} readOnly />
          <label>Người tạo:</label>
          <input type="text" value={formData.NguoiTao || ""} readOnly />
          <label>Ngày cập nhật:</label>
          <input type="text" value={formData.NgayCapNhat || ""} readOnly />
          <label>Người cập nhật:</label>
          <input type="text" value={formData.NguoiCapNhat || ""} readOnly />

          <div className="modal-actions">
            <button type="submit" className="btn save">
              {TextForms.nut.themMoi}
            </button>
            <button type="button" className="btn close" onClick={onClose}>
              {TextForms.nut.huyBo}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBillingReadingDetailModal;
