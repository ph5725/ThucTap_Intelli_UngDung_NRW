

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaEdit, FaTrash, FaEye, FaLock, FaPlus, FaFilter } from "react-icons/fa";
// import "../../styles/qltk/AccountManagement.css";
// import EditAccountModal from "./EditAccountModal"
// import DetailAccountModal from "./DetailAccountModal";
// import "../../styles/global.css";
// import Tabs from "../../components/tabQLTK/Tabs";

// interface Account {
//   id: number;
//   username: string;   // Tên tài khoản
//   password: string;   // Mật khẩu
//   role: string;       // Vai trò
//   locked?: boolean;   // Trạng thái khóa
// }

// const AccountManagement: React.FC = () => {
//   const navigate = useNavigate(); 
//   const [accounts, setAccounts] = useState<Account[]>([
//     { id: 1, username: "Quản Lý", password: "123456", role: "admin", locked: false },
//     { id: 2, username: "Người Dùng", password: "user@123", role: "user", locked: false },
//     { id: 3, username: "Người Dùng", password: "pass456", role: "user", locked: true },
//     { id: 4, username: "Người Dùng", password: "abc123", role: "user", locked: false },
//     { id: 5, username: "Người Dùng", password: "pass456@", role: "user", locked: true },
//     { id: 6, username: "Người Dùng", password: "abc123@", role: "user", locked: false },
//   ]);

//   // state cho phân trang
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   // state cho filter modal
//   const [showFilter, setShowFilter] = useState(false);

//   // state cho modal chỉnh sửa
//   const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

//   // state cho modal chi tiết
//   const [detailAccount, setDetailAccount] = useState<Account | null>(null);

//   // state cho message
//   const [message, setMessage] = useState<string | null>(null);

//   const indexOfLast = currentPage * rowsPerPage;
//   const indexOfFirst = indexOfLast - rowsPerPage;
//   const currentAccounts = accounts.slice(indexOfFirst, indexOfLast);

