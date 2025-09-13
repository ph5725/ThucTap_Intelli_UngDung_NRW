
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import AccountManagement from "./pages/qltk/AccountManagement"; // trang quản lý tài khoản
import AddAccount from "./pages/qltk/AddAccount";

import UserInfoPage from "./pages/qlttnd/UserInfo"; // trang quản lý người dùng
import AddUserInfoModal from "./pages/qlttnd/AddUserInfoModal"; 

import UserGroupPage from "./pages/qlnnd/UserGroup"; // trang quản lý nhóm người dùng
import AddUserGroupPage from "./pages/qlnnd/AddUserGroupPage"; 
import DashboardPage from "./pages/Dashboard/DashboardPage"; // trang dashboard
import LoginForm from "./pages/LoginForm"; // trang đăng nhập
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Trang Login */}
        <Route path="/" element={<LoginWrapper />} />

        {/* Layout chính sau khi login */}
        <Route
          path="/*"
          element={
            <MainLayout />
          }
        />
      </Routes>
    </Router>
  );
};

//Layout chính: Sidebar + Header cố định
const MainLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="add-account" element={<AddAccount />} />

            <Route path="user-info" element={<UserInfoPage />} />
            <Route path="add-user" element={<AddUserInfoModal />} />

            <Route path="user-group" element={<UserGroupPage />} />
            <Route path="add-group" element={<AddUserGroupPage />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

// Xử lý login
const LoginWrapper: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "123456") {
      navigate("/accounts"); // Sau login vào trang quản lý
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default App;
