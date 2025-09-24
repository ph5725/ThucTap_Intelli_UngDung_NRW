import React, { useState, useMemo, useEffect } from "react";
import { FaTachometerAlt, FaEdit, FaTrash, FaEye, FaLock, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tabs from "../../../components/tabQLDH/Tabs";
import EditMeterConfigModal from "./EditMeterConfigModal";
import DetailMeterConfigModal from "./DetailMeterConfigModal";
import { meterConfigService, type MeterConfig } from "../../../Service/meterConfigService";
import "../../../styles/qldh/MeterManagementPage.css";
//import { mockMeterConfigs } from "../../../config/mockData";

const MeterConfigPage: React.FC = () => {
  const navigate = useNavigate();
  const [configs, setConfigs] = useState<MeterConfig[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal state
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detailConfig, setDetailConfig] = useState<MeterConfig | null>(null);
  

  // Load dữ liệu API thật
  
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const res = await meterConfigService.getAll();
        setConfigs(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu API:", error);
        alert("Không thể tải dữ liệu từ API!");
      }
    };
    fetchConfigs();
  }, []);
  

  // Load mock data
/*  useEffect(() => {
    setConfigs(mockMeterConfigs);
  }, []); */

  // Filter
  const filteredConfigs = useMemo(() => {
    return configs.filter(c =>
      c.objectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.meterCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [configs, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredConfigs.length / itemsPerPage);
  const currentConfigs = filteredConfigs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  // Delete
  const handleDelete = async (id: number) => {
    if (!window.confirm(`Bạn có chắc muốn xóa cấu hình ID ${id}?`)) return;
    try {
      await meterConfigService.delete(id);
      setConfigs(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa API:", error);
      alert("Xảy ra lỗi khi xóa!");
    }
  };

  // Toggle lock
   const handleToggleLock = async (cfg: MeterConfig) => {
    try {
      const updated = {
        objectCode: cfg.objectCode,
        meterCode: cfg.meterCode,
        note: cfg.note,
        locked: !cfg.locked,
        updatedAt: new Date().toISOString(),
        updatedByUser: "current-user" // FE tự tạo
      };
      await meterConfigService.update(cfg.id, updated);
      setConfigs(prev => prev.map(c => (c.id === cfg.id ? { ...c, locked: !c.locked } : c)));
    } catch (error) {
      console.error("Lỗi khi toggle lock API:", error);
      alert("Xảy ra lỗi!");
    }
  };

  // Open edit modal
  const handleEdit = (id: number) => setSelectedId(id);

  // KPI
  const totalConfigs = configs.length;
  const lockedConfigs = configs.filter(c => c.locked).length;
  const activeConfigs = configs.filter(c => !c.locked).length;

  return (
    <div className="meter-page">
      <div className="page-header">
        <FaTachometerAlt className="page-icon" />
        <h2 className="page-title">DANH SÁCH CẤU HÌNH ĐỒNG HỒ TỔNG</h2>
      </div>

      <Tabs />

      {/* KPI */}
      <div className="stats">
        <div className="card purple">
          <span>Tổng số cấu hình</span>
          <p>{totalConfigs}</p>
        </div>
        <div className="card red">
          <span>Đang khóa</span>
          <h3>{lockedConfigs}</h3>
        </div>
        <div className="card green">
          <span>Đang hoạt động</span>
          <h3>{activeConfigs}</h3>
        </div>
      </div>

      {/* Toolbar */}
      <div className="boder">
        <div className="toolbar">
          <div className="toolbar-left">
            <input
              type="text"
              placeholder="Tìm kiếm cấu hình..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn filter" onClick={() => setShowFilter(true)}>
              <FaFilter style={{ marginRight: "6px" }} /> Bộ Lọc
            </button>
          </div>
          <div className="toolbar-right">
            <button className="btn add" onClick={() => navigate("/add-meter-config")}>
              <FaPlus style={{ marginRight: "6px" }} /> Thêm mới
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã đối tượng</th>
              <th>Mã đồng hồ</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentConfigs.map(c => (
              <tr key={c.id} className={c.locked ? "locked-row" : ""}>
                <td>{c.id}</td>
                <td>{c.objectCode}</td>
                <td>{c.meterCode}</td>
                <td>{c.createdAt}</td>
                <td className="actions">
                  <FaEdit title="Sửa" onClick={() => handleEdit(c.id)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(c.id)} />
                  <FaEye title="Chi tiết" onClick={() => setDetailConfig(c)} />
                  <FaLock title="Khóa/Mở" onClick={() => handleToggleLock(c)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>Trước</button>
        <span className="current-page">{currentPage}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Sau</button>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Bộ Lọc Tìm Kiếm</h3>
            <label>
              Mã đồng hồ:
              <input type="text" placeholder="Nhập mã đồng hồ..." />
            </label>
            <div className="modal-actions">
              <button className="btn apply">Áp dụng</button>
              <button className="btn close" onClick={() => setShowFilter(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedId !== null && (
        <EditMeterConfigModal
          configId={selectedId}
          useMock={false} // đổi false nếu muốn dùng API thật
          onClose={() => setSelectedId(null)}
          onSave={(updated) => {
            setConfigs(prev => prev.map(c => (c.id === updated.id ? updated : c)));
            setSelectedId(null);
          }}
        />
      )}

      {/* Detail Modal */}
      {detailConfig && (
        <DetailMeterConfigModal
          config={detailConfig}
          onClose={() => setDetailConfig(null)}
        />
      )}
    </div>
  );
};

export default MeterConfigPage;
