// import React, { useState } from "react";
// import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import "../../styles/LoginForm.css";

// import { login, LoginPayload } from "src/services/authService";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";

// // interface LoginFormProps {
// //   onLogin: (username: string, password: string) => void;
// // }

// // const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
// const LoginForm: React.FC = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // state cho hiện/ẩn mật khẩu
//   const [errorMessage, setErrorMessage] = useState("");

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   onLogin(username, password);
//   // };

//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>();

//   // const onSubmit = async (data: LoginPayload) => {
//   //   try {
//   //     const response = await login(data); // Gọi hàm login
//   //     console.log("Đăng nhập thành công:", response);

//   //     // Sau khi login thành công, điều hướng đến dashboard
//   //     navigate("/accounts");
//   //   } catch (error: any) {
//   //     alert(error.message || "Đăng nhập thất bại");
//   //   }
//   // };

//   const onSubmit = async (data: LoginPayload) => {
//     try {
//       const response = await login(data); // Gọi hàm login
//       console.log("Đăng nhập thành công:", response);

//       navigate("/accounts");
//     } catch (error: any) {
//       const msg = error.response?.data?.message || "Đăng nhập thất bại";
//       setErrorMessage(msg);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <FaLock className="lock-icon" />
//         <h2>Đăng nhập</h2>
//         {/* <form onSubmit={handleSubmit}> */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <input
//             type="text"
//             placeholder="Tên người dùng"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           {/* Password input + eye icon */}
//           <div className="password-container">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Mật khẩu"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <span
//               className="password-toggle"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <div className="remember-me">
//             <input
//               type="checkbox"
//               id="remember"
//               checked={rememberMe}
//               onChange={(e) => setRememberMe(e.target.checked)}
//             />
//             <label htmlFor="remember">Lưu người dùng</label>
//           </div>
//           <button type="submit">Đăng nhập</button>

//           {errorMessage && (
//             <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
//           )}
//         </form>
//         <p className="signup-text">Bạn đã có tài khoản chưa?</p>
//       </div>
//       <div className="welcome-text">CHÀO MỪNG ĐẾN VỚI GIS</div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/LoginForm.css";

import { login } from "src/services/authService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DangNhapRequest } from "src/types/authTypes";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { handleSubmit } = useForm<DangNhapRequest>();

  const onSubmit = async () => {
    try {
      const payload: DangNhapRequest = {
        TenNguoiDung: username,
        MatKhau: password
      };
      const response = await login(payload);
      console.log("Đăng nhập thành công:", response);

      navigate("/accounts");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Đăng nhập thất bại";
      setErrorMessage(msg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <FaLock className="lock-icon" />
        <h2>Đăng nhập</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Tên người dùng"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Lưu người dùng</label>
          </div>

          <button type="submit">Đăng nhập</button>

          {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )}
        </form>
        <p className="signup-text">Bạn đã có tài khoản chưa?</p>
      </div>
      <div className="welcome-text">CHÀO MỪNG ĐẾN VỚI GIS</div>
    </div>
  );
};

export default LoginForm;
