// src/components/BillingDashboard.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "../styles/BillingDashboard.css";
import { BillingResponse } from "src/types/he-thong-billing/billing";

interface BillingDashboardProps {
  data: BillingResponse[];
}

const BillingDashboard: React.FC<BillingDashboardProps> = ({ data }) => {
  // ----- KPI -----
  const totalRecords = data.length;
  const currentConsumption = data[totalRecords - 1]?.sanLuongTieuThu || 0;

  const avgConsumption =
    totalRecords > 0
      ? data.reduce((sum, row) => sum + row.sanLuongTieuThu, 0) / totalRecords
      : 0;

  const abnormalCount = data.filter(
    (row) => row.sanLuongTieuThu === 0 || row.sanLuongTieuThu < 500
  ).length;

  // ----- Chart Line -----
  const lineData = data.map((row) => ({
    name: `${row.ky}/${row.nam}`,
    value: row.sanLuongTieuThu,
  }));

  // ----- Chart Pie -----
  const pieData = [
    { name: "Bình thường", value: totalRecords - abnormalCount, color: "#28a745" },
    { name: "Bất thường", value: abnormalCount, color: "#dc3545" },
  ];

  return (
    <div className="billing-dashboard">
      <div className="dashboard-grid">
        {/* Left side */}
        <div className="left-panel">
          <div className="chart-box">
            <h4>Sản lượng theo kỳ</h4>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#007bff" dot />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* KPI */}
          <div className="kpi-row">
            <div className="kpi-card orange">
              Kỳ Hiện Tại: <b>{currentConsumption}</b> m³
            </div>
            <div className="kpi-card brown">
              Trung Bình / kỳ: <b>{avgConsumption.toFixed(2)}</b> m³
            </div>
            <div className="kpi-card red">
              Kỳ Bất Thường: <b>{abnormalCount}</b> kỳ
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="right-panel">
          <h4>Phân bố trạng thái kỳ</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
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
      </div>
    </div>
  );
};

export default BillingDashboard;
