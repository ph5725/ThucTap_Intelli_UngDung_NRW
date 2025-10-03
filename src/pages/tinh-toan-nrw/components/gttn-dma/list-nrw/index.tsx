import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Box, Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, InfoOutlined as InfoIcon } from '@mui/icons-material';
import { MaterialReactTable, useMaterialReactTable, type MRT_TableInstance, type MRT_ColumnDef } from 'material-react-table';
import { useSnackbar } from 'notistack';
import { useThemePanel } from "src/components/layout/ThemePanelProvider";
import NrwDetailDialog from "./nrw-detail-dialog"
import AddNrwDialog from "./add-nrw-dialog"
//style
import { THEME_COLORS } from "src/theme/theme_color";
import { MaterialReactTableConfig } from 'src/theme/style_table';
import "src/styles/global.css";
// service
import { createData, updateData, deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { NrwDmaResponse } from "src/types/nrw-dma/nrw-dma";
// text
import { TextForms } from "src/constants/text";

export default function ListNrw() {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<NrwDmaResponse[]>([]);
  const { maDoiTuong, setMaDoiTuong } = useThemePanel();
  const [maDauVao, setMaDauVao] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  // Dialog State
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedRow, setSelectedRow] = useState<NrwDmaResponse | null>(null);

  // Định dạng phần trăm
  const formatPercentage = (num: number | undefined | null): string => {
    if (typeof num !== 'number' || isNaN(num)) return '-';
    return `${num.toFixed(2)} %`;
  };
  // Định dang số
  const formatNumber = (num: number | null | undefined): string => {
    if (num == null || isNaN(num)) return '-';
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getList<NrwDmaResponse>(apiUrls.NRWDMA.list);
        setData(res);
        console.log("NRW Data: ", data)
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu Nrw Công ty:", error);
        enqueueSnackbar(TextForms.thongBao.khongTheTaiDuLieu, { variant: "error" });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setMaDoiTuong(data[0].id);
      setMaDauVao(data[0].id);
    }
  }, [data]);

  // Handle save from NrwDetailDialog
  const handleSave = (updatedRow: NrwDmaResponse) => {
    setData((prev) =>
      prev.map((item) => (item.id === updatedRow.id ? updatedRow : item))
    );
    // enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
    setOpenInfo(false);
  };

  // Handle add from AddNrwDialog
  const handleAdd = (newRow: NrwDmaResponse) => {
    setData((prev) => [...prev, newRow]);
    setMaDoiTuong(newRow.id); // Set maDoiTuong to the id of the newly added row
    setOpenAdd(false);
    setMaDauVao(newRow.id);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedRow) return;
    try {
      await deleteData(apiUrls.NRWCongTyTieuThuChiTiet.deleteByMaTieuThu(maDauVao));
      await deleteData(apiUrls.NRWCongTyDauVaoChiTiet.deleteByMaDauVao(maDauVao));
      await deleteData(apiUrls.NRWCongTy.delete(selectedRow.id));
      setData((prev) => prev.filter((item) => item.id !== selectedRow.id));
      enqueueSnackbar(TextForms.thongBao.xoaThanhCong, { variant: 'success' });
    } catch (error) {
      console.error('Lỗi khi xóa dữ liệu:', error);
      enqueueSnackbar(TextForms.thongBao.loiXoa, { variant: 'error' });
    } finally {
      setOpenDelete(false);
    }
  };

 // Định nghĩa columns
  const columns = useMemo<MRT_ColumnDef<NrwDmaResponse>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 0,
        enableHiding: true,
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        accessorKey: 'maDma',
        header: TextForms.nrw.maDma,
        size: 100,
        Cell: ({ cell }) => cell.getValue<string>() ?? '-',
      },
      {
        accessorKey: 'ky',
        header: TextForms.nrw.ky,
        size: 80,
      },
      {
        accessorKey: 'nam',
        header: TextForms.nrw.nam,
        size: 80,
      },
      {
        accessorKey: 'luongNuocVao',
        header: TextForms.nrw.luongNuocVao,
        size: 150,
        Cell: ({ cell }) => formatNumber(cell.getValue<number>()),
      },
      {
        accessorKey: 'luongNuocTieuThu',
        header: TextForms.nrw.luongNuocTieuThu,
        size: 150,
        Cell: ({ cell }) => formatNumber(cell.getValue<number>()),
      },
      {
        accessorKey: 'luongNuocSucXa',
        header: TextForms.nrw.luongNuocSucXa,
        size: 150,
        Cell: ({ cell }) => formatNumber(cell.getValue<number>()),
      },
      {
        accessorKey: 'luongNuocThatThoat',
        header: TextForms.nrw.luongNuocThatThoat,
        size: 150,
        Cell: ({ cell }) => formatNumber(cell.getValue<number>()),
      },
      {
        accessorKey: 'tyLeThatThoatKyTruoc',
        header: TextForms.nrw.tyLeThatThoatKyTruoc,
        size: 150,
        Cell: ({ cell }) => formatPercentage(cell.getValue<number>()),
      },
      {
        accessorKey: 'tyLeThatThoat',
        header: TextForms.nrw.tyLeThatThoat,
        size: 150,
        Cell: ({ cell }) => formatPercentage(cell.getValue<number>()),
      },
    ],
    [],
  );
  const table = useMaterialReactTable({
    ...MaterialReactTableConfig(0),
    state: {
      isLoading: isLoading,
    },
    initialState: {
      density: 'compact',
      columnVisibility: { id: false },
    },
    columns,
    data: data,
    // bắt sự kiện click vào hàng
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setSelectedRow(row.original);
        setMaDoiTuong(row.original.id);
        setMaDauVao(row.original.id);
        console.log("Dữ liệu chuyển đi: ", row.original);
        // enqueueSnackbar(
        //   `Đang chọn hàng kỳ ${row.original.ky} - năm ${row.original.nam} - id ${row.original.id}`,
        //   { variant: "info" }
        // );
        // <SysInput
        //   maDauVao={row.original.id}
        // />
      },
      sx: {
        cursor: "pointer",
      },
    }),
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
        className="btn add"
        onClick={() => setOpenAdd(true)}
        variant="contained"
        startIcon={<AddIcon style={{ fontSize: "16px" }} />}
      >
        {TextForms.nut.themKyMoi}
      </Button>
    ),
  });

  return (
    <Box sx={{ width: '100%', marginTop: '24px' }}>
      <MaterialReactTable table={table} />

      {/* Dialog thêm mới */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>{TextForms.nut.themKyMoi}</DialogTitle>
        <DialogContent>
          <AddNrwDialog
            onSave={handleAdd}
            onClose={() => setOpenAdd(false)}
            maDoiTuong={0}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog xem chi tiết */}
      <Dialog open={openInfo} onClose={() => setOpenInfo(false)} fullWidth maxWidth="lg">
        <DialogTitle
          sx={{
            color: THEME_COLORS.primary,
            fontWeight: 600,
          }}>
          Chi tiết kỳ {selectedRow?.ky} - Năm {selectedRow?.nam}
        </DialogTitle>
        <DialogContent>
          <NrwDetailDialog row={selectedRow} onSave={handleSave} onClose={() => setOpenInfo(false)} />
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
    </Box>

  );
}
