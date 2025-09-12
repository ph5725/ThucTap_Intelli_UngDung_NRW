import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaShieldAlt,
  FaWater,
  FaFileAlt,
  FaRegSquare,
  FaBars
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>Giám Sát Nước_QTV</h2>}
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
      </div>

      <nav className="menu">
        <ul>
          <li>
            <NavLink to="/dashboard" className="menu-link">
              <FaTachometerAlt className="icon" />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/accounts" className="menu-link">
              <FaUser className="icon" />
              {!collapsed && <span>Quản Lý Tài Khoản</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/permissions" className="menu-link">
              <FaShieldAlt className="icon" />
              {!collapsed && <span>Phân Quyền</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/meters" className="menu-link">
              <FaWater className="icon" />
              {!collapsed && <span>Đồng Hồ Tổng</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/reading" className="menu-link">
              <FaFileAlt className="icon" />
              {!collapsed && <span>Sổ Đọc</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/logs" className="menu-link">
              <FaRegSquare className="icon" />
              {!collapsed && <span>Nhật Ký</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
