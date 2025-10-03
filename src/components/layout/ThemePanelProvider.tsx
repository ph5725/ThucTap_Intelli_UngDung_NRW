import React, { createContext, useState, useContext, ReactNode } from "react";
import { ThemeProvider, CssBaseline, Box, Paper, Divider } from "@mui/material";
import { appTheme } from "../../theme/theme";

// ✅ style scrollbar chung
const customScrollbar = {
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
};

// ==== Context định nghĩa ====
interface ThemePanelContextType {
  maDoiTuong: number | null;
  setMaDoiTuong: (id: number) => void;
}

const ThemePanelContext = createContext<ThemePanelContextType | undefined>(undefined);

// ==== Props cho Provider ====
interface ThemePanelProviderProps {
  left: ReactNode;
  right: ReactNode;
}

export const ThemePanelProvider: React.FC<ThemePanelProviderProps> = ({ left, right }) => {
  const [maDoiTuong, setMaDoiTuong] = useState<number | null>(null);

  return (
    <ThemePanelContext.Provider value={{ maDoiTuong, setMaDoiTuong }}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Box
          display="flex"
          height="calc(100vh - 154px)"
          width="100vw - 300px"
          margin="-10px -20px -10px -20px"
        >
          {/* Panel trái */}
          <Paper
            sx={{
              width: "100%",
              flex: 5,
              p: 1,
              overflow: "auto",
              bgcolor: "#ffffffff",
              color: "text.primary",
              boxShadow: "none",
              border: "1px solid #ebebebff",
              ...customScrollbar,
            }}
          >
            {left}
          </Paper>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          {/* Panel phải */}
          <Paper
            sx={{
              flex: 5,
              p: 1,
              overflow: "auto",
              bgcolor: "#ffffffff",
              color: "text.secondary",
              boxShadow: "none",
              border: "1px solid #ebebebff",
              ...customScrollbar,
            }}
          >
            {right}
          </Paper>
        </Box>
      </ThemeProvider>
    </ThemePanelContext.Provider>
  );
};

// ==== Hook dùng trong list-nrw / sys-input / billed-auth ====
export const useThemePanel = () => {
  const ctx = useContext(ThemePanelContext);
  if (!ctx) throw new Error("useThemePanel must be used within ThemePanelProvider");
  return ctx;
};
