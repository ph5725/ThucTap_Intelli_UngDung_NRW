/**
 * Tính lượng nước thất thoát
 * @param sanLuongDauVao - Sản lượng đầu vào (m³)
 * @param sanLuongTieuThu - Sản lượng tiêu thụ (m³)
 * @returns Lượng nước thất thoát (m³)
 */
export const tinhLuongNuocThatThoat = (
  sanLuongDauVao: number = 0,
  sanLuongTieuThu: number = 0
): number => {
  return sanLuongDauVao - sanLuongTieuThu;
};

/**
 * Tính tỷ lệ thất thoát (%)
 * @param luongNuocThatThoat - Lượng nước thất thoát (m³)
 * @param sanLuongDauVao - Sản lượng đầu vào (m³)
 * @returns Tỷ lệ thất thoát theo phần trăm (%), làm tròn 2 chữ số
 */
export const tinhTyLeThatThoat = (
  luongNuocThatThoat: number = 0,
  sanLuongDauVao: number = 0
): number => {
  if (sanLuongDauVao === 0 ) return 0;
  return Number(((luongNuocThatThoat / sanLuongDauVao) * 100).toFixed(2));
};
