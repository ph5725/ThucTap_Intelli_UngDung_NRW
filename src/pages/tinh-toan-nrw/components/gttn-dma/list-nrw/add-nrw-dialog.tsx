import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Button, MenuItem, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { vi } from 'date-fns/locale';
import { useSnackbar } from 'notistack';
import { differenceInDays, format } from 'date-fns';
import { useThemePanel } from "src/components/layout/ThemePanelProvider";
//utils
import { calculateSoNgayDocSoDht } from 'src/utils/dateUtils';
import { tinhLuongNuocThatThoat, tinhTyLeThatThoat } from 'src/utils/nrwUtils';
// service
import { createData, updateData, getData } from 'src/services/crudService';
import { apiUrls } from 'src/services/apiUrls';
import { AddDauVaoChiTiet } from "src/services/nrwCongTy/addDauVaoChiTiet"
import { AddTieuThuChiTiet } from "src/services/nrwCongTy/addTieuThuChiTiet"
// type
// import { AddNrwDmaRequest, NrwDmaResponse, TongSanLuongRequest, TongSanLuongRespone, SanLuongTieuThuRequest, SanLuongTieuThuRespone, SoNgayDocSoBillingRequest, SoNgayDocSoBillingRespone } from 'src/types/nrw-cong-ty/nrw-cong-ty';
import { AddNrwDmaRequest, NrwDmaResponse, UpdateNrwDmaRequest } from "src/types/nrw-dma/nrw-dma";
import { ThongTinNguoiDung } from "src/types/authTypes";
//text
import { TextForms } from 'src/constants/text';
//options
import { KY_SO } from "src/constants/options"


interface AddNrwDialogProps {
  onSave?: (newRow: NrwDmaResponse) => void;
  onClose?: () => void;
  maDoiTuong?: number;
  nguoiTao?: number;
}

