import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <input type="text" placeholder="Tìm kiếm" className="search-box" />
      </div>

      <div className="header-right">
        <svg width="20" height="20" fill="black" viewBox="0 0 24 24">
          <path d="M12 24c1.1 0 2-.9 2-2H10a2 
          2 0 002 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 
          1.5 0 10-3 0v.68C7.64 5.36 6 7.92 
          6 11v7l-2 2v1h16v-1l-2-2z" />
        </svg>

        <svg width="20" height="20" fill="black" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 
          4-4s-1.79-4-4-4-4 1.79-4 
          4 1.79 4 4 4zm0 2c-2.67 
          0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>

        <span className="welcome-text">Xin chào, Admin</span>
      </div>
    </header>
  );
};

export default Header;
