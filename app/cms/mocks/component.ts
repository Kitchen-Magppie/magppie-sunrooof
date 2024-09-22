import {
    CustomerComponentEnum,
    TCustomerComponent2DDesignOptionItem,
    TCustomerComponentDesign2DDataItem,
    TCustomerComponentItem,
    TCustomerItem,
    _
} from "../../../types"
import { QuotationMock } from ".";

export const CUSTOMER_COMPONENT_VALUE_OPTIONS = [
    {
        value: CustomerComponentEnum.Client,
        label: 'Client',
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
    designBy: '',
    approvedBy: '',
    design: '',
    finish: '',
    callingHeightOnSite: '',
    afterInstallation: '',
    yourPlan: '',
    header: '',
    leftImage: '',
    rightImage: '',
}

export const INIT_CUSTOMER_COMPONENTS: TCustomerComponentItem[] = [
    {
        value: CustomerComponentEnum.Client,
        data: { name: '', description: '' }
    },
    {
        value: CustomerComponentEnum.Comparison,
        data: []
    },
    {
        value: CustomerComponentEnum.Quotation,
        data: { header: '', illustration: '' }
    },
    {
        value: CustomerComponentEnum.TwoDDesign,
        data: [
            INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
            INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
        ]
    },
    {
        value: CustomerComponentEnum.ThreeDDesign,
        data: []
    }
];

export const CUSTOMER_COMPONENT_2D_DESIGN_FIELD_OPTIONS: TCustomerComponent2DDesignOptionItem[] = [
    { label: "Design By", value: "designBy" },
    { label: "Approved By", value: 'approvedBy' },
    { label: "Design", value: 'design' },
    { label: "Finish", value: 'finish' },
    { label: "Calling Height On Site", value: 'callingHeightOnSite' },
    { label: "After Installation", value: 'afterInstallation' },
    { label: "Your Plan", value: 'yourPlan' },
    { label: "Header", value: 'header' },
    { label: "Left Image", value: 'leftImage' },
    { label: "Right Image", value: 'rightImage' }
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
    customerId: 'a0707f32-a245-40ea-898e-c32f8c6172ac',
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
            data: {
                header: QuotationMock.Quotation.header,
                illustration: QuotationMock.Quotation.illustration
            }
        },

        {
            value: CustomerComponentEnum.TwoDDesign,
            data: [
                {
                    ...INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
                    designBy: 'Nishtha',
                    approvedBy: 'Mrinal',
                    design: 'Classical',
                    finish: 'White',
                    callingHeightOnSite: 'Pearl White',
                    afterInstallation: '10ft',
                    yourPlan: '8ft 11 inch',
                    header: 'Board Room',
                    leftImage: '',
                    rightImage: '',
                },
                {
                    ...INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
                    designBy: 'Nishtha',
                    approvedBy: 'Mrinal',
                    design: 'Classical',
                    finish: 'White',
                    callingHeightOnSite: 'French Window',
                    afterInstallation: '',
                    yourPlan: '',
                    header: 'Board Room',
                    leftImage: '',
                    rightImage: '',
                }
            ]
        }
        // {
        //     value: CustomerComponentEnum.ThreeDDesign,
        //     data: { header: QuotationMock.Quotation.header, illustration: QuotationMock.Quotation.illustration }
        // }
    ]
}
