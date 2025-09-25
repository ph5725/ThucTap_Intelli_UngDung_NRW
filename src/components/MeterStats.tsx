// src/pages/qldh/MeterStats.tsx
import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, AreaChart, Area, Legend, ResponsiveContainer
} from "recharts";
// Define Meter type here if not available elsewhere
export interface Meter {
  code: string;
  volume: number;
  status: "Hoạt động" | "Cảnh báo" | "Lỗi";
}

interface Props {
  meters: Meter[];
}

const MeterStats: React.FC<Props> = ({ meters }) => {
  // KPI
  const kpis = [
    { title: "Tổng Số Đồng Hồ", value: meters.length, color: "#42A5F5" },
    { title: "Hoạt Động", value: meters.filter(m => m.status === "Hoạt động").length, color: "#66BB6A" },
    { title: "Cảnh Báo", value: meters.filter(m => m.status === "Cảnh báo").length, color: "#FFA726" },
    { title: "Lỗi", value: meters.filter(m => m.status === "Lỗi").length, color: "#EF5350" },
  ];

  // Pie chart
  const pieData = kpis.slice(1).map(k => ({
    name: k.title,
    value: k.value,
    color: k.color,
  }));

  // Bar chart
  const barData = meters.map(m => ({ name: m.code, value: m.volume }));

  // Area chart
  const areaData = meters.map((m, i) => ({
    name: m.code,
    value: meters.slice(0, i + 1).reduce((sum, x) => sum + x.volume, 0),
  }));

  return (
    <div>
      {/* KPI */}
      <div className="stats">
        {kpis.map((k, i) => (
          <div key={i} className="kpi-card" style={{ background: k.color }}>
            <h3>{k.title}</h3>
            <p>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="chart-container">
        <div className="chart-box">
          <h3>Trạng Thái Đồng Hồ</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} label>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Sản Lượng Theo Đồng Hồ</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#42A5F5" name="Sản lượng (m³)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-wide">
        <h3>Xu Hướng Tích Lũy Sản Lượng</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={areaData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#42A5F5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#42A5F5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="value" stroke="#42A5F5" fillOpacity={1} fill="url(#colorValue)" name="Tổng sản lượng (m³)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MeterStats;
