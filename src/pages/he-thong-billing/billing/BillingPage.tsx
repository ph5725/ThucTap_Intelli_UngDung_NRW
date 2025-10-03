// src/pages/he-thong-billing/qlbilling/BillingPage.tsx
// import { billingService, type Billing } from "../../../services/he-thong-billing/billingService";
//import { mockBillings } from "../../../config/mockData";
import React, { useState, useEffect, useMemo } from "react";
import { FaMoneyBill, FaEdit, FaTrash, FaEye, FaPlus, FaFilter, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tabs from "src/components/tabBilling/Tabs";
import "src/styles/global.css";
import BillingDashboard from "../../../components/BillingDashboard";
import EditBillingModal from "./EditBillingModal";
import DetailBillingModal from "./DetailBillingModal";
// service
import {  deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import {  BillingResponse,  } from "src/types/he-thong-billing/billing";
// text
import { TextForms } from "src/constants/text";

const BillingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billings, setBillings] = useState<BillingResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<BillingResponse | null>(null);
  const [detailBilling, setDetailBilling] = useState<BillingResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchBillings = async () => {
      try {
        // const res = await billingService.getAll();
        const res = await getList<BillingResponse>(apiUrls.Billing.list);
        setBillings(res); // giữ nguyên id: number
      } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu Billing:", error);
        alert(TextForms.thongBao.khongTheTaiDuLieu);
      }
    };
    fetchBillings();
  }, []);

  // Xóa Billing
  const handleDelete = async (id: number) => {
    if (window.confirm(`Bạn có chắc muốn xóa hóa đơn ID ${id}?`)) {
      try {
        // await billingService.delete(id);
        await deleteData(apiUrls.Billing.delete(id));;
        setBillings((prev) => prev.filter((b) => b.id !== id));
        alert(TextForms.thongBao.xoaThanhCong);
      } catch (error) {
        console.error("❌ Lỗi khi xóa Billing:", error);
        alert(TextForms.thongBao.loiXoa);
      }
    }
  };

  // Sử dụng dữ liệu giả từ mockData.ts
  /* useEffect(() => {
    setBillings(mockBillings);
  }, []); */

  // Lọc & tìm kiếm
  const filteredBillings = useMemo(() => {
    return billings.filter(
      (b) =>
        b.maDoiTuong.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.ky.toString().includes(searchTerm) ||
        b.nam.toString().includes(searchTerm)
    );
  }, [billings, searchTerm]);

  const totalPages = Math.ceil(filteredBillings.length / itemsPerPage);
  const currentBillings = filteredBillings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination handlers
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // 👉 Hàm export CSV toàn bộ (KPI + chart + table)
  const handleExportAll = () => {
    if (billings.length === 0) {
      alert("Không có dữ liệu để xuất");
      return;
    }

    let csvContent = "";

    // 1. KPI
    const totalRecords = billings.length;
    const currentConsumption = billings[totalRecords - 1]?.sanLuongTieuThu || 0;
    const avgConsumption =
      totalRecords > 0
        ? billings.reduce((sum, row) => sum + row.sanLuongTieuThu, 0) / totalRecords
        : 0;
    const abnormalCount = billings.filter(
      (row) => row.sanLuongTieuThu === 0 || row.sanLuongTieuThu < 500
    ).length;

    csvContent += "=== KPI TỔNG HỢP ===\n";
    csvContent += "Tổng kỳ,Kỳ hiện tại,Trung bình,Bất thường\n";
    csvContent += `${totalRecords},${currentConsumption},${avgConsumption.toFixed(
      2
    )},${abnormalCount}\n\n`;

    // 2. Biểu đồ Line (theo kỳ)
    csvContent += "=== BIỂU ĐỒ SẢN LƯỢNG THEO KỲ ===\n";
    csvContent += "Kỳ/Năm,Sản lượng\n";
    billings.forEach((b) => {
      csvContent += `${b.ky}/${b.nam},${b.sanLuongTieuThu}\n`;
    });
    csvContent += "\n";

    // 3. Biểu đồ Pie (bình thường/bất thường)
    csvContent += "=== BIỂU ĐỒ TRẠNG THÁI ===\n";
    csvContent += "Loại,Số kỳ\n";
    csvContent += `Bình thường,${totalRecords - abnormalCount}\n`;
    csvContent += `Bất thường,${abnormalCount}\n\n`;

    // 4. Dữ liệu chi tiết (table)
    csvContent += "=== DANH SÁCH BILLING CHI TIẾT ===\n";
    csvContent += "ID,Sản lượng,Mã đối tượng,Kỳ,Năm,Ghi chú,Ngày tạo,Ngày cập nhật,Người tạo,Người cập nhật\n";
    billings.forEach((b) => {
      csvContent += `${b.id},${b.sanLuongTieuThu},${b.maDoiTuong},${b.ky},${b.nam},"${b.ghiChu ?? ""}",${b.ngayTao},${b.ngayCapNhat ?? ""},${b.nguoiTao ?? ""},${b.nguoiCapNhat ?? ""}\n`;
    });

    // Xuất file CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "billing_full_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="billing-page">
      {/* Header */}
      <div className="page-header">
        <FaMoneyBill className="page-icon" />
        <h2 className="page-title">TỔNG QUAN BILLING</h2>
      </div>

      {/* Dashboard */}
      <BillingDashboard data={billings} />

      {/* Danh sách Billing */}
      <div className="page-header">
        <FaMoneyBill className="page-icon" />
        <h2 className="page-title">DANH SÁCH BILLING</h2>
         <button className="btn export" onClick={handleExportAll}>
          <FaDownload style={{ marginRight: 6 }} /> Xuất CSV
        </button>
      </div>

      <Tabs />

      <div className="boder">
        <div className="toolbar">
          <div className="toolbar-left">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đối tượng, kỳ, năm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn filter" onClick={() => setShowFilter(true)}>
              <FaFilter style={{ marginRight: 6, fontSize: 16 }} /> Bộ Lọc
            </button>
          </div>
          <div className="toolbar-right">
            <button className="btn add" onClick={() => navigate("/add-billing")}>
              <FaPlus style={{ marginRight: 6 }} /> Thêm mới
            </button>
          </div>
        </div>

        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sản lượng tiêu thụ</th>
              <th>Mã đối tượng</th>
              <th>Kỳ</th>
              <th>Năm</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currentBillings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.sanLuongTieuThu} m³</td>
                <td>{b.maDoiTuong}</td>
                <td>{b.ky}</td>
                <td>{b.nam}</td>
                <td className="actions">
                  <FaEdit title="Sửa" onClick={() => setSelectedBilling(b)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(b.id)} />
                  <FaEye title="Chi tiết" onClick={() => setDetailBilling(b)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Trước
        </button>
        <span className="current-page">{currentPage}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Sau
        </button>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Bộ Lọc Tìm Kiếm</h3>
            <label>
              Kỳ: <input type="text" placeholder="Nhập kỳ..." />
            </label>
            <label>
              Năm: <input type="number" placeholder="Nhập năm..." />
            </label>
            <div className="modal-actions">
              <button className="btn apply">{TextForms.nut.apDung}</button>
              <button className="btn close" onClick={() => setShowFilter(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedBilling && (
        /*        <EditBillingModal
                  billingId={selectedBilling.id}
                  onClose={() => setSelectedBilling(null)}
                  onSave={(updated) =>
                  setBillings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
                  }
                /> */

        <EditBillingModal
          billingId={selectedBilling?.id}
          useMock={false}
          onClose={() => setSelectedBilling(null)}
          onSave={(updated) =>
            setBillings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
          }
        />
      )}

      {/* Detail Modal */}
      {detailBilling && (
        <DetailBillingModal billing={detailBilling} onClose={() => setDetailBilling(null)} />
      )}
    </div>
  );
};

export default BillingPage;
