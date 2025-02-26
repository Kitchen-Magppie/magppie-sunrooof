import { TCustomerComponentQuotationEntryItem } from '../../../types'

export const QUOTATION_SALUTATION_OPTIONS: string[] = [
    'Mr.',
    'Mrs.',
    'Ms.',
    'Dr.',
    'Prof.',
]

export const QuotationMock = {
    Comparison: {
        Row1: {
            Before: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fcomparisons%2Fbefore1.png?alt=media&token=1f1140b9-61b1-43f2-a059-c7ce6ea90f2d',
            After: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fcomparisons%2Fafter1.png?alt=media&token=4164fe30-efbe-47b2-8145-8b52f7d67e00',
        },
        Row2: {
            Before: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fcomparisons%2Fbefore2.png?alt=media&token=362954c6-f771-458b-ae14-093fe861f1eb',
            After: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fcomparisons%2Fafter2.png?alt=media&token=692fc5d4-1aa9-4c23-b045-1d0118ed1c1d',
        },
    },
    Client: { name: 'Mr. Karthik', remark: 'Excluisve proposal for' },
    Quotation: {
        header: 'Quotation',
        illustration:
            'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fquotations%2Fquotation.png?alt=media&token=f2a170c0-5fc8-4351-9111-cad7046c70e4',
        data: {
            name: 'Mr. Karthik (Total Environment)',
            email: 'N/A',
            mobile: '9663696028',
            createdDate: '30-Aug-24',
            address: 'Bengaluru',
            zone: 'South India',
            salutation: '',
            city: '',
            discount: 0,
            invoiceUrl:
                'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fquotations%2Fquotation.png?alt=media&token=f2a170c0-5fc8-4351-9111-cad7046c70e4',
            entries: [] as TCustomerComponentQuotationEntryItem[],
        },
    },
    Design2D: {
        0: {
            designBy: 'Nishtha',
            approvedBy: 'Mrinal',
            design: 'Classical',
            finish: 'White',
            ceilingHeightOnSite: 'Pearl White',
            afterInstallation: '10ft',
            yourPlan: '8ft 11 inch',
            header: 'Board Room',
            leftImage: '',
            rightImage: '',
        },
        1: {
            designBy: 'Nishtha',
            approvedBy: 'Mrinal',
            design: 'Classical',
            finish: 'White',
            ceilingHeightOnSite: 'French Window',
            afterInstallation: '',
            yourPlan: '',
            header: 'Board Room',
            leftImage: '',
            rightImage: '',
        },
    },
    Design3D: {
        Image1: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2F3d-design%2F3done.png?alt=media&token=bc8f39ae-d09e-4560-9d73-0e7081060909',
        Image2: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2F3d-design%2F3dtwo.png?alt=media&token=64653275-9249-4cbf-b060-1e9486bf12d3',
    },
} as const

export const CMS_QUOTATION_OPTIONS = {
    Classical: {
        White: 40250,
        Wood: 37950,
        Bronze: 41950,
        Grey: 41950,
    },
    Modern: {
        Wood: 35650,
        White: 37950,
        Bronze: 39650,
        Grey: 39650,
    },
    Minimalist: {
        Wooden: 35650,
        White: 37950,
        Grey: 39650,
        Bronze: 39650,
    },
    Fluted: {           //NOTE: This is the copy of `Fluted Minimalist`;
        Wooden: 35650,
        White: 37950,
        Grey: 39650,
        Bronze: 39650,
        Gold: 39650,
    },
    'Fluted Minimalist': {
        Wooden: 35650,
        White: 37950,
        Grey: 39650,
        Bronze: 39650,
        Gold: 39650,
    },
    'French Window': {
        White: 55200,
    },
    'Louvered Window': {
        White: 51750,
        Wooden: 51750,
    },
    'Classical Atrium': {
        White: 40250,
        Wooden: 37950,
    },
    'Fluted Minimalist Atrium': {
        Wooden: 37950,
        Bronze: 41950,
        Grey: 41950,
    },
    'Arch Window': {
        White: 55200,
    },
    'Moorgan Premium Remote': {
        Gold: 42000,
        Black: 38500,
        Chrome: 38500,
    },
}

export const CMS_QUOTATION_FLOOR_OPTIONS = ['BSMT', 'GF', 'FF', 'SF', 'TF']
