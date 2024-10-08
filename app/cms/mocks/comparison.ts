import { ComponentComparisonDataEnum } from '../../../types'
import { QuotationMock } from '.'
import frenchAfter from '../../QuotationPage/assets/BeforeAfter/French Window/after.png'
import frenchBefore from '../../QuotationPage/assets/BeforeAfter/French Window/before.png'
import louveredAfter from '../../QuotationPage/assets/BeforeAfter/Louvered Window/after.png'
import louveredBefore from '../../QuotationPage/assets/BeforeAfter/Louvered Window/before.png'
import modernAfter from '../../QuotationPage/assets/BeforeAfter/Modern Sunrooof/after.png'
import modernBefore from '../../QuotationPage/assets/BeforeAfter/Modern Sunrooof/before.png'
import flutedAfter from '../../QuotationPage/assets/BeforeAfter/Fluted Minimilist/after.jpg'
import flutedBefore from '../../QuotationPage/assets/BeforeAfter/Fluted Minimilist/before.jpg'
import classicalAfter from '../../QuotationPage/assets/BeforeAfter/Classical Sunrooof/after.jpg'
import classicalBefore from '../../QuotationPage/assets/BeforeAfter/Classical Sunrooof/before.png'

export const COMPONENT_COMPARISON_DATA_OPTIONS = [
    {
        value: ComponentComparisonDataEnum.ArchWindow,
        slides: [
            {
                id: 1,
                pair: {
                    before: QuotationMock.Comparison.Row1.Before,
                    after: QuotationMock.Comparison.Row1.After,
                },
            },
        ],
    },
    {
        value: ComponentComparisonDataEnum.ClassicalSunrooof,
        slides: [
            {
                id: 1,
                pair: {
                    before: classicalAfter,
                    after: classicalBefore,
                },
            },
        ],
    },
    {
        value: ComponentComparisonDataEnum.FlutedMinimalistSunrooof,
        slides: [
            {
                id: 1,
                pair: {
                    before: flutedBefore,
                    after: flutedAfter,
                },
            },
        ],
    },
    {
        value: ComponentComparisonDataEnum.FrenchWindow,
        slides: [
            {
                id: 1,
                pair: {
                    before: frenchBefore,
                    after: frenchAfter,
                },
            },
        ],
    },
    {
        value: ComponentComparisonDataEnum.ModernSunrooof,
        slides: [
            {
                id: 1,
                pair: {
                    before: modernBefore,
                    after: modernAfter,
                },
            },
        ],
    },
    {
        value: ComponentComparisonDataEnum.LouveredWindow,
        slides: [
            {
                id: 1,
                pair: {
                    before: louveredBefore,
                    after: louveredAfter,
                },
            },
        ],
    },
]