//   const totalPages = Math.ceil(accounts.length / rowsPerPage);

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handleSave = (updated: Account) => {
//     setAccounts((prev) =>
//       prev.map((acc) => (acc.id === updated.id ? updated : acc))
//     );
//     setSelectedAccount(null);
//   };

//   // ✅ Xóa
//   const handleDelete = (id: number) => {
//     const acc = accounts.find(a => a.id === id);
//     if (!acc) return;
//     const confirmDelete = window.confirm(`Bạn có chắc muốn xóa tài khoản "${acc.username}" không?`);
//     if (confirmDelete) {
//       setAccounts(prev => prev.filter(acc => acc.id !== id));
//       setMessage("Xóa tài khoản thành công!");
//       setTimeout(() => setMessage(null), 3000);
//     }
//   };

//   // ✅ Khóa / Mở khóa
//   const handleToggleLock = (id: number) => {
//     setAccounts(prev => {
//       const updated = prev.map(acc =>
//         acc.id === id ? { ...acc, locked: !acc.locked } : acc
//       );
//       const acc = prev.find(a => a.id === id);
//       if (acc) {
//         setMessage(acc.locked ? "Mở khóa tài khoản thành công!" : "Khóa tài khoản thành công!");
//         setTimeout(() => setMessage(null), 3000);
//       }
//       return updated;
//     });
//   };

//   return (
//     <div className="account-page">
//       {/* ✅ Thông báo */}
//       {message && <div className="toast">{message}</div>}

//       {/* Header */}
//       <div className="page-header">
//         <FaUser className="page-icon" />
//         <h2 className="page-title">DANH SÁCH TÀI KHOẢN</h2>
//       </div>

//       {/* Tabs Chuyển Trang */}
//       <Tabs />

//       {/* Stats */}
//       <div className="stats">
//         <div className="card purple">
//           <span>Tổng số tài khoản</span>
//           <h3>{accounts.length}</h3>
//         </div>
//         <div className="card green">
//           <span>Đang hoạt động</span>
//           <h3>{accounts.filter((a) => !a.locked).length}</h3>
//         </div>
//         <div className="card red">
//           <span>Khóa</span>
//           <h3>{accounts.filter((a) => a.locked).length}</h3>
//         </div>
//       </div>

//       <div className="boder">
//         {/* Toolbar */}
//         <div className="toolbar">
//           <div className="toolbar-left">
//             <input type="text" placeholder="Tìm kiếm tài khoản..." />
//             <button className="btn filter" onClick={() => setShowFilter(true)}>
//               <FaFilter style={{ marginRight: "6px", fontSize: 16 }} /> Lọc
//             </button>
//           </div>
          
//           <div className="toolbar-right">
//             <button className="btn add" onClick={() => navigate("/add-account")}>
//               <FaPlus style={{ marginRight: "6px" }} /> Thêm mới
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <table className="account-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Tên Tài Khoản</th>
//               <th>Mật Khẩu</th>
//               <th>Vai Trò</th>
//               <th>Thao Tác</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentAccounts.map((acc) => (
//               <tr key={acc.id} className={acc.locked ? "locked-row" : ""}>
//                 <td>{acc.id}</td>
//                 <td>{acc.username}</td>
//                 {/* ✅ luôn che mật khẩu */}
//                 <td>{"•".repeat(acc.password.length)}</td>
//                 <td>{acc.role}</td>
//                 <td className="actions">
//                   <FaEdit title="Sửa" onClick={() => setSelectedAccount(acc)} />
//                   <FaTrash title="Xóa" onClick={() => handleDelete(acc.id)} />
//                   <FaEye title="Chi Tiết" onClick={() => setDetailAccount(acc)} />
//                   <FaLock title="Khóa/Mở" onClick={() => handleToggleLock(acc.id)} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       {/* Pagination */}
//       <div className="pagination">
//         <button onClick={handlePrev} disabled={currentPage === 1}>
//           Trước
//         </button>

//         <span className="current-page">{currentPage}</span>

//         <button onClick={handleNext} disabled={currentPage === totalPages}>
//           Sau
//         </button>
//       </div>

//       {/* Filter Modal */}
//       {showFilter && (
//         <div className="modal-overlay">
//           <div className="modal">

//              <div className="text-user">
//               <h3>Bộ Lọc Tìm Kiếm</h3>
//              </div>

//             <label>
//               Tên tài khoản:
//               <input type="text" placeholder="Nhập tên tài khoản..." />
//             </label>
//             <label>
//               Vai trò:
//               <select>
//                 <option>Tất cả</option>
//                 <option>Admin</option>
//                 <option>User</option>
//               </select>
//             </label>
//             <label>
//               Trạng thái:
//               <select>
//                 <option>Tất cả</option>
//                 <option>Đang hoạt động</option>
//                 <option>Bị khóa</option>
//               </select>
//             </label>
//             <div className="modal-actions">
//               <button className="btn apply">Áp dụng</button>
//               <button className="btn close" onClick={() => setShowFilter(false)}>Đóng</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ✅ Modal Chi tiết */}
//       {detailAccount && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Chi tiết tài khoản</h3>
//             <p><b>ID:</b> {detailAccount.id}</p>
//             <p><b>Tên tài khoản:</b> {detailAccount.username}</p>
//             <p><b>Mật khẩu:</b> {detailAccount.password}</p>
//             <p><b>Vai trò:</b> {detailAccount.role}</p>
//             <p><b>Trạng thái:</b> {detailAccount.locked ? "Bị khóa" : "Đang hoạt động"}</p>
//             <div className="modal-actions">
//               <button className="btn close" onClick={() => setDetailAccount(null)}>Đóng</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Account Modal */}
//       {selectedAccount && (
//         <EditAccountModal
//           account={selectedAccount}
//           onClose={() => setSelectedAccount(null)}
//           onSave={handleSave}
//         />
//       )}

//       {detailAccount && (
//         <DetailAccountModal
//           account={detailAccount}
//           onClose={() => setDetailAccount(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default AccountManagement;
