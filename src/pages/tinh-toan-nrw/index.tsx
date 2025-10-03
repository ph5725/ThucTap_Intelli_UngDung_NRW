import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Tabs, Tab, Box, Typography } from "@mui/material";

import GttnDma from "./tabs/gttn-dma";
import GttnCompany1 from "./tabs/gttn-company-1";
import GttnCompany2 from "./tabs/gttn-company-2";
import { height } from "@mui/system";
// theme
// import { appTheme } from "src/theme/theme";
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
        <Tab label="Tính GTTN Công ty chuẩn 1" id="tab-0" />
        <Tab label="Tính GTTN Công ty chuẩn 2" id="tab-1" />
        <Tab label="Tính GTTN DMA" id="tab-2" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <GttnCompany1 />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GttnCompany2 />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GttnDma />
      </TabPanel>
    </Box>
  );
}
