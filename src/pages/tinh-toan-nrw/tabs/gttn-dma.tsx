import ThemePanelProvider from "../../../components/layout/ThemePanelProvider";
import ListNrw from "../components/gttn-dma/list-nrw";
import NrwDetail from "../components/gttn-dma/nrw-details";

export default function GttnDma() {
    return (
        <ThemePanelProvider
            left={<>
                Danh sách NRW
                Dma
                <ListNrw />
            </>}
            right={<>
                <NrwDetail />
            </>}
        />
    );
}
