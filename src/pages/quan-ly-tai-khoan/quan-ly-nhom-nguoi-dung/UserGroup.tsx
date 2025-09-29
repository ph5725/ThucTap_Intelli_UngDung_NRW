// src/pages/quan-ly-tai-khoan/quan-ly-nhom-nguoi-dung/UserGroupPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import { FaUser, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tabs from "../../../components/tabQLTK/Tabs";
import EditUserGroupModal from "./EditUserGroupModal";
import DetailUserGroupModal from "./DetailUserGroupModal";
// import { userGroupService, type UserGroup } from "../../../services/nguoi-dung/userGroupService";
import "../../../styles/global.css";
import "../../../styles/qltk/AccountManagement.css";
//import { mockUserGroups } from "../../../config/mockData";

// service
import { deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";

// interface
import { NhomNguoiDungResponse } from "src/types/nguoi-dung/nhom-nguoi-dung";

const UserGroupPage: React.FC = () => {
  const navigate = useNavigate();

  const [groups, setGroups] = useState<NhomNguoiDungResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error] = useState<string | null>(null);

  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ groupName: "", members: "" });

  const [editingGroup, setEditingGroup] = useState<NhomNguoiDungResponse | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<NhomNguoiDungResponse | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 📌 Hàm fetchData để gọi API
 const fetchData = async () => {
  try {
    const res = await getList<NhomNguoiDungResponse>(apiUrls.NhomNguoiDung.list);
    setGroups(res);
  } catch (err) {
    console.error("❌ Lỗi API:", err);
    alert("Không thể tải dữ liệu từ API!");
    // Không set error để block UI
  } finally {
    setLoading(false);
  }
};
  // 📌 Gọi fetchData khi load trang
  useEffect(() => {
    fetchData();
  }, []); 

  // 📌 Dữ liệu giả cho phát triển giao diện
/*  useEffect(() => {
  setGroups(mockUserGroups);
  setLoading(false);
}, []); */

  // 📌 Lọc danh sách
  const filteredGroups = useMemo(() => {
    return groups.filter(
      g =>
        g.NhomNguoiDung1.toLowerCase().includes(filter.groupName.toLowerCase()) 
    );
  }, [groups, filter]);

  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const currentGroups = filteredGroups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // 📌 Xóa nhóm
  const handleDelete = async (id: number) => {
    const g = groups.find(x => x.Id === id);
    if (!g) return;
    if (window.confirm(`Bạn có chắc muốn xóa "${g.NhomNguoiDung1}" không?`)) {
      try {
        await deleteData(apiUrls.NhomNguoiDung.delete(id));;
        setGroups(groups.filter(x => x.Id !== id));
        setMessage("Xóa thành công!");
      } catch (err) {
        console.error("❌ Lỗi khi xóa:", err);
        setMessage("Xóa thất bại!");
      } finally {
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="account-page">
      {message && <div className="toast">{message}</div>}

      <div className="page-header">
        <FaUser className="page-icon" />
        <h2 className="page-title">DANH SÁCH NHÓM NGƯỜI DÙNG</h2>
      </div>

      <Tabs />

      <div className="boder">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            <input
              type="text"
              placeholder="Tìm kiếm nhanh..."
              value={filter.groupName}
              onChange={(e) => setFilter({ ...filter, groupName: e.target.value })}
            />
            <button className="btn filter" onClick={() => setShowFilter(true)}>
              <FaFilter style={{ marginRight: 6, fontSize: 14 }} /> Bộ lọc
            </button>
          </div>
          <div className="toolbar-right">
            <button className="btn add" onClick={() => navigate("/add-group")}>
              <FaPlus style={{ marginRight: 6 }} /> Thêm mới
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nhóm Người Dùng</th>
              <th>Thành Viên</th>
              <th>Ghi Chú</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currentGroups.map(g => (
              <tr key={g.Id}>
                <td>{g.Id}</td>
                <td>{g.NhomNguoiDung1}</td>
                <td>{g.ThanhVien}</td>
                <td>{g.GhiChu}</td>
                <td className="actions">
                  <FaEdit title="Sửa" onClick={() => setEditingGroup(g)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(g.Id)} />
                  <FaEye
                    title="Xem"
                    onClick={() => {
                      setSelectedGroup(g);
                      setShowDetail(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>Trước</button>
          <span className="current-page">{currentPage}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Sau</button>
        </div>
      </div>

      {/* Modal Bộ lọc */}
      {showFilter && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="text-user">
              <h3>Bộ Lọc Tìm Kiếm</h3>
             </div>
            <label>
              Nhóm Người Dùng:
              <input
                type="text"
                value={filter.groupName}
                onChange={(e) => setFilter({ ...filter, groupName: e.target.value })}
              />
            </label>
            <label>
              Thành Viên:
              <input
                type="text"
                value={filter.members}
                onChange={(e) => setFilter({ ...filter, members: e.target.value })}
              />
            </label>
            <div className="modal-actions">
              <button className="btn apply" onClick={() => setShowFilter(false)}>Áp dụng</button>
              <button className="btn close" onClick={() => setShowFilter(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {editingGroup && (
        <EditUserGroupModal
          group={editingGroup}
          onClose={() => setEditingGroup(null)}
          onSave={fetchData}  // ✅ gọi lại API để reload
        />
      )}

      {/* Modal Detail */}
      {showDetail && selectedGroup && (
        <DetailUserGroupModal
          group={selectedGroup}
          onClose={() => setShowDetail(false)}
        />
      )}
    </div>
  );
};

export default UserGroupPage;
