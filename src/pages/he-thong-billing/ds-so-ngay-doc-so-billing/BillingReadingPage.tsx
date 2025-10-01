//import { mockBillingReadings } from "../../../config/mockData";
// import { billingReadingService, type BillingReading } from "../../../services/he-thong-billing/billingReadingService";
import React, { useState, useEffect, useMemo } from "react";
import { FaBookReader, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tabs from "src/components/tabBilling/Tabs";
import "src/styles/global.css";
import EditBillingReadingModal from "./EditBillingReadingModal";
import DetailBillingReadingModal from "./DetailBillingReadingModal";
// service
import {  deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import {  DsNgayDocSoBillingResponse, } from "src/types/he-thong-billing/ds-ngay-doc-so-billing";
// text
import { TextForms } from "src/constants/text";

const BillingReadingPage: React.FC = () => {
  const navigate = useNavigate();
  const [readings, setReadings] = useState<DsNgayDocSoBillingResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterYear, setFilterYear] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("");
  const [selectedReading, setSelectedReading] = useState<DsNgayDocSoBillingResponse | null>(null);
  const [detailReading, setDetailReading] = useState<DsNgayDocSoBillingResponse | null>(null);

  // Load dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await billingReadingService.list();
        const data = await getList<DsNgayDocSoBillingResponse>(apiUrls.DSNgayDocSoBilling.list);
        setReadings(data);
      } catch (error) {
        console.error("❌ Lỗi tải danh sách ngày đọc số:", error);
        alert(TextForms.thongBao.khongTheTaiDuLieu);
      }
    };
    fetchData();
  }, []); 

  // Xóa dữ liệu
  const handleDelete = async (id: number) => {
    if (window.confirm(`Bạn có chắc muốn xóa kỳ đọc ID ${id}?`)) {
      try {
        // await billingReadingService.delete(id);
        await deleteData(apiUrls.DSNgayDocSoBilling.delete(id));;
        setReadings(prev => prev.filter(r => r.Id !== id));
        alert(TextForms.thongBao.xoaThanhCong);
      } catch (error) {
        console.error("❌ Lỗi xóa:", error);
        alert(TextForms.thongBao.loiXoa);
      }
    }
  };

/*  useEffect(() => {
  // Dùng dữ liệu giả
  setReadings(mockBillingReadings);
}, []); */

  // Lọc & tìm kiếm
  const filteredReadings = useMemo(() => {
    return readings.filter(r => {
      const matchSearch =
        r.Nam.toString().includes(searchTerm) ||
        r.Ky.toString().includes(searchTerm);

      const matchYear = filterYear ? r.Nam.toString() === filterYear : true;
      const matchPeriod = filterPeriod ? r.Ky.toString() === filterPeriod : true;

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

  const handleSave = (updated: DsNgayDocSoBillingResponse) => {
    setReadings(prev => prev.map(r => (r.Id === updated.Id ? updated : r)));
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
            <button className="btn add" onClick={() => navigate("/add-billing-reading")}>
              <FaPlus style={{ marginRight: "6px" }} /> Thêm mới
            </button>
          </div>
        </div>

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
            {currentReadings.map(r => (
              <tr key={r.Id}>
                <td>{r.Id}</td>
                <td>{r.Nam}</td>
                <td>{r.Ky}</td>
                <td>{r.NgayCapNhat}</td>
                <td>{r.NguoiCapNhat || "-"}</td>
                <td className="actions">
                  <FaEdit title="Sửa" onClick={() => setSelectedReading(r)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(r.Id)} />
                  <FaEye title="Chi tiết" onClick={() => setDetailReading(r)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          readingId={selectedReading?.Id}
          onClose={() => setSelectedReading(null)}
          onSave={handleSave}
          useMock={false} // nếu muốn dùng mock
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
