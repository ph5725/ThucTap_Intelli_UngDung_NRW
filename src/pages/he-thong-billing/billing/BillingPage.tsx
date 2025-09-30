// src/pages/he-thong-billing/qlbilling/BillingPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import { FaMoneyBill, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tabs from "../../../components/tabBilling/Tabs";
import "../../../styles/global.css";
import BillingDashboard from "../../../components/BillingDashboard";
import EditBillingModal from "./EditBillingModal";
import DetailBillingModal from "./DetailBillingModal";
// import { billingService, type Billing } from "../../../services/he-thong-billing/billingService";
//import { mockBillings } from "../../../config/mockData";

// service
import { createData, updateData, deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddBillingRequest, BillingResponse, UpdateBillingRequest } from "src/types/he-thong-billing/billing";

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
        alert(TextForms.thongBao.xoaThanhCong);
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
        setBillings((prev) => prev.filter((b) => b.Id !== id));
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
        b.MaDoiTuong.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.Ky.toString().includes(searchTerm) ||
        b.Nam.toString().includes(searchTerm)
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
              <tr key={b.Id}>
                <td>{b.Id}</td>
                <td>{b.SanLuongTieuThu} m³</td>
                <td>{b.MaDoiTuong}</td>
                <td>{b.Ky}</td>
                <td>{b.Nam}</td>
                <td className="actions">
                  <FaEdit title="Sửa" onClick={() => setSelectedBilling(b)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(b.Id)} />
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
          billingId={selectedBilling?.Id}
          useMock={false}
          onClose={() => setSelectedBilling(null)}
          onSave={(updated) =>
            setBillings((prev) => prev.map((b) => (b.Id === updated.Id ? updated : b)))
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
