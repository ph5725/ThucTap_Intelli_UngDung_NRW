import type { MRT_ColumnDef,  MRT_TableInstance, MRT_TableOptions, } from 'material-react-table';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
import { THEME_COLORS } from 'src/theme/theme_color';

/**
 * Định nghĩa props chung cho MaterialReactTable
 */
interface TableProps<T extends Record<string, any>> {
    columns: MRT_ColumnDef<T>[]; // cấu hình cột
    data: T[]; //cấu hình dữ liệu
    isLoading?: boolean;
    totalPage?: number;
    onAdd?: () => void;
    onDelete?: (row: any) => void;
    addLabel?: string;
    emptyLabel?: string;
    searchPlaceholder?: string;
    actionsColumn?: boolean;
    getRowId?: (row: T) => string | number;
    containerWidth?: number;
    onEditingRowSave?: ({ row, values, table }: { row: any; values: any; table: any }) => Promise<void>;
    options?: Partial<MRT_TableOptions<T>>; /** Tuỳ chọn mở rộng (phân trang, sort, filter, ...) */
    onTableInit?: (table: MRT_TableInstance<T>) => void; /** Callback khi đã khởi tạo xong table instance */
    initialState?: {
    density?: string;
    pagination?: {
      pageSize: number;
      pageIndex: number;
    };
    columnVisibility?: Record<string, boolean>;
  }
}

