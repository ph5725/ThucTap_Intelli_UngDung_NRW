// src/pages/quan-ly-phan-quyen/PermissionDataPage.tsx
import React, { useState, useEffect } from "react";
import { FaShieldAlt } from "react-icons/fa";
import Tabs from "../../components/tabPQ/Tabs";
import {
  permissionDataService,
  type DataItem,
  type PermissionPayload,
  type Role,
} from "../../services/permissionDataService";

const actions = ["view", "create", "update", "delete"];

const PermissionDataPage: React.FC = () => {
  // Roles cố định
  const [roles] = useState<Role[]>([
    { id: 1, name: "Quản Lý" },
    { id: 2, name: "Tổ Trưởng" },
    { id: 3, name: "Caretaker" },
    { id: 4, name: "Người Dùng" },
  ]);

  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [matrix, setMatrix] = useState<boolean[][][]>([]);

  // Load dữ liệu và quyền hiện tại
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataRes, permissionsRes] = await Promise.all([
          permissionDataService.getDataItems(),
          permissionDataService.getPermissions(),
        ]);

        setDataItems(dataRes.data);

        // Khởi tạo ma trận [data][action][role]
        const tempMatrix = dataRes.data.map(() =>
          actions.map(() => roles.map(() => false))
        );

        // Gán quyền hiện tại từ backend
        permissionsRes.data.forEach((p) => {
          const dIdx = dataRes.data.findIndex((d) => d.id === p.dataId);
          const rIdx = roles.findIndex((r) => r.id === p.roleId);
          if (dIdx !== -1 && rIdx !== -1) {
            tempMatrix[dIdx][0][rIdx] = p.permissions.view;
            tempMatrix[dIdx][1][rIdx] = p.permissions.create;
            tempMatrix[dIdx][2][rIdx] = p.permissions.update;
            tempMatrix[dIdx][3][rIdx] = p.permissions.delete;
          }
        });

        setMatrix(tempMatrix);
      } catch (error) {
        console.error("Lỗi load data/permissions:", error);
      }
    };

    fetchData();
  }, [roles]);

  // Toggle checkbox
  const toggleCheck = (dIdx: number, aIdx: number, rIdx: number) => {
    setMatrix((prev) => {
      const copy = prev.map((d) => d.map((a) => [...a]));
      copy[dIdx][aIdx][rIdx] = !copy[dIdx][aIdx][rIdx];
      return copy;
    });
  };

  // Áp dụng quyền
  const handleApply = async () => {
    const payload: PermissionPayload[] = dataItems
      .map((item, dIdx) =>
        roles.map((role, rIdx) => ({
          roleId: role.id,
          dataId: item.id,
          permissions: {
            view: matrix[dIdx][0][rIdx],
            create: matrix[dIdx][1][rIdx],
            update: matrix[dIdx][2][rIdx],
            delete: matrix[dIdx][3][rIdx],
          },
        }))
      )
      .flat();

    try {
      await permissionDataService.applyPermissions(payload);
      alert("Áp dụng quyền dữ liệu thành công!");
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
        <h2 className="page-title">PHÂN QUYỀN DỮ LIỆU</h2>
      </div>

      <Tabs />

      {/* Nút Áp Dụng */}
      <div className="apply-btn-wrapper">
        <button className="btn apply" onClick={handleApply}>
          Áp Dụng
        </button>
      </div>

      {/* Ma trận phân quyền */}
      <div className="permission-matrix">
        <table className="permission-matrix-table">
          <thead>
            <tr>
              <th>Dữ liệu / Hành động</th>
              {roles.map((r) => (
                <th key={r.id}>{r.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataItems.map((item, dIdx) =>
              actions.map((action, aIdx) => (
                <tr key={`${dIdx}-${aIdx}`}>
                  <td>
                    {item.name} - <b>{action}</b>
                  </td>
                  {roles.map((role, rIdx) => (
                    <td key={role.id}>
                      <input
                        type="checkbox"
                        checked={matrix[dIdx]?.[aIdx]?.[rIdx] || false}
                        onChange={() => toggleCheck(dIdx, aIdx, rIdx)}
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

export default PermissionDataPage;
