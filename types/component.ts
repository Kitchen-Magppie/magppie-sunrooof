import * as yup from 'yup'
//====================================================================
import { IProposedLayoutEntryItem } from '../app/cms/types';
import _ from './lodash';

export type TComponentMeta = { order: { used: number[]; next: number } }

export type TCustomerComponentComparisonDataItem = {
    value: string
    image: { before: string; after: string }
}
export type TCustomerComponentComparisonItem = {
    value: CustomerComponentEnum.Comparison
    // data: TCustomerComponentComparisonDataItem[]
    data: ComponentComparisonDataEnum
}
export type TCustomerComponentFeatureItem = {
    value: CustomerComponentEnum.Feature
    data: ComponentFeatureEnum
}
export type TCustomerComponentClientItem = {
    value: CustomerComponentEnum.Client
    data: { name: string; description: string }
}

export type TCustomerComponentQuotationEntryItem = {
    design: string,
    finish: string,
    area: string,
    floor: string,
    quantity: string,
    // unitPrice: string,
}
export type TCustomerComponentQuotationItem = {
    value: CustomerComponentEnum.Quotation
    data: {
        name: string
        email: string
        mobile: string
        createdDate: string
        salutation: string
        address: string
        zone: string
        city: string
        discount: number
        invoiceUrl: string,
        customFreightCharge: string,
        entries: TCustomerComponentQuotationEntryItem[]
    }
}

export type TCustomerComponent2DDesignOptionItem = {
    label: string
    value: keyof IProposedLayoutEntryItem
    field: 'text' | 'image' | 'select'
    placeholder?: string
    lock: boolean
}
export type TCustomerComponentDesign2DDataItem = {
    design: string
    finish: string
    areaName: string
    floor: string
    quantity: number
    leftImage: string
    rightImage: string
    proposedLayout?: string
    proposedLayoutId?: string
    entries?: IProposedLayoutEntryItem[]
    // invoiceUrl: string,
    // designBy: string,
    // approvedBy: string,
    // ceilingHeightOnSite: string,
    // afterInstallation: string,
    // yourPlan: string,
}

export type TCustomerComponentDesign2DItem = {
    value: CustomerComponentEnum.TwoDDesign
    data: TCustomerComponentDesign2DDataItem[]
}
export enum CustomerComponentEnum {
    TwoDDesign = '2d-design',
    ThreeDDesign = '3d-design',
    Client = 'clients',
    Comparison = 'comparisons',
    Feature = 'feature',
    Quotation = 'quotations',
    None = '',
}
export enum ComponentComparisonDataEnum {
    FrenchWindow = 'french-window',
    ArchWindow = 'arch-window',
    LouveredWindow = 'louvered-window',
    ClassicalSunrooof = 'classical-sunrooof',
    FlutedMinimalistSunrooof = 'fluted-minimalist-sunrooof',
    ModernSunrooof = 'modern-sunrooof',
    None = '',
}

export type TComponentComparisonDataOption = {
    label: string
    value: ComponentComparisonDataEnum
    image: {
        high: string
        low: string
    }
    height: number // Height with units, e.g., '100px'
    width: number // Width with units, e.g., '50%'
    gap: number // Gap with units
    outerFrameGap?: number // Outer frame gap with units
    innerFrameGap?: number // Inner frame gap with units
    imgComponent?: HTMLImageElement
}

export type TCustomerComponentDesign3DItem = {
    value: CustomerComponentEnum.ThreeDDesign
    data: string[]
}

export type TCustomerComponentItem =
    | TCustomerComponentClientItem
    | TCustomerComponentComparisonItem
    | TCustomerComponentQuotationItem
    | TCustomerComponentDesign2DItem
    | TCustomerComponentDesign3DItem
    | TCustomerComponentFeatureItem

export type TCustomerItem = {
    name: string
    components: TCustomerComponentItem[]
    id: string
    customerId: string
    at: { created: Date; updated?: Date },
    isTransformed?: boolean
}

export enum ComponentModeEnum {
    Create = 'create',
    Edit = 'edit',
    None = '',
}

