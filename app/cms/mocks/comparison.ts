import { ComponentComparisonDataEnum } from "../../../types";
import { QuotationMock } from ".";

const slides = [
    {
        id: 1,
        pair: { before: QuotationMock.Comparison.Row1.Before, after: QuotationMock.Comparison.Row1.After }
    },
    {
        id: 2,
        pair: { before: QuotationMock.Comparison.Row2.Before, after: QuotationMock.Comparison.Row2.After }
    }
]

export const COMPONENT_COMPARISON_DATA_OPTIONS = [
    {
        value: ComponentComparisonDataEnum.ArchWindow,
        slides
    },
    {
        value: ComponentComparisonDataEnum.ClassicalSunrooof,
        slides
    },
    {
        value: ComponentComparisonDataEnum.FlutedMinimalistSunrooof,
        slides
    },
    {
        value: ComponentComparisonDataEnum.FrenchWindow,
        slides
    },
    {
        value: ComponentComparisonDataEnum.ModernSunrooof,
        slides
    },
    {
        value: ComponentComparisonDataEnum.LouveredWindow,
        slides
    },

]