const AddNrwDialog: React.FC<AddNrwDialogProps> = ({ onSave, onClose, maDoiTuong = 0 }) => {
  const { enqueueSnackbar } = useSnackbar();
  const initialMonth = new Date().getMonth() + 1;
  const { setMaDoiTuong } = useThemePanel();

  // State lưu dữ liệu form
  const [formData, setFormData] = useState<Partial<AddNrwDmaRequest>>({
    MaDma: 0,
    Ky: initialMonth,
    Nam: new Date().getFullYear(),
    LuongNuocVao: 0,
    LuongNuocTieuThu: 0,
    LuongNuocSucXa: 0,
    // LuongNuocThatThoat?: number,
    TyLeThatThoatKyTruoc: 0,
    // TyLeThatThoat?: number,
    NguyenNhan: '',
    GhiChu: '',
    NgayTao: new Date().toISOString().split('T')[0],
    NguoiTao: 0,
  });

  // State xác thực dữ liệu form
  const [isDataValid, setIsDataValid] = useState(false);

  /* Cập nhật TuNgay, DenNgay và SoNgayDocSoDht khi Ky hoặc Nam thay đổi */
  useEffect(() => {
    if (!formData.Ky || !formData.Nam) return;

    try {
      const ky = Number(formData.Ky);
      const nam = Number(formData.Nam);
      const tuNgay = new Date(nam, ky - 2, 26); // 26 tháng trước (so sánh với Ky)
      const denNgay = new Date(nam, ky - 1, 25); // 25 tháng này (so sánh với Ky)
      if (ky === 12) {
        denNgay.setFullYear(nam + 1);
        denNgay.setMonth(0);
      }

      const tuNgayStr = format(tuNgay, 'yyyy-MM-dd');
      const denNgayStr = format(denNgay, 'yyyy-MM-dd');
      const soNgayDocSoDht = calculateSoNgayDocSoDht(tuNgayStr, denNgayStr);

      setFormData((prev) => ({
        ...prev,
        TuNgay: tuNgayStr,
        DenNgay: denNgayStr,
        SoNgayDocSoDht: soNgayDocSoDht,
      }));
    } catch (error) {
      console.error('Lỗi khi cập nhật ngày:', error);
      enqueueSnackbar('Không thể cập nhật ngày', { variant: 'error' });
    }
  }, [formData.Ky, formData.Nam]);

  /*  Kiểm tra các trường bắt buộc để xác định form hợp lệ hay không */
  useEffect(() => {
    const isValid =
      !!formData.MaDma &&
      !!formData.Ky &&
      !!formData.Nam;
    // !!formData.TuNgay &&
    // !!formData.DenNgay &&
    // formData.SanLuongDauVao !== undefined &&
    // formData.SanLuongTieuThu !== undefined &&
    // formData.SanLuongDauVao !== 0 &&
    // formData.SanLuongTieuThu !== 0;

    setIsDataValid(isValid);
  }, [formData]);

  /* Lấy dữ liệu sản lượng đầu vào khi TuNgay và DenNgay đã có */
  // useEffect(() => {
  //   const fetchSanLuongDauVao = async () => {
  //     if (!formData.TuNgay || !formData.DenNgay) return;
  //     try {
  //       const payload: TongSanLuongRequest = {
  //         TuNgay: formData.TuNgay,
  //         DenNgay: formData.DenNgay,
  //         MaDoiTuong: maDoiTuong,
  //       };
  //       const response = await getData<TongSanLuongRequest, TongSanLuongRespone>(
  //         apiUrls.DongHoTong.tongSanLuong,
  //         payload
  //       );
  //       setFormData((prev) => ({ ...prev, SanLuongDauVao: response.tongSanLuong }));
  //     } catch (error) {
  //       console.error('Lỗi khi lấy sản lượng đầu vào:', error);
  //       enqueueSnackbar('Không thể lấy sản lượng đầu vào', { variant: 'error' });
  //     }
  //   };
  //   fetchSanLuongDauVao();
  // }, [formData.TuNgay, formData.DenNgay, maDoiTuong]);

  /* Lấy dữ liệu sản lượng tiêu thụ khi Ky và Nam đã có */
  // useEffect(() => {
  //   const fetchSanLuongTieuThu = async () => {
  //     if (!formData.Ky || !formData.Nam) return;
  //     try {
  //       const payload: SanLuongTieuThuRequest = {
  //         Ky: formData.Ky,
  //         Nam: formData.Nam,
  //         MaDoiTuong: maDoiTuong,
  //       };
  //       const response = await getData<SanLuongTieuThuRequest, SanLuongTieuThuRespone>(
  //         apiUrls.Billing.sanLuongTieuThu,
  //         payload
  //       );
  //       setFormData((prev) => ({ ...prev, SanLuongTieuThu: response.sanLuong }));
  //     } catch (error) {
  //       console.error('Lỗi khi lấy sản lượng tiêu thụ:', error);
  //       enqueueSnackbar('Không thể lấy sản lượng tiêu thụ', { variant: 'error' });
  //     }
  //   };
  //   fetchSanLuongTieuThu();
  // }, [formData.Ky, formData.Nam, maDoiTuong]);

  /* Lấy dữ liệu số ngày đọc số Billing khi Ky và Nam đã có */
  // useEffect(() => {
  //   const fetchSoNgayDocSoBilling = async () => {
  //     if (!formData.Ky || !formData.Nam) return;
  //     try {
  //       const payload: SoNgayDocSoBillingRequest = {
  //         Ky: formData.Ky,
  //         Nam: formData.Nam,
  //       };
  //       const response = await getData<SoNgayDocSoBillingRequest, SoNgayDocSoBillingRespone>(
  //         apiUrls.DSNgayDocSoBilling.soNgayDocSo,
  //         payload
  //       );
  //       setFormData((prev) => ({ ...prev, SoNgayDocSoBilling: response.soNgayDocSoBilling }));
  //     } catch (error) {
  //       console.error('Lỗi khi lấy số ngày đọc số Billing:', error);
  //       enqueueSnackbar('Không thể lấy số ngày đọc số Billing', { variant: 'error' });
  //     }
  //   };
  //   fetchSoNgayDocSoBilling();
  // }, [formData.Ky, formData.Nam]);

  /* Tính lượng nước thất thoát và tỷ lệ thất thoát chuẩn 1 */
  // useEffect(() => {
  //   if (formData.SanLuongDauVao && formData.SanLuongTieuThu) {
  //     const luongThatThoat = tinhLuongNuocThatThoat(formData.SanLuongDauVao, formData.SanLuongTieuThu);
  //     const tyLeThatThoat = tinhTyLeThatThoat(luongThatThoat, formData.SanLuongDauVao);
  //     console.log("Tỷ lệ: ", tyLeThatThoat);
  //     console.log("Lượng nước: ", luongThatThoat);
  //     setFormData(prev => ({ ...prev, LuongNuocThatThoat: luongThatThoat, TyLeThatThoatChuan1: tyLeThatThoat }));
  //   }
  // }, [formData.SanLuongDauVao, formData.SanLuongTieuThu]);


  /* Cập nhật giá trị text field */
  const handleChange = (field: keyof AddNrwDmaRequest, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value === null || value === undefined ? '' : String(value),
    }));
  };

  /* Cập nhật giá trị number field */
  const handleNumberChange = (field: keyof AddNrwDmaRequest, value: string) => {
    const numValue = value === '' ? undefined : Number(value.replace(/[^0-9.-]+/g, ''));
    setFormData((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  /* Cập nhật giá trị date field */
  const handleDateChange = (field: keyof AddNrwDmaRequest, value: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value ? format(value, 'yyyy-MM-dd') : '',
    }));
  };

  /*  Cập nhật giá trị năm */
  const handleYearChange = (field: keyof AddNrwDmaRequest, value: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value ? value.getFullYear() : undefined,
    }));
  };

  /* Xử lý lưu dữ liệu form */
  const handleSave = async () => {
    if (!isDataValid) {
      enqueueSnackbar(TextForms.thongBao.khongDuDuLieu, { variant: 'error' });
      return;
    }

    try {
      // Lấy thông tin người dùng từ localStorage
      const nguoiDungStr = localStorage.getItem("nguoiDung");
      let nguoiDung: ThongTinNguoiDung | null = null;

      if (nguoiDungStr) {
        nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
      }

      const payload: AddNrwDmaRequest = {
        MaDma: formData.MaDma,
        Ky: Number(formData.Ky)!,
        Nam: Number(formData.Nam)!,
        LuongNuocVao: 0,
        LuongNuocTieuThu: 0,
        LuongNuocSucXa: 0,
        LuongNuocThatThoat: 0,
        TyLeThatThoatKyTruoc: 0,
        TyLeThatThoat: 0,
        NguyenNhan: formData.NguyenNhan || undefined,
        GhiChu: formData.GhiChu || undefined,
        NgayTao: formData.NgayTao!,
        NguoiTao: nguoiDung?.id ?? 1,
      };

      const newData = await createData<AddNrwDmaRequest, NrwDmaResponse>(
        apiUrls.NRWCongTy.create,
        payload
      );
      onSave?.(newData);

      // AddDauVaoChiTiet(newData.id, Number(formData.Ky)!, Number(formData.Nam)!, Number(formData.SanLuongDauVao)!);
      // AddTieuThuChiTiet(newData.id, Number(formData.Ky)!, Number(formData.Nam)!, Number(formData.SanLuongTieuThu)!);

      enqueueSnackbar(TextForms.thongBao.themMoiThanhCong, { variant: 'success' });
      onClose?.();
    } catch (error) {
      console.error('Lỗi khi thêm kỳ mới:', error);
      enqueueSnackbar(TextForms.thongBao.loiThem, { variant: 'error' });
    }
  };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
