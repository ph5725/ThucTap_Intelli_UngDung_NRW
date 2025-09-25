import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/global.css";

const Tabs: React.FC = () => {
  return (
    <div className="tabs">
      <NavLink 
        to="/meters" 
        className={({ isActive }) => isActive ? "tab active" : "tab"}
      >
        Bảng Đồng Hồ Tổng
      </NavLink>

      <NavLink 
        to="/meter-config" 
        className={({ isActive }) => isActive ? "tab active" : "tab"}
      >
        Cấu Hình Đồng Hồ Tổng
      </NavLink>
    </div>
  );
};

export default Tabs;