import { _ } from "../../../types";
import { COMPONENT_DESIGN2D_DESIGN_OPTIONS, COMPONENT_DESIGN2D_FINISH_OPTIONS } from "../mocks";
import { IProposedLayoutItem } from "./ProposedLayout";

export function DESIGN_2D_SELECT_OPTION(e: string, proposedLayout: IProposedLayoutItem[]) {
    switch (e) {
        case "design":
            return _.labelify(COMPONENT_DESIGN2D_DESIGN_OPTIONS);
        case "finish":
            return _.labelify(COMPONENT_DESIGN2D_FINISH_OPTIONS);
        case "proposedLayout":
            return proposedLayout?.map((item) => ({
                label: item.label,
                value: item.url.proposed,
            }));
        default:
            return [];
    }
}
