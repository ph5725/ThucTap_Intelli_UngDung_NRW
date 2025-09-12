import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaUserCircle, FaCog, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate(); 
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      {/* Thanh tìm kiếm bên trái */}
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm..." />
      </div>

      {/* Phần bên phải */}
      <div className="header-right" ref={menuRef}>
        <FaBell className="icon" />

        {/* Icon user */}
        <div className="user-menu">
          <FaUserCircle
            className="icon user-icon"
            onClick={() => setOpen(!open)}
          />
          {open && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <FaCog /> <span>Cài đặt</span>
              </div>
              <div className="dropdown-item">
                <FaInfoCircle /> <span>Thông tin tài khoản</span>
              </div>
              <div className="dropdown-item logout" onClick={() => navigate("/")}>
                <FaSignOutAlt /> <span>Đăng xuất</span>
              </div>
            </div>
          )}
        </div>

        <span className="greeting">Xin chào, Admin</span>
      </div>
    </header>
  );
};

export default Header;
