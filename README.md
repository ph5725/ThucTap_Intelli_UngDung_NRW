# PHÁT TRIỂN ỨNG DỤNG WEB GIS TÍNH TOÁN VÀ GIÁM SÁT THẤT THOÁT NƯỚC

### Tên sản phẩm: Ứng dụng tính toán thất thoát nước (NRW)

### Chức năng chính:

* Tính toán và giám sát tỷ lệ thất thoát nước cấp công ty và DMA
* Quản lý dữ liệu sản lượng từ đồng hồ tổng
* Dashboard trực quan để so sánh, phân tích và theo dõi tình hình thất thoát nước
* Báo cáo chi tiết tình hình thất thoát theo kỳ và theo quận
* Quản lý tài khoản, phân quyền và nhật ký hoạt động người dùng

---

### Giới thiệu

Ứng dụng web GIS dùng để tính toán và giám sát tỷ lệ thất thoát nước (Non‑Revenue Water - NRW) ở mức công ty và mức DMA (District Metered Area). Hệ thống cung cấp công cụ quản lý dữ liệu đo đếm, tính toán, báo cáo và dashboard trực quan để hỗ trợ công tác vận hành và phân tích.

---

### Chức năng

| Chức năng                                           | Mô tả                                                                                                                                    |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Đăng nhập                                           | Đăng nhập hệ thống với tên người dùng và mật khẩu                                                                                        |
| Đăng xuất                                           | Đăng xuất khỏi hệ thống                                                                                                                  |
| Quản lý tài khoản                                   | Quản trị viên có thể thêm, chỉnh sửa, đổi mật khẩu, kích hoạt hoặc cấm tài khoản trong hệ thống                                          |
| Quản lý phân quyền                                  | Quản trị viên có thể thiết lập phân quyền người sử dụng trong hệ thống                                                                   |
| Tính toán thất thoát nước cấp công ty               | Tính toán và lưu trữ kết quả tính thất thoát nước ở cấp công ty. Dữ liệu tính toán được lấy tự động từ hệ thống liên quan hoặc nhập tay. |
| Tính toán thất thoát nước cấp DMA                   | Tính toán và lưu trữ kết quả tính thất thoát nước ở cấp DMA. Dữ liệu tính toán được lấy tự động từ hệ thống liên quan hoặc nhập tay.     |
| Quản lý dữ liệu sản lượng ngày của các đồng hồ tổng | - Hiển thị danh sách đồng hồ tổng và sản lượng theo ngày (ngày do người dùng chọn)                                                       |

* Cho phép chỉnh sửa dữ liệu sản lượng
* Đánh dấu các dữ liệu sản lượng ngày khi dữ liệu đó bị lỗi | | Dashboard giám sát tỷ lệ thất thoát nước cấp công ty | - Giám sát lượng nước vào, lượng nước tiêu thụ, lượng nước thất thoát, tỷ lệ thất thoát theo kỳ người dùng chọn
* So sánh sản lượng cùng kỳ, tỷ lệ thất thoát cùng kỳ (kỳ do người dùng chọn) | | Dashboard giám sát tỷ lệ thất thoát nước cấp quận | - Giám sát lượng nước vào, lượng nước tiêu thụ, lượng nước thất thoát, tỷ lệ thất thoát theo kỳ và quận do người dùng chọn
* So sánh sản lượng cùng kỳ, tỷ lệ thất thoát cùng kỳ (kỳ do người dùng chọn) theo quận
* So sánh sản lượng, tỷ lệ thất thoát giữa các quận theo kỳ | | Quản lý số ngày đọc số hệ thống Billing | Cho phép người dùng tạo, chỉnh sửa số ngày đọc số Billing cho các kỳ | | Báo cáo | - Báo cáo tình hình thất thoát nước cấp công ty (theo mẫu)
* Báo cáo tình hình thất thoát nước cấp quận (theo mẫu) | | Nhật ký người dùng | - Ghi nhận thời gian và các hoạt động mà người dùng thực hiện trong hệ thống
* Quản trị viên có thể tra cứu dữ liệu hoạt động của người dùng |

