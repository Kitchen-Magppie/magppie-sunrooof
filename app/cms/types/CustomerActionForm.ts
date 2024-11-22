import { _ } from "../../../types";
import { CMS_QUOTATION_OPTIONS, COMPONENT_DESIGN2D_DESIGN_OPTIONS } from "../mocks";
import { IProposedLayoutItem } from "./ProposedLayout";

export function DESIGN_2D_SELECT_OPTION(e: string, proposedLayout: IProposedLayoutItem[], design: string) {
    switch (e) {
        case "design":
            return _.labelify(COMPONENT_DESIGN2D_DESIGN_OPTIONS);
        case "finish":
            return _.labelify(_.keys(CMS_QUOTATION_OPTIONS[design]));
        case "proposedLayout":
            return proposedLayout?.map((item) => ({
                label: item.label,
                value: item.id,
            }));
        default:
            return [];
    }
}
