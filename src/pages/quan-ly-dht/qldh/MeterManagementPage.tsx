// src/pages/quan-ly-dong-ho/MeterManagementPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  FaTachometerAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaLock,
  FaPlus,
  FaFilter,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tabs from "../../../components/tabQLDH/Tabs";
import EditMeterModal from "./EditMeterModal";
import DetailMeterModal from "./DetailMeterModal";
import MeterStats from "../../../components/MeterStats";
import "../../../styles/qldh/MeterManagementPage.css";
import { meterService, type Meter } from "../../../config/meterService";

const MeterManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const [meters, setMeters] = useState<Meter[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"" | "Hoạt động" | "Cảnh báo" | "Lỗi">("");
  const [showFilter, setShowFilter] = useState(false);

  const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);
  const [detailMeter, setDetailMeter] = useState<Meter | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 📌 Load dữ liệu từ API
  useEffect(() => {
    const fetchMeters = async () => {
      try {
        const res = await meterService.getAll();
        setMeters(res.data);
      } catch (error) {
        console.error("❌ Lỗi khi tải dữ liệu đồng hồ:", error);
        setMeters([]); // show table rỗng nếu API lỗi
      } finally {
        setLoading(false);
      }
    };
    fetchMeters();
  }, []);

  // 📌 Lọc & tìm kiếm
  const filteredMeters = useMemo(() => {
    return meters.filter(
      (m) =>
        (m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "" || m.status === filterStatus)
    );
  }, [meters, searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredMeters.length / itemsPerPage);
  const currentMeters = filteredMeters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  // 📌 Xóa đồng hồ
  const handleDelete = async (id: number) => {
    if (!window.confirm(`Bạn có chắc muốn xóa đồng hồ ID ${id}?`)) return;
    try {
      await meterService.delete(id);
      setMeters(meters.filter((m) => m.id !== id));
      setMessage("Xóa thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi xóa đồng hồ:", error);
      setMessage("Xóa thất bại!");
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // 📌 Lưu chỉnh sửa
  const handleSave = async (updated: Meter) => {
    try {
      await meterService.update(updated.id, updated);
      setMeters(meters.map((m) => (m.id === updated.id ? updated : m)));
      setMessage("Cập nhật thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật:", error);
      setMessage("Cập nhật thất bại!");
    } finally {
      setSelectedMeter(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="meter-page">
      {message && <div className="toast">{message}</div>}

      {/* Header */}
      <div className="page-header">
        <FaTachometerAlt className="page-icon" />
        <h2 className="page-title">TỔNG QUAN ĐỒNG HỒ TỔNG</h2>
      </div>

      {/* KPI + Charts */}
      <MeterStats meters={meters} />

      {/* Danh sách đồng hồ */}
      <div className="page-header">
        <FaTachometerAlt className="page-icon" />
        <h2 className="page-title">DANH SÁCH ĐỒNG HỒ TỔNG</h2>
      </div>

      <Tabs />

      <div className="boder">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            <input
              type="text"
              placeholder="Tìm kiếm đồng hồ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn filter" onClick={() => setShowFilter(true)}>
              <FaFilter style={{ marginRight: 6, fontSize: 14 }} /> Bộ Lọc
            </button>
          </div>
          <div className="toolbar-right">
            <button className="btn add" onClick={() => navigate("/add-meter")}>
              <FaPlus style={{ marginRight: 6 }} /> Thêm mới
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã đồng hồ</th>
              <th>Tên</th>
              <th>Sản lượng (m³)</th>
              <th>Trạng thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currentMeters.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.code}</td>
                <td>{m.name}</td>
                <td>{m.volume}</td>
                <td>{m.status}</td>
                <td className="actions">
                  <FaEdit title="Sửa" onClick={() => setSelectedMeter(m)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(m.id)} />
                  <FaEye title="Chi tiết" onClick={() => setDetailMeter(m)} />
                  <FaLock title="Khóa/Mở" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
      </div>

      {/* Modal Filter */}
      {showFilter && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Bộ lọc tìm kiếm</h3>
            <label>
              Trạng thái:
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as "" | "Hoạt động" | "Cảnh báo" | "Lỗi")
                }
              >
                <option value="">Tất cả</option>
                <option value="Hoạt động">Hoạt động</option>
                <option value="Cảnh báo">Cảnh báo</option>
                <option value="Lỗi">Lỗi</option>
              </select>
            </label>
            <div className="modal-actions">
              <button className="btn apply" onClick={() => setShowFilter(false)}>
                Áp dụng
              </button>
              <button className="btn close" onClick={() => setShowFilter(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {selectedMeter && (
        <EditMeterModal
          meter={selectedMeter}
          onClose={() => setSelectedMeter(null)}
          onSave={handleSave}
        />
      )}

      {/* Modal Detail */}
      {detailMeter && (
        <DetailMeterModal
          meter={detailMeter}
          onClose={() => setDetailMeter(null)}
        />
      )}
    </div>
  );
};

export default MeterManagementPage;
