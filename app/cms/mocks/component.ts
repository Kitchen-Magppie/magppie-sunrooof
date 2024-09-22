import {
    CustomerComponentEnum,
    TCustomerComponent2DDesignOptionItem,
    TCustomerComponentItem,
    TCustomerItem,
    _
} from "../../../types"

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
    componentId: _.uuid(),
    id: '',
    at: { created: new Date(), updated: new Date() }
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
        data: {
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
    componentId: "",
    at: {
        created: new Date(),
        updated: new Date(),
    },
};
