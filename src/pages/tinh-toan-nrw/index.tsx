import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { appTheme } from "../../theme/theme"; // import theme chung
import GttnDma from "./tabs/gttn-dma";
import GttnCompany1 from "./tabs/gttn-company-1";
import GttnCompany2 from "./tabs/gttn-company-2";
import { height } from "@mui/system";

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
    <ThemeProvider theme={appTheme}>
      <Box sx={{ width: "100%", height: "calc(100vh - 300px)", bgcolor: appTheme.palette.background.default, }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs tính toán NRW"
           sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '14px',
            },
          }}
        >
          <Tab 
        //    sx={{
        //       backgroundColor: value === 0 ? '#e3f2fd' : 'transparent',
        //       borderRadius: '8px 8px 0 0',
        //       margin: '0 2px'
        //     }}
          label="Tính GTTN Công ty chuẩn 1" id="tab-0" />
          <Tab 
        //    sx={{
        //       backgroundColor: value === 1 ? '#e3f2fd' : 'transparent',
        //       borderRadius: '8px 8px 0 0',
        //       margin: '0 2px'
        //     }}
          label="Tính GTTN Công ty chuẩn 2" id="tab-1" />
          
          <Tab 
        //   sx={{
        //       backgroundColor: value === 2 ? '#e3f2fd' : 'transparent',
        //       borderRadius: '8px 8px 0 0',
        //       margin: '0 2px'
        //     }}
          label="Tính GTTN DMA" id="tab-2" />
        </Tabs>

        <TabPanel value={value} index={0} 
        >
          <GttnCompany1 />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GttnCompany2 />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <GttnDma />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}
