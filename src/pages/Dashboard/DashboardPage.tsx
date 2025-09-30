import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import "src/styles/Dashboard.css";
import { getCompanyStats, getDmaStats } from "src/config/Dashboard-api";

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"company" | "dma">("company");
  const [stats, setStats] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "company") {
          const data = await getCompanyStats();
          setStats(data.cards);      
          setBarData(data.barChart); 
          setPieData(data.pieChart); 
        } else {
          const data = await getDmaStats();
          setStats(data.cards);
          setBarData(data.barChart);
          setPieData(data.pieChart);
        }
      } catch (err) {
        console.error("Lỗi khi load dữ liệu:", err);
      }
    };
    fetchData();
  }, [activeTab]);

  return (
    <div className="dashboard-container">
      Tabs
      <div className="dashboard-tabs">
        <button
          className={activeTab === "company" ? "tab active" : "tab"}
          onClick={() => setActiveTab("company")}
        >
          Công Ty
        </button>
        <button
          className={activeTab === "dma" ? "tab active" : "tab"}
          onClick={() => setActiveTab("dma")}
        >
          DMA
        </button>
      </div>

      Cards
      <div className="stats-cards">
        {stats.map((s, index) => (
          <div key={index} className="card">
            <h4>{s.label}</h4>
            <div className="value-change">
              <p className="value">{s.value}</p>
              <span
                className={`change ${
                  s.change?.startsWith("+")
                    ? "positive"
                    : s.change?.startsWith("-")
                    ? "negative"
                    : "neutral"}`}>
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      Charts
      <div className="charts">
        <div className="chart-box">
          <h4>Top 10 {activeTab === "company" ? "CTY" : "DMA"} thất thoát nước thấp nhất kì mới nhất</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" interval={0} />
              <Tooltip />
              <Bar dataKey="value">
                {barData.map((entry, index) => {
                  const color =
                    entry.value <= 5 ? "#22c55e" : entry.value <= 9 ? "#f59e0b" : "#ef4444";
                  return <Cell key={index} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Tỷ lệ số lượng {activeTab === "company" ? "CTY" : "DMA"} theo kết quả NRW</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


/*import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from "recharts";
import "../../styles/Dashboard.css";


const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"company" | "dma">("company");

  const companyStats = [
    { label: "Tổng lượng nước (tháng)", value: "293,874.2 m³/ngày", change: "+2.1%" },
    { label: "Tỷ lệ NRW trung bình", value: "18.06%", change: "-0.5%" },
    { label: "Tổng tiêu thụ", value: "338,344.6 m³/ngày", change: "+0.9%" },
    { label: "Số lượng CTY tốt", value: "6", change: "=" },
  ];

  const companyBarData = [
    { name: "CTY09", value: 2 },
    { name: "CTY03", value: 3 },
    { name: "CTY04", value: 4 },
    { name: "CTY05", value: 5 },
    { name: "CTY06", value: 7 },
    { name: "CTY14", value: 9 },
    { name: "CTY07", value: 10 },
    { name: "CTY01", value: 12 },
    { name: "CTY11", value: 12 },
    { name: "CTY02", value: 6 },
  ];

  const companyPieData = [
    { name: "CTY tốt (0-8%)", value: 10, color: "#22c55e" },
    { name: "CTY trung bình (8-16%)", value: 20, color: "#f59e0b" },
    { name: "CTY cao (>16%)", value: 70, color: "#ef4444" },
  ];

  const dmaStats = [
    { label: "Tổng lượng nước (tháng)", value: "458,874.2 m³/ngày", change: "+2.1%" },
    { label: "Tỷ lệ NRW lớn nhất", value: "31.06%", change: "-0.3%" },
    { label: "Tổng tiêu thụ (tháng)", value: "338,344.6 m³/ngày", change: "+1.22%" },
    { label: "Số lượng DMA tốt", value: "6", change: "=" },
  ];

  const dmaBarData = [
    { name: "DMA09", value: 2 },
    { name: "DMA03", value: 3 },
    { name: "DMA04", value: 4 },
    { name: "DMA05", value: 5 },
    { name: "DMA06", value: 7 },
    { name: "DMA14", value: 9 },
    { name: "DMA07", value: 10 },
    { name: "DMA01", value: 12 },
    { name: "DMA11", value: 12 },
    { name: "DMA02", value: 6 },
  ];

  const dmaPieData = [
    { name: "DMA tốt (0-8%)", value: 10, color: "#22c55e" },
    { name: "DMA trung bình (8-16%)", value: 20, color: "#f59e0b" },
    { name: "DMA cao (>16%)", value: 70, color: "#ef4444" },
  ];

  const stats = activeTab === "company" ? companyStats : dmaStats;
  const barData = activeTab === "company" ? companyBarData : dmaBarData;
  const pieData = activeTab === "company" ? companyPieData : dmaPieData;

  return (
    <div className="dashboard-container">
      {/* Tabs *}
      <div className="dashboard-tabs">
        <button
          className={activeTab === "company" ? "tab active" : "tab"}
          onClick={() => setActiveTab("company")}
        >
          Công Ty
        </button>
        <button
          className={activeTab === "dma" ? "tab active" : "tab"}
          onClick={() => setActiveTab("dma")}
        >
          DMA
        </button>
      </div>

      {/* Cards *}
      <div className="stats-cards">
        {stats.map((s, index) => (
          <div key={index} className="card">
            <h4>{s.label}</h4>
            <div className="value-change">
              <p className="value">{s.value}</p>
              <span
                className={`change ${
                  s.change.startsWith("+")
                    ? "positive"
                    : s.change.startsWith("-")
                    ? "negative"
                    : "neutral"}`}>
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Charts *}
      <div className="charts">
        <div className="chart-box">
          <h4>Top 10 {activeTab === "company" ? "CTY" : "DMA"} thất thoát nước thấp nhất kì mới nhất</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" interval={0} />
              <Tooltip />
              <Bar dataKey="value">
                {barData.map((entry, index) => {
                  const color =
                    entry.value <= 5 ? "#22c55e" : entry.value <= 9 ? "#f59e0b" : "#ef4444";
                  return <Cell key={index} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Tỷ lệ số lượng {activeTab === "company" ? "CTY" : "DMA"} theo kết quả NRW</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;*/
