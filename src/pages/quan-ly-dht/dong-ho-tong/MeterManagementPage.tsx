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
// import { meterService, type Meter } from "../../../services/dong-ho-tong/meterService";
//import { mockMeters } from "../../../config/mockData";

// service
import { createData, updateData, deleteData, getList, getById } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { AddDongHoTongRequest, DongHoTongResponse, UpdateDongHoTongRequest } from "src/types/dong-ho-tong/dong-ho-tong";
import { ThongTinNguoiDung } from "src/types/authTypes";

// text
import { TextForms } from "src/constants/text";

const MeterManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const [meters, setMeters] = useState<DongHoTongResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"" | "Hoạt động" | "Cảnh báo" | "Lỗi">("");
  const [showFilter, setShowFilter] = useState(false);

  const [selectedMeter, setSelectedMeter] = useState<DongHoTongResponse | null>(null);
  const [detailMeter, setDetailMeter] = useState<DongHoTongResponse | null>(null);


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 📌 Load dữ liệu từ API
  useEffect(() => {
    const fetchMeters = async () => {
      try {
        // const res = await meterService.getAll();
        const res = await getList<DongHoTongResponse>(apiUrls.DongHoTong.list);
        setMeters(res);
      } catch (error) {
        console.error("❌ Lỗi khi tải dữ liệu đồng hồ:", error);
        alert(TextForms.thongBao.khongTheTaiDuLieu);
        setMeters([]); // show table rỗng nếu API lỗi
      } finally {
        setLoading(false);
      }
    };
    fetchMeters();
  }, []);

  // 📌 Xóa đồng hồ
  const handleDelete = async (id: number) => {
    if (!window.confirm(`Bạn có chắc muốn xóa đồng hồ ID ${id}?`)) return;
    try {
      // await meterService.delete(id);
      await deleteData(apiUrls.DongHoTong.delete(id));;
      setMeters(meters.filter((m) => m.Id !== id));
      setMessage(TextForms.thongBao.xoaThanhCong);
      alert(TextForms.thongBao.xoaThanhCong);
    } catch (error) {
      console.error("❌ Lỗi khi xóa đồng hồ:", error);
      setMessage("Xóa thất bại!");
      alert(TextForms.thongBao.loiXoa);
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // 📌 Lưu chỉnh sửa

  if (loading) return <div>{TextForms.thongBao.dangTaiDuLieu}</div>;

  // Dữ liệu giả cho MeterPage
  /* useEffect(() => {  
    setMeters(mockMeters);       
    setLoading(false);
  }, []); */

  // 📌 Lọc & tìm kiếm
  const filteredMeters = useMemo(() => {
    return meters.filter(
      (m) =>
      (m.Ma.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.Ten.toLowerCase().includes(searchTerm.toLowerCase()))
      // &&(filterStatus === "" || m.status === filterStatus)
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



  return (
    <div className="meter-page">
      {message && <div className="toast">{message}</div>}

      {/* Header */}
      <div className="page-header">
        <FaTachometerAlt className="page-icon" />
        <h2 className="page-title">TỔNG QUAN ĐỒNG HỒ TỔNG</h2>
      </div>

      {/* KPI + Charts */}
      {/* <MeterStats meters={meters} /> */}

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
              <tr key={m.Id}>
                <td>{m.Id}</td>
                <td>{m.Ma}</td>
                <td>{m.Ten}</td>
                <td>{m.SanLuong}</td>
                {/* <td>{m.status}</td> */}
                <td className="actions">
                  <FaEdit title="Sửa" onClick={() => setSelectedMeter(m)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(m.Id)} />
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
          meterId={selectedMeter.Id}
          useMock={false} // hoặc true nếu muốn dùng mock
          onClose={() => setSelectedMeter(null)}
          onSave={(updatedMeter) => {
            setMeters(prev =>
              prev.map(m => (m.Id === updatedMeter.id ? updatedMeter : m))
            );
            setSelectedMeter(null);
          }}
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
