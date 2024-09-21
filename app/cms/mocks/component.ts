import {
    CustomerComponentEnum,
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
    // components: CUSTOMER_COMPONENT_VALUE_OPTIONS?.map(({ value }) => ({ ...INIT_CUSTOMER_SITE_COMPONENT, name: value })),
    componentId: _.uuid(),
    id: '',
    at: { created: new Date(), updated: new Date() }
}
