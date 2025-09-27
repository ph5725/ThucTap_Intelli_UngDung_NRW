import ThemePanelProvider from "../../../components/layout/ThemePanelProvider";
import ListNrw from "../components/gttn-company-1/list-nrw";
import NrwDetail from "../components/gttn-company-1/nrw-details";

export default function GttnCompany1() {
    // return (
    //     <ThemeProvider theme={appTheme}>
    //         <CssBaseline /> {/* reset css + set background theo theme */}
    //         <Box
    //             display="flex"
    //             height="calc(100vh - 160px)"
    //             width="100%"
    //             margin="-10px -20px -10px -20px"
    //             borderColor="transparent"
    //         >
    //             {/* Panel trái */}
    //             <Paper
    //                 // elevation={3}
    //                 sx={{
    //                     flex: 1,
    //                     p: 2,
    //                     overflow: "auto",
    //                     bgcolor: "transparent",
    //                     color: "text.primary",
    //                     borderColor: "transparent",
    //                     "&::-webkit-scrollbar": {
    //                         width: "6px",        // 👈 độ rộng thanh cuộn dọc
    //                         height: "6px",       // 👈 độ cao thanh cuộn ngang
    //                     },
    //                     "&::-webkit-scrollbar-thumb": {
    //                         backgroundColor: "rgba(0,0,0,0.3)", // màu thanh cuộn
    //                         borderRadius: "4px",
    //                     },
    //                     "&::-webkit-scrollbar-track": {
    //                         backgroundColor: "transparent",     // nền trong suốt
    //                     },
    //                 }}
    //             >
    //                 <Typography variant="h6">Danh sách NRW</Typography>
    //                 <p>Nrw công ty - chuẩn 1</p>
    //                 <LeftContent />
    //             </Paper>

    //             {/* Panel phải */}
    //             <Paper
    //                 // elevation={3}
    //                 sx={{
    //                     flex: 2,
    //                     p: 2,
    //                     overflow: "auto",
    //                     bgcolor: "transparent",
    //                     color: "text.secondary",
    //                 }}
    //             >
    //                 <Typography variant="h6">Panel Phải</Typography>
    //                 <p>Nội dung panel bên phải</p>
    //                 <RightContent />
    //             </Paper>
    //         </Box>
    //     </ThemeProvider>
    // );
    return (
        <ThemePanelProvider
            left={<>
                Danh sách NRW
                Công ty - chuẩn 1
                <ListNrw />
            </>}
            right={<>
                <NrwDetail />
            </>}
        />
    );
}
