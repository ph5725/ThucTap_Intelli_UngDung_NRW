// src/pages/nhatky/UserLogPage.tsx
//import { mockUserLogs } from "../../../config/mockData";
// import { userLogService, type UserLog } from "../../../services/nguoi-dung/userLogService";
import React, { useState, useMemo, useEffect } from "react";
import { FaClipboardList, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "src/styles/nhat-ky/UserLogPage.css";
import "src/styles/global.css";
import LogStats from "src/components/LogStats";
import EditUserLogModal from "./EditUserLogModal";
import DetailUserLogModal from "./DetailUserLogModal";
// service
import {  deleteData, getList,  } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import {  NhatKySuDungResponse,  } from "src/types/nguoi-dung/nhat-ky-su-dung";
// text
import { TextForms } from "src/constants/text";

const UserLogPage: React.FC = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<NhatKySuDungResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"" | "Thành công" | "Thất bại">("");
  const [showFilter, setShowFilter] = useState(false);
  const [editingLog, setEditingLog] = useState<NhatKySuDungResponse | null>(null);
  const [detailLog, setDetailLog] = useState<NhatKySuDungResponse | null>(null);

  //Lấy dữ liệu từ api
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // const res = await userLogService.getAll();
        const res = await getList<NhatKySuDungResponse>(apiUrls.NhatKySuDung.list);
        setLogs(res); // lấy data từ AxiosResponse
      } catch {
        setError("Không thể tải dữ liệu nhật ký!");
        alert(TextForms.thongBao.khongTheTaiDuLieu);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Xóa
  const handleDelete = async (id: number) => {
    if (window.confirm(`Bạn có chắc muốn xóa log ID ${id}?`)) {
      try {
        // await userLogService.delete(id);
        await deleteData(apiUrls.NhatKySuDung.delete(id));;
        setLogs((prev) => prev.filter((l) => l.id !== id));
        alert(TextForms.thongBao.xoaThanhCong);
      } catch {
        alert(TextForms.thongBao.loiXoa);
      }
    }
  };

  /*  useEffect(() => {
      setLogs(mockUserLogs);
    }, []); */

  const filteredLogs = useMemo(() => {
    return logs.filter(
      (l) =>
      (l.tenNguoiDung.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.hanhDong.toLowerCase().includes(searchTerm.toLowerCase()))
      // &&(filterStatus === "" || l.status === filterStatus)
    );
  }, [logs, searchTerm]);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const currentLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));


  const ActionButtons: React.FC<{ log: NhatKySuDungResponse }> = ({ log }) => (
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

      <LogStats logs={filteredLogs.map((l) => ({ ...l, timestamp: l.ngayTao }))} />

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
                  <td>{l.tenNguoiDung}</td>
                  <td>{l.hanhDong}</td>
                  {/* <td>
                    <StatusBadge status={l.status} />
                  </td> */}
                  <td>{new Date(l.ngayTao).toLocaleString("vi-VN")}</td>
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
          // log={{ ...detailLog, data: detailLog.data ?? "" }}
          log={detailLog}
          onClose={() => setDetailLog(null)}
        />
      )}
    </div>
  );
};

export default UserLogPage;
