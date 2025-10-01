// import { Card, CardContent, Typography } from "@mui/material";

// export default function NrwDetail() {
//   return (
//     <Card sx={{ height: "100%" }}>
//       <CardContent>
//         <Typography variant="h6">Khung bên phải</Typography>
//         <Typography variant="body2">
//           Đây là một component khác được import vào
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { MaterialReactTable, useMaterialReactTable, type MRT_TableInstance, type MRT_ColumnDef } from 'material-react-table';
import { useSnackbar } from 'notistack';
// Material React Table Custom
import { MaterialReactTableConfig } from '../../../../theme/style_table';
// service
import { createData, updateData, deleteData, getList } from "src/services/crudService";
import { apiUrls } from "src/services/apiUrls";
// interface
import { AddNrwCongTyRequest, NrwCongTyResponse, UpdateNrwCongTyRequest } from "src/types/nrw-cong-ty/nrw-cong-ty";
// text
import { TextForms } from "src/constants/text";

// Nếu có file màu thì import, tạm định nghĩa cho chạy
const THEME_COLORS = {
  primary: '#1976d2',
  primaryLight: '#42a5f5',
  text: { secondary: '#6c757d' },
};

// Định nghĩa type cho dữ liệu NRW
// interface NRWData {
//   id: number;
//   sanLuongVao: number;
//   sanLuongRa: number;
//   luongNuocThatThoat: number;
//   tyLeThatThoat?: number;
//   ky: string;
//   nam: number;
//   tuNgay: string;
//   denNgay: string;
//   soNgay: number;
// }

interface NRWDataResponse {
  data: {
    result: NrwCongTyResponse[];
    total: number;
  };
  message: string;
}

export default function NrwDetail() {
  const { enqueueSnackbar } = useSnackbar();

  const [openAddPeriod, setOpenAddPeriod] = useState(false);
  const [nrwData, setNRWData] = useState<NrwCongTyResponse[]>([]);
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await api.get<NRWDataResponse>("/nrwCongTy");
  //       setNRWData(response.data.data.result);
  //       setTotalPage(response.data.data.total);
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error);
  //       enqueueSnackbar("Không thể tải dữ liệu NRW", { variant: "error" });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Lấy dữ liệu từ API
    useEffect(() => {
      const fetchData = async () => {
        try {
          // const res = await billingService.getAll();
          const res = await getList<NrwCongTyResponse>(apiUrls.NRWCongTy.list);
          setNRWData(res);
          console.log("Dữ liệu: ", res);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu Nrw Công ty:", error);
          alert(TextForms.thongBao.khongTheTaiDuLieu);
        }
      };
      fetchData();
    }, []);

  // Định nghĩa columns
  const columns = useMemo<MRT_ColumnDef<NrwCongTyResponse>[]>(
    () => [
      {
        accessorKey: 'sanLuongDauVao',
        header: TextForms.nrw.sanLuongMuaVao,
        size: 150,
        Cell: ({ cell }) => formatNumber(cell.getValue<number>()),
      },
      {
        accessorKey: 'sanLuongTieuThu',
        header: TextForms.nrw.sanLuongBanRa,
        size: 150,
        Cell: ({ cell }) => formatNumber(cell.getValue<number>()),
      },
      {
        accessorKey: 'luongNuocThatThoat',
        header: TextForms.nrw.luongNuocThatThoat,
        size: 200,
        Cell: ({ cell }) => formatNumber(cell.getValue<number>()),
      },
      {
        accessorKey: 'tyLeThatThoat',
        header: TextForms.nrw.tyLeThatThoat,
        size: 150,
        Cell: ({ row }) => {
          const sanLuongVao = row.original.sanLuongDauVao;
          const tyLeThatThoat = row.original.tyLeThatThoatChuan1 ?? 0;
          if (!sanLuongVao) return '-';
          const percent = (tyLeThatThoat / sanLuongVao) * 100;
          return formatPercentage(percent);
        },
      },
      {
        accessorKey: 'ky',
        header: TextForms.nrw.ky,
        size: 80,
      },
      {
        accessorKey: 'nam',
        header: TextForms.nrw.nam,
        size: 100,
      },
      {
        accessorKey: 'tuNgay',
        header: TextForms.nrw.tuNgay,
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
        accessorKey: 'denNgay',
        header: TextForms.nrw.denNgay,
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
        accessorKey: 'soNgayDocSoDht',
        header: TextForms.nrw.soNgayDocSoDht,
      },
       {
        accessorKey: 'soNgayDocSoBilling',
        header: TextForms.nrw.soNgayDocSoBilling,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    ...MaterialReactTableConfig(0),
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
      // pagination: {
      //   pageSize: 12,
      //   pageIndex: 0,
      // },
      density: 'compact',
    },
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
    renderEmptyRowsFallback: (props: { table: MRT_TableInstance<NrwCongTyResponse> }) => (
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

