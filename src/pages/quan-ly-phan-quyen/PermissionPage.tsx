import React, { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import "../../styles/role/PermissionPage.css";
import Tabs from "../../components/tabPQ/Tabs"; // import component Tabs

interface Role {
  id: number;
  name: string;
}

const PermissionPage: React.FC = () => {
  const [activeTab] = useState<"feature" | "data">("feature");

  const roles: Role[] = [
    { id: 1, name: "Quản Lý" },
    { id: 2, name: "Tổ Trưởng" },
    { id: 3, name: "Caretaker" },
    { id: 4, name: "Người Dùng" },
  ];

  const featurePermissions = [
    "Xem báo cáo",
    "Quản lý tài khoản",
    "Phân quyền",
    "Cấu hình hệ thống",
    "Quản lý dự án",
    "Xuất dữ liệu"
  ];

  const dataPermissions = [
    "Khách hàng",
    "Dự án",
    "Nhân viên",
    "Báo cáo",
    "Hợp đồng",
    "Sản phẩm"
  ];

  const [featureMatrix, setFeatureMatrix] = useState(
    featurePermissions.map(() => roles.map(() => false))
  );
  const [dataMatrix, setDataMatrix] = useState(
    dataPermissions.map(() => roles.map(() => false))
  );

  const toggleFeature = (row: number, col: number) => {
    setFeatureMatrix(prev => {
      const copy = prev.map(r => [...r]);
      copy[row][col] = !copy[row][col];
      return copy;
    });
  };

  const toggleData = (row: number, col: number) => {
    setDataMatrix(prev => {
      const copy = prev.map(r => [...r]);
      copy[row][col] = !copy[row][col];
      return copy;
    });
  };

  const handleApply = () => {
    console.log("Feature permissions:", featureMatrix);
    console.log("Data permissions:", dataMatrix);
    alert("Áp dụng quyền thành công!");
  };

  return (
    <div className="permission-page">
      {/* Header */}
      <div className="page-header">
        <FaShieldAlt className="page-icon" />
        <h2 className="page-title">PHÂN QUYỀN TÍNH NĂNG</h2>
      </div>

      {/* Tabs component */}
      <Tabs/>

      {/* Button Áp Dụng */}
      <div className="apply-btn-wrapper">
        <button className="btn apply" onClick={handleApply}>Áp Dụng</button>
      </div>

      {/* Ma trận phân quyền */}
      <div className="tab">
        {(activeTab === "feature" ? featurePermissions : dataPermissions).length > 0 && (
          <div className="permission-matrix">
            <table className="permission-matrix-table">
              <thead>
                <tr>
                  <th>{activeTab === "feature" ? "Tính năng / Vai trò" : "Dữ liệu / Vai trò"}</th>
                  {roles.map(r => <th key={r.id}>{r.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {(activeTab === "feature" ? featurePermissions : dataPermissions).map((item, rowIdx) => (
                  <tr key={rowIdx}>
                    <td className="permission-name">{item}</td>
                    {roles.map((role, colIdx) => (
                      <td key={role.id}>
                        <input
                          type="checkbox"
                          checked={activeTab === "feature" ? featureMatrix[rowIdx][colIdx] : dataMatrix[rowIdx][colIdx]}
                          onChange={() => activeTab === "feature" ? toggleFeature(rowIdx, colIdx) : toggleData(rowIdx, colIdx)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionPage;
