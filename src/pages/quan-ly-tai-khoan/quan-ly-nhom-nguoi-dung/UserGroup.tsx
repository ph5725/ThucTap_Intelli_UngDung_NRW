import React, { useState, useEffect, useMemo } from "react";
import { FaUser, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tabs from "../../../components/tabQLTK/Tabs";
import EditUserGroupModal from "./EditUserGroupModal";
import DetailUserGroupModal from "./DetailUserGroupModal";
import { userGroupService, type UserGroup } from "../../../config/userGroupService";
import "../../../styles/global.css";
import "../../../styles/qltk/AccountManagement.css";

const UserGroupPage: React.FC = () => {
  const navigate = useNavigate();

  // State chính
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // Bộ lọc
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ groupName: "", members: "" });

  // Modal
  const [editingGroup, setEditingGroup] = useState<UserGroup | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 📌 Gọi API hoặc fallback mock
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userGroupService.getAll();
        setGroups(res.data);
      } catch (error) {
        console.warn("⚠️ Backend chưa chạy, dùng mock data thay thế.",error);
        setGroups([
          { id: 1, groupName: "Nhóm A", members: "Nguyễn Văn A, Trần Thị B", createdAt: "2025-01-01", updatedAt: "2025-01-05", note: "" },
          { id: 2, groupName: "Nhóm B", members: "Lê Văn C, Phạm Thị D", createdAt: "2025-02-01", updatedAt: "2025-02-05", note: "" },
          { id: 3, groupName: "Nhóm C", members: "Hoàng Văn E, Đặng Thị F", createdAt: "2025-03-01", updatedAt: "2025-03-05", note: "" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Lọc danh sách
  const filteredGroups = useMemo(() => {
    return groups.filter(
      g =>
        g.groupName.toLowerCase().includes(filter.groupName.toLowerCase()) &&
        g.members.toLowerCase().includes(filter.members.toLowerCase())
    );
  }, [groups, filter]);

  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const currentGroups = filteredGroups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // 📌 Delete (API hoặc mock)
  const handleDelete = async (id: number) => {
    const g = groups.find(x => x.id === id);
    if (!g) return;
    if (window.confirm(`Bạn có chắc muốn xóa "${g.groupName}" không?`)) {
      try {
        await userGroupService.delete(id);
      } catch {
        console.warn("⚠️ Backend chưa có, xóa mock.");
      }
      setGroups(groups.filter(x => x.id !== id));
      setMessage("Xóa thành công!");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // 📌 Update (API hoặc mock)
  const handleSaveGroup = async (updated: UserGroup) => {
    try {
      await userGroupService.update(updated.id, updated);
    } catch {
      console.warn("⚠️ Backend chưa có, cập nhật mock.");
    }
    setGroups(groups.map(g => (g.id === updated.id ? updated : g)));
    setEditingGroup(null);
    setMessage("Cập nhật thành công!");
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

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
              <th>Nhóm Người Dùng</th>
              <th>Thành Viên</th>
              <th>Ngày Tạo</th>
              <th>Ngày Cập Nhật</th>
              <th>Ghi Chú</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currentGroups.map(g => (
              <tr key={g.id}>
                <td>{g.groupName}</td>
                <td>{g.members}</td>
                <td>{g.createdAt}</td>
                <td>{g.updatedAt}</td>
                <td>{g.note}</td>
                <td className="actions">
                  <FaEdit title="Sửa" onClick={() => setEditingGroup(g)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(g.id)} />
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
          onSave={handleSaveGroup}
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
