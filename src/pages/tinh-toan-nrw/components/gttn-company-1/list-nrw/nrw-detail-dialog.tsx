import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Button, MenuItem, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { vi } from 'date-fns/locale';
import { useSnackbar } from 'notistack';
import { updateData } from 'src/services/crudService';
import { apiUrls } from 'src/services/apiUrls';
import { NrwCongTyResponse, UpdateNrwCongTyRequest } from 'src/types/nrw-cong-ty/nrw-cong-ty';
import { TextForms } from 'src/constants/text';

interface NrwDetailDialogProps {
  row: NrwCongTyResponse | null;
  onSave?: (updatedRow: NrwCongTyResponse) => void; // Callback to handle save
  onClose?: () => void; // Callback to handle close
}

const NrwDetailDialog: React.FC<NrwDetailDialogProps> = ({ row, onSave, onClose }) => {
  // Initialize state with the row data or defaults
  const [formData, setFormData] = useState<NrwCongTyResponse | null>(row);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Compare formData with initial row to detect changes
  useEffect(() => {
    if (!row || !formData) return;
    const isChanged = Object.keys(formData).some((key) => {
      const field = key as keyof NrwCongTyResponse;
      // Skip non-editable fields
      if (['nguoiTao', 'ngayTao', 'nguoiCapNhat', 'ngayCapNhat'].includes(field)) return false;
      return formData[field] !== row[field];
    });
    setIsDataChanged(isChanged);
  }, [formData, row]);

  const handleChange = (field: keyof NrwCongTyResponse, value: string | number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      // Convert value to string for consistency
      const stringValue = value === null || value === undefined ? '' : String(value);
      return { ...prev, [field]: stringValue };
    });
  };

  const handleNumberChange = (field: keyof NrwCongTyResponse, value: string) => {
    const numValue = value === '' ? null : Number(value.replace(/[^0-9.-]+/g, '')); // Handle number input
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: numValue };
    });
  };

  const handleDateChange = (field: keyof NrwCongTyResponse, value: Date | null) => {
    setFormData((prev) => {
      if (!prev) return prev;
      // Format date to YYYY-MM-DD string or null if invalid
      const formattedDate = value ? value.toISOString().split('T')[0] : null;
      return { ...prev, [field]: formattedDate };
    });
  };

  const handleYearChange = (field: keyof NrwCongTyResponse, value: Date | null) => {
    setFormData((prev) => {
      if (!prev) return prev;
      // Store only the year as a string
      const year = value ? String(value.getFullYear()) : null;
      return { ...prev, [field]: year };
    });
  };

  const handleSave = async () => {
    if (!formData || !onSave) return;

    try {
      // Transform formData to match UpdateNrwCongTyRequest
      const payload: UpdateNrwCongTyRequest = {
        Ma: formData.ma ?? '',
        Ky: Number(formData.ky) || 0, // Convert string to number
        Nam: Number(formData.nam) || 0, // Convert string to number
        SanLuongDauVao: formData.sanLuongDauVao ?? 0,
        SanLuongTieuThu: formData.sanLuongTieuThu ?? 0,
        LuongNuocThatThoat: formData.luongNuocThatThoat ?? undefined,
        TyLeThatThoatChuan1: formData.tyLeThatThoatChuan1 ?? undefined,
        TyLeThatThoatChuan2: undefined, // Not present in formData, set as undefined
        TuNgay: formData.tuNgay ?? '',
        DenNgay: formData.denNgay ?? '',
        SoNgayDocSoDht: formData.soNgayDocSoDht ?? undefined,
        SoNgayDocSoBilling: formData.soNgayDocSoBilling ?? undefined,
        NguyenNhan: formData.nguyenNhan ?? undefined,
        GhiChu: formData.ghiChu ?? undefined,
        NguoiCapNhat: 1,
        NgayCapNhat: formData.ngayCapNhat ?? undefined,
      };

      // Call updateData API
      const updatedData = await updateData<UpdateNrwCongTyRequest, NrwCongTyResponse>(
        apiUrls.NRWCongTy.update(formData.id!), // Assuming id exists in formData
        payload
      );

      // Update local state via onSave callback
      onSave(updatedData);
      enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
      onClose?.(); // Close dialog after successful save
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      enqueueSnackbar('Cập nhật thất bại', { variant: 'error' });
    }
  };

  if (!row || !formData) return <Typography>Chưa có dữ liệu</Typography>;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Mã, Kỳ, Năm */}
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Mã:</Typography>
            <TextField
              fullWidth
              value={formData.ma ?? ''}
              onChange={(e) => handleChange('ma', e.target.value)}
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography fontWeight="bold">Kỳ:</Typography>
            <Select
              fullWidth
              value={formData.ky ?? ''}
              onChange={(e) => handleChange('ky', e.target.value)}
              size="small"
            >
              {TextForms.kySo.map((ky) => (
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
            />
          </Grid>

          {/* Sản lượng, Lượng nước */}
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Sản lượng mua vào (m³):</Typography>
            <TextField
              fullWidth
              value={formData.sanLuongDauVao ?? ''}
              onChange={(e) => handleNumberChange('sanLuongDauVao', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Sản lượng bán ra (m³):</Typography>
            <TextField
              fullWidth
              value={formData.sanLuongTieuThu ?? ''}
              onChange={(e) => handleNumberChange('sanLuongTieuThu', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Lượng nước thất thoát (m³):</Typography>
            <TextField
              fullWidth
              value={formData.luongNuocThatThoat ?? ''}
              onChange={(e) => handleNumberChange('luongNuocThatThoat', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Tỷ lệ thất thoát (%):</Typography>
            <TextField
              fullWidth
              value={formData.tyLeThatThoatChuan1 ?? ''}
              onChange={(e) => handleNumberChange('tyLeThatThoatChuan1', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>

          {/* Ngày */}
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Từ ngày:</Typography>
            <DatePicker
              value={formData.tuNgay ? new Date(formData.tuNgay) : null}
              onChange={(date) => handleDateChange('tuNgay', date)}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              format="dd/MM/yyyy"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Đến ngày:</Typography>
            <DatePicker
              value={formData.denNgay ? new Date(formData.denNgay) : null}
              onChange={(date) => handleDateChange('denNgay', date)}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              format="dd/MM/yyyy"
            />
          </Grid>

          {/* Số ngày */}
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Số ngày đọc số đồng hồ tổng:</Typography>
            <TextField
              fullWidth
              value={formData.soNgayDocSoDht ?? ''}
              onChange={(e) => handleNumberChange('soNgayDocSoDht', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Số ngày đọc số billing:</Typography>
            <TextField
              fullWidth
              value={formData.soNgayDocSoBilling ?? ''}
              onChange={(e) => handleNumberChange('soNgayDocSoBilling', e.target.value)}
              size="small"
              type="number"
            />
          </Grid>

          {/* Nguyên nhân, Ghi chú */}
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">Nguyên nhân:</Typography>
            <TextField
              fullWidth
              value={formData.nguyenNhan ?? ''}
              onChange={(e) => handleChange('nguyenNhan', e.target.value)}
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
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

export default NrwDetailDialog;