export enum ComponentFeatureEnum {
    Hospital = 'hospital',
    Home = 'home',
    RetailSpace = 'retail-space',
    School = 'school',
    Restaurant = 'restaurant',
    Hotel = 'hotel',
    Office = 'office',
}

export type TComponentMode =
    | ComponentModeEnum.Create
    | ComponentModeEnum.Edit
    | ComponentModeEnum.None

export enum SpecialCharacterEnum {
    BreakLine = '==nextline==',
    ItalicBegin = '==italic',
    ItalicEnd = 'italic==',
    BoldStart = '==bold',
    BoldEnd = 'bold==',
}

export const SPECIAL_CHARACTER_TO_DOM = (text: string) => {
    return text
        .replace(/==nextline==\s*<br \/>/g, '\n')
        .replace(/==italic\s*(\w+)==\s*/g, '<i>$1</i>')
        .replace(/==bold\s*(\w+)==\s*/g, '<b>$1</b>')
        .split('\n')
        .map((line) => line)
}

// const comparisonDataItemSchema = yup.object().shape({
//     value: yup.string().nullable(),
//     image: yup.object().shape({
//         before: yup.string().required(),
//         after: yup.string().required(),
//     }).required(),
// });

const customerComponentComparisonItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.Comparison]).required(),
    // data: yup.array().of(comparisonDataItemSchema).required(),
    data: yup.string().required('Comparison field is required'),
})

// const customerComponentClientItemSchema = yup.object().shape({
//     value: yup.mixed().oneOf([CustomerComponentEnum.Client]).required(),
//     data: yup.object({
//         name: yup.string().required(),
//         description: yup.string().required(),
//     }).required(),
// });

const customerComponentFeatureItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.Feature]).required(),
    data: yup.string().required('Feature field is required'),
})


const customerComponentQuotationItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.Quotation]).required(),
    data: yup
        .object({
            name: yup.string().nullable(),
            email: yup.string().nullable(),
            mobile: yup.string().required('Mobile field is required'),
            createdDate: yup.string().required(),
            salutation: yup.string(),
            // .required('Salutation field is required')
            address: yup.string().nullable(),
            zone: yup.string().nullable(),
            city: yup.string().required('City field is required'),
            discount: yup.string().nullable(),
            invoiceUrl: yup.string().required('To save your quotation, please generate the design first.'),
            // entries: yup.array().of(yup.object().shape({
            //     design: yup.string().required('Design field is Required'),
            //     finish: yup.string().required('Finish field is Required'),
            //     area: yup.string().required('Area Name field is Required'),
            //     floor: yup.string().nullable(),
            //     quantity: yup.number().required('Quantity Name field is Required'),
            //     // unitPrice: yup.string().required('Unit Price field is Required'),
            // })).min(0).required('Atleast 1 entry is required'),
        })
        .required(),
})

const customerComponentDesign2DItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.TwoDDesign]).required(),
    data: yup
        .array()
        .of(yup.object().shape({
            // design: yup.string().required('Design field is Required'),
            // finish: yup.string().required('Finish field is Required'),
            // areaName: yup.string().required('Area Name field is Required'),
            // floor: yup.string().required('Floor field is Required'),
            // floor: yup.string().nullable(),
            // quantity: yup.number().required('Quantity field is Required'),
            // proposedLayout: yup.string().nullable(),
            proposedLayoutId: yup.string().nullable(),
            leftImage: yup
                .string()
                .required('Customer Image field is Required'),
            rightImage: yup
                .string()
                .required('Proposed Image field is Required'),
            entries: yup.array().of(yup.object().shape({
                design: yup.string().required('Design field is Required'),
                finish: yup.string().required('Finish field is Required'),
                area: yup.string().required('Area Name field is Required'),
                floor: yup.string().nullable(),
                quantity: yup.number().required('Quantity Name field is Required'),
                // unitPrice: yup.string().required('Unit Price field is Required'),
            })).min(1).required('Atleast 1 entry is required'),
        })
        )
        .min(1)
        .required(),

})

const customerComponentDesign3DItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.ThreeDDesign]).required(),
    data: yup.array().of(yup.string().required()).required(),
})

