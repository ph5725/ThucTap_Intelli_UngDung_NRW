import ThemePanelProvider from "../../../components/layout/ThemePanelProvider";
import ListNrw from "../components/gttn-dma/list-nrw";
import NrwDetail from "../components/gttn-dma/nrw-details";

export default function GttnDma() {
    return (
        <ThemePanelProvider
            left={<>
                <strong>Danh sách NRW DMA</strong>
                <ListNrw />
            </>}
            right={<>
                <NrwDetail />
            </>}
        />
    );
}
