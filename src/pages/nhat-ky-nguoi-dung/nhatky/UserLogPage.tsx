// src/pages/nhatky/UserLogPage.tsx
import React, { useState, useMemo, useEffect } from "react";
import { FaClipboardList, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//import { mockUserLogs } from "../../../config/mockData";

import "../../../styles/nhatky/UserLogPage.css";
import "../../../styles/global.css";
import LogStats from "../../../components/LogStats";
import EditUserLogModal from "./EditUserLogModal";
import DetailUserLogModal from "./DetailUserLogModal";
import { userLogService, type UserLog } from "../../../services/userLogService";

const UserLogPage: React.FC = () => {
  const navigate = useNavigate();

  const [logs, setLogs] = useState<UserLog[]>([]);
 const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"" | "Thành công" | "Thất bại">("");
  const [showFilter, setShowFilter] = useState(false);
  const [editingLog, setEditingLog] = useState<UserLog | null>(null);
  const [detailLog, setDetailLog] = useState<UserLog | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await userLogService.getAll();
        setLogs(res.data); // lấy data từ AxiosResponse
      } catch {
        setError("Không thể tải dữ liệu nhật ký!");
        alert("Không thể tải dữ liệu từ API!");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []); 

/*  useEffect(() => {
    setLogs(mockUserLogs);
  }, []); */

  const filteredLogs = useMemo(() => {
    return logs.filter(
      (l) =>
        (l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          l.action.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "" || l.status === filterStatus)
    );
  }, [logs, searchTerm, filterStatus]);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const currentLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleDelete = async (id: number) => {
    if (window.confirm(`Bạn có chắc muốn xóa log ID ${id}?`)) {
      try {
        await userLogService.delete(id);
        setLogs((prev) => prev.filter((l) => l.id !== id));
      } catch {
        alert("Xóa thất bại!");
      }
    }
  };

  const StatusBadge: React.FC<{ status: "Thành công" | "Thất bại" | "Chưa xác định"; }> = ({ status }) => (
    <span className={`status-badge ${status === "Thành công" ? "success" : "fail"}`}>
      {status}
    </span>
  );

  const ActionButtons: React.FC<{ log: UserLog }> = ({ log }) => (
    <div className="actions">
      <FaEdit title="Sửa" onClick={() => setEditingLog(log)} />
      <FaTrash title="Xóa" onClick={() => handleDelete(log.id)} />
      <FaEye title="Chi tiết" onClick={() => setDetailLog(log)} />
    </div>
  );

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;

  return (
    <div className="userlog-page">
      <div className="page-header">
        <FaClipboardList className="page-icon" />
        <h2 className="page-title">NHẬT KÝ HOẠT ĐỘNG</h2>
      </div>

      {/* Nếu có lỗi thì hiển thị nhưng không chặn render */}
        {error && <div className="error">{error}</div>} 

      <LogStats logs={filteredLogs.map((l) => ({ ...l, timestamp: l.createdAt }))} />

      <div className="page-header">
        <FaClipboardList className="page-icon" />
        <h2 className="page-title">DANH SÁCH NHẬT KÝ</h2>
      </div>

      <div className="boder">
        <div className="toolbar">
          <div className="toolbar-left">
            <input
              type="text"
              placeholder="Tìm kiếm hành động hoặc người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn filter" onClick={() => setShowFilter(true)}>
              <FaFilter style={{ marginRight: 6, fontSize: 16 }} /> Bộ Lọc
            </button>
          </div>
          <div className="toolbar-right">
            <button className="btn add" onClick={() => navigate("/add-log")}>
              <FaPlus style={{ marginRight: 6 }} /> Thêm mới
            </button>
          </div>
        </div>

        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Người dùng</th>
              <th>Hành động</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              currentLogs.map((l) => (
                <tr key={l.id}>
                  <td>{l.id}</td>
                  <td>{l.user}</td>
                  <td>{l.action}</td>
                  <td>
                    <StatusBadge status={l.status} />
                  </td>
                  <td>{new Date(l.createdAt).toLocaleString("vi-VN")}</td>
                  <td>
                    <ActionButtons log={l} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

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

      {showFilter && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Bộ Lọc Nhật Ký</h3>
            <label>
              Trạng thái:
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as "" | "Thành công" | "Thất bại")
                }
              >
                <option value="">Tất cả</option>
                <option value="Thành công">Thành công</option>
                <option value="Thất bại">Thất bại</option>
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

      {editingLog && (
      <EditUserLogModal
        logId={1}           // ID record muốn edit
        useMock={false}      // dùng dữ liệu mock từ mockData.ts
        onClose={() => setEditingLog(null)}
        onSave={(updated) => {
          console.log("Cập nhật mock:", updated);
          setLogs(prev => prev.map(l => (l.id === updated.id ? updated : l)));
        }}
      />

      )}

      {detailLog && (
        <DetailUserLogModal
          log={{ ...detailLog, data: detailLog.data ?? "" }}
          onClose={() => setDetailLog(null)}
        />
      )}
    </div>
  );
};

export default UserLogPage;