//       <Box sx={{ p: 2 }}>
//         <Grid container spacing={2}>
//           {/* Mã, Kỳ, Năm */}
//           <Grid size={{ xs: 4 }}>
//             <Typography fontWeight="bold">Mã:</Typography>
//             <TextField
//               fullWidth
//               value={formData.MaDma ?? ''}
//               onChange={(e) => handleChange('Ma', e.target.value)}
//               size="small"
//               required
//               disabled
//             />
//           </Grid>
//           <Grid size={{ xs: 4 }}>
//             <Typography fontWeight="bold">Kỳ:</Typography>
//             <Select
//               fullWidth
//               value={formData.Ky ?? ''}
//               onChange={(e) => handleChange('Ky', e.target.value)}
//               size="small"
//               required
//             >
//               {KY_SO.map((ky) => (
//                 <MenuItem key={ky} value={ky}>
//                   {ky}
//                 </MenuItem>
//               ))}
//             </Select>
//           </Grid>
//           <Grid size={{ xs: 4 }}>
//             <Typography fontWeight="bold">Năm:</Typography>
//             <DatePicker
//               views={['year']}
//               value={formData.Nam ? new Date(Number(formData.Nam), 0, 1) : null}
//               onChange={(date) => handleYearChange('Nam', date)}
//               slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }}
//               format="yyyy"
//             />
//           </Grid>

