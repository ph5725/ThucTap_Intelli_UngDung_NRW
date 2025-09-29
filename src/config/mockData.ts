// src/config/mockData.ts
import type { UserInfo } from "../services/nguoi-dung/userService";
import type { UserGroup } from "../services/nguoi-dung/userGroupService";
import type { MeterConfig } from "../services/dong-ho-tong/meterConfigService";
import type { Meter } from "../services/dong-ho-tong/meterService";
import type { Billing } from "../services/he-thong-billing/billingService";
import type { BillingReading } from "../services/he-thong-billing/billingReadingService";
import type { BillingReadingDetail } from "../services/he-thong-billing/billingReadingDetailService";
import type { UserLog } from "../services/nguoi-dung/userLogService";

const today = new Date().toISOString().slice(0, 10);

// ✅ Dữ liệu giả cho UserInfoPage
export const mockUsers: UserInfo[] = [
  {
    id: 1,
    code: "U001",
    username: "user1",
    fullname: "Nguyễn Văn A",
    password: "123456",
    email: "user1@example.com",
    role: "user",
    permissions: ["read", "write"],
    avatar: "",
    locked: false,
    metadata: {
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
      createdBy: "Admin",
      updatedBy: "Admin",
    },
  },
  {
    id: 2,
    code: "U002",
    username: "user2",
    fullname: "Trần Thị B",
    password: "123456",
    email: "user2@example.com",
    role: "admin",
    permissions: ["read", "write", "delete"],
    avatar: "",
    locked: false,
    metadata: {
      createdAt: "2025-01-02",
      updatedAt: "2025-01-02",
      createdBy: "Admin",
      updatedBy: "Admin",
    },
  },
  // Thêm user khác nếu cần...
];



// ✅ Dữ liệu giả chung cho các page khác (nếu cần)
export const mockUserGroups: UserGroup[] = [
  {
    id: 1,
    groupName: "Quản Trị Viên",
    members: "Nguyễn Văn A, Trần Thị B",
    createdAt: today,
    updatedAt: today,
    note: "Nhóm quản trị hệ thống",
  },
  {
    id: 2,
    groupName: "Nhân Viên Kinh Doanh",
    members: "Lê Văn C, Phạm Thị D",
    createdAt: today,
    updatedAt: today,
    note: "Nhóm nhân viên kinh doanh",
  },
  {
    id: 3,
    groupName: "Nhân Viên Kỹ Thuật",
    members: "Nguyễn Hữu E, Trần Văn F",
    createdAt: today,
    updatedAt: today,
    note: "Nhóm kỹ thuật, bảo trì",
  },
];

export const mockMeterConfigs: MeterConfig[] = [
  {
      id: 1,
      objectCode: "OBJ001",
      meterCode: "M001",
      note: "Cấu hình chuẩn",
      locked: false,
      createdAt: today,
      updatedAt: today,
      createdBy: "admin",
      updatedByUser: "admin",
      errorFlag: undefined
  },
  {
      id: 2,
      objectCode: "OBJ002",
      meterCode: "M002",
      note: "Cấu hình kiểm tra",
      locked: true,
      createdAt: today,
      updatedAt: today,
      createdBy: "admin",
      updatedByUser: "admin",
      errorFlag: undefined
  },
  {
      id: 3,
      objectCode: "OBJ003",
      meterCode: "M003",
      note: "Cấu hình mới",
      locked: false,
      createdAt: today,
      updatedAt: today,
      createdBy: "admin",
      updatedByUser: "admin",
      errorFlag: undefined
  },
  {
      id: 4,
      objectCode: "OBJ004",
      meterCode: "M004",
      note: "Cấu hình dự phòng",
      locked: false,
      createdAt: today,
      updatedAt: today,
      createdBy: "admin",
      updatedByUser: "admin",
      errorFlag: undefined
  },
  {
      id: 5,
      objectCode: "OBJ005",
      meterCode: "M005",
      note: "Cấu hình thử nghiệm",
      locked: true,
      createdAt: today,
      updatedAt: today,
      createdBy: "admin",
      updatedByUser: "admin",
      errorFlag: undefined
  },
];

