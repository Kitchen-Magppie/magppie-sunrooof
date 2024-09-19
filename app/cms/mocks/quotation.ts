import quotation from '../../QuotationPage/assets/quotation.png'
import beforeOne from '../../QuotationPage/assets/before-after/before1.png'
import afterOne from '../../QuotationPage/assets/before-after/after1.png'
import beforeTwo from '../../QuotationPage/assets/before-after/before2.png'
import afterTwo from '../../QuotationPage/assets/before-after/after2.png'
export const QuotationMock = {
    Comparison: {
        Row1: { Before: beforeOne, After: afterOne },
        Row2: { Before: beforeTwo, After: afterTwo },
    },
    Client: { name: 'Mr. Karthik', remerk: 'Exclusively designed for' },
    Quotation: { header: 'Quotation', illustration: quotation }
} as const
