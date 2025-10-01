import React from "react";
import { NavLink } from "react-router-dom";
import "src/styles/global.css";

const Tabs: React.FC = () => {
  return (
    <div className="tabs">
      <NavLink 
        to="/accounts" 
        className={({ isActive }) => isActive ? "tab active" : "tab"}
      >
        Tài Khoản Người Dùng
      </NavLink>

      <NavLink 
        to="/user-info" 
        className={({ isActive }) => isActive ? "tab active" : "tab"}
      >
        Thông Tin Người Dùng
      </NavLink>

      <NavLink 
        to="/user-group" 
        className={({ isActive }) => isActive ? "tab active" : "tab"}
      >
        Nhóm Người Dùng
      </NavLink>
    </div>
  );
};

export default Tabs;
