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
import type { UserLog } from "../pages/nhat-ky-nguoi-dung/nhatky/UserLogPage";
import "../styles/LogStats.css";

interface Props {
  logs: UserLog[];
}

// Hàm lọc logs tách riêng
const filterLogs = (
  logs: UserLog[],
  filters: {
    user?: string;
    action?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }
) => {
  return logs.filter((log) => {
    const matchUser = filters.user
      ? log.user.toLowerCase().includes(filters.user.toLowerCase())
      : true;

    const matchAction = filters.action
      ? log.action.toLowerCase().includes(filters.action.toLowerCase())
      : true;

    const matchStatus = filters.status ? log.status === filters.status : true;

    const logDate = new Date(log.timestamp);

    const matchStart = filters.startDate
      ? logDate >= new Date(filters.startDate)
      : true;

    const matchEnd = filters.endDate
      ? logDate <= new Date(filters.endDate)
      : true;

    return matchUser && matchAction && matchStatus && matchStart && matchEnd;
  });
};

const LogStats: React.FC<Props> = ({ logs }) => {
  const [searchUser, setSearchUser] = useState("");
  const [searchAction, setSearchAction] = useState("");
  const [searchStatus, setSearchStatus] = useState(""); // "Thành công", "Thất bại", ""
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredLogs = useMemo(
    () =>
      filterLogs(logs, {
        user: searchUser,
        action: searchAction,
        status: searchStatus,
        startDate,
        endDate,
      }),
    [logs, searchUser, searchAction, searchStatus, startDate, endDate]
  );

  const totalLogs = filteredLogs.length;
  const successCount = filteredLogs.filter((l) => l.status === "Thành công").length;
  const failCount = filteredLogs.filter((l) => l.status === "Thất bại").length;

  const pieData = [
    { name: "Thành công", value: successCount, color: "#28a745" },
    { name: "Thất bại", value: failCount, color: "#dc3545" },
  ];

  const barData = useMemo(() => {
    const grouped: Record<string, { date: string; count: number }> = {};
    filteredLogs.forEach((l) => {
      const date = l.timestamp.split(" ")[0];
      if (!grouped[date]) grouped[date] = { date, count: 0 };
      grouped[date].count++;
    });
    return Object.values(grouped);
  }, [filteredLogs]);

  const handleExportCSV = () => {
    const header = "ID,Người dùng,Hành động,Trạng thái,Thời gian\n";
    const rows = filteredLogs
      .map((l) => `${l.id},${l.user},${l.action},${l.status},${l.timestamp}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "user_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="log-stats-dashboard">
      {/* Hàng input + filter */}
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
        <select
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Thành công">Thành công</option>
          <option value="Thất bại">Thất bại</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="btn-export" onClick={handleExportCSV}>
          Xuất CSV
        </button>
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
