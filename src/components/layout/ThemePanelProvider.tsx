// src/components/layout/ThemePanelProvider.tsx
import type { ReactNode } from "react";
import { ThemeProvider, CssBaseline, Box, Paper } from "@mui/material";
import { appTheme } from "../../theme/theme";

// ✅ style scrollbar chung
const customScrollbar = {
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
};

interface ThemePanelProviderProps {
  left: ReactNode;
  right: ReactNode;
}

export default function ThemePanelProvider({ left, right }: ThemePanelProviderProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box
        display="flex"
        height="calc(100vh - 160px)"
        width="100%"
        margin="-10px -20px -10px -20px"
        borderColor="transparent"
      >
        {/* Panel trái */}
        <Paper
          sx={{
            flex: 1,
            p: 2,
            overflow: "auto",
            bgcolor: "transparent",
            color: "text.primary",
            borderColor: "transparent",
            ...customScrollbar,
          }}
        >
          {left}
        </Paper>

        {/* Panel phải */}
        <Paper
          sx={{
            flex: 2,
            p: 2,
            overflow: "auto",
            bgcolor: "transparent",
            color: "text.secondary",
            ...customScrollbar,
          }}
        >
          {right}
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
