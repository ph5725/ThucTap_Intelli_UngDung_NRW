import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Tabs, Tab, Box, Typography } from "@mui/material";

import SysInput from "./sys-input";
import BilledAuth from "./billed-auth";
import { height } from "@mui/system";
// theme
import { THEME_COLORS } from "src/theme/theme_color";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

export default function TinhNRW() {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 300px)" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs tính toán NRW"
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontSize: '14px',
            color: '#555', // inactive
            backgroundColor: 'transparent',
            border: 'none'
          },
          '& .MuiTab-root:hover': {
            color: THEME_COLORS.primary, // hover
            backgroundColor: 'transparent',
            fontWeight: 'bold',
          },
          '& .Mui-selected': {
            color: THEME_COLORS.primary, // active
            fontWeight: 'bold',
            borderBottom: `2px solid ${THEME_COLORS.primary}`,
            backgroundColor: 'transparent',
          },
          '& .Mui-disabled': {
            textTransform: 'none',
            fontSize: '14px',
            color: '#55555550', // disable
            backgroundColor: 'transparent',
            border: 'none'
          },
        }}
      >
        <Tab label="Sản lượng đầu vào" id="tab-0" />
        <Tab label="Sản lượng tiêu thụ" id="tab-1" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SysInput />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BilledAuth />
      </TabPanel>
    </Box>
  );
}
