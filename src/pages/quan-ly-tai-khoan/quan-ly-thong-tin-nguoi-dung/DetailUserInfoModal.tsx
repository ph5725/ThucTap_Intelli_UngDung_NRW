import React from "react";
import "../../../styles/global.css";
import "../../../styles/qltk/EditAccountModal.css"; 
import "../../../styles/qlttnd/EditUserInfoModal.css"; 
import "../../../styles/qlttnd/DetailUserInfoModal.css";
import { NguoiDungResponse } from "src/types/nguoi-dung/nguoi-dung";

// export interface NguoiDungResponse {
//   Id: number;
//   Ma: string;
//   Ten: string;
//   TenNguoiDung: string;
//   Email: string;
//   VaiTro?: string;
//   CapPhep: boolean;
//   AnhDaiDien?: string;
//   NgayTao: string;
//   NgayCapNhat?: string;
//   NguoiTao?: string;
//   NguoiCapNhat?: string;
// }

interface DetailUserInfoModalProps {
  user: NguoiDungResponse;
  onClose: () => void;
}

const DetailUserInfoModal: React.FC<DetailUserInfoModalProps> = ({ user, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal detail-user">
        <div className="text-user">
          <h3>Chi tiết người dùng</h3>
        </div>

        {/* container cuộn */}
        <div className="modal-content-scroll">
          <label>Mã</label>
          <input value={user.Ma} readOnly />

          <label>Tên tài khoản</label>
          <input value={user.Ten} readOnly />

          <label>Tên người dùng</label>
          <input value={user.TenNguoiDung} readOnly />

          <label>Email</label>
          <input type="email" value={user.Email} readOnly />

          <label>Vai trò</label>
          <input type="text" value={user.VaiTro} readOnly />

          <label>Cấp phép</label>
          <input type="text" value={user.CapPhep ? "Có" : "Không"} readOnly />

          <label>Ảnh đại diện</label>
          {user.AnhDaiDien ? (
            <img
              src={user.AnhDaiDien}
              alt="Avatar"
              style={{ width: "80px", marginTop: "10px", borderRadius: "8px" }}
            />
          ) : (
            <p>Chưa có</p>
          )}

          <label>Ngày tạo</label>
          <input type="text" value={user.NgayTao} readOnly />

          <label>Ngày cập nhật</label>
          <input type="text" value={user.NgayCapNhat} readOnly />

          <label>Người tạo</label>
          <input type="text" value={user.NguoiTao} readOnly />

          <label>Người cập nhật</label>
          <input type="text" value={user.NguoiCapNhat} readOnly />
        </div>

        {/* nút đóng */}
        <div className="modal-actions">
          <button className="btn close" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default DetailUserInfoModal;
