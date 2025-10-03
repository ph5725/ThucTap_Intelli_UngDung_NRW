// import ThemePanelProvider from "../../../components/layout/ThemePanelProvider";
import { ThemePanelProvider  } from "src/components/layout/ThemePanelProvider";
import { SnackbarProvider } from 'notistack';
import ListNrw from "../components/gttn-company-2/list-nrw";
import NrwDetail from "../components/gttn-company-2/nrw-details";

export default function GttnCompany1() {
    return (
        <SnackbarProvider
            maxSnack={3} // Số lượng snackbar tối đa hiển thị cùng lúc
            autoHideDuration={3000} // Thời gian tự động ẩn (ms)
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Vị trí hiển thị (góc trên phải)
            // Tùy chọn: Thêm style cho snackbar
            style={{ fontSize: '14px' }}
        >
            <ThemePanelProvider
                left={<>
                    <strong>Danh sách NRW Công ty - chuẩn 2</strong>
                    <ListNrw />
                </>}
                right={<>
                    <NrwDetail />
                </>}
            />
        </SnackbarProvider>
    );
}
