import illustration from '../../QuotationPage/assets/quotation.png'
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
    Quotation: { header: 'Quotation', illustration },
    Design2D: {
        0: {
            designBy: 'Nishtha',
            approvedBy: 'Mrinal',
            deisgn: 'Classical',
            finish: 'White',
            callingHeightOnSite: 'Pearl White',
            afterInstallation: '10ft',
            yourPlan: '8ft 11 inch',
            header: 'Board Room',
            leftImage: '',
            rightImage: '',
        },
        1: {
            designBy: 'Nishtha',
            approvedBy: 'Mrinal',
            deisgn: 'Classical',
            finish: 'White',
            callingHeightOnSite: 'French Window',
            afterInstallation: '',
            yourPlan: '',
            header: 'Board Room',
            leftImage: '',
            rightImage: '',
        }
    },
    Design3D: {
        Image1: '',
        Image2: ''
    }
} as const
