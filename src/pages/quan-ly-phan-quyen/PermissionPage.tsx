// src/pages/quan-ly-phan-quyen/PermissionFeaturePage.tsx
import React, { useState, useEffect } from "react";
import { FaShieldAlt } from "react-icons/fa";
import "../../styles/role/PermissionPage.css";
import Tabs from "../../components/tabPQ/Tabs";
import {
  permissionFeatureService,
  type Role,
  type Feature,
  type FeaturePermissionPayload,
} from "../../services/phan-quyen/permissionFeatureService";

const actions = ["view", "create", "update", "delete"];

const PermissionFeaturePage: React.FC = () => {
  // Roles cố định
  const roles: Role[] = [
    { id: 1, name: "Quản Lý" },
    { id: 2, name: "Tổ Trưởng" },
    { id: 3, name: "Caretaker" },
    { id: 4, name: "Người Dùng" },
  ];

  const [features, setFeatures] = useState<Feature[]>([]);
  const [matrix, setMatrix] = useState<boolean[][][]>([]);

  // Load feature từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const featuresRes = await permissionFeatureService.getFeatures();
        setFeatures(featuresRes.data);

        // Khởi tạo ma trận [feature][action][role] với false
        const tempMatrix = featuresRes.data.map(() =>
          actions.map(() => roles.map(() => false))
        );

        // Nếu backend trả quyền hiện tại, gán vào ma trận
        const permissionsRes = await permissionFeatureService.getPermissions();
        permissionsRes.data.forEach((p) => {
          const fIdx = featuresRes.data.findIndex((f) => f.name === p.feature);
          const rIdx = roles.findIndex((r) => r.id === p.roleId);
          if (fIdx !== -1 && rIdx !== -1) {
            tempMatrix[fIdx][0][rIdx] = p.permissions.view;
            tempMatrix[fIdx][1][rIdx] = p.permissions.create;
            tempMatrix[fIdx][2][rIdx] = p.permissions.update;
            tempMatrix[fIdx][3][rIdx] = p.permissions.delete;
          }
        });

        setMatrix(tempMatrix);
      } catch (error) {
        console.error("Lỗi load features/permissions:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle checkbox
  const toggleCheck = (fIdx: number, aIdx: number, rIdx: number) => {
    setMatrix((prev) => {
      const copy = prev.map((f) => f.map((a) => [...a]));
      copy[fIdx][aIdx][rIdx] = !copy[fIdx][aIdx][rIdx];
      return copy;
    });
  };

  // Áp dụng quyền
  const handleApply = async () => {
    const payload: FeaturePermissionPayload[] = features
      .map((feature, fIdx) =>
        roles.map((role, rIdx) => ({
          roleId: role.id,
          feature: feature.name,
          permissions: {
            view: matrix[fIdx][0][rIdx],
            create: matrix[fIdx][1][rIdx],
            update: matrix[fIdx][2][rIdx],
            delete: matrix[fIdx][3][rIdx],
          },
        }))
      )
      .flat();

    try {
      await permissionFeatureService.applyPermissions(payload);
      alert("Áp dụng quyền tính năng thành công!");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi áp dụng quyền!");
    }
  };

  return (
    <div className="permission-page">
      {/* Header */}
      <div className="page-header">
        <FaShieldAlt className="page-icon" />
        <h2 className="page-title">PHÂN QUYỀN TÍNH NĂNG</h2>
      </div>

      {/* Tabs */}
      <Tabs />

      {/* Button Áp Dụng */}
      <div className="apply-btn-wrapper">
        <button className="btn apply" onClick={handleApply}>
          Áp Dụng
        </button>
      </div>

      {/* Bảng ma trận */}
      <div className="permission-matrix">
        <table className="permission-matrix-table">
          <thead>
            <tr>
              <th>Tính năng / Hành động</th>
              {roles.map((r) => (
                <th key={r.id}>{r.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, fIdx) =>
              actions.map((action, aIdx) => (
                <tr key={`${fIdx}-${aIdx}`}>
                  <td>
                    {feature.name} - <b>{action}</b>
                  </td>
                  {roles.map((role, rIdx) => (
                    <td key={role.id}>
                      <input
                        type="checkbox"
                        checked={matrix[fIdx]?.[aIdx]?.[rIdx] || false}
                        onChange={() => toggleCheck(fIdx, aIdx, rIdx)}
                      />
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionFeaturePage;