// ✅ Dữ liệu giả cho MeterManagementPage
export const mockMeters: Meter[] = [
  {
    id: 1,
    code: "M001",
    name: "Đồng hồ A",
    volume: 123,
    status: "Hoạt động",
    recordDate: today,
    updatedDate: today,
    updatedBy: "admin",
    createdAt: today,
    updatedAt: today,
    createdBy: "admin",
    updatedByUser: "admin",
    errorFlag: false,
    note: "Đồng hồ chính",
  },
  {
    id: 2,
    code: "M002",
    name: "Đồng hồ B",
    volume: 87,
    status: "Cảnh báo",
    recordDate: today,
    updatedDate: today,
    updatedBy: "admin",
    createdAt: today,
    updatedAt: today,
    createdBy: "admin",
    updatedByUser: "admin",
    errorFlag: true,
    note: "Đồng hồ phụ",
  },
  {
    id: 3,
    code: "M003",
    name: "Đồng hồ C",
    volume: 45,
    status: "Lỗi",
    recordDate: today,
    updatedDate: today,
    updatedBy: "admin",
    createdAt: today,
    updatedAt: today,
    createdBy: "admin",
    updatedByUser: "admin",
    errorFlag: true,
    note: "Đồng hồ thử nghiệm",
  },
  {
    id: 4,
    code: "M004",
    name: "Đồng hồ D",
    volume: 200,
    status: "Hoạt động",
    recordDate: today,
    updatedDate: today,
    updatedBy: "admin",
    createdAt: today,
    updatedAt: today,
    createdBy: "admin",
    updatedByUser: "admin",
    errorFlag: false,
    note: "Đồng hồ dự phòng",
  },
  {
    id: 5,
    code: "M005",
    name: "Đồng hồ E",
    volume: 150,
    status: "Cảnh báo",
    recordDate: today,
    updatedDate: today,
    updatedBy: "admin",
    createdAt: today,
    updatedAt: today,
    createdBy: "admin",
    updatedByUser: "admin",
    errorFlag: false,
    note: "Đồng hồ chính",
  },
];

export const mockBillings: Billing[] = [
  {
    id: 1, objectCode: "OBJ001", consumption: 120, period: "01", year: 2025, createdAt: today, updatedAt: today, createdBy: "admin", updatedByUser: "admin", note: "Hóa đơn kỳ 01/2025",
    batch: "",
    fromDate: "",
    toDate: ""
  },
  {
    id: 2, objectCode: "OBJ002", consumption: 95, period: "01", year: 2025, createdAt: today, updatedAt: today, createdBy: "admin", updatedByUser: "admin", note: "Hóa đơn kỳ 01/2025",
    batch: "",
    fromDate: "",
    toDate: ""
  },
  {
    id: 3, objectCode: "OBJ003", consumption: 150, period: "01", year: 2025, createdAt: today, updatedAt: today, createdBy: "admin", updatedByUser: "admin", note: "Hóa đơn kỳ 01/2025",
    batch: "",
    fromDate: "",
    toDate: ""
  },
  {
    id: 4, objectCode: "OBJ001", consumption: 130, period: "02", year: 2025, createdAt: today, updatedAt: today, createdBy: "admin", updatedByUser: "admin", note: "Hóa đơn kỳ 02/2025",
    batch: "",
    fromDate: "",
    toDate: ""
  },
  {
    id: 5, objectCode: "OBJ002", consumption: 110, period: "02", year: 2025, createdAt: today, updatedAt: today, createdBy: "admin", updatedByUser: "admin", note: "Hóa đơn kỳ 02/2025",
    batch: "",
    fromDate: "",
    toDate: ""
  },
  {
    id: 6, objectCode: "OBJ003", consumption: 160, period: "02", year: 2025, createdAt: today, updatedAt: today, createdBy: "admin", updatedByUser: "admin", note: "Hóa đơn kỳ 02/2025",
    batch: "",
    fromDate: "",
    toDate: ""
  },
  {
    id: 7, objectCode: "OBJ001", consumption: 125, period: "03", year: 2025, createdAt: today, updatedAt: today, createdBy: "admin", updatedByUser: "admin", note: "Hóa đơn kỳ 03/2025",
    batch: "",
    fromDate: "",
    toDate: ""
  },
  {
    id: 8, objectCode: "OBJ002", consumption: 105, period: "03", year: 2025, createdAt: today, updatedAt: today, createdBy: "admin", updatedByUser: "admin", note: "Hóa đơn kỳ 03/2025",
    batch: "",
    fromDate: "",
    toDate: ""
  },
  {
    id: 9, objectCode: "OBJ003", consumption: 170, period: "03", year: 2025, createdAt: today, updatedAt: today, createdBy: "admin", updatedByUser: "admin", note: "Hóa đơn kỳ 03/2025",
    batch: "",
    fromDate: "",
    toDate: ""
  },
  {
    id: 10, objectCode: "OBJ004", consumption: 90, period: "01", year: 2025, createdAt: today, updatedAt: today, createdBy: "admin", updatedByUser: "admin", note: "Hóa đơn kỳ 01/2025",
    batch: "",
    fromDate: "",
    toDate: ""
  },
];

