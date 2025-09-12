import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./styles/App.css";

const Dashboard = () => <h2>Dashboard</h2>;
const TinhNRW = () => <h2>Tính NRW</h2>;
const TaiKhoan = () => <h2>Quản Lý Tài Khoản</h2>;

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-container">
        <Header />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tinh-nrw" element={<TinhNRW />} />
            <Route path="/tai-khoan" element={<TaiKhoan />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
