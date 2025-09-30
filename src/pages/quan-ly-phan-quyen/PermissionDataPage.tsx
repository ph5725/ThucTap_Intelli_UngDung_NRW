// src/pages/quan-ly-phan-quyen/PermissionDataPage.tsx
import React, { useState, useEffect } from "react";
import { FaShieldAlt } from "react-icons/fa";
import Tabs from "../../components/tabPQ/Tabs";
import { getList, updateData } from "../../services/crudService";
import { apiUrls } from "../../services/apiUrls";
import {
  PhanQuyenDuLieuResponse,
  UpdatePhanQuyenDuLieuRequest,
} from "../../types/phan-quyen/phan-quyen-du-lieu";

const PermissionDataPage: React.FC = () => {
  const [data, setData] = useState<PhanQuyenDuLieuResponse[]>([]);
  const [matrix, setMatrix] = useState<
    Record<number, { DuLieuNrwcongTy: boolean; DuLieuNrwdma: boolean }>
  >({});

  // Load danh sách phân quyền dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getList<PhanQuyenDuLieuResponse>(
          apiUrls.PhanQuyenDuLieu.list
        );

        setData(res);

        // map ra matrix boolean
        const temp: Record<
          number,
          { DuLieuNrwcongTy: boolean; DuLieuNrwdma: boolean }
        > = {};
        res.forEach((item) => {
          temp[item.Id] = {
            DuLieuNrwcongTy: item.DuLieuNrwcongTy === "1",
            DuLieuNrwdma: item.DuLieuNrwdma === "1",
          };
        });

        setMatrix(temp);
      } catch (err) {
        console.error("Lỗi load phân quyền dữ liệu:", err);
      }
    };

    fetchData();
  }, []);

  // Toggle check
  const toggleCheck = (id: number, field: "DuLieuNrwcongTy" | "DuLieuNrwdma") => {
    setMatrix((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id][field],
      },
    }));
  };

  // Áp dụng quyền
  const handleApply = async () => {
    try {
      for (const item of data) {
        const state = matrix[item.Id];
        const payload: UpdatePhanQuyenDuLieuRequest = {
          NhomNguoiDung: Number(item.Id), // hoặc dùng id nhóm thật sự
          DuLieuNrwcongTy: state.DuLieuNrwcongTy ? "1" : "0",
          DuLieuNrwdma: state.DuLieuNrwdma ? "1" : "0",
        };

        await updateData<
          UpdatePhanQuyenDuLieuRequest,
          PhanQuyenDuLieuResponse
        >(apiUrls.PhanQuyenDuLieu.update(item.Id), payload);
      }

      alert("Áp dụng quyền dữ liệu thành công!");
    } catch (err) {
      console.error("Lỗi áp dụng quyền dữ liệu:", err);
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

      {/* Nút Apply */}
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
              <th>Nhóm người dùng</th>
              <th>NrwCongTy</th>
              <th>NrwDma</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.Id}>
                <td>{item.NhomNguoiDung}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={matrix[item.Id]?.DuLieuNrwcongTy || false}
                    onChange={() => toggleCheck(item.Id, "DuLieuNrwcongTy")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={matrix[item.Id]?.DuLieuNrwdma || false}
                    onChange={() => toggleCheck(item.Id, "DuLieuNrwdma")}
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
