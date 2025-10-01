import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import { THEME_COLORS } from "./theme_color";
import 'src/styles/global.css'

export const MaterialReactTableConfig = (containerWidth: number | undefined) => ({
    localization: MRT_Localization_VI,

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
    positionActionsColumn: "first" as const,
    // editDisplayMode: 'row',

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
        className: "custom-scrollbar",
        sx: {
            height: '100%',
            maxHeight: '100%',
            minHeight: '100%',

            width: '100%',
            minWidth: '100%',
            maxWidth: '100%',

            overflow: 'auto',
            overflowX: 'auto',
            overflowY: 'auto',

            // ...customScrollbar, , 
            ...(containerWidth !== undefined ? { maxWidth: containerWidth } : {}),
        },
    },

    // ==== Table Paper ====
    muiTablePaperProps: {
        sx: {
            height: '100%',
            maxHeight: '100%',
            minHeight: '100%',

            width: '100%',
            minWidth: '100%',
            maxWidth: '100%',

            border: 'none',
            borderRadius: 0,
            overflow: 'hidden',
            boxShadow: 'none',
        },
    },

    // ==== Body ====
    muiTableBodyProps: {
        sx: {
            // minHeight: '150px', // giữ khung body
            // maxHeight: "500px",
            flex: 1,
            overflowY: 'auto',
        },
    },

    // ==== Header Cells (Sorting + Column Actions) ====
    muiTableHeadCellProps: {
        align: "center" as const,
        sx: {
            backgroundColor: THEME_COLORS.tableHeader,
            border: `1px solid ${THEME_COLORS.border}`,
            // fontWeight: 400,
            fontSize: '12px',
            color: THEME_COLORS.text.secondary,
            verticalAlign: 'middle',
            py: 1,
            minHeight: '40px',

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
        size: "small" as const,
        sx: { fontSize: '13px', minWidth: '150px' },
    },

    // ==== Global Search Box ====
    muiSearchTextFieldProps: {
        sx: {
            minWidth: '200px',
            '& .MuiOutlinedInput-root': {
                fontSize: '14px',
                height: '38px',
            },
        },
    },

    // ==== Body Cells ====
    muiTableBodyCellProps: {
        align: "center" as const,
        sx: {
            with: '100%',
            height: '40px',
            minHeight: '40px',
            border: `1px solid ${THEME_COLORS.border}`,
            fontSize: '13px',
            fontWeight: 'normal',
            py: 1,
        },
    },

    // ==== Bottom Toolbar (Pagination, Info) ====
    muiBottomToolbarProps: {
        sx: {
            borderRadius: '0px',
            flexShrink: 0,
            backgroundColor: THEME_COLORS.tableFooter,
            py: 1,
            px: 2,
            '& .MuiTablePagination-root': {
                fontSize: '12px',
            },
            height: '40px'
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
        stickyHeader: true,  // giữ header cố định khi scroll
        sx: {
            border: `1px solid ${THEME_COLORS.border}`,
            tableLayout: 'auto',
            overflowY: 'auto',
        },
    },

    // ==== Loading ====
    muiCircularProgressProps: {
        color: "secondary" as const,
        thickness: 4,
        size: 45,
    },
    muiSkeletonProps: {
        animation: "pulse" as const,
        height: 28,
    },
});
