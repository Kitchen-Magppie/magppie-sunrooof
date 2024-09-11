export type TKitchenSpecification = { shape: string, tier: string, area: string, price: string }
import * as yup from 'yup'

export type TKitchen = {
    id: string,
    name: string,
    images: { hero: string, cabinet: string[] },
    specification: TKitchenSpecification,
    description: string;
    createdAt: Date
}


export const CMS_KITCHEN_YUP_SCHEMA = yup.object({
    loading: yup.object({ cabinet: yup.boolean(), hero: yup.boolean() }),
    name: yup.string().required('Name is required'),
    description: yup.string().required('Name is required'),
    images: yup.object({
        hero: yup.string(),
        cabinet: yup.array<string[]>()
    }),
    specification: yup.object({
        shape: yup.string(),
        tier: yup.string(), area: yup.string(), price: yup.string()
    }),

})
export const INIT_KITCHEN: TKitchen = {
    id: '',
    name: '',
    images: { hero: '', cabinet: [] },
    specification: { shape: '', tier: '', area: '', price: '' },
    description: '',
    createdAt: new Date()
}
type TLoading = { cabinet: boolean, hero: boolean }
export const INIT_YUP_KITCHEN: TKitchen & { loading: TLoading } = {

    ...INIT_KITCHEN,
    loading: { cabinet: false, hero: false }
}

export enum KitchenTierEnum {
    Premium = 'premium',
    Luke = 'luke',
    Platinium = 'platinium'
}
export type TKitchenTier = { label: string, value: string }
export const KITCHEN_TIER_OPTIONS: TKitchenTier[] = [
    { label: 'Premium', value: KitchenTierEnum.Premium },
    { label: 'Luke', value: KitchenTierEnum.Luke },
    { label: 'Platinium', value: KitchenTierEnum.Platinium },
]