//           {/* Sản lượng */}
//           <Grid size={{ xs: 6 }}>
//             <Typography fontWeight="bold">Sản lượng mua vào (m³):</Typography>
//             <TextField
//               fullWidth
//               value={formData.SanLuongDauVao ?? ''}
//               onChange={(e) => handleNumberChange('SanLuongDauVao', e.target.value)}
//               size="small"
//               type="number"
//             />
//           </Grid>

//           <Grid size={{ xs: 6 }}>
//             <Typography fontWeight="bold">Sản lượng bán ra (m³):</Typography>
//             <TextField
//               fullWidth
//               value={formData.SanLuongTieuThu ?? ''}
//               onChange={(e) => handleNumberChange('SanLuongTieuThu', e.target.value)}
//               size="small"
//               type="number"
//             />
//           </Grid>

//           {/* Ngày */}
//           <Grid size={{ xs: 6 }}>
//             <Typography fontWeight="bold">Từ ngày:</Typography>
//             <DatePicker
//               value={formData.TuNgay ? new Date(formData.TuNgay) : null}
//               onChange={(date) => handleDateChange('TuNgay', date)}
//               slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }}
//               format="dd/MM/yyyy"
//             />
//           </Grid>
//           <Grid size={{ xs: 6 }}>
//             <Typography fontWeight="bold">Đến ngày:</Typography>
//             <DatePicker
//               value={formData.DenNgay ? new Date(formData.DenNgay) : null}
//               onChange={(date) => handleDateChange('DenNgay', date)}
//               slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }}
//               format="dd/MM/yyyy"
//             />
//           </Grid>

//           {/* Số ngày */}
//           <Grid size={{ xs: 6 }}>
//             <Typography fontWeight="bold">Số ngày đọc số đồng hồ tổng:</Typography>
//             <TextField
//               fullWidth
//               value={formData.SoNgayDocSoDht ?? ''}
//               size="small"
//             />
//           </Grid>
//           <Grid size={{ xs: 6 }}>
//             <Typography fontWeight="bold">Số ngày đọc số billing:</Typography>
//             <TextField
//               fullWidth
//               value={formData.SoNgayDocSoBilling ?? ''}
//               onChange={(e) => handleNumberChange('SoNgayDocSoBilling', e.target.value)}
//               size="small"
//               type="number"
//             />
//           </Grid>

//           {/* Nguyên nhân, Ghi chú */}
//           <Grid size={{ xs: 6 }}>
//             <Typography fontWeight="bold">Nguyên nhân:</Typography>
//             <TextField
//               fullWidth
//               value={formData.NguyenNhan ?? ''}
//               onChange={(e) => handleChange('NguyenNhan', e.target.value)}
//               size="small"
//             />
//           </Grid>
//           <Grid size={{ xs: 6 }}>
//             <Typography fontWeight="bold">Ghi chú:</Typography>
//             <TextField
//               fullWidth
//               value={formData.GhiChu ?? ''}
//               onChange={(e) => handleChange('GhiChu', e.target.value)}
//               size="small"
//             />
//           </Grid>
//         </Grid>

