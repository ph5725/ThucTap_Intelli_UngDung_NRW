import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/src/assets/logo.png" alt="Logo" className="sidebar-logo-img" />
        <h2>Giám Sát Thất Thoát Nước_QTV</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" className="menu-link">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/tinh-nrw" className="menu-link">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M21 7H3V5h18v2zm0 4H3v2h18v-2zm0 6H3v2h18v-2z" />
            </svg>
            Tính NRW
          </NavLink>
        </li>
        <li>
          <NavLink to="/quan-ly-tai-khoan" className="menu-link">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 
                0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            Quản Lý Tài Khoản
          </NavLink>
        </li>
        <li>
          <NavLink to="/phan-quyen" className="menu-link">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 11.93 5.16-1.19 9-6.38 9-11.93V5l-9-4z" />
            </svg>
            Phân Quyền
          </NavLink>
        </li>
        <li>
          <NavLink to="/dong-ho-tong" className="menu-link">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M12 4a8 8 0 100 16 8 8 0 000-16zM4 12a8 8 0 0116 0H4z" />
            </svg>
            Đồng Hồ Tổng
          </NavLink>
        </li>
        <li>
          <NavLink to="/so-doc" className="menu-link">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M6 2h12v2H6V2zm0 4h12v2H6V6zm0 4h12v10H6V10z" />
            </svg>
            Sổ Đọc
          </NavLink>
        </li>
        <li>
          <NavLink to="/bao-cao" className="menu-link">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M4 4h16v2H4V4zm0 4h16v10H4V8z" />
            </svg>
            Báo Cáo
          </NavLink>
        </li>
        <li>
          <NavLink to="/nhat-ky" className="menu-link">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6V6z" />
            </svg>
            Nhật Ký
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
