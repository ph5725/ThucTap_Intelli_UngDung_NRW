import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { MaterialReactTable, useMaterialReactTable, type MRT_TableInstance, type MRT_ColumnDef } from 'material-react-table';
import { useSnackbar } from 'notistack';
// Material React Table Custom
import { MaterialReactTableConfig } from '../../../../theme/style_table';
//API
import api from "src/services/api";
import apiUrls from "src/services/api";
// text
import { TextForms } from "src/constants/text";

// Nếu có file màu thì import, tạm định nghĩa cho chạy
const THEME_COLORS = {
  primary: '#1976d2',
  primaryLight: '#42a5f5',
  text: { secondary: '#6c757d' },
};

// Định nghĩa type cho dữ liệu NRW
interface NRWData {
  id: number;
  sysInput: number;
  billedAuth: number;
  nrw: number;
  percentnrw?: number;
  period: string;
  year: number;
  fromdate: string;
  todate: string;
  daynumber: number;
}

interface NRWDataResponse {
  data: {
    result: NRWData[];
    total: number;
  };
  message: string;
}

export default function ListNrw() {
  const { enqueueSnackbar } = useSnackbar();

  const [openAddPeriod, setOpenAddPeriod] = useState(false);
  const [nrwData, setNRWData] = useState<NRWData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // modal delete
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // loading for recen
  const [progress, setProgress] = useState(0);

  // paging
  const [totalPage, setTotalPage] = useState(0);

  // container
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Format percentage
  const formatPercentage = (num: number | undefined | null): string => {
    if (typeof num !== 'number' || isNaN(num)) return '-';
    return `${num.toFixed(2)} %`;
  };

  // Format number theo định dạng Việt Nam
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<NRWDataResponse>("/nrwCongTy");
        setNRWData(response.data.data.result);
        setTotalPage(response.data.data.total);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        enqueueSnackbar("Không thể tải dữ liệu NRW", { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Định nghĩa columns
  const columns = useMemo<MRT_ColumnDef<NRWData>[]>(
    () => [
      {
        accessorKey: 'sysInput',
        header: TextForms.nrw.sanLuongMuaVao,
        size: 150,
        Cell: ({ cell }) => formatNumber(cell.getValue<number>()),
      },
      {
        accessorKey: 'billedAuth',
        header: TextForms.nrw.sanLuongMuaVao,
        size: 150,
        Cell: ({ cell }) => formatNumber(cell.getValue<number>()),
      },
      {
        accessorKey: 'nrw',
        header: TextForms.nrw.sanLuongMuaVao,
        size: 200,
        Cell: ({ cell }) => formatNumber(cell.getValue<number>()),
      },
      {
        accessorKey: 'percentnrw',
        header: TextForms.nrw.sanLuongMuaVao,
        size: 150,
        Cell: ({ row }) => {
          const sysInput = row.original.sysInput;
          const nrw = row.original.nrw;
          if (!sysInput) return '-';
          const percent = (nrw / sysInput) * 100;
          return formatPercentage(percent);
        },
      },
      {
        accessorKey: 'period',
        header: TextForms.nrw.sanLuongMuaVao,
        size: 80,
      },
      {
        accessorKey: 'year',
        header: TextForms.nrw.sanLuongMuaVao,
        size: 100,
      },
      {
        accessorKey: 'fromdate',
        header: TextForms.nrw.sanLuongMuaVao,
        size: 120,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue<string>());
          return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        },
      },
      {
        accessorKey: 'todate',
        header: TextForms.nrw.sanLuongMuaVao,
        size: 120,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue<string>());
          return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        },
      },
      {
        accessorKey: 'daynumber',
        header: TextForms.nrw.sanLuongMuaVao,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    state: {
      isLoading: isLoading,
      showSkeletons: isLoading,
      showAlertBanner: false,
      showProgressBars: false,
      columnVisibility: {
        id: false, // Ẩn cột ID
      },
    },
    initialState: {
      pagination: {
        pageSize: 12,
        pageIndex: 0,
      },
      density: 'compact',
    },
    ...MaterialReactTableConfig(containerWidth),
    columns,
    data: nrwData,
    pageCount: totalPage,
    // getRowId: (row) => row.id.toString(),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title={TextForms.nut.xoa}>
          <Button
            size="small"
            color="error"
            onClick={() => console.log("Xóa row", row.original)}
            sx={{ minWidth: 28, p: 0.5 }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Tooltip>
      </Box>
    ),
    renderEmptyRowsFallback: (props: { table: MRT_TableInstance<NRWData> }) => (
      <Box sx={{ p: 2, textAlign: 'center', color: THEME_COLORS.text.secondary }}>
        {TextForms.thongBao.khongCoDuLieu}
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button
        onClick={() => setOpenAddPeriod(true)}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: THEME_COLORS.primary,
          color: 'white',
          textTransform: 'none',
          borderRadius: 1,
          px: 2,
          py: 1,
          fontSize: '14px',
          '&:hover': {
            backgroundColor: THEME_COLORS.primaryLight,
          },
        }}
      >
        {TextForms.nut.themKyMoi}
      </Button>
    ),
    muiSearchTextFieldProps: {
      placeholder: TextForms.tieuDe.timKiem + '...',
    },
  });

  return (
    <Box sx={{ width: '100%' }} ref={containerRef}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
