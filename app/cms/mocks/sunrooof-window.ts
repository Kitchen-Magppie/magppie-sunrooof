import { ComponentComparisonDataEnum, TComponentComparisonDataOption } from "../../../types";

import ClassicalWindowSunrooofLow from "../../QuotationPage/assets/sunrooof/low/Classical.png"
// import FrenchWindowSunrooofLow from "../../QuotationPage/assets/sunrooof/low/French.png"
import ModernWindowSunrooofLow from "../../QuotationPage/assets/sunrooof/low/Modern.png"
// import FlutedWindowSunrooofLow from "../../QuotationPage/assets/sunrooof/low/Fluted.png"
// import LouveredWindowSunrooofLow from "../../QuotationPage/assets/sunrooof/low/Louvered.jpeg"

import ClassicalWindowSunrooofHigh from "../../QuotationPage/assets/sunrooof/high/Classical.jpeg"
// import FrenchWindowSunrooofHigh from "../../QuotationPage/assets/sunrooof/high/French.jpeg"
import ModernWindowSunrooofHigh from "../../QuotationPage/assets/sunrooof/high/Modern.jpeg"
// import FlutedWindowSunrooofHigh from "../../QuotationPage/assets/sunrooof/high/Fluted.jpeg"
// import LouveredWindowSunrooofHigh from "../../QuotationPage/assets/sunrooof/high/Louvered.jpeg"

export const CUSTOMER_COMPONENT_COMPARISON_OPTIONS: TComponentComparisonDataOption[] =
    [
        // Uncomment and update these entries as needed
        // {
        //     label: "Arch Window",
        //     value: ComponentComparisonDataEnum.ArchWindow,
        //     image: { high: FlutedWindowSunrooofHigh, low: FlutedWindowSunrooofLow },
        //     height: 200,
        //     width: 150,
        //     gap: 10,
        //     outerFrameGap: 5,
        //     innerFrameGap: 2
        // },
        {
            label: 'Classical Sunrooof',
            value: ComponentComparisonDataEnum.ClassicalSunrooof,
            image: {
                high: ClassicalWindowSunrooofHigh,
                low: ClassicalWindowSunrooofLow,
            },
            height: 1200, // Example value in mm
            width: 800, // Example value in mm
            gap: 150, // Example value in mm
            outerFrameGap: 25, // Example value in mm
            innerFrameGap: 18, // Example value in mm
        },
        {
            label: 'Minimalist Sunrooof',
            value: ComponentComparisonDataEnum.FlutedMinimalistSunrooof,
            image: { high: '', low: '' },
            height: 1200, // Example value in mm
            width: 400, // Example value in mm
            gap: 25, // Example value in mm
            outerFrameGap: 25, // Example value in mm
            innerFrameGap: 18, // Example value in mm
        },
        // Uncomment and update these entries as needed
        // {
        //     label: "French Window",
        //     value: ComponentComparisonDataEnum.FrenchWindow,
        //     image: { high: FrenchWindowSunrooofHigh, low: FrenchWindowSunrooofLow },
        //     height: 190,
        //     width: 145,
        //     gap: 14,
        //     outerFrameGap: 6,
        //     innerFrameGap: 3
        // },
        // {
        //     label: "Louvered Window",
        //     value: ComponentComparisonDataEnum.LouveredWindow,
        //     image: { high: LouveredWindowSunrooofHigh, low: LouveredWindowSunrooofLow },
        //     height: 175,
        //     width: 135,
        //     gap: 13,
        //     outerFrameGap: 5,
        //     innerFrameGap: 2
        // },
        {
            label: 'Modern Sunrooof',
            value: ComponentComparisonDataEnum.ModernSunrooof,
            image: {
                high: ModernWindowSunrooofHigh,
                low: ModernWindowSunrooofLow,
            },
            height: 1200, // Example value in mm
            width: 400, // Example value in mm
            gap: 40, // Example value in mm
            outerFrameGap: 25, // Example value in mm
            innerFrameGap: 18, // Example value in mm
        },
    ]

