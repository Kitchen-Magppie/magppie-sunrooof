export const QUOTATION_SALUTATION_OPTIONS: string[] = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];

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
    Client: { name: 'Mr. Karthik', remark: 'Excluisve proposal for' },
    Quotation: {
        header: 'Quotation',
        illustration: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fquotations%2Fquotation.png?alt=media&token=f2a170c0-5fc8-4351-9111-cad7046c70e4',
        data: {
            name: 'Mr. Karthik (Total Environment)',
            email: 'N/A',
            mobile: '9663696028',
            createdDate: '30-Aug-24',
            address: 'Bengaluru',
            zone: 'South India',
            salutation: '',
            city: '',
            invoiceUrl: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2Fquotations%2Fquotation.png?alt=media&token=f2a170c0-5fc8-4351-9111-cad7046c70e4'
        }
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
        }
    },
    Design3D: {
        Image1: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2F3d-design%2F3done.png?alt=media&token=bc8f39ae-d09e-4560-9d73-0e7081060909',
        Image2: 'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2F3d-design%2F3dtwo.png?alt=media&token=64653275-9249-4cbf-b060-1e9486bf12d3'
    }
} as const

