// src/pages/nhatky/UserLogPage.tsx
import React, { useState, useMemo, useEffect } from "react";
import { FaClipboardList, FaEdit, FaTrash, FaEye, FaPlus, FaFilter, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "src/styles/nhat-ky/UserLogPage.css";
import "src/styles/global.css";
import LogStats from "src/components/LogStats";
import EditUserLogModal from "./EditUserLogModal";
import DetailUserLogModal from "./DetailUserLogModal";
import { deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
import { NhatKySuDungResponse } from "src/types/nguoi-dung/nhat-ky-su-dung";
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

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getList<NhatKySuDungResponse>(apiUrls.NhatKySuDung.list);
        setLogs(res);
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
        await deleteData(apiUrls.NhatKySuDung.delete(id));
        setLogs((prev) => prev.filter((l) => l.id !== id));
        alert(TextForms.thongBao.xoaThanhCong);
      } catch {
        alert(TextForms.thongBao.loiXoa);
      }
    }
  };

  // Lọc
  const filteredLogs = useMemo(() => {
    return logs.filter(
      (l) =>
        (l.tenNguoiDung.toLowerCase().includes(searchTerm.toLowerCase()) ||
          l.hanhDong.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "" || l.tinhNang === filterStatus)
    );
  }, [logs, searchTerm, filterStatus]);

  // Export toàn bộ dữ liệu
  const handleExportAll = () => {
    let csvContent = "";

    // KPI
    const totalLogs = logs.length;
    const successCount = logs.filter((l) => l.tinhNang === "Thành công").length;
    const failCount = logs.filter((l) => l.tinhNang === "Thất bại").length;

    csvContent += "=== KPI TỔNG HỢP ===\n";
    csvContent += `Tổng hành động,Thành công,Thất bại\n`;
    csvContent += `${totalLogs},${successCount},${failCount}\n\n`;

    // Biểu đồ Pie
    csvContent += "=== BIỂU ĐỒ THÀNH CÔNG / THẤT BẠI ===\n";
    csvContent += `Loại,Số lượng\n`;
    csvContent += `Thành công,${successCount}\n`;
    csvContent += `Thất bại,${failCount}\n\n`;

    // Biểu đồ Bar
    const grouped: Record<string, number> = {};
    logs.forEach((l) => {
      const date = l.ngayTao.split("T")[0];
      grouped[date] = (grouped[date] || 0) + 1;
    });
    csvContent += "=== BIỂU ĐỒ HOẠT ĐỘNG THEO NGÀY ===\n";
    csvContent += "Ngày,Số hành động\n";
    Object.entries(grouped).forEach(([date, count]) => {
      csvContent += `${date},${count}\n`;
    });
    csvContent += "\n";

    // Dữ liệu chi tiết
    csvContent += "=== DANH SÁCH NHẬT KÝ CHI TIẾT ===\n";
    csvContent += "ID,Người dùng,Hành động,Tính năng,Dữ liệu,Ghi chú,Thời gian,Người tạo,Người cập nhật\n";
    logs.forEach((l) => {
      csvContent += `${l.id},"${l.tenNguoiDung}","${l.hanhDong}","${l.tinhNang}","${l.duLieu}","${l.ghiChu ?? ""}",${l.ngayTao},${l.nguoiTao},${l.nguoiCapNhat ?? ""}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "user_logs_full_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

      {error && <div className="error">{error}</div>}

      <LogStats logs={filteredLogs} />

      <div className="page-header">
        <FaClipboardList className="page-icon" />
        <h2 className="page-title">DANH SÁCH NHẬT KÝ</h2>
         <button className="btn export" onClick={handleExportAll}>
          <FaDownload style={{ marginRight: 6 }} /> Xuất CSV
        </button>
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
                onChange={(e) => setFilterStatus(e.target.value as "" | "Thành công" | "Thất bại")}
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
          logId={editingLog.id}
          useMock={false}
          onClose={() => setEditingLog(null)}
          onSave={(updated) => {
            setLogs((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
          }}
        />
      )}

      {detailLog && (
        <DetailUserLogModal
          log={detailLog}
          onClose={() => setDetailLog(null)}
        />
      )}
    </div>
  );
};

export default UserLogPage;
