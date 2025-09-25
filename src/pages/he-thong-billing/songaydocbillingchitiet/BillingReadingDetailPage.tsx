// src/pages/billing/BillingReadingDetailPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import { FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tabs from "../../../components/tabBilling/Tabs";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css";


import EditBillingReadingDetailModal from "./EditBillingReadingDetailModal";
import DetailBillingReadingDetailModal from "./DetailBillingReadingDetailModal";
import { type BillingReadingDetail, billingReadingDetailService } from "../../../Service/billingReadingDetailService";
//import { mockBillingReadingDetails } from "../../../config/mockData";

const BillingReadingDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [readings, setReadings] = useState<BillingReadingDetail[]>([]);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedReading, setSelectedReading] = useState<BillingReadingDetail | null>(null);
  const [detailReading, setDetailReading] = useState<BillingReadingDetail | null>(null);

  // Load dữ liệu
  useEffect(() => {
    setLoading(true);
    billingReadingDetailService.list()
      .then(data => setReadings(data))
      .catch(() => {
        setError("Không thể tải dữ liệu chi tiết ngày số đọc!");
        alert("Không thể tải dữ liệu từ API!");
      })
      .finally(() => setLoading(false));
  }, []); 

 /*   useEffect(() => {
    // Dùng dữ liệu giả
    setReadings(mockBillingReadingDetails);
  }, []); */

  // Xóa
  const handleDelete = (id: number) => {
    if (!window.confirm(`Bạn có chắc muốn xóa bản ghi ID ${id}?`)) return;
    billingReadingDetailService.delete(id)
      .then(() => setReadings(prev => prev.filter(r => r.id !== id)))
      .catch(() => alert("Xóa thất bại!"));
  };

  // Lưu sửa
  const handleSave = (updated: BillingReadingDetail) => {
    billingReadingDetailService.update(updated.id, updated)
      .then(data => {
        setReadings(prev => prev.map(r => (r.id === data.id ? data : r)));
        setSelectedReading(null);
      })
      .catch(() => alert("Cập nhật thất bại!"));
  };

  // Filter + search
  const filteredReadings = useMemo(() => {
    return readings.filter(r => {
      const matchSearch =
        r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.year.toString().includes(searchTerm) ||
        r.period.includes(searchTerm);

      const matchYear = filterYear ? r.year.toString() === filterYear : true;
      const matchPeriod = filterPeriod ? r.period === filterPeriod : true;

      return matchSearch && matchYear && matchPeriod;
    });
  }, [readings, searchTerm, filterYear, filterPeriod]);

  const totalPages = Math.ceil(filteredReadings.length / itemsPerPage) || 1;
  const currentReadings = filteredReadings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="billing-page">
      <div className="page-header">
        <FaEye className="page-icon" />
        <h2 className="page-title">CHI TIẾT NGÀY SỐ ĐỌC BILLING</h2>
      </div>

      <Tabs />

      {/* Nếu có lỗi thì hiện nhưng không chặn render */}
       {error && <div className="error">{error}</div>}

      <div className="boder">
        <div className="toolbar">
          <div className="toolbar-left">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã, năm, kỳ..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="btn filter" onClick={() => setShowFilter(true)}>
              <FaFilter style={{ marginRight: 6 }} /> Bộ Lọc
            </button>
          </div>

          <div className="toolbar-right">
            <button className="btn add" onClick={() => navigate("/add-billing-reading-detail")}>
              <FaPlus style={{ marginRight: 6 }} /> Thêm mới
            </button>
          </div>
        </div>

        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã ngày số đọc</th>
              <th>Năm</th>
              <th>Kỳ</th>
              <th>Đợt</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currentReadings.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              currentReadings.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.code}</td>
                  <td>{r.year}</td>
                  <td>{r.period}</td>
                  <td>{r.batch}</td>
                  <td className="actions">
                    <FaEdit title="Sửa" onClick={() => setSelectedReading(r)} />
                    <FaTrash title="Xóa" onClick={() => handleDelete(r.id)} />
                    <FaEye title="Chi tiết" onClick={() => setDetailReading(r)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>Trước</button>
          <span className="current-page">{currentPage}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Sau</button>
        </div>
      </div>

      {showFilter && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Bộ Lọc Tìm Kiếm</h3>
            <label>
              Năm:
              <input type="number" value={filterYear} onChange={e => setFilterYear(e.target.value)} placeholder="Nhập năm..." />
            </label>
            <label>
              Kỳ:
              <input type="text" value={filterPeriod} onChange={e => setFilterPeriod(e.target.value)} placeholder="Nhập kỳ..." />
            </label>
            <div className="modal-actions">
              <button className="btn apply" onClick={() => setShowFilter(false)}>Áp dụng</button>
              <button className="btn close" onClick={() => setShowFilter(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {selectedReading && (
        <EditBillingReadingDetailModal
          readingId={selectedReading.id}
          onClose={() => setSelectedReading(null)}
          onSave={handleSave}
          useMock={false} 
        />
      )}

      {detailReading && (
        <DetailBillingReadingDetailModal
          reading={detailReading}
          onClose={() => setDetailReading(null)}
        />
      )}
    </div>
  );
};

export default BillingReadingDetailPage;
