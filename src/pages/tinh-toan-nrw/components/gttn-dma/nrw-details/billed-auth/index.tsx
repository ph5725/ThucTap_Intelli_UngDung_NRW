import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Divider } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, InfoOutlined as InfoIcon, RemoveCircleTwoTone as RemoveIcon, AddCircleTwoTone as AddCircleIcon } from '@mui/icons-material';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useSnackbar } from 'notistack';
import { useThemePanel } from "src/components/layout/ThemePanelProvider";
import AddBillAuthDialog from "./add-billed-auth-dialog"
import BillAuthDetailDialog from "./billed-auth-detail-dialog"
//utils
import { sum, sumBy } from "src/utils/sumUtils";
// style
import { THEME_COLORS } from "src/theme/theme_color";
import { MaterialReactTableConfig } from 'src/theme/style_table';
import "src/styles/global.css";
// service
import { createData, updateData, deleteData, getMa } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { NrwCongTyTieuThuChiTietResponse } from "src/types/nrw-cong-ty/nrw-cong-ty-tieu-thu-chi-tiet";
// text
import { TextForms } from "src/constants/text";

interface BillAuthProps {
  maDauVao: number | 0; // Allow null for initial state or no selection
}

// export default function SysInput({ maDauVao }: SysInputProps) {
const BillAuth: React.FC<BillAuthProps> = ({ maDauVao }) => {
  const { maDoiTuong } = useThemePanel();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<NrwCongTyTieuThuChiTietResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Dialog State
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedRow, setSelectedRow] = useState<NrwCongTyTieuThuChiTietResponse | null>(null);

  // Định dang số
  const formatNumber = (num: number | null | undefined): string => {
    if (num == null || isNaN(num)) return '-';
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  // Lấy dữ liệu từ API khi maDauVao thay đổi
  useEffect(() => {
    console.log("Mã tiêu thụ nhận được: ", maDoiTuong)
    const fetchData = async () => {
      if (!maDoiTuong) {
        setData([]); // Clear data if no maDauVao is provided
        return;
      }
      setIsLoading(true);
      try {
        const res = await getMa<NrwCongTyTieuThuChiTietResponse>(
          apiUrls.NRWCongTyTieuThuChiTiet.byMaTieuThu(maDoiTuong)
        );
        setData(res || []); // Ensure res is an array, handle empty response
        console.log(setData)
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu Nrw Công ty:", error);
        enqueueSnackbar(TextForms.thongBao.khongTheTaiDuLieu, { variant: "error" });
        setData([]); // Clear data on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [maDoiTuong, enqueueSnackbar]);

  // Tính tổng bán ra
  const tongBanRa = useMemo(() => {
    return sumBy(data, (item) => item.giaTri);
  }, [data]);

  // Handle save from NrwDetailDialog
  const handleSave = async (updatedRow: NrwCongTyTieuThuChiTietResponse) => {
    try {
      await updateData(apiUrls.NRWCongTyDauVaoChiTiet.update(updatedRow.id), updatedRow);
      setData((prev) =>
        prev.map((item) => (item.id === updatedRow.id ? updatedRow : item))
      );
      enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
      setOpenInfo(false);
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      enqueueSnackbar('Cập nhật thất bại', { variant: 'error' });
    }
  };

  // Handle add from AddDialog
  const handleAdd = (newRow: NrwCongTyTieuThuChiTietResponse) => {
    setData((prev) => [...prev, newRow]);
    setOpenAdd(false);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedRow) return;
    try {
      await deleteData(apiUrls.NRWCongTyDauVaoChiTiet.delete(selectedRow.id));
      setData((prev) => prev.filter((item) => item.id !== selectedRow.id));
      enqueueSnackbar('Xóa thành công', { variant: 'success' });
    } catch (error) {
      console.error('Lỗi khi xóa dữ liệu:', error);
      enqueueSnackbar('Xóa thất bại', { variant: 'error' });
    } finally {
      setOpenDelete(false);
      setSelectedRow(null);
    }
  };

  // Định nghĩa columns
  const columns = useMemo<MRT_ColumnDef<NrwCongTyTieuThuChiTietResponse>[]>(
    () => [
      {
        accessorKey: "id", header: "ID", size: 0,
        enableHiding: true, enableColumnFilter: false, enableSorting: false,
      },
      { accessorKey: 'thuTuHienThi', header: 'Thứ tự hiển thị', size: 120, },
      { accessorKey: 'nguon', header: 'Nguồn', size: 150, },
      {
        accessorKey: 'giaTri', header: 'Giá trị', size: 120,
        Cell: ({ cell }) => formatNumber(cell.getValue<number>()),
      },
      {
        accessorKey: 'toanTu',
        header: 'Toán tử',
        size: 120,
        Cell: ({ cell }): React.ReactNode => {
          const value = cell.getValue<string>();
          if (value === 'plus') {
            return <AddCircleIcon color="success" />;
          } else if (value === 'minus') {
            return <RemoveIcon color="error" />;
          }
          return value ?? null; // fallback
        },
      },
      {
        accessorKey: 'ky', header: TextForms.nrw.ky, size: 80,
        enableHiding: true, enableColumnFilter: false, enableSorting: false,
      },
      {
        accessorKey: 'nam', header: TextForms.nrw.nam, size: 80,
        enableHiding: true, enableColumnFilter: false, enableSorting: false,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    ...MaterialReactTableConfig(0),
    state: {
      isLoading,
    },
    initialState: {
      density: 'compact',
      columnVisibility: { id: false, ky: false, nam: false },
    },
    columns,
    data: data,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title={TextForms.nut.xoa}>
          <Button
            size="small"
            color="error"
            onClick={() => {
              setSelectedRow(row.original);
              setOpenDelete(true);
            }}
            sx={{ minWidth: 28, p: 0.5 }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Tooltip>
        <Tooltip title={TextForms.nut.chiTiet}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setSelectedRow(row.original);
              setOpenInfo(true);
            }}
            sx={{ minWidth: 28, p: 0.5 }}
          >
            <InfoIcon fontSize="small" />
          </Button>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button
        sx={{
          backgroundColor: THEME_COLORS.primary,
          textTransform: "none !important",
          boxShadow: "none",
        }}
        onClick={() => setOpenAdd(true)}
        variant="contained"
        startIcon={<AddIcon style={{ fontSize: "16px" }} />}
      >
        {TextForms.nut.themMoi}
      </Button>
    ),
  });

  // Get the latest period for display
  const latestPeriod = data.length > 0
    ? `Kỳ ${data[0].ky} - Năm ${data[0].nam}`
    : "";
    const latestRow = data.length > 0 ? data[0] : null;

  return (
    <Box sx={{ width: '100%', marginTop: '0px' }}>
      <Typography
        variant="h6"
        sx={{
          color: THEME_COLORS.primary,
          fontWeight: 600,
          mb: 2,
        }}
      >
        {latestPeriod}
      </Typography>
      <MaterialReactTable table={table} />

      {/* Dialog thêm mới */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>{TextForms.nut.themMoi}</DialogTitle>
        <DialogContent>
          <AddBillAuthDialog
            onSave={handleAdd}
            onClose={() => setOpenAdd(false)}
            maDauVao={maDoiTuong ?? 0}
            ky={latestRow?.ky ?? 0}
            nam={latestRow?.nam ?? 0}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog xem chi tiết */}
      <Dialog open={openInfo} onClose={() => setOpenInfo(false)} fullWidth maxWidth="lg">
        <DialogTitle
          sx={{
            color: THEME_COLORS.primary,
            fontWeight: 600,
          }}
        >
          Chi tiết sản lượng tiêu thụ kỳ {selectedRow?.ky} - Năm {selectedRow?.nam}
        </DialogTitle>
        <DialogContent>
          <BillAuthDetailDialog
            row={selectedRow}
            onSave={handleSave}
            onClose={() => setOpenInfo(false)}
            maDauVao={maDoiTuong ?? 0}
            ky={latestRow?.ky ?? 0}
            nam={latestRow?.nam ?? 0}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc muốn xóa kỳ <b>{selectedRow?.ky}</b> - năm <b>{selectedRow?.nam}</b> không?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Hủy</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Divider style={{ width: '100%', margin: '0 auto 10px auto', height: '1px', backgroundColor: `${THEME_COLORS.border}` }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // sắp xếp theo chiều ngang
          gap: 2,               // khoảng cách giữa các phần tử
          alignItems: "center", // căn giữa theo chiều dọc
          justifyContent: "space-between", // căn giữa theo chiều ngang
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            color: THEME_COLORS.text.secondary,
            fontWeight: 400,
            mb: 2,
          }}
        >
          {TextForms.nrw.tongDauVao}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: THEME_COLORS.text.title,
            fontWeight: 600,
            mb: 2,
          }}
        >
          {formatNumber(tongBanRa)}
        </Typography>
      </Box>
    </Box>
  );
}

export default BillAuth;
