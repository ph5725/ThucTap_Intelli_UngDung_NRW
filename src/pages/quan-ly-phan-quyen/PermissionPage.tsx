// src/pages/quan-ly-phan-quyen/PermissionPage.tsx
import React, { useState, useEffect } from "react";
import { FaShieldAlt } from "react-icons/fa";
import "../../styles/phan-quyen/PermissionPage.css";
import Tabs from "../../components/tabPQ/Tabs";
import { getList, updateData } from "../../services/crudService";
import { apiUrls } from "../../services/apiUrls";
import {
  PhanQuyenTinhNangResponse,
  UpdatePhanQuyenTinhNangRequest,
} from "../../types/phan-quyen/phan-quyen-tinh-nang";
import { NhomNguoiDungResponse } from "../../types/nguoi-dung/nhom-nguoi-dung"; // 👈 import type nhóm người dùng

const actions = ["Add", "Edit", "View", "Delete"];

const PermissionPage: React.FC = () => {
  const [roles, setRoles] = useState<NhomNguoiDungResponse[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [matrix, setMatrix] = useState<Record<string, boolean[]>>({});
  const [selectedRole, setSelectedRole] = useState<string>("");

  // Lấy danh sách nhóm người dùng từ BE
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roleData = await getList<NhomNguoiDungResponse>(
          apiUrls.NhomNguoiDung.list
        );
        setRoles(roleData);

        if (roleData.length > 0) {
          setSelectedRole(roleData[0].nhomNguoiDung1); // default chọn nhóm đầu tiên
        }
      } catch (err) {
        console.error("Lỗi load nhóm người dùng:", err);
      }
    };

    fetchRoles();
  }, []);

  // Lấy phân quyền tính năng theo nhóm được chọn
  useEffect(() => {
    const fetchPermissions = async () => {
      if (!selectedRole) return;
      try {
        const data = await getList<PhanQuyenTinhNangResponse>(
          apiUrls.PhanQuyenTinhNang.list
        );

        // Các module (features)
        const exclude = [
          "id",
          "nhomNguoiDung",
          "ngayTao",
          "ngayCapNhat",
          "nguoiTao",
          "nguoiCapNhat",
          "nrwCongTy",
          "nrwDma",
        ];
        const featureNames = Object.keys(data[0]).filter(
          (k) => !exclude.includes(k)
        );
        setFeatures(featureNames);

        // Quyền theo nhóm
        const roleData = data.find((d) => d.nhomNguoiDung === selectedRole);
        if (roleData) {
          const temp: Record<string, boolean[]> = {};
          featureNames.forEach((f) => {
            const key = f as keyof PhanQuyenTinhNangResponse;
            const perms = roleData[key] as string | undefined;
            const permsArr = perms ? perms.split(",") : [];
            temp[f] = actions.map((a) => permsArr.includes(a));
          });
          setMatrix(temp);
        }
      } catch (err) {
        console.error("Lỗi load phân quyền:", err);
      }
    };

    fetchPermissions();
  }, [selectedRole]);

  // Toggle checkbox
  const toggleCheck = (feature: string, actionIdx: number) => {
    setMatrix((prev) => {
      const copy = { ...prev };
      copy[feature] = [...(copy[feature] || [false, false, false, false])];
      copy[feature][actionIdx] = !copy[feature][actionIdx];
      return copy;
    });
  };

  // Lưu quyền
  const handleApply = async () => {
    try {
      const role = roles.find((r) => r.nhomNguoiDung1 === selectedRole);
      if (!role) return;

      const payload: UpdatePhanQuyenTinhNangRequest = {
        nguoiCapNhat: "1", // TODO: lấy từ context/localStorage
        ngayCapNhat: new Date().toISOString(),
      };

      features.forEach((f) => {
        const selected = matrix[f]
          ?.map((val, idx) => (val ? actions[idx] : null))
          .filter(Boolean);
        payload[f] = selected?.join(",") || "";
      });

      await updateData<
        UpdatePhanQuyenTinhNangRequest,
        PhanQuyenTinhNangResponse
      >(apiUrls.PhanQuyenTinhNang.update(role.id), payload);

      alert("Áp dụng quyền thành công!");
    } catch (err) {
      console.error("Lỗi áp dụng quyền:", err);
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

      <Tabs />

      {/* Dropdown chọn nhóm */}
      <div className="filter-role">
        <label className="filter-label">Nhóm người dùng:</label>
        <div className="custom-dropdown">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r.id} value={r.nhomNguoiDung1}>
                {r.nhomNguoiDung1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Button Apply */}
      <div className="apply-btn-wrapper">
        <button className="btn apply" onClick={handleApply}>
          Áp Dụng
        </button>
      </div>

      {/* Bảng phân quyền */}
      <div className="permission-matrix">
        <table className="permission-matrix-table">
          <thead>
            <tr>
              <th>Module</th>
              {actions.map((a) => (
                <th key={a}>{a}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature}>
                <td>{feature}</td>
                {actions.map((action, aIdx) => (
                  <td key={action}>
                    <input
                      type="checkbox"
                      checked={matrix[feature]?.[aIdx] || false}
                      onChange={() => toggleCheck(feature, aIdx)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionPage;