function StyledMRT<T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  totalPage = 0,
  onAdd,
  onDelete,
  // addLabel = {t('general.button.add_new_period')},
  // emptyLabel = 'Không có dữ liệu',
  // searchPlaceholder = 'Tìm kiếm...',
  actionsColumn = true,
  getRowId,
  containerWidth,
  ...rest
}: TableProps<T>) {
  const table = useMaterialReactTable({
    localization: MRT_Localization_VI,
    state: {
      isLoading,
      showSkeletons: isLoading,
      showAlertBanner: false,
      showProgressBars: false,
      columnVisibility: {
        id: false,
      },
    },
    pageCount: totalPage,
    getRowId,
    columns,
    data,

    // ==== Cấu hình tính năng ====
    enableColumnFilters: true,   // Lọc dữ liệu theo từng cột
    enableGlobalFilter: true,    // Ô tìm kiếm toàn cục (search box ở toolbar)
    enableFilters: true,         // Kết hợp cả column filter + global filter
    enableHiding: true,          // Cho phép ẩn/hiện cột
    enableTopToolbar: true,       // Hiển thị thanh công cụ phía trên (search, export…)
    enableBottomToolbar: true,   // Hiển thị toolbar phía dưới (pagination, info, search…)
    enablePagination: true,       // Bật phân trang (kết hợp với muiPaginationProps)
    enableSorting: true,          // Cho phép sắp xếp dữ liệu theo cột (click header để sort ASC/DESC)
    enableRowActions: true,       // Hiển thị cột hành động (edit/delete/...)
    positionActionsColumn: "first",

    enableColumnActions: false,   // Menu 3 chấm trên cột (ẩn/hiện filter, sort…)
    enableMultiSort: false,        // Cho phép sắp xếp nhiều cột cùng lúc (giữ Shift + click)
    enableColumnDragging: false,   // Cho phép kéo thả thay đổi vị trí cột
    enableColumnResizing: false,   // Cho phép kéo thay đổi độ rộng cột
    enableRowSelection: false,    // Chọn dòng (checkbox); false = tắt
    enableSelectAll: false,        // Cho phép "Chọn tất cả" khi row selection bật
    enableSubRowSelection: false,  // Cho phép chọn hàng con (khi dữ liệu tree)
    enableRowNumbers: false,       // Hiển thị số thứ tự (index) ở cột đầu
    enableRowDragging: false,     // Kéo thả để sắp xếp lại các hàng
    enableRowVirtualization: false,// Virtual scroll cho bảng nhiều dữ liệu (tăng hiệu suất)
    enableExpanding: false,        // Mở rộng dòng để hiển thị chi tiết
    enableGrouping: false,         // Group dữ liệu theo cột
    enableEditing: false,         // Cho phép chỉnh sửa trực tiếp dữ liệu (inline edit)
    enableStickyHeader: false,     // Giữ header cố định khi scroll
    enableStickyFooter: false,     // Giữ footer cố định khi scroll
    enableTableFooter: false,      // Hiển thị footer tổng cuối bảng (tổng, tính toán…)
    enableDensityToggle: false,    // Cho phép chọn mật độ hiển thị (compact/comfortable)
    enableFullScreenToggle: false, // Cho phép bật full screen

    // ==== Container ====
    muiTableContainerProps: {
      sx: {
        // maxHeight: 'calc(100% - 500px)',
        maxHeight: '100%',
        minHeight: '150px',
        overflow: 'auto',
        // maxWidth: containerWidth,
        width: '100%',
        overflowX: 'auto',
        overflowY: 'auto',
        // height: 'calc(100% - 100px)',
      },
    },

    // ==== Table Paper ====
    muiTablePaperProps: {
      sx: {
        width: '100%',
        border: 'none',
        borderRadius: 0,
        overflow: 'hidden',
        boxShadow: 'none',
      },
    },

    // ==== Header Cells (Sorting + Column Actions) ====
    muiTableHeadCellProps: {
      align: 'center',
      sx: {
        backgroundColor: THEME_COLORS.tableHeader,
        // backgroundColor: '1px solid #7e1b1bff',
        // border: `1px solid ${THEME_COLORS.border}`,
        fontWeight: 600,
        fontSize: '12px',
        color: THEME_COLORS.text.primary,
        // '& .Mui-TableHeadCell-Content': {
        //   justifyContent: 'center',
        // },
        alignContent: 'center',
        verticalAlign: 'middle',
        py: 1,
        // Sort label (sắp xếp)
        '& .MuiTableSortLabel-root': {
          color: THEME_COLORS.text.primary,
          '&.Mui-active': {
            color: THEME_COLORS.text.secondary, // màu khi đang sort
          },
        },
        '& .MuiTableSortLabel-icon': {
          color: THEME_COLORS.text.secondary,
          fontSize: '16px',
        },

        // Column actions (menu 3 chấm)
        '& .MuiIconButton-root': {
          color: THEME_COLORS.text.secondary,
          padding: '4px',
        },
      },
    },

    // ==== Filter Input (Column Filters) ====
    muiFilterTextFieldProps: {
      placeholder: 'Nhập từ khóa...',
      size: 'small',
      sx: { fontSize: '13px', minWidth: '150px' },
    },

    // ==== Body Cells ====
    muiTableBodyCellProps: {
      align: "center" as const,
      sx: {
        // border: `1px solid ${theme.palette.divider}`,
        
        border: `1px solid ${THEME_COLORS.border}`,
        fontSize: '13px',
        fontWeight: 'normal',
        py: 1,
        height: '40px'
      },
    },

    // ==== Bottom Toolbar (Pagination, Info) ====
    muiBottomToolbarProps: {
      sx: {
        backgroundColor: THEME_COLORS.tableHeader,
        py: 1,
        px: 2,
        '& .MuiTablePagination-root': {
          fontSize: '12px',
        },
      },
    },

    // ==== Pagination ====
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 20, 50],
      shape: 'rounded' as const,
      color: 'primary' as const,
      showFirstButton: false,
      showLastButton: false,
    },

    // ==== Table ====
    muiTableProps: {
      sx: {
        border: `1px solid ${THEME_COLORS.border}`,
        tableLayout: 'auto'
      },
      stickyHeader: true,  // giữ header cố định khi scroll
    },

    // positionActionsColumn: "first",
    renderRowActions: onDelete
      ? ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Xóa">
            <Button
              size="small"
              color="error"
              onClick={() => onDelete(row)}
              sx={{ minWidth: 28, p: 0.5 }}
            >
              <DeleteIcon fontSize="small" />
            </Button>
          </Tooltip>
        </Box>
      )
      : undefined,
    renderEmptyRowsFallback: () => (
      <Box sx={(theme) => ({ p: 2, textAlign: 'center', color: theme.palette.text.secondary })}>
        {/* {t('general.noti.noRecordsToDisplay')} */}123
      </Box>
    ),
    initialState: {
      pagination: {
        pageSize: 12,
        pageIndex: 0,
      },
      density: 'compact',
    },
    renderTopToolbarCustomActions: onAdd
      ? () => (
        <Button
          onClick={onAdd}
          variant="contained"
          startIcon={<AddIcon />}
          sx={(theme) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            textTransform: 'none',
            borderRadius: 1,
            px: 2,
            py: 1,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            },
          })}
        >
          {/* {t('general.button.add_new_period')} */}123
        </Button>
      )
      : undefined,

    // ==== Global Search Box ====
    muiSearchTextFieldProps: {
      placeholder: 123 + '...',
      sx: {
        minWidth: '200px',
        '& .MuiOutlinedInput-root': {
          fontSize: '14px',
          height: '38px',
        },
      },
    },
    ...rest,
  });

  return <MaterialReactTable table={table} />;
}

export default StyledMRT;
