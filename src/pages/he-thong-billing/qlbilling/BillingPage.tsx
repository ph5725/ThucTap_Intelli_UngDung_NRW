// src/pages/he-thong-billing/qlbilling/BillingPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import { FaMoneyBill, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tabs from "../../../components/tabBilling/Tabs";
import "../../../styles/global.css";
import BillingDashboard from "../../../components/BillingDashboard";
import EditBillingModal from "./EditBillingModal";
import DetailBillingModal from "./DetailBillingModal";
import { billingService, type Billing } from "../../../services/billingService";
//import { mockBillings } from "../../../config/mockData";


const BillingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billings, setBillings] = useState<Billing[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<Billing | null>(null);
  const [detailBilling, setDetailBilling] = useState<Billing | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchBillings = async () => {
      try {
        const res = await billingService.getAll();
        setBillings(res.data); // giữ nguyên id: number
      } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu Billing:", error);
        alert("Không thể tải dữ liệu từ API!");
      }
    };
    fetchBillings();
  }, []);  

  // Sử dụng dữ liệu giả từ mockData.ts
/* useEffect(() => {
  setBillings(mockBillings);
}, []); */

  // Lọc & tìm kiếm
  const filteredBillings = useMemo(() => {
    return billings.filter(
      (b) =>
        b.objectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.period.includes(searchTerm) ||
        b.year.toString().includes(searchTerm)
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

  // Xóa Billing
  const handleDelete = async (id: number) => {
    if (window.confirm(`Bạn có chắc muốn xóa hóa đơn ID ${id}?`)) {
      try {
        await billingService.delete(id);
        setBillings((prev) => prev.filter((b) => b.id !== id));
      } catch (error) {
        console.error("❌ Lỗi khi xóa Billing:", error);
        alert("Xóa thất bại!");
      }
    }
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
                <td>{b.consumption} m³</td>
                <td>{b.objectCode}</td>
                <td>{b.period}</td>
                <td>{b.year}</td>
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
              <button className="btn apply">Áp dụng</button>
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
