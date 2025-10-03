// src/components/LogStats.tsx
import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import type { NhatKySuDungResponse } from "../types/nguoi-dung/nhat-ky-su-dung";
import "../styles/LogStats.css";

interface Props {
  logs: NhatKySuDungResponse[];
}

const LogStats: React.FC<Props> = ({ logs }) => {
  const [searchUser, setSearchUser] = useState("");
  const [searchAction, setSearchAction] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchUser = searchUser
        ? log.tenNguoiDung.toLowerCase().includes(searchUser.toLowerCase())
        : true;
      const matchAction = searchAction
        ? log.hanhDong.toLowerCase().includes(searchAction.toLowerCase())
        : true;
      const matchStatus = searchStatus ? log.tinhNang === searchStatus : true;
      const logDate = new Date(log.ngayTao);
      const matchStart = startDate ? logDate >= new Date(startDate) : true;
      const matchEnd = endDate ? logDate <= new Date(endDate) : true;
      return matchUser && matchAction && matchStatus && matchStart && matchEnd;
    });
  }, [logs, searchUser, searchAction, searchStatus, startDate, endDate]);

  const totalLogs = filteredLogs.length;
  const successCount = filteredLogs.filter((l) => l.tinhNang === "Thành công").length;
  const failCount = filteredLogs.filter((l) => l.tinhNang === "Thất bại").length;

  const pieData = [
    { name: "Thành công", value: successCount, color: "#28a745" },
    { name: "Thất bại", value: failCount, color: "#dc3545" },
  ];

  const barData = useMemo(() => {
    const grouped: Record<string, { date: string; count: number }> = {};
    filteredLogs.forEach((l) => {
      const date = l.ngayTao.split("T")[0];
      if (!grouped[date]) grouped[date] = { date, count: 0 };
      grouped[date].count++;
    });
    return Object.values(grouped);
  }, [filteredLogs]);

  return (
    <div className="log-stats-dashboard">
      {/* Bộ lọc nhỏ */}
      <div className="filter-row">
        <input
          type="text"
          placeholder="Tên Người Dùng"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="Hành Động"
          value={searchAction}
          onChange={(e) => setSearchAction(e.target.value)}
        />
        <select value={searchStatus} onChange={(e) => setSearchStatus(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="Thành công">Thành công</option>
          <option value="Thất bại">Thất bại</option>
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      {/* KPI */}
      <div className="kpi-row">
        <div className="kpi-card orange">Tổng Hành Động: {totalLogs}</div>
        <div className="kpi-card green">Thành Công: {successCount}</div>
        <div className="kpi-card red">Thất Bại: {failCount}</div>
      </div>

      {/* Charts */}
      <div className="chart-row">
        <div className="chart-box">
          <h4>Tỷ lệ Thành Công / Thất Bại</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {pieData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Hoạt động theo ngày</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#007bff" name="Số hành động" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LogStats;
