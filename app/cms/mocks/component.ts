import {
    ComponentComparisonDataEnum,
    ComponentFeatureEnum,
    CustomerComponentEnum,
    TComponentComparisonDataOption,
    TCustomerComponent2DDesignOptionItem,
    TCustomerComponentDesign2DDataItem,
    TCustomerComponentItem,
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

export const INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM: TCustomerComponentDesign2DDataItem = {
    // designBy: '',
    // approvedBy: '',
    design: '',
    finish: '',
    // ceilingHeightOnSite: '',
    afterInstallation: '',
    // yourPlan: '',
    header: '',
    leftImage: '',
    rightImage: '',
}




export const CUSTOMER_COMPONENT_COMPARISON_OPTIONS: TComponentComparisonDataOption[] = [
    { label: "French Window", value: ComponentComparisonDataEnum.FrenchWindow },
    { label: "Arch Window", value: ComponentComparisonDataEnum.ArchWindow },
    { label: "Louvered Window", value: ComponentComparisonDataEnum.LouveredWindow },
    { label: "Classical Sunrooof", value: ComponentComparisonDataEnum.ClassicalSunrooof },
    { label: "Fluted Minimalist Sunrooof", value: ComponentComparisonDataEnum.FlutedMinimalistSunrooof },
    { label: "Modern Sunrooof", value: ComponentComparisonDataEnum.ModernSunrooof },
];

export const CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS: TCustomerComponent2DDesignOptionItem[] = [
    // { label: "Design By", value: "designBy", field: 'text' },
    // { label: "Approved By", value: 'approvedBy', field: 'text' },
    { label: "Design", value: 'design', field: 'select' },
    { label: "Finish", value: 'finish', field: 'select' },
    // { label: "Ceiling Height On Site", value: 'ceilingHeightOnSite', field: 'text' },
    { label: "After Installation", value: 'afterInstallation', field: 'text' },
    { label: "Header", value: 'header', field: 'text' },
    // { label: "Your Plan", value: 'yourPlan', field: 'text' },
    { label: "Left Image", value: 'leftImage', field: 'image' },
    { label: "Right Image", value: 'rightImage', field: 'image' },
];

export const INIT_CUSTOMER_COMPONENTS: TCustomerComponentItem[] = [
    // {
    //     value: CustomerComponentEnum.Client,
    //     data: { name: '', description: '' }
    // },
    {
        value: CustomerComponentEnum.Comparison,
        data: [{ value: '', image: { before: '', after: '' } }, { value: '', image: { before: '', after: '' } }]
    },
    {
        value: CustomerComponentEnum.Quotation,
        data: {
            name: '',
            email: '',
            mobile: '',
            createdDate: '',
            address: '',
            zone: '',
            invoiceUrl: ''
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
        data: ['', '']
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
            data: [
                {
                    value: '0',
                    image: {
                        before: QuotationMock.Comparison.Row1.Before, after: QuotationMock.Comparison.Row1.After
                    }
                },
                {
                    value: '1',
                    image: {
                        before: QuotationMock.Comparison.Row2.Before, after: QuotationMock.Comparison.Row2.After
                    }
                }
            ]
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
                    afterInstallation: '10ft',
                    // yourPlan: '8ft 11 inch',
                    header: 'Board Room',
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
                    afterInstallation: '',
                    // yourPlan: '',
                    header: 'Board Room',
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
    "Modern"
]
export const COMPONENT_DESIGN2D_FINISH_OPTIONS = [
    'Black',
    'Chrome',
    'Gold',
    'Mystic Wooden',
    'Pearl White',
    'Regal Bronze',
    'Titanium Grey'
]
