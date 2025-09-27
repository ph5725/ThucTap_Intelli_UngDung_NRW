import ThemePanelProvider from "../../../components/layout/ThemePanelProvider";
import ListNrw from "../components/gttn-company-2/list-nrw";
import NrwDetail from "../components/gttn-company-2/nrw-details";

export default function GttnCompany1() {
    return (
        <ThemePanelProvider
            left={<>
                Danh sách NRW
                Công ty - chuẩn 2
                <ListNrw />
            </>}
            right={<>
                <NrwDetail />
            </>}
        />
    );
}
