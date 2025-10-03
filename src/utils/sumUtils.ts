/**
 * Hàm tính tổng các sản lượng đầu vào và bán ra
 **/

export const sum = (arr: Array<number | null | undefined>): number => {
  return arr.reduce<number>(
    (total, value) => total + (value ?? 0),
    0 // khởi tạo total = 0
  );
};

export const sumBy = <T>(
  arr: T[],
  selector: (item: T) => number | null | undefined
): number => {
  return arr.reduce((total, item) => total + (selector(item) ?? 0), 0);
};