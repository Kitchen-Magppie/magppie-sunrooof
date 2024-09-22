// import illustration from '../../QuotationPage/assets/quotation.png'
// import beforeOne from '../../QuotationPage/assets/before-after/before1.png'
// import afterOne from '../../QuotationPage/assets/before-after/after1.png'
// import beforeTwo from '../../QuotationPage/assets/before-after/before2.png'
// import afterTwo from '../../QuotationPage/assets/before-after/after2.png'
import {
    CustomerComponentEnum,
    INIT_COMPNENT_MEDIA_TYPOGRAPHY,
    INIT_CUSTOMER_SITE_COMPONENT,
    INIT_CUSTOMER_SITE_COMPONENT_LINK,
    INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY,
    TComponentItem,
    TComponentMediaItem,
    TCustomerComponentItem
} from '../../../types'
import { CUSTOMER_COMPONENT_VALUE_OPTIONS } from './component'

export const QuotationMock = {
    Comparison: {
        Row1: {
            Before: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fcomparisons%2Fbefore1.png?alt=media&token=1f1140b9-61b1-43f2-a059-c7ce6ea90f2d',
            After: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fcomparisons%2Fafter1.png?alt=media&token=4164fe30-efbe-47b2-8145-8b52f7d67e00'
        },
        Row2: {
            Before: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fcomparisons%2Fbefore2.png?alt=media&token=362954c6-f771-458b-ae14-093fe861f1eb',
            After: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fcomparisons%2Fafter2.png?alt=media&token=692fc5d4-1aa9-4c23-b045-1d0118ed1c1d'
        },
    },
    Client: { name: 'Mr. Karthik', remark: 'Exclusively designed for' },
    Quotation: {
        header: 'Quotation',
        illustration: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fquotations%2Fquotation.png?alt=media&token=f2a170c0-5fc8-4351-9111-cad7046c70e4'
    },
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


export function MOCK_TO_FIREBASE_SCHEMA() {
    const _images = Object.values(QuotationMock.Comparison)?.flatMap((item) => (Object.values(item)))

    const BEFORE_AND_AFTER_COMPONENT: TComponentItem = {
        ...INIT_CUSTOMER_SITE_COMPONENT,
        value: CUSTOMER_COMPONENT_VALUE_OPTIONS?.find((item) => item.value === CustomerComponentEnum.Comparison).label,
        gallery: _images?.map((item, i) => {
            return ({
                orderId: `${i + 1}`,
                typography: INIT_COMPNENT_MEDIA_TYPOGRAPHY,
                link: item
            })
        }) as TComponentMediaItem[]
    }
    const QUOTATION_COMPONENT: TComponentItem = {
        ...INIT_CUSTOMER_SITE_COMPONENT,
        value: CUSTOMER_COMPONENT_VALUE_OPTIONS?.find((item) => item.value === CustomerComponentEnum.Quotation).label,
        typography: {
            ...INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY,
            main: 'Quotation'
        },
        links: {
            ...INIT_CUSTOMER_SITE_COMPONENT_LINK,
            illustration: QuotationMock.Quotation.illustration
        }
    }
    const CLIENT_COMPONENT: TComponentItem = {
        ...INIT_CUSTOMER_SITE_COMPONENT,
        value: CUSTOMER_COMPONENT_VALUE_OPTIONS?.find((item) => item.value === CustomerComponentEnum.Client).label,
        typography: {
            ...INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY,
            main: QuotationMock.Client.name,
            description: QuotationMock.Client.remark,
        },
    }

    return {
        componentId: 'bc431ad6-0b87-4e55-a8a2-23ee3e2643ed',
        name: 'Canon',
        components: [
            QUOTATION_COMPONENT,
            BEFORE_AND_AFTER_COMPONENT,
            CLIENT_COMPONENT
        ]
    } as TCustomerComponentItem
    // return
}
