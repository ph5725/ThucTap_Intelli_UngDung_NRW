
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import AccountManagement from "./pages/quan-ly-tai-khoan/ql-tai-khoan/AccountManagement"; // trang quản lý tài khoản
import AddAccount from "./pages//quan-ly-tai-khoan/ql-tai-khoan/AddAccount";

import UserInfoPage from "./pages/quan-ly-tai-khoan/quan-ly-thong-tin-nguoi-dung/UserInfo"; // trang quản lý người dùng
import AddUserInfoModal from "./pages/quan-ly-tai-khoan/quan-ly-thong-tin-nguoi-dung/AddUserInfoModal"; 

import UserGroupPage from "./pages/quan-ly-tai-khoan/quan-ly-nhom-nguoi-dung/UserGroup"; // trang quản lý nhóm người dùng
import AddUserGroupPage from "./pages/quan-ly-tai-khoan/quan-ly-nhom-nguoi-dung/AddUserGroupPage"; 

import LoginForm from "./pages/dang-nhap-dang-xuat/LoginForm"; // trang đăng nhập

import PermissionPage from "./pages/quan-ly-phan-quyen/PermissionPage"; // trang quản lý phân quyền
import PermissionDataPage from "./pages/quan-ly-phan-quyen/PermissionDataPage";

import MeterManagementPage from "./pages/quan-ly-dht/qldh/MeterManagementPage"; // trang quản lý đồng hồ
import AddMeterPage from "./pages/quan-ly-dht/qldh/AddMeterPage";

import MeterConfigPage from "./pages/quan-ly-dht/qlchdht/MeterConfigPage";
import AddMeterConfigPage from "./pages/quan-ly-dht/qlchdht/AddMeterConfigPage";

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
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="add-account" element={<AddAccount />} />

            <Route path="user-info" element={<UserInfoPage />} />
            <Route path="add-user" element={<AddUserInfoModal />} />

            <Route path="user-group" element={<UserGroupPage />} />
            <Route path="add-group" element={<AddUserGroupPage />} />

            <Route path="permissions" element={<PermissionPage />} />
            <Route path="permissionsdatapage" element={<PermissionDataPage />} />

            <Route path="meters" element={<MeterManagementPage />} />
            <Route path="add-meter" element={<AddMeterPage />} />

            <Route path="meter-config" element={<MeterConfigPage />} />
            <Route path="add-meter-config" element={<AddMeterConfigPage />} />

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
