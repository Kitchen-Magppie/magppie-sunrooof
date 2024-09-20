import {
    INIT_CUSTOMER_SITE_COMPONENT,
    TComponentItem
} from "../../../types"

export const COMPONENT_SECTIONS = [
    'Comparisons (Before & After)',
    '2D Design',
    '3D Design',
    'Quotation'
]

export const CUSTOMER_COMPONENTS = COMPONENT_SECTIONS?.map((name) => ({
    ...INIT_CUSTOMER_SITE_COMPONENT,
    name,
})) as TComponentItem[]