const customerComponentSchema = yup.lazy((value) => {
    switch (value.value) {
        // case CustomerComponentEnum.Client:
        //     return customerComponentClientItemSchema;
        case CustomerComponentEnum.Feature:
            return customerComponentFeatureItemSchema
        case CustomerComponentEnum.Comparison:
            return customerComponentComparisonItemSchema
        case CustomerComponentEnum.Quotation:
            return customerComponentQuotationItemSchema
        case CustomerComponentEnum.TwoDDesign:
            return customerComponentDesign2DItemSchema
        case CustomerComponentEnum.ThreeDDesign:
            return customerComponentDesign3DItemSchema
        default:
            return yup.mixed().required()
    }
})

export const validateCustomerItemSchema = yup.object().shape({
    name: yup.string().required(),
    components: yup.array().of(customerComponentSchema).required(),
    id: yup.string().nullable(),
    customerId: yup.string().required(),
    at: yup
        .object()
        .shape({
            created: yup.date().nullable(),
            updated: yup.date().nullable(),
        })
        .required(),
})


export type TProposedLayoutItem = {
    title: string,
    file?: File,
    name: string,
    finish: string,
    design: string,
    customerId: string,
}


export const IS_VALID_FOR_URL = ({ components }: TCustomerItem) => {
    const quotation = components?.find(({ value }) => value === CustomerComponentEnum.Quotation) as TCustomerComponentQuotationItem
    const designItem = components?.find(({ value }) => value === CustomerComponentEnum.TwoDDesign) as TCustomerComponentDesign2DItem

    return quotation?.data?.invoiceUrl?.length && designItem?.data?.filter(({ entries }) => entries?.length && entries?.length == entries?.filter((entry) => entry.design?.length)?.length)?.length
}

const removeObject = ['leftImage', 'rightImage', 'areaName']

export const TRANSFORM_TWO_DIMENSIONAL_COMPONENT_DATA = (arr: TCustomerItem[]) => {

    return arr?.map((currentItem) => {
        let isTransformed: boolean
        const components = currentItem?.components?.map((currentComponent) => {
            switch (currentComponent.value) {
                case CustomerComponentEnum.TwoDDesign: {
                    const data = currentComponent.data?.map((currentLayout) => {
                        if ('entries' in currentLayout && currentLayout?.entries?.length) {
                            return currentLayout;
                        }
                        isTransformed = true
                        const entries = [
                            {
                                finish: `${currentLayout?.finish || ''}`,
                                area: `${currentLayout?.areaName || ''}`,
                                floor: `${currentLayout?.floor || ''}`,
                                design: `${currentLayout?.design || ''}`,
                                quantity: `${currentLayout.quantity || ''}`
                            }
                        ]
                        return {
                            ...currentLayout,
                            entries
                        } as TCustomerComponentDesign2DDataItem
                    })
                    return ({ ...currentComponent, data }) as TCustomerComponentDesign2DItem
                }
                default:
                    return ({ ...currentComponent })
            }
        })
        const results = ({
            ...currentItem,
            components,
            isTransformed: !!isTransformed
        })
        return results
    })
}

export function TRANSFORM_2D_LAGACY_TO_REFINED_FORMAT(arr: TCustomerItem[], id: string) {
    const currentItem = _.find(arr || [], { id })
    if (currentItem) {
        return currentItem?.components?.map((currentComponent) => {
            switch (currentComponent.value) {
                case CustomerComponentEnum.TwoDDesign:
                    {
                        return ({
                            ...currentComponent,
                            data: currentComponent?.data?.map((currentItem) => {
                                if (!('entries' in currentItem)) {
                                    const currentEntry = {
                                        ..._.omit(currentItem, removeObject),
                                        area: currentItem.areaName,
                                    }
                                    const mainEntries = [..._.keys(currentEntry), 'areaName']
                                    const results = _.omit({
                                        ...currentItem,
                                        proposedLayoutId: '',
                                        entries: [currentEntry]
                                    }, mainEntries)
                                    return results
                                }
                                return currentItem
                            })
                        }) as TCustomerComponentDesign2DItem

                    }
                default:
                    return currentComponent;
            }
        });
    }
}


