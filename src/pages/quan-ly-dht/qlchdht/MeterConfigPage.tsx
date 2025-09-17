import React, { useState, useMemo, useEffect } from "react";
import { FaTachometerAlt, FaEdit, FaTrash, FaEye, FaLock, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tabs from "../../../components/tabQLDH/Tabs";
import MeterStats from "../../../components/MeterStats";
import EditMeterConfigModal from "./EditMeterConfigModal";
import DetailMeterConfigModal from "./DetailMeterConfigModal";
import { meterConfigService, type MeterConfig } from "../../../config/meterConfigService";
import "../../../styles/qldh/MeterManagementPage.css";

const MeterConfigPage: React.FC = () => {
  const navigate = useNavigate();
  const [configs, setConfigs] = useState<MeterConfig[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus] = useState<"" | "Hoạt động" | "Cảnh báo" | "Lỗi">("");
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedConfig, setSelectedConfig] = useState<MeterConfig | null>(null);
  const [detailConfig, setDetailConfig] = useState<MeterConfig | null>(null);

  // Load dữ liệu từ API
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const res = await meterConfigService.getAll();
        setConfigs(res.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu cấu hình:", error);
      }
    };
    fetchConfigs();
  }, []);

  const filteredConfigs = useMemo(() => {
    return configs.filter(c =>
      (c.objectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
       c.meterCode.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "" || filterStatus === "Hoạt động") // placeholder
    );
  }, [configs, searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredConfigs.length / itemsPerPage);
  const currentConfigs = filteredConfigs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const handleDelete = async (id: number) => {
    if (!window.confirm(`Bạn có chắc muốn xóa cấu hình ID ${id}?`)) return;
    try {
      await meterConfigService.delete(id);
      setConfigs(configs.filter(c => c.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa cấu hình:", error);
      alert("Xảy ra lỗi khi xóa!");
    }
  };

  const handleToggleLock = async (id: number) => {
    const cfg = configs.find(c => c.id === id);
    if (!cfg) return;
    try {
      const updated = { ...cfg, locked: !cfg.locked };
      await meterConfigService.update(id, updated);
      setConfigs(configs.map(c => (c.id === id ? updated : c)));
    } catch (error) {
      console.error("Lỗi khi khóa/mở:", error);
      alert("Xảy ra lỗi!");
    }
  };

  return (
    <div className="meter-page">
      <div className="page-header">
        <FaTachometerAlt className="page-icon" />
        <h2 className="page-title">TỔNG QUAN CẤU HÌNH ĐỒNG HỒ TỔNG</h2>
      </div>

      <MeterStats meters={configs.map(c => ({
        id: c.id,
        code: c.meterCode,
        name: c.objectCode,
        volume: Math.floor(Math.random() * 100),
        status: "Hoạt động",
        recordDate: "",
        updatedDate: c.updatedAt || "",
        updatedBy: c.updatedByUser || "",
        errorFlag: false,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt || "",
        createdBy: c.createdBy || "",
        updatedByUser: c.updatedByUser || "",
        note: c.note || ""
      }))} />

      <div className="page-header">
        <FaTachometerAlt className="page-icon" />
        <h2 className="page-title">DANH SÁCH CẤU HÌNH ĐỒNG HỒ TỔNG</h2>
      </div>

      <Tabs />

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
                  <FaEdit title="Sửa" onClick={() => setSelectedConfig(c)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(c.id)} />
                  <FaEye title="Chi tiết" onClick={() => setDetailConfig(c)} />
                  <FaLock title="Khóa/Mở" onClick={() => handleToggleLock(c.id)} />
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
      {selectedConfig && (
        <EditMeterConfigModal
          config={selectedConfig}
          onClose={() => setSelectedConfig(null)}
          onSave={(updated) => setConfigs(configs.map(c => (c.id === updated.id ? updated : c)))}
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
