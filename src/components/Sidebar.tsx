import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalculator,
  FaUser,
  FaShieldAlt,
  FaClock,
  FaFileInvoice,
  FaBook,
  FaClipboardList
} from "react-icons/fa";
import "src/styles/Sidebar.css";
import { AppConfig } from "src/config/app-config";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/src/assets/logo1.png" alt="Logo" className="sidebar-logo-img" />
        <h2 style={{ padding: 0, margin: 0 }}>{AppConfig.appShortName}</h2>
      </div>

      <hr className="hr" />

      {/* <<<<<<< HEAD */}
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaTachometerAlt className="icon" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/nrw" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaCalculator className="icon" /> Tính NRW
          </NavLink>
        </li>
        <li>
          <NavLink to="/account" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUser className="icon" /> Quản Lý Tài Khoản
          </NavLink>
        </li>
        <li>
          <NavLink to="/permission" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaShieldAlt className="icon" /> Phân Quyền
          </NavLink>
        </li>
        <li>
          <NavLink to="/donghotong" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaClock className="icon" /> Đồng Hồ Tổng
          </NavLink>
        </li>
        <li>
          <NavLink to="/billing" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaFileInvoice className="icon" /> Hệ Thống Billing
          </NavLink>
        </li>
        <li>
          <NavLink to="/report" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaBook className="icon" /> Báo Cáo
          </NavLink>
        </li>
        <li>
          <NavLink to="/log" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaClipboardList className="icon" /> Nhật Ký
          </NavLink>
        </li>
      </ul>
    </div>

    // =======
    //       <nav className="menu">
    //         <ul>
    //           <li>
    //             <NavLink to="/dashboard" className="menu-link">
    //               <FaTachometerAlt className="icon" />
    //               {!collapsed && <span>Dashboard</span>}
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink to="/accounts" className="menu-link">
    //               <FaUser className="icon" />
    //               {!collapsed && <span>Quản Lý Tài Khoản</span>}
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink to="/permissions" className="menu-link">
    //               <FaShieldAlt className="icon" />
    //               {!collapsed && <span>Phân Quyền</span>}
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink to="/meters" className="menu-link">
    //               <FaWater className="icon" />
    //               {!collapsed && <span>Đồng Hồ Tổng</span>}
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink to="/billing" className="menu-link">
    //               <FaFileAlt className="icon" />
    //               {!collapsed && <span>Sổ Đọc</span>}
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink to="/user-log" className="menu-link">
    //               <FaRegSquare className="icon" />
    //               {!collapsed && <span>Nhật Ký</span>}
    //             </NavLink>
    //           </li>
    //         </ul>
    //       </nav>
    //     </aside>
    // >>>>>>> ab8ce48b3aab12d5d4e035de69307e02a21c9021
  );
};

export default Sidebar;