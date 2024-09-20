import {
    INIT_CUSTOMER_SITE_COMPONENT,
    TCustomerComponentItem,
} from "../../../types"

export const COMPONENT_SECTIONS = [
    'Comparisons (Before & After)',
    '2D Design',
    '3D Design',
    'Quotation'
]

export const INIT_CUSTOMER_COMPONENT_ITEM: TCustomerComponentItem = {
    name: '',
    components: COMPONENT_SECTIONS?.map((name) => ({ ...INIT_CUSTOMER_SITE_COMPONENT, name })),
    componentId: '',
    id: '',
    at: { created: new Date(), updated: new Date() }
}
