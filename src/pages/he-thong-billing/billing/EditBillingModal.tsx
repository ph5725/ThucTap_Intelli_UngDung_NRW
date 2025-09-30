// src/pages/qlbilling/qlbilling/EditBillingModal.tsx
import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
// import { billingService, type Billing, type UpdateBillingDTO } from "../../../services/he-thong-billing/billingService";
import { mockBillings } from "../../../config/mockData";

// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddBillingRequest, BillingResponse, UpdateBillingRequest } from "src/types/he-thong-billing/billing";
import { ThongTinNguoiDung } from "src/types/authTypes";

// text
import { TextForms } from "src/constants/text";

interface EditBillingModalProps {
  billingId: number;
  onClose: () => void;
  onSave: (updated: BillingResponse) => void;
  useMock?: boolean; // true để dùng mock data
}

const EditBillingModal: React.FC<EditBillingModalProps> = ({
  billingId,
  onClose,
  onSave,
  useMock = false,
}) => {
  const [form, setForm] = useState<BillingResponse | null>(null);
  // Dữ liệu người dùng nhập
  const [dataUpdate, setDataUpdate] = useState<Omit<
    UpdateBillingRequest,
    | "NgayCapNhat"
    | "NguoiCapNhat"
  >>({
    SanLuongTieuThu: 0,
    MaDoiTuong: "",
    Ky: 0,
    Nam: 0,
    Dot: 0,
    TuNgay: "",
    DenNgay: "",
    GhiChu: "",
  });
  const [loading, setLoading] = useState(true);

  // Load dữ liệu ban đầu
  useEffect(() => {
    if (useMock) {
      const billing = mockBillings.find(b => b.id === billingId);
      if (!billing) {
        alert("Không tìm thấy dữ liệu mock!");
        onClose();
      } else setForm(billing);
      setLoading(false);
    } else {
      const fetchBilling = async () => {
        try {
          const res = await getById<BillingResponse>(apiUrls.Billing.detail(billingId));;
          setForm(res);
        } catch (err) {
          console.error("❌ Lỗi lấy dữ liệu Billing:", err);
          alert(TextForms.thongBao.khongTheTaiDuLieu);
          onClose();
        } finally {
          setLoading(false);
        }
      };
      fetchBilling();
    }
  }, [billingId, onClose, useMock]);

  if (loading || !form) return <div className="modal-overlay">{TextForms.thongBao.dangTaiDuLieu}</div>;

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev!,
      [name]: name === "year" || name === "consumption" ? Number(value) : value,
    }));

    setDataUpdate((prev) => ({
      ...prev,
      [name]: name === "SanLuongTieuThu" || name === "Ky" || name === "Nam" || name === "Dot"
        ? Number(value) // ép kiểu số cho các field numeric
        : value,
    }));
  };

  // Cập nhật dữ liệu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataUpdate) return;
    try {
      // Lấy thông tin người dùng từ localStorage
      const nguoiDungStr = localStorage.getItem("nguoiDung");
      let nguoiDung: ThongTinNguoiDung | null = null;

      if (nguoiDungStr) {
        nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
        console.log("ID người dùng:", nguoiDung.Id);
      }

      const res = await updateData<UpdateBillingRequest, BillingResponse>(
        apiUrls.NguoiDung.update(form.Id!),
        dataUpdate
      );
      onSave(res);
      alert(TextForms.thongBao.capNhatThanhCong);
      onClose();
    } catch (err) {
      console.error("❌ Lỗi cập nhật Billing:", err);
      alert(TextForms.thongBao.loiCapNhat);
    }
  };

  // Cập nhật dữ liệu
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!updateData) return;

  //   if (useMock) {
  //     const updated: UpdateBillingRequest = {
  //       ...form,
  //       NgayCapNhat: new Date().toISOString(),
  //       NguoiCapNhat: billingId,
  //     };
  //     const index = mockBillings.findIndex(b => b.id === updated.Id);
  //     if (index >= 0) mockBillings[index] = updated;
  //     onSave(updated);
  //     alert("Cập nhật mock thành công!");
  //     onClose();
  //   } else {
  //     try {
  //       // chỉ tạo DTO cần thiết
  //       const payload: UpdateBillingRequest = {
  //         SanLuongTieuThu: form.consumption,
  //         objectCode: form.objectCode,
  //         period: form.period,
  //         year: form.year,
  //         batch: form.batch,
  //         fromDate: form.fromDate,
  //         toDate: form.toDate,
  //         note: form.note,
  //         updatedAt: new Date().toISOString(),
  //         updatedByUser: "currentUser", // FE sinh
  //       };

  //       // Lấy thông tin người dùng từ localStorage
  //             const nguoiDungStr = localStorage.getItem("nguoiDung");
  //             let nguoiDung: ThongTinNguoiDung | null = null;

  //             if (nguoiDungStr) {
  //               nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
  //               console.log("ID người dùng:", nguoiDung.Id);
  //             }

  //       const res = await billingService.update(form.id, payload);
  //       onSave(res.data);
  //       alert("Cập nhật thành công!");
  //       onClose();
  //     } catch (err) {
  //       console.error("❌ Lỗi cập nhật Billing:", err);
  //       alert("Cập nhật thất bại!");
  //     }
  //   }
  // };

  return (
    <div className="modal-overlay">
      <div className="modal edit-billing">

        <div className="text-user">
          <h3>Chỉnh Sửa Hóa Đơn</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Mã đối tượng:</label>
          <input name="objectCode" value={form.MaDoiTuong} onChange={handleChange} required />

          <label>Sản lượng tiêu thụ:</label>
          <input type="number" name="consumption" value={form.SanLuongTieuThu} onChange={handleChange} required />

          <label>Kỳ:</label>
          <input name="period" value={form.Ky} onChange={handleChange} required />

          <label>Năm:</label>
          <input type="number" name="year" value={form.Nam} onChange={handleChange} required />

          <label>Đợt:</label>
          <input name="batch" value={form.Dot} onChange={handleChange} />

          <label>Từ ngày:</label>
          <input type="date" name="fromDate" value={form.TuNgay} onChange={handleChange} />

          <label>Đến ngày:</label>
          <input type="date" name="toDate" value={form.DenNgay} onChange={handleChange} />

          <label>Ghi chú:</label>
          <textarea name="note" value={form.GhiChu} onChange={handleChange} />

          {/* Metadata hiển thị chỉ đọc */}

          <label>Ngày tạo:</label>
          <input type="text" value={form.NgayTao} readOnly />

          <label>Người tạo:</label>
          <input type="text" value={form.NguoiTao} readOnly />

          <label>Ngày cập nhật:</label>
          <input type="text" value={form.NgayCapNhat || ""} readOnly />

          <label>Người cập nhật:</label>
          <input type="text" value={form.NguoiCapNhat || ""} readOnly />

          <div className="modal-actions">
            <button type="submit" className="btn save">{TextForms.nut.luu}</button>
            <button type="button" className="btn close" onClick={onClose}>{TextForms.nut.dong}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBillingModal;
