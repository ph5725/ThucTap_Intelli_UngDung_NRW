import React, {useState} from 'react';
import '../../styles/Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PieChart, Pie } from 'recharts';

const barData = [
  {name: 'DMA01', value: 12},
  {name: 'DMA02', value: 6},
  {name: 'DMA03', value: 3},
  {name: 'DMA04', value: 5},
  {name: 'DMA05', value: 8},
];

const pieData = [
  { name: 'High', value: 70 },
  { name: 'Medium', value: 20 },
  { name: 'Low', value: 10 },
];

const COLORS = ['#e74c3c','#f39c12','#2ecc71']; // red, orange, green (preserve donut colors)

const DashboardPage: React.FC = () => {
  const [mode, setMode] = useState<'company'|'dma'>('company');
  return (
    <div className="page dashboard-page">
      <div className="mode-toggle">
        <button className={mode==='company'?'active':''} onClick={()=>setMode('company')}>Công Ty</button>
        <button className={mode==='dma'?'active':''} onClick={()=>setMode('dma')}>DMA</button>
      </div>

      <div className="cards-row">
        <div className="card stat">
          <div className="label">Tổng lượng nước (tháng)</div>
          <div className="value">293,874.2 m³/ngày <span className="delta">+2.1%</span></div>
        </div>
        <div className="card stat">
          <div className="label">Tỷ lệ NRW trung bình</div>
          <div className="value">18.06% <span className="delta negative">-0.5%</span></div>
        </div>
        <div className="card stat">
          <div className="label">Tổng tiêu thụ</div>
          <div className="value">338,344.6 m³/ngày <span className="delta">+0.9%</span></div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Top 10 CTY thất thoát nước</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" >
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 3 === 0 ? '#e74c3c' : index % 3 === 1 ? '#f39c12' : '#2ecc71'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Tỷ lệ số lượng CTY theo kết quả NRW</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} innerRadius={60} outerRadius={90} dataKey="value">
                {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;