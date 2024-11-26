import dayjs from "dayjs";
//====================================================================

import {
    ComponentComparisonDataEnum,
    ComponentFeatureEnum,
    CustomerComponentEnum,
    TCustomerComponent2DDesignOptionItem,
    TCustomerComponentDesign2DDataItem,
    TCustomerComponentItem,
    TCustomerComponentQuotationEntryItem,
    TCustomerItem,
    _
} from "../../../types"
import { QuotationMock } from ".";
export const CUSTOMER_COMPONENT_FEATURE_OPTIONS: { label: string, value: ComponentFeatureEnum }[] = [
    {
        value: ComponentFeatureEnum.Office,
        label: 'Office',
    },
    {
        value: ComponentFeatureEnum.Home,
        label: 'Home',
    },
    {
        value: ComponentFeatureEnum.Restaurant,
        label: 'Restaurant',
    },
    {
        value: ComponentFeatureEnum.Hospital,
        label: 'Hospital',
    },
    {
        value: ComponentFeatureEnum.School,
        label: 'School',
    },
    {
        value: ComponentFeatureEnum.RetailSpace,
        label: 'Retail Space',
    },
    {
        value: ComponentFeatureEnum.Hotel,
        label: 'Hotel',
    },

]
export const CUSTOMER_COMPONENT_VALUE_OPTIONS = [
    {
        value: CustomerComponentEnum.Client,
        label: 'Client',
    },
    {
        value: CustomerComponentEnum.Feature,
        label: 'Feature',
    },
    {
        value: CustomerComponentEnum.Comparison,
        label: 'Comparisons (Before & After)',
    },
    {
        value: CustomerComponentEnum.TwoDDesign,
        label: '2D Design',
    },
    {
        value: CustomerComponentEnum.ThreeDDesign,
        label: '3D Design',
    },
    {
        value: CustomerComponentEnum.Quotation,
        label: 'Quotation',
    },
]


export const INIT_CUSTOMER_COMPONENT_ITEM: TCustomerItem = {
    name: '',
    components: [],
    customerId: _.uuid(),
    id: '',
    at: { created: new Date(), updated: new Date() }
}
export const INIT_CUSTOMER_COMPONENT_2D_DESIGN_ENTRY_ITEM: TCustomerComponentQuotationEntryItem = {
    design: '',
    finish: '',
    area: '',
    floor: '',
    quantity: 0,
}

export const INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM: TCustomerComponentDesign2DDataItem = {
    design: '',
    finish: '',
    areaName: '',
    leftImage: '',
    rightImage: '',
    floor: '',
    quantity: 0,
    // invoiceUrl: '',
    // designBy: '',
    // approvedBy: '',
    // ceilingHeightOnSite: '',
    // afterInstallation: '',
    // yourPlan: '',
}

export const CUSTOMER_COMPONENT_2D_DESIGN_FIELD_ENTRY_ITEM: TCustomerComponent2DDesignOptionItem[] = [
    { label: "Design", value: 'design', field: 'select', placeholder: '' },
    { label: "Finish", value: 'finish', field: 'select', placeholder: '' },
    { label: "Area Name", value: 'area', field: 'text', placeholder: 'Living Room | Dining Room' },
    { label: "Floor", value: 'floor', field: 'text', placeholder: '' },
    { label: "Quantity", value: 'quantity', field: 'text', placeholder: '' },
];


type TCustomerComponent2DLayoutFieldItem = { label: string, value: 'leftImage' | 'rightImage', field: 'image', placeholder: string }

export const CUSTOMER_COMPONENT_2D_DESIGN_LAYOUT_FIELD_OPTIONS: TCustomerComponent2DLayoutFieldItem[] = [
    { label: "Customer Image", value: 'leftImage', field: 'image', placeholder: '' },
    { label: "Proposed Image", value: 'rightImage', field: 'image', placeholder: '' },
];

