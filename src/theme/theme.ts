import { createTheme, alpha, lighten, darken } from "@mui/material/styles";
import { THEME_COLORS } from "./theme_color";
import { borderBottom, borderBottomColor } from "@mui/system";

export const appTheme = createTheme({
  // 🎨 Màu sắc chung
  palette: {
    primary: { main: THEME_COLORS.primary },
    secondary: { main: THEME_COLORS.primaryLight },
    background: { default: THEME_COLORS.background },
    text: {
      primary: THEME_COLORS.text.primary,
      secondary: THEME_COLORS.text.secondary,
    },
    divider: THEME_COLORS.border,
  },

  // ⚙️ Override giao diện mặc định của MUI components
  components: {
     // 🔹 ButtonBase (nền của mọi Button, Tab, IconButton,...)
    // MuiButtonBase: {
    //   styleOverrides: {
    //     root: {
    //       border: 0,
    //       borderColor: "transparent",
    //       borderRadius: 8, // bo góc cho tất cả button
    //       padding: "6px 12px",
    //       "&:hover": {
    //         backgroundColor: THEME_COLORS.primaryLight,
    //         opacity: 0.9,
    //       },
    //       "&.Mui-disabled": {
    //         backgroundColor: THEME_COLORS.border,
    //         color: THEME_COLORS.text.secondary,
    //         opacity: 0.6,
    //       },
    //     },
    //   },
    // },
    
    // ===== TAB =====
    // 🔹 Tab (thẻ điều hướng)
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          border: `1px solid transparent`,
          borderRadius: "8px 8px 0 0",
          marginRight: 8,
          padding: "8px 16px",
          "&.Mui-selected": {
            color: THEME_COLORS.primary,
            backgroundColor: THEME_COLORS.tableHeader,
            // border: `1px solid ${THEME_COLORS.primary}`,
            // borderBottom: "none",
          },
          "&:hover": {
            backgroundColor: alpha(THEME_COLORS.primaryLight, 0.1),
            borderBottomColor: `1px solid ${THEME_COLORS.primary}`,
            borderBottom: `1px solid ${THEME_COLORS.primary}`,
            border: 'none'
          },
        },
      },
    },

    // 🔹 Tabs container
    MuiTabs: {
      styleOverrides: {
        // indicator: { display: "none" }
      },
    },

    // ===== BẢNG =====
    // Header cell
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: THEME_COLORS.tableHeader,
          border: `1px solid ${THEME_COLORS.border}`,
          fontWeight: 600,
          fontSize: "12px",
          color: THEME_COLORS.text.primary,
          verticalAlign: "middle",
          paddingTop: 8,
          paddingBottom: 8,
        },
        body: {
          border: `1px solid ${THEME_COLORS.border}`,
          fontSize: "13px",
          fontWeight: "normal",
          textAlign: "center",
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    },

    // Pagination
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          backgroundColor: THEME_COLORS.tableHeader,
          borderTop: `1px solid ${THEME_COLORS.border}`,
          minHeight: "40px",
          height: "40px",
        },
      },
    },

    // Toolbar (phía trên/bên dưới bảng)
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: THEME_COLORS.tableHeader,
          minHeight: "40px !important",
          height: "40px",
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
    },
  },
});
