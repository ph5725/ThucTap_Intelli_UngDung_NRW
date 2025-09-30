// Hàm tính số ngày giữa 2 ngày
export function calculateDays(from: string, to: string): number {
  const start = new Date(from);
  const end = new Date(to);

  // Kiểm tra nếu người dùng nhập sai (từ ngày > đến ngày)
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Ngày không hợp lệ");
  }
  if (end < start) {
    throw new Error("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu");
  }

  const diffTime = end.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
