export type TComponentMeta = { order: { used: number[], next: number } }

export type TComponentTypography = {
    main: string,
    secondary: string,
    subtitle: string,
    action: string,
    description: string,
    secondaryDescription: string
}
export enum CustomerComponentEnum {
    TwoDDesign = '2d-design',
    ThreeDDesign = '3d-design',
    Client = 'clients',
    Comparison = 'comparisons',
    Quotation = 'quotations'
}

export type TComponentLink = { icon: string, bg: string, illustration: string, video: string }
export enum ViewPortEnum {
    None = '',
    Mobile = 'mobile',
    Desktop = 'desktop'
}
export enum CmsComponentMediaEnum {
    Gallery = 'gallery',
    Icon = 'icons'
}

export type TViewPort = ViewPortEnum.None | ViewPortEnum.Mobile | ViewPortEnum.Desktop

type TComponentMediaTypography = { main: string, description: string }

export type TComponentMediaItem = {
    orderId: string,
    link: string,
    typography: TComponentMediaTypography,
    // viewport: TViewPort
}


export type TComponentItem = {
    typography: TComponentTypography,
    items: (TComponentTypography & { orderId: string })[],
    links: TComponentLink,
    value: string,
    // isGallery: boolean,
    gallery: TComponentMediaItem[],
    icons: TComponentMediaItem[],
}

export type TCustomerComponentItem = {
    name: string,
    components: TComponentItem[],
    id: string,
    componentId: string,
    at: { created: Date, updated: Date }

}



// export const COMPONENT_META = (ar: TComponentItem[]) => {
//     const used = ar?.map((row) => Number(row.orderId))?.sort()
//     const next = _(used).max() + 1
//     return ({ order: { used, next } }) as TComponentMeta
// }

export const INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY: TComponentTypography = {
    main: '',
    secondary: '',
    subtitle: '',
    description: '',
    secondaryDescription: '',
    action: '',
}
export const INIT_COMPNENT_MEDIA_TYPOGRAPHY: TComponentMediaTypography = { main: '', description: '' }

export const INIT_CUSTOMER_SITE_COMPONENT_LINK: TComponentLink = {
    icon: '',
    bg: '',
    illustration: '',
    video: ''
}
// const INIT_CUSTOMER_SITE_COMPONENT_SECTIONS: TComponentSection = {
//     links: INIT_CUSTOMER_SITE_COMPONENT_LINK,
//     typography: INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY,
//     isGallery: false,
//     images: []
// }
export const INIT_CUSTOMER_SITE_COMPONENT: TComponentItem = {
    typography: INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY,
    links: INIT_CUSTOMER_SITE_COMPONENT_LINK,
    value: '',
    icons: [],
    gallery: [],
    items: [],
}

// const _prev = INIT_CUSTOMER_SITE_COMPONENT

// console.log(_prev)


export const COMPONENT_MEDIA_ITEM: TComponentMediaItem = {
    orderId: '',
    typography: INIT_COMPNENT_MEDIA_TYPOGRAPHY,
    link: "",
    // viewport: ViewPortEnum.None
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
