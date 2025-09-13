//Lỗi CROSS-ORIGIN khi fetch API ở đây

import React, { useState, useEffect } from "react";
import { FaUser, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import Tabs from "../../components/tabQLTK/Tabs";
import "../../styles/global.css";
import "../../styles/qltk/AccountManagement.css";
import { useNavigate } from "react-router-dom";
import { userService } from "../../config/userService";

// Kiểu dữ liệu rút gọn hiển thị ở bảng
interface UserInfoList {
  id: number;
  code: string;
  username: string;
  fullname: string;
  email: string;
}

const UserInfoPage: React.FC = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserInfoList[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(users.length / pageSize);
  const paginatedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Fetch danh sách user từ API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await userService.getAll();
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
      setMessage("Không thể tải dữ liệu!");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // Xóa user theo id
  const handleDelete = async (id: number) => {
    const u = users.find((x) => x.id === id);
    if (!u) return;
    if (window.confirm(`Bạn có chắc muốn xóa "${u.username}" không?`)) {
      try {
        await userService.delete(id);
        setUsers((prev) => prev.filter((x) => x.id !== id));
        setMessage("Xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        setMessage("Xóa thất bại!");
      }
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // Chuyển sang trang edit-user/:id
  const handleEdit = (id: number) => {
    navigate(`/edit-user/${id}`);
  };

  // Chuyển sang trang detail-user/:id
  const handleView = (id: number) => {
    navigate(`/detail-user/${id}`);
  };

  return (
    <div className="account-page">
      {message && <div className="toast">{message}</div>}

      <div className="page-header">
        <FaUser className="page-icon" />
        <h2 className="page-title">DANH SÁCH NGƯỜI DÙNG</h2>
      </div>

      <Tabs />

      <div className="boder">
        <div className="toolbar">
          <div className="toolbar-left">
            <input type="text" placeholder="Tìm kiếm nhanh..." />
            <button className="btn filter" onClick={() => setShowFilter(true)}>
              <FaFilter style={{ marginRight: "6px", fontSize: 14 }} /> Bộ lọc
            </button>
          </div>
          <div className="toolbar-right">
            <button className="btn add" onClick={() => navigate("/add-user")}>
              <FaPlus style={{ marginRight: "6px" }} /> Thêm mới
            </button>
          </div>
        </div>

        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã</th>
              <th>Tài Khoản</th>
              <th>Người Dùng</th>
              <th>Email</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.code}</td>
                <td>{u.username}</td>
                <td>{u.fullname}</td>
                <td>{u.email}</td>
                <td className="actions">
                  <FaEdit title="Sửa" onClick={() => handleEdit(u.id)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(u.id)} />
                  <FaEye title="Chi tiết" onClick={() => handleView(u.id)} />
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

      {/* Bộ lọc */}
      {showFilter && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="text-user">
              <h3>Bộ Lọc Tìm Kiếm</h3>
            </div>
            <label>Mã: <input type="text" /></label>
            <label>Tên tài khoản: <input type="text" /></label>
            <label>Tên người dùng: <input type="text" /></label>
            <label>Email: <input type="text" /></label>

            <div className="modal-actions">
              <button className="btn apply">Áp dụng</button>
              <button className="btn close" onClick={() => setShowFilter(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoPage;
