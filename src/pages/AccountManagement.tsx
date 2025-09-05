import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEdit, FaTrash, FaSync, FaLock, FaPlus } from "react-icons/fa";
import "../styles/AccountManagement.css";


interface Account {
  id: number;
  username: string;
  fullname: string;
  email: string;
  phone: string;
}

const AccountManagement: React.FC = () => {
    const navigate = useNavigate(); 
  const [accounts] = useState<Account[]>([
    { id: 1, username: "admin", fullname: "Nguyễn Văn A", email: "a@gmail.com", phone: "0123456789" },
    { id: 2, username: "user1", fullname: "Trần Thị B", email: "b@gmail.com", phone: "0987654321" },
    { id: 3, username: "user2", fullname: "Lê Văn C", email: "c@gmail.com", phone: "0112233445" },
    { id: 4, username: "user3", fullname: "Phạm Thị D", email: "d@gmail.com", phone: "0223344556" },
    { id: 5, username: "user4", fullname: "Hoàng Văn E", email: "e@gmail.com", phone: "0334455667" },
    { id: 6, username: "user5", fullname: "Vũ Thị F", email: "f@gmail.com", phone: "0445566778" },
    { id: 7, username: "user6", fullname: "Đỗ Văn G", email: "g@gmail.com", phone: "0556677889" },
    { id: 8, username: "user7", fullname: "Ngô Thị H", email: "h@gmail.com", phone: "0667788990" },
    { id: 9, username: "user8", fullname: "Bùi Văn I", email: "i@gmail.com", phone: "0778899001" },
    { id: 10, username: "user9", fullname: "Phan Thị J", email: "j@gmail.com", phone: "0889900112" },
  ]);

  // state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // state cho filter modal
  const [showFilter, setShowFilter] = useState(false);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentAccounts = accounts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(accounts.length / rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="account-page">
      {/* Header */}
      <div className="page-header">
        <FaUser className="page-icon" />
        <h2>DANH SÁCH TÀI KHOẢN</h2>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="card purple">
          <span>Tổng số tài khoản</span>
          <h3>{accounts.length}</h3>
        </div>
        <div className="card green">
          <span>Đang hoạt động</span>
          <h3>7</h3>
        </div>
        <div className="card red">
          <span>Khóa</span>
          <h3>3</h3>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-right">
          <input type="text" placeholder="Tìm kiếm tài khoản..." />
          <button className="btn filter" onClick={() => setShowFilter(true)}>Filter</button>
        </div>
        
        <div className="toolbar-right">
          <button className="btn add" onClick={() => navigate("/add-account")}>
            <FaPlus style={{ marginRight: "6px" }} /> Thêm mới
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="account-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Tài Khoản</th>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th>Số Điện Thoại</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {currentAccounts.map((acc) => (
            <tr key={acc.id}>
              <td>{acc.id}</td>
              <td>{acc.username}</td>
              <td>{acc.fullname}</td>
              <td>{acc.email}</td>
              <td>{acc.phone}</td>
              <td className="actions">
                <FaEdit title="Sửa" />
                <FaTrash title="Xóa" />
                <FaSync title="Đặt lại" />
                <FaLock title="Khóa/Mở" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Bộ lọc tài khoản</h3>
            <label>
              Tên tài khoản:
              <input type="text" placeholder="Nhập tên tài khoản..." />
            </label>
            <label>
              Email:
              <input type="text" placeholder="Nhập email..." />
            </label>
            <label>
              Trạng thái:
              <select>
                <option>Tất cả</option>
                <option>Đang hoạt động</option>
                <option>Bị khóa</option>
              </select>
            </label>
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

export default AccountManagement;