---

### Nhóm thực hiện

| Vai trò   | Họ và tên                    | Công cụ / Ghi chú                                                      |
| --------- | ---------------------------- | ---------------------------------------------------------------------- |
| Front-end | Nguyễn Hoằng Kim             | Visual Studio Code, React, CSS, Node, TypeScript                       |
| Front-end | Nguyễn Mai Hữu Nhân          | Visual Studio Code, React, CSS, Node, TypeScript                       |
| Back-end  | Phùng Cẩm Hồng - nhóm trưởng | Visual Studio Community 2022, C#, .NET, ASP.NET Core, Postman, Swagger |
| Database  | Nguyễn Võ Hoài               | SQL Server                                                             |
| Database  | Đặng Hoàng Khải              | SQL Server                                                             |
| Tester    | Trần Trung Dũng              | -                                                                      |

---

## Công nghệ sử dụng

### Front-end

* Framework: React
* Ngôn ngữ: TypeScript
* Các công cụ hỗ trợ: Visual Studio Code, CSS, Node.js

### Back-end

* Framework: ASP.NET Core
* Ngôn ngữ: C#
* IDE: Visual Studio Community 2022
* API Testing: Postman, Swagger

### Database

* Hệ quản trị cơ sở dữ liệu: SQL Server

---

## Hướng dẫn cài đặt và chạy dự án

### Database

1. Clone code với lệnh sau:

```bash
git clone -b database --single-branch https://github.com/ph5725/ThucTap_Intelli_UngDung_NRW.git database
```

2. Vào thư mục chứa code:

```bash
cd database
```

3. Chạy file script trong Microsoft SQL Server:

* db_nrw_schema.sql: file script chứa cấu trúc cơ sở dữ liệu
* db_nrw_data.sql: file script chứa dữ liệu cơ sở dữ liệu
* db_nrw_data_schema.sql: file script chứa cấu trúc và dữ liệu cơ sở dữ liệu

### Back-end

1. Clone code với lệnh sau:

```bash
git clone -b phunghong --single-branch https://github.com/ph5725/ThucTap_Intelli_UngDung_NRW.git backend
```

2. Vào thư mục chứa code:

```bash
cd backend
```

3. Mở project bằng Visual Studio 2022.
4. Kiểm tra .NET SDK bằng lệnh:

```bash
dotnet --list-sdks
```

(Trong môi trường hiện tại dự án đang chạy với SDK phiên bản: `9.0.305` — kiểm tra và dùng phiên bản phù hợp trên máy của bạn.)

5. Tải tất cả gói cần thiết:

```bash
dotnet restore
```

6. Chỉnh sửa chuỗi kết nối `ConnectServer` trong file `appsettings.json` để trỏ tới database của bạn.

---

### Front-end

1. Clone code với lệnh sau:

```bash
git clone -b phunghong --single-branch https://github.com/ph5725/ThucTap_Intelli_UngDung_NRW.git frontend
```

2. Vào thư mục chứa code:

```bash
cd frontend
```

3. Kiểm tra phiên bản Node và npm:

```bash
node -v    # Ví dụ: v20.x
npm -v     # Ví dụ: v10.x
```

4. Cài đặt các dependencies:

```bash
npm install
```

5. Chạy ứng dụng frontend (ví dụ sử dụng npm):

```bash
npm run dev    # hoặc npm start tùy cấu hình dự án
```

---

## Ghi chú

* Đảm bảo cấu hình chuỗi kết nối database đúng trong `appsettings.json` (back-end) và các biến môi trường cần thiết cho front-end nếu có.
* Kiểm tra tài liệu nội bộ hoặc README trong từng thư mục `backend`/`frontend` để biết thêm chi tiết cấu hình môi trường (PORT, API base URL, v.v.).

---

*Tài liệu này là bản tóm tắt và mô tả dự án