export const mockBillingReadings: BillingReading[] = [
  { id: 1, year: 2025, period: "01", createdAt: today, updatedAt: today, createdBy: "admin", updatedBy: "admin", daysCount: 30 },
  { id: 2, year: 2025, period: "02", createdAt: today, updatedAt: today, createdBy: "admin", updatedBy: "admin", daysCount: 28 },
  { id: 3, year: 2025, period: "03", createdAt: today, updatedAt: today, createdBy: "admin", updatedBy: "admin", daysCount: 31 },
  { id: 4, year: 2025, period: "04", createdAt: today, updatedAt: today, createdBy: "admin", updatedBy: "admin", daysCount: 30 },
  { id: 5, year: 2025, period: "05", createdAt: today, updatedAt: today, createdBy: "admin", updatedBy: "admin", daysCount: 31 },
  { id: 6, year: 2025, period: "06", createdAt: today, updatedAt: today, createdBy: "admin", updatedBy: "admin", daysCount: 30 },
  { id: 7, year: 2025, period: "07", createdAt: today, updatedAt: today, createdBy: "admin", updatedBy: "admin", daysCount: 31 },
  { id: 8, year: 2025, period: "08", createdAt: today, updatedAt: today, createdBy: "admin", updatedBy: "admin", daysCount: 31 },
  { id: 9, year: 2025, period: "09", createdAt: today, updatedAt: today, createdBy: "admin", updatedBy: "admin", daysCount: 30 },
  { id: 10, year: 2025, period: "10", createdAt: today, updatedAt: today, createdBy: "admin", updatedBy: "admin", daysCount: 31 },
];

export const mockBillingReadingDetails: BillingReadingDetail[] = [
  {
    id: 1,
    code: "RD001",
    year: 2025,
    period: "Kỳ 1",
    batch: "Đợt 1",
    daysCount: 30,
    createdAt: "2025-09-01T00:00:00Z",
    updatedAt: "2025-09-10T00:00:00Z",
    createdBy: "Admin",
    updatedBy: "Admin",
    note: "Mock dữ liệu kỳ 1",
  },
  {
    id: 2,
    code: "RD002",
    year: 2025,
    period: "Kỳ 2",
    batch: "Đợt 2",
    daysCount: 28,
    createdAt: "2025-09-05T00:00:00Z",
    updatedAt: "2025-09-15T00:00:00Z",
    createdBy: "Admin",
    updatedBy: "Admin",
    note: "Mock dữ liệu kỳ 2",
  },
  {
    id: 3,
    code: "RD003",
    year: 2025,
    period: "Kỳ 3",
    batch: "Đợt 3",
    daysCount: 31,
    createdAt: "2025-09-08T00:00:00Z",
    updatedAt: "2025-09-18T00:00:00Z",
    createdBy: "Admin",
    updatedBy: "Tester",
    note: "Mock dữ liệu kỳ 3",
  },
];

export const mockUserLogs: UserLog[] = [
  {
    id: 1,
    user: "admin",
    action: "Đăng nhập hệ thống",
    status: "Thành công",
    createdAt: "2025-09-20T08:30:00",
    data: "IP: 192.168.1.10, Trình duyệt: Chrome",
    feature: "",
    createdBy: ""
  },
  {
    id: 2,
    user: "nhanvien1",
    action: "Cập nhật hồ sơ khách hàng",
    status: "Thành công",
    createdAt: "2025-09-20T09:15:00",
    data: "Khách hàng ID: 1005",
    feature: "",
    createdBy: ""
  },
  {
    id: 3,
    user: "nhanvien2",
    action: "Xóa bản ghi hóa đơn",
    status: "Thất bại",
    createdAt: "2025-09-20T09:45:00",
    data: "Hóa đơn ID: 223, Lý do: Không có quyền",
    feature: "",
    createdBy: ""
  },
  {
    id: 4,
    user: "admin",
    action: "Phân quyền người dùng",
    status: "Thành công",
    createdAt: "2025-09-19T14:20:00",
    data: "User ID: 45 -> Role: Quản lý",
    feature: "",
    createdBy: ""
  },
  {
    id: 5,
    user: "nhanvien3",
    action: "Xuất báo cáo tháng",
    status: "Thất bại",
    createdAt: "2025-09-18T17:50:00",
    data: "Báo cáo tháng 08, lỗi server",
    feature: "",
    createdBy: ""
  },
  {
    id: 6,
    user: "admin",
    action: "Đăng xuất",
    status: "Thành công",
    createdAt: "2025-09-18T18:05:00",
    data: "IP: 192.168.1.10",
    feature: "",
    createdBy: ""
  },
];