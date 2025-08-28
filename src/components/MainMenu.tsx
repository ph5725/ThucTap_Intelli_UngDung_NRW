import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface MainMenuProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

const menuItems = [
  { title: "Quản lý bản đồ", icon: <MapIcon fontSize="large" color="primary" />, page: "map" },
  { title: "Thống kê thất thoát", icon: <BarChartIcon fontSize="large" color="secondary" />, page: "stats" },
  { title: "Quản lý người dùng", icon: <PeopleIcon fontSize="large" color="success" />, page: "users" },
  { title: "Cài đặt hệ thống", icon: <SettingsIcon fontSize="large" />, page: "settings" },
];

const kpiData = [
  { title: "Điểm rò rỉ", value: 12, color: "#e53935" },
  { title: "Tỷ lệ thất thoát", value: "15%", color: "#fb8c00" },
  { title: "Cảm biến hoạt động", value: 48, color: "#43a047" },
  { title: "Cảnh báo", value: 5, color: "#1e88e5" }
];

const MainMenu: React.FC<MainMenuProps> = ({ onLogout, onNavigate }) => {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hệ thống giám sát thất thoát nước
          </Typography>

          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar sx={{ bgcolor: "orange", mr: 2 }}>A</Avatar>

          <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
            Đăng xuất
          </Button>
        </Toolbar>
      </AppBar>

      {/* KPI area - CSS Grid via Box */}
      <Box p={3}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          }}
        >
          {kpiData.map((kpi, idx) => (
            <Card key={idx} sx={{ bgcolor: kpi.color, color: "white", textAlign: "center", py: 2 }}>
              <Typography variant="h5" fontWeight="bold">
                {kpi.value}
              </Typography>
              <Typography variant="body1">{kpi.title}</Typography>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Menu area - CSS Grid */}
      <Box p={3}>
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          }}
        >
          {menuItems.map((menu, idx) => (
            <Card
              key={idx}
              onClick={() => onNavigate?.(menu.page)}
              sx={{
                textAlign: "center",
                p: 3,
                boxShadow: 3,
                cursor: "pointer",
                "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                transition: "0.15s",
              }}
            >
              <CardContent>
                <Box mb={2}>{menu.icon}</Box>
                <Typography variant="h6">{menu.title}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default MainMenu;
