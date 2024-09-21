export type TComponentMeta = { order: { used: number[], next: number } }

type TCustomerComponentComparisonDataItem = {
    value: string,
    image: { before: string, after: string }
}
type TCustomerComponentComparisonItem = {
    value: CustomerComponentEnum.Comparison,
    data: TCustomerComponentComparisonDataItem[]
}
type TCustomerComponentClientItem = {
    value: CustomerComponentEnum.Client,
    data: { name: string, description: string }
}

type TCustomerComponentQuotationItem = {
    value: CustomerComponentEnum.Quotation,
    data: { header: string, illustration: string }
}

type TCustomerComponentDesign2DItem = {
    value: CustomerComponentEnum.TwoDDesign,
    data: {
        designBy: string,
        approvedBy: string,
        deisgn: string,
        finish: string,
        callingHeightOnSite: string,
        afterInstallation: string,
        yourPlan: string,
        header: string,
        leftImage: string,
        rightImage: string,
    }
}
type TCustomerComponentDesign3DItem = {
    value: CustomerComponentEnum.ThreeDDesign,
    data: string[]
}

type TCustomerComponentItem = TCustomerComponentClientItem |
    TCustomerComponentComparisonItem |
    TCustomerComponentQuotationItem | TCustomerComponentDesign2DItem | TCustomerComponentDesign3DItem


export type TCustomerItem = {
    name: string,
    components: TCustomerComponentItem[],
    id: string,
    componentId: string,
    at: { created: Date, updated: Date }
}
export enum CustomerComponentEnum {
    TwoDDesign = '2d-design',
    ThreeDDesign = '3d-design',
    Client = 'clients',
    Comparison = 'comparisons',
    Quotation = 'quotations'
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