export const INIT_CUSTOMER_COMPONENTS: TCustomerComponentItem[] = [
    // {
    //     value: CustomerComponentEnum.Client,
    //     data: { name: '', description: '' }
    // },
    {
        value: CustomerComponentEnum.Comparison,
        data: ComponentComparisonDataEnum.None,
        // data: [{ value: '', image: { before: '', after: '' } }, { value: '', image: { before: '', after: '' } }]
    },
    {
        value: CustomerComponentEnum.Quotation,
        data: {
            name: '',
            salutation: '',
            email: '',
            mobile: '',
            createdDate: dayjs().format('YYYY-MM-DD'),
            address: '',
            zone: '',
            city: '',
            discount: 0,
            invoiceUrl: '',
            entries: []
        }
    },
    {
        value: CustomerComponentEnum.TwoDDesign,
        data: [
            INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
            // INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
        ]
    },
    {
        value: CustomerComponentEnum.Feature,
        data: ComponentFeatureEnum.Office
    },
    {
        value: CustomerComponentEnum.ThreeDDesign,
        // data: ['', '']
        data: []

    }
];
export const INIT_CUSTOMER_ITEM: TCustomerItem = {
    name: "",
    components: INIT_CUSTOMER_COMPONENTS,
    id: "",
    customerId: "",
    at: {
        created: new Date(),
        updated: new Date(),
    },
};

export const DEFAULT_CUSTOMER: TCustomerItem = {
    ...INIT_CUSTOMER_ITEM,
    name: 'Default',
    customerId: '309e18c2-5350-4788-8234-0e3e3580229d',
    components: [
        {
            value: CustomerComponentEnum.Client,
            data: {
                name: QuotationMock.Client.name,
                description: QuotationMock.Client.remark,
            }
        },
        {
            value: CustomerComponentEnum.Comparison,
            data: ComponentComparisonDataEnum.None,

        },
        {
            value: CustomerComponentEnum.Quotation,
            data: QuotationMock.Quotation.data
        },

        {
            value: CustomerComponentEnum.TwoDDesign,
            data: [
                {
                    ...INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
                    // designBy: 'Nishtha',
                    // approvedBy: 'Mrinal',
                    design: 'Classical',
                    finish: 'White',
                    // ceilingHeightOnSite: 'Pearl White',
                    // afterInstallation: '10ft',
                    // yourPlan: '8ft 11 inch',
                    areaName: 'Board Room',
                    leftImage: '',
                    rightImage: '',
                },
                {
                    ...INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
                    // designBy: 'Nishtha',
                    // approvedBy: 'Mrinal',
                    design: 'Classical',
                    finish: 'White',
                    // ceilingHeightOnSite: 'French Window',
                    // afterInstallation: '',
                    // yourPlan: '',
                    areaName: 'Board Room',
                    leftImage: '',
                    rightImage: '',
                }
            ]
        },
        {
            value: CustomerComponentEnum.ThreeDDesign,
            data: [
                'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2F3d-design%2F3done.png?alt=media&token=bc8f39ae-d09e-4560-9d73-0e7081060909',
                'https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2F3d-design%2F3dtwo.png?alt=media&token=64653275-9249-4cbf-b060-1e9486bf12d3'
            ]
        }
    ]
}

export const COMPONENT_DESIGN2D_DESIGN_OPTIONS = [
    "Arch Window",
    "Classical",
    "Classical Atrium",
    "Fluted Minimalist",
    "Fluted Minimalist Atrium",
    "French Window",
    "Louvered Window",
    "Moorgan Premium Remote",
    "Modern",
    "Minimalist",
]
// export const COMPONENT_DESIGN2D_DESIGN_OPTIONS = [
//     "Arch Window",
//     "Classical",
//     "Classical Atrium",
//     "Fluted Minimalist",
//     "Fluted Minimalist Atrium",
//     "French Window",
//     "Louvered Window",
//     "Moorgan Premium Remote",
//     "Modern"
// ]
export const COMPONENT_DESIGN2D_FINISH_OPTIONS = [
    'Black',
    'Chrome',
    'Gold',
    'Mystic Wooden',
    'Pearl White',
    'Regal Bronze',
    'Titanium Grey'
]

