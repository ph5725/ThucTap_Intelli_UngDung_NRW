import React from "react";
import { Box, Button } from "@mui/material";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { THEME_COLORS } from "src/theme/theme_color";
import { MaterialReactTableConfig } from "src/theme/style_table";

export interface GenericTableProps<T extends object> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  totalPage?: number;
  onAdd?: () => void; // callback khi click nút thêm
  addLabel?: string;
  renderRowActions?: (row: T) => React.ReactNode;
}

export default function GenericTable<T extends object>({
  columns,
  data,
  isLoading = false,
  totalPage = 0,
  onAdd,
  addLabel = "Thêm mới",
  renderRowActions,
}: GenericTableProps<T>) {
  const table = useMaterialReactTable<T>({
    ...MaterialReactTableConfig(0),
    state: {
      isLoading,
      showSkeletons: isLoading,
      showAlertBanner: false,
      showProgressBars: false,
      columnVisibility: {
        id: false, // Ẩn ID nếu có
      },
    },
    initialState: {
      density: "compact",
    },
    columns,
    data,
    pageCount: totalPage,
    renderRowActions: renderRowActions
      ? ({ row }) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            {renderRowActions(row.original)}
          </Box>
        )
      : undefined,
    renderEmptyRowsFallback: () => (
      <Box sx={{ p: 2, textAlign: "center", color: THEME_COLORS.text.secondary }}>
        Không có dữ liệu
      </Box>
    ),
    renderTopToolbarCustomActions: () =>
      onAdd ? (
        <Button
          onClick={onAdd}
          variant="contained"
          sx={{
            textTransform: "none",
            py: 1,
          }}
        >
          {addLabel}
        </Button>
      ) : null,
    muiSearchTextFieldProps: {
      placeholder: "Tìm kiếm...",
    },
  });

  return (
    <Box sx={{ width: "100%" }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
