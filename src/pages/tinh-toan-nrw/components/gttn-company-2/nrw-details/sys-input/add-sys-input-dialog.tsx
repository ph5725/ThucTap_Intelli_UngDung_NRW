import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Button, MenuItem, Select, IconButton } from '@mui/material';
import { RemoveCircleTwoTone as RemoveIcon, AddCircleTwoTone as AddCircleIcon } from '@mui/icons-material';
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
import { AddNrwCongTyDauVaoChiTietRequest, NrwCongTyDauVaoChiTietResponse, UpdateNrwCongTyDauVaoChiTietRequest, } from 'src/types/nrw-cong-ty/nrw-cong-ty-dau-vao-chi-tiet';
import { ThongTinNguoiDung } from "src/types/authTypes";
//text
import { TextForms } from 'src/constants/text';
//options
import { KY_SO } from "src/constants/options"


interface AddSysInputDialogProps {
    onSave?: (newRow: NrwCongTyDauVaoChiTietResponse) => void;
    onClose?: () => void;
    maDauVao?: number;
    nguoiTao?: number;
    ky: number;
    nam: number;
}

const AddSysInputDialog: React.FC<AddSysInputDialogProps> = ({ onSave, onClose, maDauVao, ky, nam }) => {
    const { enqueueSnackbar } = useSnackbar();
    const initialMonth = new Date().getMonth() + 1;
    const { setMaDoiTuong } = useThemePanel();

    // State lưu dữ liệu form
    const [formData, setFormData] = useState<Partial<AddNrwCongTyDauVaoChiTietRequest>>({
        MaDauVao: maDauVao,
        Ky: ky,
        Nam: nam,
        Nguon: "",
        ToanTu: "plus",
        GiaTri: 0,
        ThuTuHienThi: 0,
        GhiChu: "",
        NgayTao: new Date().toISOString().split('T')[0],
        NguoiTao: 0,
    });

    // State xác thực dữ liệu form
    const [isDataValid, setIsDataValid] = useState(false);

    /*  Kiểm tra các trường bắt buộc để xác định form hợp lệ hay không */
    useEffect(() => {
        const isValid =
            !!formData.MaDauVao &&
            !!formData.Ky &&
            !!formData.Nam &&
            !!formData.Nguon &&
            !!formData.ToanTu &&
            formData.GiaTri !== undefined &&
            formData.ThuTuHienThi !== undefined
        setIsDataValid(isValid);
    }, [formData]);


    /* Cập nhật giá trị text field */
    const handleChange = (field: keyof AddNrwCongTyDauVaoChiTietRequest, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value === null || value === undefined ? '' : String(value),
        }));
    };

    /* Cập nhật giá trị number field */
    const handleNumberChange = (field: keyof AddNrwCongTyDauVaoChiTietRequest, value: string) => {
        const numValue = value === '' ? undefined : Number(value.replace(/[^0-9.-]+/g, ''));
        setFormData((prev) => ({
            ...prev,
            [field]: numValue,
        }));
    };

    /* Cập nhật giá trị date field */
    const handleDateChange = (field: keyof AddNrwCongTyDauVaoChiTietRequest, value: Date | null) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value ? format(value, 'yyyy-MM-dd') : '',
        }));
    };

    /*  Cập nhật giá trị năm */
    const handleYearChange = (field: keyof AddNrwCongTyDauVaoChiTietRequest, value: Date | null) => {
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
                console.log("ID người dùng:", nguoiDung.tenNguoiDung);
            }

            const payload: AddNrwCongTyDauVaoChiTietRequest = {
                MaDauVao: formData.MaDauVao!,
                Ky: Number(formData.Ky)!,
                Nam: Number(formData.Nam)!,
                Nguon: formData.Nguon!,
                ToanTu: "plus",
                GiaTri: Number(formData.GiaTri)!,
                ThuTuHienThi: Number(formData.ThuTuHienThi)!,
                GhiChu: formData.GhiChu || undefined,
                NgayTao: formData.NgayTao!,
                NguoiTao: nguoiDung?.id ?? 1,
            };

            const newData = await createData<AddNrwCongTyDauVaoChiTietRequest, NrwCongTyDauVaoChiTietResponse>(
                apiUrls.NRWCongTyDauVaoChiTiet.create,
                payload
            );
            onSave?.(newData);
            enqueueSnackbar(TextForms.thongBao.themMoiThanhCong, { variant: 'success' });
            onClose?.();
        } catch (error) {
            console.error('Lỗi khi thêm kỳ mới:', error);
            enqueueSnackbar(TextForms.thongBao.loiThem, { variant: 'error' });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    {/* Mã, Kỳ, Năm */}
                    {/* <Grid size={{ xs: 4 }}>
                        <Typography fontWeight="bold">Mã đầu vào:</Typography>
                        <TextField
                            fullWidth
                            value={formData.MaDauVao ?? ''}
                            onChange={(e) => handleChange('MaDauVao', e.target.value)}
                            size="small"
                            required
                            disabled
                        />
                    </Grid> */}
                    <Grid size={{ xs: 6 }}>
                        <Typography fontWeight="bold">Kỳ:</Typography>
                        <Select
                            fullWidth
                            value={formData.Ky ?? ''}
                            onChange={(e) => handleChange('Ky', e.target.value)}
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
                    <Grid size={{ xs: 6 }}>
                        <Typography fontWeight="bold">Năm:</Typography>
                        <DatePicker
                            views={['year']}
                            value={formData.Nam ? new Date(Number(formData.Nam), 0, 1) : null}
                            onChange={(date) => handleYearChange('Nam', date)}
                            slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }}
                            format="yyyy"
                            disabled
                        />
                    </Grid>

                    {/* Nội dung */}
                    <Grid size={{ xs: 6 }}>
                        <Typography fontWeight="bold">Nguồn:</Typography>
                        <TextField
                            fullWidth
                            value={formData.Nguon ?? ''}
                            onChange={(e) => handleChange('Nguon', e.target.value)}
                            size="small"
                        />
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid size={{ xs: 6, md: 8 }}>
                            <Typography fontWeight="bold" sx={{ mb: 0 }}>
                                Toán tử:
                            </Typography>
                        </Grid>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <IconButton
                                color={formData.ToanTu === "plus" ? "success" : "default"}
                                onClick={() => handleChange("ToanTu", "plus")}
                            >
                                <AddCircleIcon />
                            </IconButton>
                            <IconButton
                                color={formData.ToanTu === "minus" ? "error" : "default"}
                                onClick={() => handleChange("ToanTu", "minus")}
                            >
                                <RemoveIcon />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Typography fontWeight="bold">Giá trị:</Typography>
                        <TextField
                            fullWidth
                            value={formData.GiaTri ?? ''}
                            onChange={(e) => handleNumberChange('GiaTri', e.target.value)}
                            size="small"
                            type="number"
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Typography fontWeight="bold">Thứ tự hiển thị:</Typography>
                        <TextField
                            fullWidth
                            value={formData.ThuTuHienThi ?? ''}
                            onChange={(e) => handleNumberChange('ThuTuHienThi', e.target.value)}
                            size="small"
                            type="number"
                        />
                    </Grid>

                    {/* Ghi chú */}
                    <Grid size={{ xs: 6 }}>
                        <Typography fontWeight="bold">Ghi chú:</Typography>
                        <TextField
                            fullWidth
                            value={formData.GhiChu ?? ''}
                            onChange={(e) => handleChange('GhiChu', e.target.value)}
                            size="small"
                        />
                    </Grid>
                </Grid>

                {/* Nút Hủy và Lưu */}
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

export default AddSysInputDialog;