//         {/* Nút Hủy và Lưu */}
//         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//           <Button variant="outlined" onClick={onClose}>
//             Hủy
//           </Button>
//           <Button variant="contained" onClick={handleSave} disabled={!isDataValid}>
//             Lưu
//           </Button>
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };

return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* MaDma, Ky, Nam */}
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Mã DMA:</Typography>
            <TextField
              fullWidth
              value={formData.MaDma ?? ''}
              onChange={(e) => handleNumberChange('MaDma', e.target.value)}
              size="small"
              type="number"
              required
              disabled
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Kỳ:</Typography>
            <Select
              fullWidth
              value={formData.Ky ?? ''}
              onChange={(e) => handleChange('Ky', e.target.value)}
              size="small"
              required
            >
              {KY_SO.map((ky) => (
                <MenuItem key={ky} value={ky}>
                  {ky}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Năm:</Typography>
            <DatePicker
              views={['year']}
              value={formData.Nam ? new Date(Number(formData.Nam), 0, 1) : null}
              onChange={(date) => handleYearChange('Nam', date)}
              slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }}
              format="yyyy"
            />
          </Grid>

          {/* LuongNuocVao, LuongNuocTieuThu, LuongNuocSucXa */}
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Lượng nước vào (m³):</Typography>
            <TextField
              fullWidth
              value={formData.LuongNuocVao ?? ''}
              onChange={(e) => handleNumberChange('LuongNuocVao', e.target.value)}
              size="small"
              type="number"
              required
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Lượng nước tiêu thụ (m³):</Typography>
            <TextField
              fullWidth
              value={formData.LuongNuocTieuThu ?? ''}
              onChange={(e) => handleNumberChange('LuongNuocTieuThu', e.target.value)}
              size="small"
              type="number"
              required
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Lượng nước súc xả (m³):</Typography>
            <TextField
              fullWidth
              value={formData.LuongNuocSucXa ?? ''}
              onChange={(e) => handleNumberChange('LuongNuocSucXa', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>

          {/* LuongNuocThatThoat, TyLeThatThoatKyTruoc, TyLeThatThoat */}
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Lượng nước thất thoát (m³):</Typography>
            <TextField
              fullWidth
              value={formData.LuongNuocThatThoat ?? ''}
              onChange={(e) => handleNumberChange('LuongNuocThatThoat', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Tỷ lệ thất thoát kỳ trước (%):</Typography>
            <TextField
              fullWidth
              value={formData.TyLeThatThoatKyTruoc ?? ''}
              onChange={(e) => handleNumberChange('TyLeThatThoatKyTruoc', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Tỷ lệ thất thoát (%):</Typography>
            <TextField
              fullWidth
              value={formData.TyLeThatThoat ?? ''}
              onChange={(e) => handleNumberChange('TyLeThatThoat', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>

          {/* NguyenNhan, GhiChu */}
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Nguyên nhân:</Typography>
            <TextField
              fullWidth
              value={formData.NguyenNhan ?? ''}
              onChange={(e) => handleChange('NguyenNhan', e.target.value)}
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Ghi chú:</Typography>
            <TextField
              fullWidth
              value={formData.GhiChu ?? ''}
              onChange={(e) => handleChange('GhiChu', e.target.value)}
              size="small"
            />
          </Grid>

          {/* NgayTao, NguoiTao */}
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Ngày tạo:</Typography>
            <DatePicker
              value={formData.NgayTao ? new Date(formData.NgayTao) : null}
              onChange={(date) => handleDateChange('NgayTao', date)}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              format="dd/MM/yyyy"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Người tạo:</Typography>
            <TextField
              fullWidth
              value={formData.NguoiTao ?? ''}
              onChange={(e) => handleNumberChange('NguoiTao', e.target.value)}
              size="small"
              type="number"
              required
              disabled
            />
          </Grid>
        </Grid>

        {/* Cancel and Save Buttons */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={!isDataValid}>
            Lưu
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default AddNrwDialog;
