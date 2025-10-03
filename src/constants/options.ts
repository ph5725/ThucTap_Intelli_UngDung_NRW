// Danh sách kỳ số dạng số (1 - 12)
export const KY_SO: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

// Danh sách kỳ số có label "Kỳ 1", "Kỳ 2", ...
export const KY_LABELS: string[] = [
  "Kỳ 1", "Kỳ 2", "Kỳ 3", "Kỳ 4", "Kỳ 5", "Kỳ 6",
  "Kỳ 7", "Kỳ 8", "Kỳ 9", "Kỳ 10", "Kỳ 11", "Kỳ 12",
];

// Danh sách kỳ số dạng chuỗi số
export const KY_SO_STR: string[] = [
  "1", "2", "3", "4", "5", "6",
  "7", "8", "9", "10", "11", "12",
];

// Danh sách nguồn đầu vào (NRW Công ty)
export const NGUON_DAU_VAO: string[] = [
  "Sản lượng đồng hồ tổng",
  "Sản lượng bị truy thu",
  "Sản lượng được khấu trừ",
  "Giảm trừ lượng nước súc xả",
  "Khác",
];

// Danh sách nguồn tiêu thụ (NRW Công ty)
export const NGUON_TIEU_THU: string[] = [
  "Sản lượng nước qua đồng hồ khách hàng",
  "Nước phục vụ súc xả, PTML",
  "Nước phụ vụ công tác gắn mới, nâng dời ĐHN",
  "Nước truy thu gian lận, bất hợp pháp",
  "Nước truy thu do đơn vị ngoài làm bể",
  "Khác",
];