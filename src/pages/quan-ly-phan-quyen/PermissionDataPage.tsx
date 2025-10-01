import React, { useEffect, useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import Tabs from "../../components/tabPQ/Tabs";
import {
  PhanQuyenDuLieuResponse,
  UpdatePhanQuyenDuLieuRequest,
} from "../../types/phan-quyen/phan-quyen-du-lieu";
import { NhomNguoiDungResponse } from "../../types/nguoi-dung/nhom-nguoi-dung";
import { getList, updateData } from "../../services/crudService";
import { apiUrls } from "../../services/apiUrls";

const PermissionDataPage: React.FC = () => {
  const [roles, setRoles] = useState<NhomNguoiDungResponse[]>([]);
  const [, setData] = useState<PhanQuyenDuLieuResponse[]>([]);
  const [matrix, setMatrix] = useState<
    Record<number, { DuLieuNRWCongTy: boolean; DuLieuNRWDMA: boolean }>
  >({});

  // Load nhóm người dùng
  useEffect(() => {
    getList<NhomNguoiDungResponse>(apiUrls.NhomNguoiDung.list)
      .then(setRoles)
      .catch((err) => console.error("Lỗi load nhóm người dùng:", err));
  }, []);

  // Load phân quyền dữ liệu
  useEffect(() => {
    getList<PhanQuyenDuLieuResponse>(apiUrls.PhanQuyenDuLieu.list)
      .then((res) => {
        setData(res);

        const temp: Record<
          number,
          { DuLieuNRWCongTy: boolean; DuLieuNRWDMA: boolean }
        > = {};

        // Khởi tạo default
        roles.forEach((r) => {
          temp[r.id] = { DuLieuNRWCongTy: false, DuLieuNRWDMA: false };
        });

        // Đổ dữ liệu từ API
        res.forEach((item) => {
          if (!temp[item.nhomNguoiDungId]) {
            temp[item.nhomNguoiDungId] = {
              DuLieuNRWCongTy: false,
              DuLieuNRWDMA: false,
            };
          }
          if (item.tenBang === "DuLieuNRWCongTy") {
            temp[item.nhomNguoiDungId].DuLieuNRWCongTy = item.dieuKien === "1";
          }
          if (item.tenBang === "DuLieuNRWDMA") {
            temp[item.nhomNguoiDungId].DuLieuNRWDMA = item.dieuKien === "1";
          }
        });

        setMatrix(temp);
      })
      .catch((err) => console.error("Lỗi load phân quyền dữ liệu:", err));
  }, [roles]);

  const toggleCheck = (
    roleId: number,
    field: "DuLieuNRWCongTy" | "DuLieuNRWDMA"
  ) => {
    setMatrix((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [field]: !prev[roleId][field],
      },
    }));
  };

  const handleApply = async () => {
    try {
      for (const role of roles) {
        const state = matrix[role.id];

        const updates: UpdatePhanQuyenDuLieuRequest[] = [
          {
            nhomNguoiDungId: role.id,
            tenBang: "DuLieuNRWCongTy",
            dieuKien: state.DuLieuNRWCongTy ? "1" : "0",
          },
          {
            nhomNguoiDungId: role.id,
            tenBang: "DuLieuNRWDMA",
            dieuKien: state.DuLieuNRWDMA ? "1" : "0",
          },
        ];

        for (const payload of updates) {
          await updateData<
            UpdatePhanQuyenDuLieuRequest,
            PhanQuyenDuLieuResponse
          >(apiUrls.PhanQuyenDuLieu.update(role.id), payload);
        }
      }
      alert("Áp dụng quyền dữ liệu thành công!");
    } catch (err) {
      console.error("Lỗi áp dụng quyền:", err);
      alert("Có lỗi xảy ra khi áp dụng quyền!");
    }
  };

  return (
    <div className="permission-page">
      <div className="page-header">
        <FaShieldAlt className="page-icon" />
        <h2 className="page-title">PHÂN QUYỀN DỮ LIỆU</h2>
      </div>

      <Tabs />

      <div className="apply-btn-wrapper">
        <button className="btn apply" onClick={handleApply}>
          Áp Dụng
        </button>
      </div>

      <div className="permission-matrix">
        <table className="permission-matrix-table">
          <thead>
            <tr>
              <th>Nhóm người dùng</th>
              <th>NRW Công Ty</th>
              <th>NRW DMA</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.nhomNguoiDung1}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={matrix[role.id]?.DuLieuNRWCongTy || false}
                    onChange={() => toggleCheck(role.id, "DuLieuNRWCongTy")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={matrix[role.id]?.DuLieuNRWDMA || false}
                    onChange={() => toggleCheck(role.id, "DuLieuNRWDMA")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionDataPage;
