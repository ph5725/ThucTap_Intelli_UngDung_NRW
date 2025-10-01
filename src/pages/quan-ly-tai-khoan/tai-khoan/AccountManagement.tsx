// import { userService, type UserInfo } from "../../../services/nguoi-dung/userService";
// import { mockUsers } from "../../../config/mockData";
// import "../../../styles/qltk/AccountManagement.css";
import React, { useState, useEffect } from "react";
import { FaUser, FaEdit, FaTrash, FaEye, FaLock, FaFilter } from "react-icons/fa";
import EditAccountModal from "./EditAccountModal";
import DetailAccountModal from "./DetailAccountModal";
import "src/styles/global.css";
import "src/styles/tai-khoan/AccountManagement.css"
import Tabs from "src/components/tabQLTK/Tabs";
// text
import { TextForms } from "src/constants/text";
// service
import { updateData, deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import {NguoiDungResponse, UpdateCapPhepNguoiDungRequest} from "src/types/nguoi-dung/nguoi-dung";

interface AccountManagementProps {
  useMock?: boolean;
}

const AccountManagement: React.FC<AccountManagementProps> = ({ useMock = false }) => {
  const [accounts, setAccounts] = useState<NguoiDungResponse[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<NguoiDungResponse | null>(null);
  const [detailAccount, setDetailAccount] = useState<NguoiDungResponse | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({
    username: "",
    role: "Tất cả",
    status: "Tất cả",
  });


  // Lấy danh sách
useEffect(() => {
  const fetchAccounts = async () => {
    try {
      // data đã là mảng NguoiDungResponse[]
      const data = await getList<NguoiDungResponse>(apiUrls.NguoiDung.list);
      console.log("Raw API:", data);

      setAccounts(
        data.map(item => ({
          ...item,
          locked: item.capPhep ?? false,
        }))
      );
    } catch (error) {
      console.error("Lỗi tải danh sách tài khoản:", error);
    }
  };
  fetchAccounts();
}, []);

  // Cập nhật dữ liệu
  const handleSave = async (updated: NguoiDungResponse) => {
    if (useMock) {
      setAccounts(prev => prev.map(acc => (acc.id === updated.id ? updated : acc)));
    } else {
      try {
        setAccounts(prev => prev.map(acc => (acc.id === updated.id ? updated : acc)));
      } catch (error) {
        console.error("Lỗi cập nhật:", error);
        alert("Cập nhật thất bại!");
      }
    }
    setSelectedAccount(null);
  };

  // Xóa dữ liệu
  const handleDelete = async (id: number) => {
    const acc = accounts.find(a => a.id === id);
    if (!acc) return;
    if (!window.confirm(`${TextForms.thongBao.xacNhanXoa}"${acc.tenNguoiDung}"`)) return;

    if (useMock) {
      setAccounts(prev => prev.filter(a => a.id !== id));
      setMessage("Xóa tài khoản thành công!");
    } else {
      try {
        await deleteData(apiUrls.NguoiDung.delete(id));;
        setAccounts(prev => prev.filter(a => a.id !== id));
        setMessage(TextForms.thongBao.xoaThanhCong);
      } catch (error) {
        console.error(TextForms.thongBao.loiXoa, error);
        alert(TextForms.thongBao.loiXoa);
      }
    }

    setTimeout(() => setMessage(null), 3000);
  };

  // Khóa/mở khóa
  const handleToggleLock = async (id: number) => {
    const acc = accounts.find(a => a.id === id);
    if (!acc) return;

    if (useMock) {
      setAccounts(prev => prev.map(a => (a.id === id ? { ...a, locked: !a.capPhep } : a)));
      setMessage(acc.capPhep ? "Mở khóa thành công!" : "Khóa thành công!");
    } else {
      try {
        const updated = {  capPhep: !acc.capPhep };
         const res = await updateData<UpdateCapPhepNguoiDungRequest, NguoiDungResponse>(
          apiUrls.NguoiDung.update(acc.id!),
          updated
        );
        // setAccounts(prev => prev.map(a => (a.Id === id ? res.data : a)));
        setAccounts((prev) =>
          prev.map((item) =>
            item.id === acc.id ? { ...item, capPhep: !acc.capPhep } : item
          )
        );
        setMessage(res.capPhep ? "Khóa thành công!" : "Mở khóa thành công!");
      } catch (error) {
        console.error("Lỗi khóa/mở tài khoản:", error);
        alert("Thao tác thất bại!");
      }
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const filteredAccounts = accounts.filter(acc => {
    // const matchUsername = acc.TenNguoiDung.toLowerCase().includes(filterValues.username.toLowerCase());
    const matchUsername = (acc?.tenNguoiDung || "").toLowerCase().includes(filterValues.username.toLowerCase())
    const matchRole =
      filterValues.role === "Tất cả" || acc.vaiTro?.toLowerCase() === filterValues.role.toLowerCase();
    const matchStatus =
      filterValues.status === "Tất cả" ||
      (filterValues.status === "Đang hoạt động" && !acc.capPhep) ||
      (filterValues.status === "Bị khóa" && acc.capPhep);

    return matchUsername && matchRole && matchStatus;
  });

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAccounts.length / rowsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const applyFilter = () => {
    setCurrentPage(1);
    setShowFilter(false);
  };

  return (
    <div className="account-page">
      {message && <div className="toast">{message}</div>}

      <div className="page-header">
        <FaUser className="page-icon" />
        <h2 className="page-title">DANH SÁCH TÀI KHOẢN</h2>
      </div>

      <Tabs />

      <div className="stats">
        <div className="card purple">
          <span>Tổng số tài khoản</span>
          <h3>{accounts.length}</h3>
        </div>
        <div className="card green">
          <span>Đang hoạt động</span>
          <h3>{accounts.filter(a => !a.capPhep).length}</h3>
        </div>
        <div className="card red">
          <span>Khóa</span>
          <h3>{accounts.filter(a => a.capPhep).length}</h3>
        </div>
      </div>

      <div className="boder">
        <div className="toolbar">
          <div className="toolbar-left">
            <input
              type="text"
              placeholder="Tìm kiếm tài khoản..."
              value={filterValues.username}
              onChange={e => setFilterValues({ ...filterValues, username: e.target.value })}
            />
            <button className="btn filter" onClick={() => setShowFilter(true)}>
              <FaFilter style={{ marginRight: "6px", fontSize: 16 }} /> Lọc
            </button>
          </div>
        </div>

        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Tài Khoản</th>
              {/* <th>Mật Khẩu</th> */}
              <th>Vai Trò</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currentAccounts.map((acc, index) => (
              <tr key={acc.id ?? `row-${index}`} className={acc.capPhep ? "locked-row" : ""}>
                <td>{acc.id}</td>
                <td>{acc.tenNguoiDung}</td>
                <td>{acc.vaiTro}</td>
                <td className="actions">
                  <FaEdit title="Sửa" onClick={() => setSelectedAccount(acc)} />
                  <FaTrash title="Xóa" onClick={() => handleDelete(acc.id!)} />
                  <FaEye title="Chi Tiết" onClick={() => setDetailAccount(acc)} />
                  <FaLock title="Khóa/Mở" onClick={() => handleToggleLock(acc.id!)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>Trước</button>
        <span className="current-page">{currentPage}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Sau</button>
      </div>

      {showFilter && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="text-user"><h3>Bộ Lọc Tìm Kiếm</h3></div>

            <label>
              Vai trò:
              <select
                value={filterValues.role}
                onChange={e => setFilterValues({ ...filterValues, role: e.target.value })}
              >
                <option>Tất cả</option>
                <option>Admin</option>
                <option>User</option>
              </select>
            </label>

            <label>
              Trạng thái:
              <select
                value={filterValues.status}
                onChange={e => setFilterValues({ ...filterValues, status: e.target.value })}
              >
                <option>Tất cả</option>
                <option>Đang hoạt động</option>
                <option>Bị khóa</option>
              </select>
            </label>

            <div className="modal-actions">
              <button className="btn apply" onClick={applyFilter}>{TextForms.nut.apDung}</button>
              <button className="btn close" onClick={() => setShowFilter(false)}>{TextForms.nut.dong}</button>
            </div>
          </div>
        </div>
      )}

      {detailAccount && <DetailAccountModal account={detailAccount} onClose={() => setDetailAccount(null)} />}
      {selectedAccount && (
        <EditAccountModal
          account={selectedAccount}
          onClose={() => setSelectedAccount(null)}
          onSave={handleSave}
          useMock={useMock} // truyền xuống modal
        />
      )}
    </div>
  );
};

export default AccountManagement;
