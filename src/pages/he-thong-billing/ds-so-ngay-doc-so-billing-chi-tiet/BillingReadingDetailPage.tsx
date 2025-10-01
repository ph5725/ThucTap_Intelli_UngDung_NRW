import React, { useState, useEffect, useMemo } from "react";
import { FaBookReader, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tabs from "src/components/tabBilling/Tabs";
import "src/styles/global.css";

import EditBillingReadingModal from "../../../pages/he-thong-billing/ds-so-ngay-doc-so-billing-chi-tiet/EditBillingReadingDetailModal";
import DetailBillingReadingModal from "../../../pages/he-thong-billing/ds-so-ngay-doc-so-billing-chi-tiet/DetailBillingReadingDetailModal";

// service
import { deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { DsNgayDocSoBillingChiTietResponse } from "src/types/he-thong-billing/ds-ngay-doc-so-billing-chi-tiet";

// text
import { TextForms } from "src/constants/text";

const BillingReadingPage: React.FC = () => {
  const navigate = useNavigate();
  const [readings, setReadings] = useState<DsNgayDocSoBillingChiTietResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterYear, setFilterYear] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("");
  const [selectedReading, setSelectedReading] = useState<DsNgayDocSoBillingChiTietResponse | null>(null);
  const [detailReading, setDetailReading] = useState<DsNgayDocSoBillingChiTietResponse | null>(null);
  const [loading, setLoading] = useState(true); // state loading

  // Load dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getList<DsNgayDocSoBillingChiTietResponse>(apiUrls.DSNgayDocSoBilling.list);
        console.log("API data:", data); // debug
        setReadings(data);
      } catch (error) {
        console.error("❌ Lỗi tải danh sách ngày đọc số:", error);
        alert(TextForms.thongBao.khongTheTaiDuLieu);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Xóa dữ liệu
  const handleDelete = async (id: number) => {
    if (window.confirm(`Bạn có chắc muốn xóa kỳ đọc ID ${id}?`)) {
      try {
        await deleteData(apiUrls.DSNgayDocSoBilling.delete(id));
        setReadings(prev => prev.filter(r => r.id !== id));
        alert(TextForms.thongBao.xoaThanhCong);
      } catch (error) {
        console.error("❌ Lỗi xóa:", error);
        alert(TextForms.thongBao.loiXoa);
      }
    }
  };

  // Lọc & tìm kiếm
  const filteredReadings = useMemo(() => {
    return readings.filter(r => {
      const namStr = r.nam != null ? r.nam.toString() : "";
      const kyStr = r.ky != null ? r.ky.toString() : "";

      const matchSearch = namStr.includes(searchTerm) || kyStr.includes(searchTerm);
      const matchYear = filterYear ? namStr === filterYear : true;
      const matchPeriod = filterPeriod ? kyStr === filterPeriod : true;

      return matchSearch && matchYear && matchPeriod;
    });
  }, [readings, searchTerm, filterYear, filterPeriod]);

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredReadings.length / itemsPerPage);
  const currentReadings = filteredReadings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const handleSave = (updated: DsNgayDocSoBillingChiTietResponse) => {
    setReadings(prev => prev.map(r => (r.id === updated.id ? updated : r)));
  };

  return (
    <div className="billing-page">
      <div className="page-header">
        <FaBookReader className="page-icon" />
        <h2 className="page-title">DANH SÁCH NGÀY SỐ ĐỌC BILLING</h2>
      </div>
      <Tabs />

      <div className="boder">
        <div className="toolbar">
          <div className="toolbar-left">
            <input
              type="text"
              placeholder="Tìm kiếm theo năm, kỳ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn filter" onClick={() => setShowFilter(true)}>
              <FaFilter style={{ marginRight: "6px" }} /> Bộ Lọc
            </button>
          </div>

          <div className="toolbar-right">
            <button className="btn add" onClick={() => navigate("/add-billing-reading-detail")}>
              <FaPlus style={{ marginRight: "6px" }} /> Thêm mới
            </button>
          </div>
        </div>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <table className="account-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Năm</th>
                <th>Kỳ</th>
                <th>Ngày Tạo</th>
                <th>Ngày Cập Nhật</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {currentReadings.length > 0 ? (
                currentReadings.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.nam}</td>
                    <td>{r.ky}</td>
                    <td>{r.ngayTao}</td>
                    <td>{r.ngayCapNhat || "-"}</td>
                    <td className="actions">
                      <FaEdit title="Sửa" onClick={() => setSelectedReading(r)} />
                      <FaTrash title="Xóa" onClick={() => handleDelete(r.id)} />
                      <FaEye title="Chi tiết" onClick={() => setDetailReading(r)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>Trước</button>
        <span className="current-page">{currentPage}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Sau</button>
      </div>

      {showFilter && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Bộ Lọc Tìm Kiếm</h3>
            <label>
              Kỳ:
              <input type="text" placeholder="Nhập kỳ..." value={filterPeriod} onChange={e => setFilterPeriod(e.target.value)} />
            </label>
            <label>
              Năm:
              <input type="number" placeholder="Nhập năm..." value={filterYear} onChange={e => setFilterYear(e.target.value)} />
            </label>
            <div className="modal-actions">
              <button className="btn apply" onClick={() => setShowFilter(false)}>Áp dụng</button>
              <button className="btn close" onClick={() => setShowFilter(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {selectedReading && (
        <EditBillingReadingModal
          readingId={selectedReading.id}
          onClose={() => setSelectedReading(null)}
          onSave={handleSave}
          useMock={false}
        />
      )}
      {detailReading && (
        <DetailBillingReadingModal
          reading={detailReading}
          onClose={() => setDetailReading(null)}
        />
      )}
    </div>
  );
};

export default BillingReadingPage;
