//import { mockUsers } from "../../../config/mockData";
// import { userService, type UserInfo } from "../../../services/nguoi-dung/userService";
// import "../../../styles/qltk/AccountManagement.css";
import React, { useState, useEffect, useMemo } from "react";
import { FaUser, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import Tabs from "src/components/tabQLTK/Tabs";
import "src/styles/global.css";
import "src/styles/tai-khoan/AccountManagement.css"
import EditUserInfoModal from "./EditUserInfoModal";
import DetailUserInfoModal from "./DetailUserInfoModal";
import { useNavigate } from "react-router-dom";
// service
import {  deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import {  NguoiDungResponse, } from "src/types/nguoi-dung/nguoi-dung";

interface UserInfoPageProps {
  useMock?: boolean;
}

const UserInfoPage: React.FC<UserInfoPageProps> = ({ useMock = false }) => {
  
  const navigate = useNavigate();
  const [users, setUsers] = useState<NguoiDungResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [filter, setFilter] = useState({ code: "", username: "", fullname: "", email: "" });
  const [showFilter, setShowFilter] = useState(false);

  // Modal
  const [editingUser, setEditingUser] = useState<NguoiDungResponse | null>(null);
  const [detailUser, setDetailUser] = useState<NguoiDungResponse | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 📌 Lấy dữ liệu từ API thật
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getList<NguoiDungResponse>(apiUrls.NguoiDung.list);
        setUsers(data);
      } catch (err) {
        console.error("❌ Lỗi khi tải dữ liệu từ API:", err);
        alert("Không thể tải dữ liệu từ API!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); 

  // 📌 Dữ liệu giả
/*  useEffect(() => {
    setUsers(mockUsers);
    setLoading(false);
  }, []); */

  // 📌 Lọc dữ liệu
  const filteredUsers = useMemo(() =>
    users.filter(u =>
      u.ma.toLowerCase().includes(filter.code.toLowerCase()) &&
      u.ten.toLowerCase().includes(filter.username.toLowerCase()) &&
      u.tenNguoiDung.toLowerCase().includes(filter.fullname.toLowerCase()) &&
      u.email.toLowerCase().includes(filter.email.toLowerCase())
    ), [users, filter]
  );

  // 📌 Phân trang
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 📌 Xóa người dùng
  const handleDelete = async (id: number) => {
      const acc = users.find(a => a.id === id);
      if (!acc) return;
      if (!window.confirm(`Bạn có chắc muốn xóa tài khoản "${acc.tenNguoiDung}" không?`)) return;
  
      if (useMock) {
        setUsers(prev => prev.filter(a => a.id !== id));
        setMessage("Xóa tài khoản thành công!");
      } else {
        try {
          await deleteData(apiUrls.NguoiDung.delete(id));;
          setUsers(prev => prev.filter(a => a.id !== id));
          setMessage("Xóa tài khoản thành công!");
        } catch (error) {
          console.error("Lỗi xóa tài khoản:", error);
          alert("Xóa thất bại!");
        }
      }
  }

  // 📌 Lưu khi sửa

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
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={filter.username}
              onChange={e => setFilter({ ...filter, username: e.target.value })}
            />
            <button className="btn filter" onClick={() => setShowFilter(true)}>
              <FaFilter /> Bộ lọc
            </button>
          </div>
          <div className="toolbar-right">
            <button className="btn add" onClick={() => navigate("/add-user")}>
              <FaPlus /> Thêm mới
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{u.id}</td>
                <td>{u.ma}</td>
                <td>{u.tenNguoiDung}</td>
                <td>{u.ten}</td>
                <td>{u.email}</td>
                <td className="actions">
                  <FaEdit onClick={() => u.id !== undefined && setEditingUser(u)} title="Sửa" />
                  <FaTrash onClick={() => handleDelete(u.id!)} title="Xóa" />
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
      {editingUser?.id !== undefined && (
        <EditUserInfoModal
          userId={editingUser.id}
          onClose={() => setEditingUser(null)}
          onSave={(updated) => {
            setUsers(prev =>
              prev.map(u => (u.id === updated.id ? { ...u, ...updated } : u))
            );
          }}
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
