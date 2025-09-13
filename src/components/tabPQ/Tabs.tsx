import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/global.css";

const Tabs: React.FC = () => {
  return (
    <div className="tabs">
      <NavLink 
        to="/permissions" 
        className={({ isActive }) => isActive ? "tab active" : "tab"}
      >
        Phân Quyền Tính Năng
      </NavLink>

      <NavLink 
        to="/permissionsdatapage" 
        className={({ isActive }) => isActive ? "tab active" : "tab"}
      >
        Phân Quyền Dữ Liệu
      </NavLink>
    </div>
  );
};

export default Tabs;
