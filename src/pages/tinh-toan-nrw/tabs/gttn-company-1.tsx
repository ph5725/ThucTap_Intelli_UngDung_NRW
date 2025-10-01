import ThemePanelProvider from "../../../components/layout/ThemePanelProvider";
import ListNrw from "../components/gttn-company-1/list-nrw";
import NrwDetail from "../components/gttn-company-1/nrw-details";

export default function GttnCompany1() {
    return (
        <ThemePanelProvider
            left={<>
                <strong>Danh sách NRW Công ty - chuẩn 1</strong>
                <ListNrw />
            </>}
            right={<>
                <NrwDetail />
            </>}
        />
    );
}
