export type TComponentMeta = { order: { used: number[], next: number } }

import * as yup from 'yup';

export type TCustomerComponentComparisonDataItem = {
    value: string,
    image: { before: string, after: string }
}
export type TCustomerComponentComparisonItem = {
    value: CustomerComponentEnum.Comparison,
    data: TCustomerComponentComparisonDataItem[]
}
export type TCustomerComponentClientItem = {
    value: CustomerComponentEnum.Client,
    data: { name: string, description: string }
}

export type TCustomerComponentQuotationItem = {
    value: CustomerComponentEnum.Quotation,
    data: {
        name: string,
        email: string,
        mobile: string,
        createdDate: string,
        address: string,
        zone: string,
        invoiceUrl: string
    }
}

export type TCustomerComponent2DDesignOptionItem = { label: string; value: keyof TCustomerComponentDesign2DDataItem, field: 'text' | 'image' }
export type TCustomerComponentDesign2DDataItem = {
    designBy: string,
    approvedBy: string,
    design: string,
    finish: string,
    callingHeightOnSite: string,
    afterInstallation: string,
    yourPlan: string,
    header: string,
    leftImage: string,
    rightImage: string,
}

export type TCustomerComponentDesign2DItem = {
    value: CustomerComponentEnum.TwoDDesign,
    data: TCustomerComponentDesign2DDataItem[]
}
export enum CustomerComponentEnum {
    TwoDDesign = '2d-design',
    ThreeDDesign = '3d-design',
    Client = 'clients',
    Comparison = 'comparisons',
    Quotation = 'quotations',
    None = ''
}

type TCustomerComponentDesign3DItem = {
    value: CustomerComponentEnum.ThreeDDesign,
    data: string[]
}

export type TCustomerComponentItem = TCustomerComponentClientItem |
    TCustomerComponentComparisonItem |
    TCustomerComponentQuotationItem |
    TCustomerComponentDesign2DItem |
    TCustomerComponentDesign3DItem


export type TCustomerItem = {
    name: string,
    components: TCustomerComponentItem[],
    id: string,
    customerId: string,
    at: { created: Date, updated: Date }
}




export enum ComponentModeEnum {
    Create = 'create',
    Edit = 'edit',
    None = ''
}

export type TComponentMode = ComponentModeEnum.Create
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
    return text.replace(/==nextline==\s*<br \/>/g, '\n')
        .replace(/==italic\s*(\w+)==\s*/g, '<i>$1</i>')
        .replace(/==bold\s*(\w+)==\s*/g, '<b>$1</b>')
        .split('\n').map((line) => line)
};



const comparisonDataItemSchema = yup.object().shape({
    value: yup.string().required(),
    image: yup.object().shape({
        before: yup.string().required(),
        after: yup.string().required(),
    }).required(),
});

const customerComponentComparisonItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.Comparison]).required(),
    data: yup.array().of(comparisonDataItemSchema).required(),
});

const customerComponentClientItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.Client]).required(),
    data: yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
    }).required(),
});

const customerComponentQuotationItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.Quotation]).required(),
    data: yup.object({
        name: yup.string().required(),
        email: yup.string().required(),
        mobile: yup.string().required(),
        createdDate: yup.string().required(),
        address: yup.string().required(),
        zone: yup.string().required(),
        invoiceUrl: yup.string().required()
    }).required(),
});

const customerComponentDesign2DItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.TwoDDesign]).required(),
    data: yup.array().of(yup.object().shape({
        designBy: yup.string().required(),
        approvedBy: yup.string().required(),
        design: yup.string().required(),
        finish: yup.string().required(),
        callingHeightOnSite: yup.string().required(),
        afterInstallation: yup.string().required(),
        yourPlan: yup.string().required(),
        header: yup.string().required(),
        leftImage: yup.string().required(),
        rightImage: yup.string().required(),
    })).required(),
});

const customerComponentDesign3DItemSchema = yup.object().shape({
    value: yup.mixed().oneOf([CustomerComponentEnum.ThreeDDesign]).required(),
    data: yup.array().of(yup.string().required()).required(),
});

const customerComponentSchema = yup.lazy((value) => {
    switch (value.value) {
        case CustomerComponentEnum.Client:
            return customerComponentClientItemSchema;
        case CustomerComponentEnum.Comparison:
            return customerComponentComparisonItemSchema;
        case CustomerComponentEnum.Quotation:
            return customerComponentQuotationItemSchema;
        case CustomerComponentEnum.TwoDDesign:
            return customerComponentDesign2DItemSchema;
        case CustomerComponentEnum.ThreeDDesign:
            return customerComponentDesign3DItemSchema;
        default:
            return yup.mixed().required();
    }
});

export const validateCustomerItemSchema = yup.object().shape({
    name: yup.string().required(),
    components: yup.array().of(customerComponentSchema).required(),
    id: yup.string().required(),
    customerId: yup.string().required(),
    at: yup.object().shape({
        created: yup.date().required(),
        updated: yup.date().required(),
    }).required(),
});
