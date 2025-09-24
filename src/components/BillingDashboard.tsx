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
import { FaDownload } from "react-icons/fa";
import Papa from "papaparse"; // 👉 thêm thư viện để export CSV
import "../styles/BillingDashboard.css";

interface BillingRecord {
  id: number;
  consumption: number; // sản lượng tiêu thụ (số ngày / m³)
  period: string;      // kỳ (ví dụ: T1, T2, ...)
  year: number;        // năm
  objectCode: string;  // mã đối tượng
}

interface BillingDashboardProps {
  data: BillingRecord[];
}

const BillingDashboard: React.FC<BillingDashboardProps> = ({ data }) => {
  // ----- KPI -----
  const totalRecords = data.length;
  const currentConsumption = data[totalRecords - 1]?.consumption || 0;

  const avgConsumption =
    totalRecords > 0
      ? data.reduce((sum, row) => sum + row.consumption, 0) / totalRecords
      : 0;

  const abnormalCount = data.filter(
    (row) => row.consumption === 0 || row.consumption < 500
  ).length;

  // ----- Chart Line -----
  const lineData = data.map((row) => ({
    name: row.period,
    value: row.consumption,
  }));

  // ----- Chart Pie -----
  const pieData = [
    { name: "Bình thường", value: totalRecords - abnormalCount, color: "#28a745" },
    { name: "Bất thường", value: abnormalCount, color: "#dc3545" },
  ];

  // 👉 Hàm xuất CSV
  const handleExport = () => {
    if (data.length === 0) {
      alert("Không có dữ liệu để xuất!");
      return;
    }

    // Dùng papaparse để convert JSON -> CSV
    const csv = Papa.unparse(data);

    // Tạo file blob
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Tạo link tải về
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "billing-data.csv");
    document.body.appendChild(link);
    link.click();

    // Dọn dẹp
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="billing-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <button className="btn-export" onClick={handleExport}>
          <FaDownload style={{ marginRight: 6 }} /> Xuất CSV
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Left side */}
        <div className="left-panel">
          <div className="chart-box">
            <h4>Số ngày đọc theo tháng</h4>
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
              Kỳ Hiện Tại: <b>{currentConsumption}</b> ngày
            </div>
            <div className="kpi-card brown">
              Trung Bình / kỳ: <b>{avgConsumption.toFixed(2)}</b> ngày
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
