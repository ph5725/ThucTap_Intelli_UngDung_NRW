import React, { useState } from "react";
import LoginForm from "./Page/LoginForm";
import MainMenu from "./components/MainMenu";
import { Box, Typography, Button } from "@mui/material";

type PageKey = "home" | "map" | "stats" | "users" | "settings";

const MapPage: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5">Bản đồ GIS (placeholder)</Typography>
    <Box sx={{ mt: 2, height: 400, bgcolor: "#eef3ff", borderRadius: 2 }} />
  </Box>
);

const StatsPage: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5">Thống kê thất thoát (placeholder)</Typography>
  </Box>
);

const UsersPage: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5">Quản lý người dùng (placeholder)</Typography>
  </Box>
);

const SettingsPage: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5">Cài đặt hệ thống (placeholder)</Typography>
  </Box>
);

const HomePage: React.FC<{ onNavigate: (p: PageKey) => void }> = ({ onNavigate }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>Chào mừng đến trang quản trị</Typography>
    <Button variant="contained" onClick={() => onNavigate("map")} sx={{ mr: 2 }}>Mở bản đồ</Button>
    <Button variant="outlined" onClick={() => onNavigate("stats")}>Xem thống kê</Button>
  </Box>
);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageKey>("home");

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "123456") {
      setIsLoggedIn(true);
      setCurrentPage("home");
    } else {
      alert("❌ Sai tài khoản hoặc mật khẩu!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const handleNavigate = (page: string) => {
    // accept page keys defined above
    const p = page as PageKey;
    setCurrentPage(p);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // logged in: show header/menu and chosen page
  return (
    <div>
      <MainMenu onLogout={handleLogout} onNavigate={handleNavigate} />
      <Box sx={{ p: 3 }}>
        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "map" && <MapPage />}
        {currentPage === "stats" && <StatsPage />}
        {currentPage === "users" && <UsersPage />}
        {currentPage === "settings" && <SettingsPage />}
      </Box>
    </div>
  );
};

export default App;
