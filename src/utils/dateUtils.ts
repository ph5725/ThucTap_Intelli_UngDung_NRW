import { differenceInDays } from 'date-fns';

/**
 * Hàm tính số ngày đọc số đồng hồ tổng từ TuNgay đến DenNgay
 * Bao gồm cả ngày bắt đầu và kết thúc
 * @param tuNgay - ngày bắt đầu (chuỗi 'yyyy-MM-dd')
 * @param denNgay - ngày kết thúc (chuỗi 'yyyy-MM-dd')
 * @returns số ngày giữa 2 ngày + 1 hoặc undefined nếu lỗi
 */
export const calculateSoNgayDocSoDht = (tuNgay: string, denNgay: string): number | undefined => {
  if (!tuNgay || !denNgay) return undefined;
  try {
    const tuNgayDate = new Date(tuNgay);
    const denNgayDate = new Date(denNgay);
    return differenceInDays(denNgayDate, tuNgayDate) + 1; // cộng thêm 1 ngày
  } catch (error) {
    console.error('Lỗi khi tính số ngày đọc số đồng hồ tổng:', error);
    return undefined;
  }
};
