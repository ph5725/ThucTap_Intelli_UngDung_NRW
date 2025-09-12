import React, { useState } from "react";
import { FaUser, FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import Tabs from "../../components/tabQLTK/Tabs";
import EditUserInfoModal from "./EditUserInfoModal";
import DetailUserInfoModal from "./DetailUserInfoModal";
import "../../styles/global.css";
import "../../styles/qltk/AccountManagement.css";
import { useNavigate } from "react-router-dom";

// Kiểu dữ liệu rút gọn hiển thị ở bảng
interface UserInfoList {
  id: number;
  code: string;
  username: string;
  fullname: string;
  email: string;
}

// Kiểu dữ liệu chi tiết (dùng cho modal)
interface UserInfoDetail extends UserInfoList {
  password: string;
  role: string;
  permissions: string[];
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

const UserInfoPage: React.FC = () => {
  const navigate = useNavigate();

  // dữ liệu mẫu
  const [users, _setUsers] = useState<UserInfoList[]>([
    { id: 1, code: "NV001", username: "admin", fullname: "Nguyễn Văn A", email: "a@gmail.com" },
    { id: 2, code: "NV002", username: "user1", fullname: "Trần Thị B", email: "b@gmail.com" },
    { id: 3, code: "NV003", username: "user2", fullname: "Lê Văn C", email: "c@gmail.com" },
    { id: 4, code: "NV004", username: "user3", fullname: "Phạm Thị D", email: "d@gmail.com" },
    { id: 5, code: "NV005", username: "user4", fullname: "Nguyễn Văn E", email: "e@gmail.com" },
    { id: 6, code: "NV006", username: "user5", fullname: "Lê Thị F", email: "f@gmail.com" },
    { id: 7, code: "NV007", username: "user6", fullname: "Trần Văn G", email: "g@gmail.com" },
  ]);

  const [selectedUser, setSelectedUser] = useState<UserInfoDetail | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserInfoDetail | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(users.length / pageSize);
  const paginatedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Hàm tạo chi tiết user
  const makeDetail = (user: UserInfoList): UserInfoDetail => ({
    ...user,
    password: "123456",
    role: "Người dùng",
    permissions: ["View", "Edit"],
    avatar: "",
    createdAt: "2025-01-01",
    updatedAt: "2025-02-01",
    createdBy: "system",
    updatedBy: "admin",
  });

  // Modal chỉnh sửa
  const handleEdit = (user: UserInfoList) => setSelectedUser(makeDetail(user));

  // Modal chi tiết
  const handleView = (user: UserInfoList) => setSelectedUserDetail(makeDetail(user));

  // Lưu chỉnh sửa
  const handleSave = (updated: UserInfoDetail) => {
    _setUsers((prev) =>
      prev.map((u) =>
        u.id === updated.id
          ? { id: updated.id, code: updated.code, username: updated.username, fullname: updated.fullname, email: updated.email }
          : u
      )
    );
    setSelectedUser(null);
    setMessage("Cập nhật thành công!");
    setTimeout(() => setMessage(null), 3000);
  };

  // Xóa user
  const handleDelete = (id: number) => {
    const u = users.find((x) => x.id === id);
    if (!u) return;
    if (window.confirm(`Bạn có chắc muốn xóa "${u.username}" không?`)) {
      _setUsers((prev) => prev.filter((x) => x.id !== id));
      setMessage("Xóa thành công!");
      setTimeout(() => setMessage(null), 3000);
    }
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
                  <FaEdit title="Sửa" onClick={() => handleEdit(u)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(u.id)} />
                  <FaEye title="Chi tiết" onClick={() => handleView(u)} />
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

      {/* Modal chỉnh sửa */}
      {selectedUser && (
        <EditUserInfoModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSave}
        />
      )}

      {/* Modal chi tiết */}
      {selectedUserDetail && (
        <DetailUserInfoModal
          user={selectedUserDetail}
          onClose={() => setSelectedUserDetail(null)}
        />
      )}
    </div>
  );
};

export default UserInfoPage;
