import React, { useState, useEffect, useMemo } from "react";
import { FaUser, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import Tabs from "../../../components/tabQLTK/Tabs";
import "../../../styles/global.css";
import "../../../styles/qltk/AccountManagement.css";
import { userService, type UserInfo } from "../../../config/userService";
import EditUserInfoModal from "./EditUserInfoModal";
import DetailUserInfoModal from "./DetailUserInfoModal";
import { useNavigate } from "react-router-dom";

const UserInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [filter, setFilter] = useState({ code: "", username: "", fullname: "", email: "" });
  const [showFilter, setShowFilter] = useState(false);

  // Modal
  const [editingUser, setEditingUser] = useState<UserInfo | null>(null);
  const [detailUser, setDetailUser] = useState<UserInfo | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userService.getAll();
        setUsers(res.data);
      } catch {
        setUsers([
          { id: 1, code: "U001", username: "admin", fullname: "Quản trị viên", email: "admin@mail.com", password: "", role: "Admin", permissions: [], createdAt: "2025-01-01", updatedAt: "2025-02-01", createdBy: "system", updatedBy: "system" },
          { id: 2, code: "U002", username: "user1", fullname: "Nguyễn Văn A", email: "a@mail.com", password: "", role: "User", permissions: [], createdAt: "2025-01-05", updatedAt: "2025-02-02", createdBy: "admin", updatedBy: "admin" },
          { id: 3, code: "U003", username: "user2", fullname: "Trần Thị B", email: "b@mail.com", password: "", role: "User", permissions: [], createdAt: "2025-01-10", updatedAt: "2025-02-03", createdBy: "admin", updatedBy: "admin" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = useMemo(() => 
    users.filter(u =>
      u.code.toLowerCase().includes(filter.code.toLowerCase()) &&
      u.username.toLowerCase().includes(filter.username.toLowerCase()) &&
      u.fullname.toLowerCase().includes(filter.fullname.toLowerCase()) &&
      u.email.toLowerCase().includes(filter.email.toLowerCase())
    ), [users, filter]
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try { await userService.delete(id); } catch { /* empty */ }
      setUsers(users.filter(u => u.id !== id));
      setMessage("Xóa thành công!");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleSaveUser = (updated: UserInfo) => {
    setUsers(users.map(u => u.id === updated.id ? updated : u));
    setEditingUser(null);
    setMessage("Cập nhật thành công!");
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="account-page">
      {message && <div className="toast">{message}</div>}

      <div className="page-header">
        <FaUser className="page-icon" />
        <h2 className="page-title">DANH SÁCH NGƯỜI DÙNG</h2>
      </div>

      <Tabs />

      <div className="boder">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            <input type="text" placeholder="Tìm kiếm..." value={filter.username} onChange={e => setFilter({ ...filter, username: e.target.value })} />
            <button className="btn filter" onClick={() => setShowFilter(true)}><FaFilter /> Bộ lọc</button>
          </div>
          <div className="toolbar-right">
            <button className="btn add" onClick={() => navigate("/add-user")}><FaPlus /> Thêm mới</button>
          </div>
        </div>

        {/* Table */}
        <table className="account-table">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tài khoản</th>
              <th>Tên Người Dùng</th>
              <th>Email</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(u => (
              <tr key={u.id}>
                <td>{u.code}</td>
                <td>{u.username}</td>
                <td>{u.fullname}</td>
                <td>{u.email}</td>
                <td className="actions">
                  <FaEdit onClick={() => setEditingUser(u)} title="Sửa" />
                  <FaTrash onClick={() => handleDelete(u.id)} title="Xóa" />
                  <FaEye onClick={() => setDetailUser(u)} title="Chi tiết" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={() => setCurrentPage(p => Math.max(p-1,1))} disabled={currentPage===1}>Trước</button>
          <span className="current-page">{currentPage}</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages,p+1))} disabled={currentPage===totalPages}>Sau</button>
        </div>
      </div>

      {/* Modal Filter */}
      {showFilter && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Bộ lọc</h3>
            <label>Mã: <input value={filter.code} onChange={e=>setFilter({...filter, code:e.target.value})} /></label>
            <label>Tài khoản: <input value={filter.username} onChange={e=>setFilter({...filter, username:e.target.value})} /></label>
            <label>Tên: <input value={filter.fullname} onChange={e=>setFilter({...filter, fullname:e.target.value})} /></label>
            <label>Email: <input value={filter.email} onChange={e=>setFilter({...filter, email:e.target.value})} /></label>
            <div className="modal-actions">
              <button className="btn apply" onClick={()=>setShowFilter(false)}>Áp dụng</button>
              <button className="btn close" onClick={()=>setShowFilter(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {editingUser && (
        <EditUserInfoModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveUser}
        />
      )}

      {/* Modal Detail */}
      {detailUser && (
        <DetailUserInfoModal
          user={detailUser}
          onClose={() => setDetailUser(null)}
        />
      )}
    </div>
  );
};

export default UserInfoPage;
