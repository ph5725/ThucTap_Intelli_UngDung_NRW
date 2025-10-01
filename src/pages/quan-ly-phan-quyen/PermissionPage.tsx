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

const actions = ["Add", "Edit", "View", "Delete"];

const PermissionPage: React.FC = () => {
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [matrix, setMatrix] = useState<
    Record<string, Record<string, boolean[]>>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getList<PhanQuyenTinhNangResponse>(
          apiUrls.PhanQuyenTinhNang.list
        );

        // Lấy danh sách role kèm Id
        const roleList = data.map((item) => ({
          id: item.Id,
          name: String(item.NhomNguoiDung),
        }));
        setRoles(roleList);

        // Loại bỏ field không phải là tính năng
        const exclude = [
          "Id",
          "NhomNguoiDung",
          "NgayTao",
          "NgayCapNhat",
          "NguoiTao",
          "NguoiCapNhat",
          "NrwCongTy", // dành cho phân quyền dữ liệu
          "NrwDma", // dành cho phân quyền dữ liệu
        ];

        const featureNames = Object.keys(data[0]).filter(
          (k) => !exclude.includes(k)
        );
        setFeatures(featureNames);

        // Tạo ma trận quyền
        const temp: Record<string, Record<string, boolean[]>> = {};
        data.forEach((item) => {
          const role = String(item.NhomNguoiDung);
          temp[role] = {};
          featureNames.forEach((f) => {   
            const perms = (item as unknown as Record<string, unknown>)[f] as string | undefined;
            const permsArr = perms ? perms.split(",") : [];
            temp[role][f] = actions.map((a) => permsArr.includes(a));
          });
        });
        setMatrix(temp);
      } catch (err) {
        console.error("Lỗi load phân quyền:", err);
      }
    };

    fetchData();
  }, []);

  // Toggle checkbox
  const toggleCheck = (role: string, feature: string, actionIdx: number) => {
    setMatrix((prev) => {
      const copy = { ...prev };
      copy[role] = { ...copy[role] };
      copy[role][feature] = [...copy[role][feature]];
      copy[role][feature][actionIdx] = !copy[role][feature][actionIdx];
      return copy;
    });
  };

  // Áp dụng quyền
  const handleApply = async () => {
    try {
      for (const r of roles) {
        const payload: UpdatePhanQuyenTinhNangRequest = {};
        features.forEach((f) => {
          const selected = matrix[r.name][f]
            .map((val, idx) => (val ? actions[idx] : null))
            .filter(Boolean);
          payload[f] = selected.join(",");
        });

        // Gọi API update với Id thực tế
        await updateData<
          UpdatePhanQuyenTinhNangRequest,
          PhanQuyenTinhNangResponse
        >(apiUrls.PhanQuyenTinhNang.update(r.id), payload);
      }

      alert("Áp dụng quyền tính năng thành công!");
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
              <th>Tính năng / Hành động</th>
              {roles.map((r) => (
                <th key={r.id}>{r.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) =>
              actions.map((action, aIdx) => (
                <tr key={`${feature}-${action}`}>
                  <td>
                    {feature} - <b>{action}</b>
                  </td>
                  {roles.map((r) => (
                    <td key={r.id}>
                      <input
                        type="checkbox"
                        checked={matrix[r.name]?.[feature]?.[aIdx] || false}
                        onChange={() => toggleCheck(r.name, feature, aIdx)}
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

export default PermissionPage;
