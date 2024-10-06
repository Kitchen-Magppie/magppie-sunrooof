import { ComponentComparisonDataEnum } from "../../../types";
import { QuotationMock } from "../mocks";

export const COMPONENT_COMPARISON_DATA_OPTIONS = [
    {
        value: ComponentComparisonDataEnum.ArchWindow,
        slides: [
            {
                id: 1,
                pair: { before: QuotationMock.Comparison.Row1.Before, after: QuotationMock.Comparison.Row1.After }
            },
            {
                id: 2,
                pair: { before: QuotationMock.Comparison.Row2.Before, after: QuotationMock.Comparison.Row2.After }
            }
        ]
    },
    {
        value: ComponentComparisonDataEnum.ClassicalSunrooof,
        slides: [
            {
                id: 1,
                pair: { before: QuotationMock.Comparison.Row1.Before, after: QuotationMock.Comparison.Row1.After }
            },
            {
                id: 2,
                pair: { before: QuotationMock.Comparison.Row2.Before, after: QuotationMock.Comparison.Row2.After }
            }
        ]
    }
]
