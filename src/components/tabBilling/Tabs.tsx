import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/global.css";

const Tabs: React.FC = () => {
  return (
    <div className="tabs">
      <NavLink 
        to="/billing" 
        className={({ isActive }) => isActive ? "tab active" : "tab"}
      >
        Billing
      </NavLink>

      <NavLink 
        to="/billing-reading" 
        className={({ isActive }) => isActive ? "tab active" : "tab"}
      >
        Số Ngày Đọc Billing
      </NavLink>

      <NavLink 
        to="/billing-reading-detail" 
        className={({ isActive }) => isActive ? "tab active" : "tab"}
      >
        Số Ngày Đọc Billing Chi Tiết
      </NavLink>

    </div>
  );
};

export default Tabs;
