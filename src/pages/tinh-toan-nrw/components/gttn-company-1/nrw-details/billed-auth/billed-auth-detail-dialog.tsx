import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Button, MenuItem, Select, IconButton } from '@mui/material';
import { RemoveCircleTwoTone as RemoveIcon, AddCircleTwoTone as AddCircleIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { vi } from 'date-fns/locale';
import { useSnackbar } from 'notistack';
// service
import { updateData } from 'src/services/crudService';
import { apiUrls } from 'src/services/apiUrls';
// type
import { NrwCongTyTieuThuChiTietResponse, UpdateNrwCongTyTieuThuChiTietRequest } from 'src/types/nrw-cong-ty/nrw-cong-ty-tieu-thu-chi-tiet';
import { ThongTinNguoiDung } from "src/types/authTypes";
// text
import { TextForms } from 'src/constants/text';
// option
import { KY_SO } from 'src/constants/options';

interface BillAuthDetailDialogProps {
  row: NrwCongTyTieuThuChiTietResponse | null;
  onSave?: (updatedRow: NrwCongTyTieuThuChiTietResponse) => void; // Callback to handle save
  onClose?: () => void;
  maDauVao?: number;
  ky: number;
  nam: number;
}

const BillAuthDetailDialog: React.FC<BillAuthDetailDialogProps> = ({ row, onSave, onClose, maDauVao }) => {
  // Initialize state with the row data or defaults
  const [formData, setFormData] = useState<NrwCongTyTieuThuChiTietResponse | null>(row);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Compare formData with initial row to detect changes
  useEffect(() => {
    if (!row || !formData) return;
    const isChanged = Object.keys(formData).some((key) => {
      const field = key as keyof NrwCongTyTieuThuChiTietResponse;
      // Skip non-editable fields
      if (['nguoiTao', 'ngayTao', 'nguoiCapNhat', 'ngayCapNhat'].includes(field)) return false;
      return formData[field] !== row[field];
    });
    setIsDataChanged(isChanged);
  }, [formData, row]);

  const handleChange = (field: keyof NrwCongTyTieuThuChiTietResponse, value: string | number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      // Convert value to string for consistency
      const stringValue = value === null || value === undefined ? '' : String(value);
      return { ...prev, [field]: stringValue };
    });
  };

  const handleNumberChange = (field: keyof NrwCongTyTieuThuChiTietResponse, value: string) => {
    const numValue = value === '' ? null : Number(value.replace(/[^0-9.-]+/g, '')); // Handle number input
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: numValue };
    });
  };

  const handleDateChange = (field: keyof NrwCongTyTieuThuChiTietResponse, value: Date | null) => {
    setFormData((prev) => {
      if (!prev) return prev;
      // Format date to YYYY-MM-DD string or null if invalid
      const formattedDate = value ? value.toISOString().split('T')[0] : null;
      return { ...prev, [field]: formattedDate };
    });
  };

  const handleYearChange = (field: keyof NrwCongTyTieuThuChiTietResponse, value: Date | null) => {
    setFormData((prev) => {
      if (!prev) return prev;
      // Store only the year as a string
      const year = value ? String(value.getFullYear()) : null;
      return { ...prev, [field]: year };
    });
  };

  const handleSave = async () => {
    if (!formData || !onSave) return;

    // Get user info from localStorage
    const nguoiDungStr = localStorage.getItem("nguoiDung");
    let nguoiDung: ThongTinNguoiDung | null = null;

    if (nguoiDungStr) {
      nguoiDung = JSON.parse(nguoiDungStr) as ThongTinNguoiDung;
    }

    try {
      // Transform formData to match UpdateNrwCongTyTieuThuChiTietRequest
      const payload: UpdateNrwCongTyTieuThuChiTietRequest = {
        MaTieuThu: maDauVao,
        Ky: Number(formData.ky)!,
        Nam: Number(formData.nam)!,
        Nguon: formData.nguon,
        ToanTu: formData.toanTu as "plus" | "minus",
        GiaTri: Number(formData.giaTri)!,
        ThuTuHienThi: Number(formData.thuTuHienThi)!,
        GhiChu: formData.ghiChu || undefined,
        NguoiCapNhat: nguoiDung?.id ?? 1,
        NgayCapNhat: formData.ngayCapNhat ?? undefined,
      };

      console.log("Payload gửi lên:", payload);

      // Call updateData API
      const updatedData = await updateData<UpdateNrwCongTyTieuThuChiTietRequest, NrwCongTyTieuThuChiTietResponse>(
        apiUrls.NRWCongTyDauVaoChiTiet.update(formData.id!),
        payload
      );

      // Transform API response to match NrwCongTyTieuThuChiTietResponse
      const transformedData: NrwCongTyTieuThuChiTietResponse = {
        id: updatedData.id,
        // maDauVao: updatedData.maDauVao ? String(updatedData.maDauVao) : undefined,
        ky: updatedData.ky,
        nam: updatedData.nam,
        nguon: updatedData.nguon,
        toanTu: updatedData.toanTu,
        giaTri: updatedData.giaTri,
        thuTuHienThi: updatedData.thuTuHienThi,
        ghiChu: updatedData.ghiChu,
        ngayTao: updatedData.ngayTao,
        ngayCapNhat: updatedData.ngayCapNhat,
        nguoiTao: updatedData.nguoiTao,
        nguoiCapNhat: updatedData.nguoiCapNhat,
      };

      // Update local state via onSave callback
      onSave(transformedData);
      enqueueSnackbar(TextForms.thongBao.capNhatThanhCong, { variant: 'success' });
      onClose?.();
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      enqueueSnackbar(TextForms.thongBao.loiCapNhat, { variant: 'error' });
    }
  };

  if (!row || !formData) return <Typography>Chưa có dữ liệu</Typography>;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Mã, Kỳ, Năm */}
          {/* <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Mã đầu vào:</Typography>
            <TextField
              fullWidth
              value={maDauVao ?? ''}
              onChange={(e) => handleChange('maDauVao', e.target.value)}
              size="small"
              required
              disabled
            />
          </Grid> */}
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Kỳ:</Typography>
            <Select
              fullWidth
              value={formData.ky ?? ''}
              onChange={(e) => handleChange('ky', e.target.value)}
              size="small"
              required
              disabled
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
              value={formData.nam ? new Date(Number(formData.nam), 0, 1) : null}
              onChange={(date) => handleYearChange('nam', date)}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              format="yyyy"
              disabled
            />
          </Grid>

          {/* Sản lượng, Lượng nước */}
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Nguồn:</Typography>
            <TextField
              fullWidth
              value={formData.nguon ?? ''}
              onChange={(e) => handleChange('nguon', e.target.value)}
              size="small"
            />
          </Grid>
          <Grid container spacing={0}>
            <Grid size={{ xs: 6, md: 8}}>
              <Typography fontWeight="bold" sx={{ mb: 0 }}>
                Toán tử:
              </Typography>
            </Grid>
            <div style={{ display: "flex", gap: "0px", justifyContent: "center" }}>
              <IconButton
                color={formData.toanTu === "plus" ? "success" : "default"}
                onClick={() => handleChange("toanTu", "plus")}
              >
                <AddCircleIcon />
              </IconButton>
              <IconButton
                color={formData.toanTu === "minus" ? "error" : "default"}
                onClick={() => handleChange("toanTu", "minus")}
              >
                <RemoveIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Giá trị:</Typography>
            <TextField
              fullWidth
              value={formData.giaTri ?? ''}
              onChange={(e) => handleNumberChange('giaTri', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Thứ tự hiển thị:</Typography>
            <TextField
              fullWidth
              value={formData.thuTuHienThi ?? ''}
              onChange={(e) => handleNumberChange('thuTuHienThi', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>

          {/* Nguyên nhân, Ghi chú */}
          <Grid size={{ xs: 12 }}>
            <Typography fontWeight="bold">Ghi chú:</Typography>
            <TextField
              fullWidth
              value={formData.ghiChu ?? ''}
              onChange={(e) => handleChange('ghiChu', e.target.value)}
              size="small"
            />
          </Grid>

          {/* Người tạo, Ngày tạo, Người cập nhật, Ngày cập nhật */}
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Người tạo:</Typography>
            <Typography>{formData.nguoiTao ?? '-'}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Ngày tạo:</Typography>
            <Typography>
              {formData.ngayTao
                ? new Date(formData.ngayTao).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                : '-'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Người cập nhật:</Typography>
            <Typography>{formData.nguoiCapNhat ?? '-'}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Ngày cập nhật:</Typography>
            <Typography>
              {formData.ngayCapNhat
                ? new Date(formData.ngayCapNhat).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                : '-'}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={onClose}>
            Đóng
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={!isDataChanged}>
            Lưu
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default BillAuthDetailDialog;