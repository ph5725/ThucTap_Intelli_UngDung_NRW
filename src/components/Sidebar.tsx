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
import "../styles/Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/src/assets/logo.png" alt="Logo" className="sidebar-logo-img" />
        <h2>Giám Sát Thất Thoát Nước_QTV</h2>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
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
  );
};

export default Sidebar;
