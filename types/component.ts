import _ from "./lodash"
export type TComponentMeta = { order: { used: number[], next: number } }

export type TComponentTypography = {
    main: string,
    secondary: string,
    subtitle: string,
    action: string,
    description: string,
    secondaryDescription: string
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
    viewport: TViewPort
}


export type TComponentItem = {
    orderId: string,
    id: string,
    typography: TComponentTypography,
    items: (TComponentTypography & { orderId: string })[],
    links: TComponentLink,
    name: string,
    isGallery: boolean,
    gallery: TComponentMediaItem[],
    icons: TComponentMediaItem[],
    at: { created: Date, updated: Date }
}


export const COMPONENT_META = (ar: TComponentItem[]) => {
    const used = ar?.map((row) => Number(row.orderId))?.sort()
    const next = _(used).max() + 1
    return ({ order: { used, next } }) as TComponentMeta
}

export const INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY: TComponentTypography = {
    main: '',
    secondary: '',
    subtitle: '',
    description: '',
    secondaryDescription: '',
    action: '',
}
export const INIT_COMPNENT_MEDIA_TYPOGRAPHY: TComponentMediaTypography = { main: '', description: '' }

const INIT_CUSTOMER_SITE_COMPONENT_LINK: TComponentLink = {
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
    orderId: '',
    id: '',
    name: '',
    isGallery: false,
    icons: [],
    gallery: [],
    items: [],
    // sections: INIT_CUSTOMER_SITE_COMPONENT_SECTIONS,
    at: { created: new Date(), updated: new Date() }
}

const _prev = INIT_CUSTOMER_SITE_COMPONENT


export const COMPONENT_MEDIA_ITEM: TComponentMediaItem = {
    orderId: '',
    typography: INIT_COMPNENT_MEDIA_TYPOGRAPHY,
    link: "",
    viewport: ViewPortEnum.None
}


export enum ComponentModeEnum {
    Create = 'create',
    Edit = 'edit',
    None = ''
}

export type TComponentMode = ComponentModeEnum.Create
    | ComponentModeEnum.Edit
    | ComponentModeEnum.None

export const _LANDING_COMPONENTS: TComponentItem[] = [
    {
        ..._prev,
        orderId: '',
        name: "image-gallery-component",
        isGallery: true,
        icons: [],
        gallery: [
            {
                ...COMPONENT_MEDIA_ITEM,
                viewport: ViewPortEnum.Mobile,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fmobile%2Fone.png?alt=media&token=049d4bc2-be2d-49b2-a309-0fa68aeb9e5e"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Mobile,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fmobile%2Ftwo.png?alt=media&token=4c26a865-d923-434b-9cab-117d1b0ad193"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Mobile,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fmobile%2Fthree.png?alt=media&token=63e10c99-ea01-4b74-984d-13ad5d492c40"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Mobile,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fmobile%2Ffour.png?alt=media&token=9d9639d1-93a9-4b01-ac25-068a71e2d673"
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                viewport: ViewPortEnum.Mobile,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fmobile%2Ffive.png?alt=media&token=c9626bb0-9711-4249-816a-58879c75bacb"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Mobile,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fmobile%2Fgallery-9.png?alt=media&token=37ba9696-83b0-4de6-a1be-fa155a70814b"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Mobile,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fmobile%2Fgallery-10.png?alt=media&token=cbbc502c-b711-486a-9568-a17e365c0d2f"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Mobile,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fmobile%2Fgallery-8.png?alt=media&token=44cadc12-9a7c-4f07-8371-a88a3bd3f91d"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Mobile,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fmobile%2Fnine.png?alt=media&token=00974493-92b9-44d0-9fb1-0b159bef33ee"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Mobile,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fmobile%2Ften.png?alt=media&token=863c78e6-31c2-455f-b435-09821ae97dfa"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Mobile,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fmobile%2Feleven.png?alt=media&token=93fc86c3-8415-44a4-8da1-f4706f54ce17"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Desktop,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fdesktop%2Fone.png?alt=media&token=c8e1a09d-c1f4-4ef6-92e6-1bf9183b48a9"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Desktop,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fdesktop%2Ftwo.png?alt=media&token=65f3ab3a-3a25-4339-8f10-48e09f90f4c8"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Desktop,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fdesktop%2Fgallery-8.png?alt=media&token=ff366f8b-c2f0-4172-b987-69df0622c10f"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Desktop,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fdesktop%2Ffour.png?alt=media&token=6e8ae84f-0b77-4a83-af96-fa0ff9987f8e"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Desktop,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fdesktop%2Ffive.png?alt=media&token=78a5a648-e2ff-4520-8532-73c6860309a7"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Desktop,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fdesktop%2Fsix.png?alt=media&token=c9973ccc-fbdd-43c9-90b8-ff3c5eabb445"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Desktop,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fdesktop%2Fgallery-10.png?alt=media&token=68ff2b01-ee53-4e63-bed0-0f10d5ce20fe"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Desktop,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fdesktop%2Fgallery-9.png?alt=media&token=b5d21521-e127-4897-a002-d4d0d8a9d484"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Desktop,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fdesktop%2Fnine.png?alt=media&token=e4af06a9-eaeb-4fc5-b2bf-27ed7dc4551b"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                viewport: ViewPortEnum.Desktop,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fdesktop%2Ften.png?alt=media&token=c482e821-f184-4fec-a7c1-8a329a92ee81"
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                viewport: ViewPortEnum.Desktop,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fgallery%2Fdesktop%2Feleven.png?alt=media&token=949a951f-b434-4ad2-9433-75646b73c116"
            }
        ],
    },
    {
        ..._prev,
        gallery: [
            {
                ...COMPONENT_MEDIA_ITEM,
                typography: {
                    ...COMPONENT_MEDIA_ITEM.typography,
                    main: "100% Made in Stone",
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fqualities%2Fimage1.png?alt=media&token=d99b7637-3af2-41c5-8275-d81b1b3b6743"
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                typography: {
                    ...COMPONENT_MEDIA_ITEM.typography,
                    main: "0% Wood",
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fqualities%2Fimage2.png?alt=media&token=b82d73f3-39b2-478a-94df-962a80ab065e"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fqualities%2Fimage3.png?alt=media&token=8d19b1ec-ccef-4a2c-8283-f57a32726629",
                typography: {
                    ...COMPONENT_MEDIA_ITEM.typography,

                    main: "25 years Guarantee",
                }
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fqualities%2Fimage4.png?alt=media&token=21250a83-3408-44d0-b5be-5cfe3d613193",
                typography: {
                    ...COMPONENT_MEDIA_ITEM.typography,
                    main: "75 Complimentary Services",

                }
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                typography: {
                    ...COMPONENT_MEDIA_ITEM.typography,
                    main: "Termite Safe",

                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fqualities%2Fimage5.png?alt=media&token=43feb814-0f6e-46b8-b1c9-38619a478501"
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fqualities%2Fimage6.png?alt=media&token=b464b837-33d5-498e-b11c-3a03b0363e6c",
                typography: {
                    ...COMPONENT_MEDIA_ITEM.typography,
                    main: "Bacteria Safe",
                }
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                typography: {
                    ...COMPONENT_MEDIA_ITEM.typography,

                    main: "Cancer Safe"
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fqualities%2Fimage7.png?alt=media&token=94a6f208-41e8-489a-a634-f0a220b898e1"
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                typography: {
                    ...COMPONENT_MEDIA_ITEM.typography,

                    main: "Fire Safe",
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fqualities%2Fimage8.png?alt=media&token=da469140-ef48-408a-944a-2bf3143942bf"
            }
        ],
        name: "quality-component",
        typography: {
            ..._prev.typography,
            main: `What makes <span class='font-bold'>MAGPPIE</span> kitchens the safest?`
        },
        isGallery: true,
    },
    // {
    //     ..._prev,
    //     name: 'client-component',
    //     typography: {
    //         ..._prev.typography,
    //         main: `The ones who chose <span class="font-bold">MAGPPIE</span> safe kitchens`
    //     },
    //     isGallery: true,
    //     // Column|Row|Height(optional)
    //     gallery: [
    //         {
    //             ...COMPONENT_MEDIA_ITEM,
    //             link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fclients%2Fdhoni.png?alt=media&token=9ecab41b-c77f-4c6f-bf66-8208d031a53a",
    //             typography: {
    //                 main: "MS Dhoni",
    //                 secondary: "0|0",
    //                 subtitle: "Cricket Captain",
    //                 description: "1|1",
    //                 secondaryDescription: "2|2",
    //                 action: "|"
    //             }
    //         },
    //         {
    //             ...COMPONENT_MEDIA_ITEM,
    //             link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fclients%2Fpriya.png?alt=media&token=72d87da9-2d57-4778-afac-69cea7edcbcb",
    //             typography: {
    //                 main: "Priya Paul",
    //                 secondary: "7|1",
    //                 subtitle: "Chairperson, Park",
    //                 description: "1|1",
    //                 secondaryDescription: "1|1",
    //                 action: "|"
    //             }
    //         },
    //         {
    //             ...COMPONENT_MEDIA_ITEM,
    //             link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fclients%2Farshad.png?alt=media&token=ff4b4378-54c7-4071-93b3-13ffdb231ae2",
    //             typography: {
    //                 main: "Arshad Warsi",
    //                 secondary: "1|2",
    //                 subtitle: "Actor",
    //                 description: "1|1",
    //                 secondaryDescription: "1|1",
    //                 action: "|"
    //             }
    //         },
    //         {
    //             ...COMPONENT_MEDIA_ITEM,
    //             link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fclients%2Fchiranjeevi.png?alt=media&token=f4236a9a-b719-43f6-9799-486d59d754b9",
    //             typography: {
    //                 main: "Chiranjeevi",
    //                 secondary: "3|3",
    //                 subtitle: "Actor",
    //                 description: "1|1",
    //                 secondaryDescription: "1|1",
    //                 action: "1|"
    //             }
    //         },
    //         {
    //             ...COMPONENT_MEDIA_ITEM,
    //             link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fclients%2Fharbajan.png?alt=media&token=9eed04d5-22c6-4ec7-b9a4-0a214d45ddae",
    //             typography: {
    //                 main: "Harbhajan Singh",
    //                 secondary: "2|4",
    //                 subtitle: "Cricketer",
    //                 description: "1|1",
    //                 secondaryDescription: "1|1",
    //                 action: "|"
    //             }
    //         },
    //         {
    //             ...COMPONENT_MEDIA_ITEM,
    //             link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fclients%2Fvandana.png?alt=media&token=b7647b5e-c5c2-4ac8-9c28-b2dc3c59abf8",
    //             typography: {
    //                 main: "Vandana Munjal",
    //                 secondary: "5|5",
    //                 subtitle: "Owner, Hero",
    //                 description: "1|1",
    //                 secondaryDescription: "1|1",
    //                 action: "|"
    //             }
    //         },
    //         {
    //             ...COMPONENT_MEDIA_ITEM,
    //             link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fclients%2Fsubhash.png?alt=media&token=bbab07d1-b852-4f86-b463-13a336c6af38",
    //             typography: {
    //                 main: "Subhash Chandra",
    //                 secondary: "10|6",
    //                 subtitle: "Chairman, ZeeTv",
    //                 description: "1|1",
    //                 secondaryDescription: "1|1",
    //                 action: "1|1"
    //             }
    //         },
    //         {
    //             ...COMPONENT_MEDIA_ITEM,
    //             link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fclients%2Franbir.png?alt=media&token=6b76c6b1-80dd-4d5a-923c-38c2b9f36e10",
    //             typography: {
    //                 main: "Ranbir Kapoor",
    //                 secondary: "4|7",
    //                 subtitle: "Actor",
    //                 description: "1|1",
    //                 secondaryDescription: "2|2",
    //                 action: "|"
    //             }
    //         },
    //         {
    //             ...COMPONENT_MEDIA_ITEM,
    //             link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fclients%2Fsunil.png?alt=media&token=cb7e7e13-4577-4f46-bd22-50dd992b81bd",
    //             typography: {
    //                 main: "Sunil Bharti Mittal",
    //                 secondary: "6|8",
    //                 subtitle: "Owner, Airtel",
    //                 description: "1|1",
    //                 secondaryDescription: "2|2",
    //                 action: "|"
    //             }
    //         },
    //         {
    //             ...COMPONENT_MEDIA_ITEM,
    //             link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fclients%2Fkamal.png?alt=media&token=8330d064-db96-44c2-8cc1-1046fbd54d47",
    //             typography: {
    //                 main: "Kamal Nath",
    //                 secondary: "9|9",
    //                 subtitle: "Member of Parliament, India",
    //                 description: "1|1",
    //                 secondaryDescription: "1|1",
    //                 action: "1|1"
    //             }
    //         },
    //         {
    //             ...COMPONENT_MEDIA_ITEM,
    //             link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fclients%2Fnatasha.png?alt=media&token=3e9379d5-0f7a-4b4a-bd7a-783ded993f5f",
    //             typography: {
    //                 main: "Natasha Poonawala",
    //                 secondary: "8|10",
    //                 subtitle: "Philanthropist",
    //                 description: "1|1",
    //                 secondaryDescription: "1|1",
    //                 action: "|"
    //             }
    //         }
    //     ]
    // },
    {
        ..._prev,
        orderId: '7',
        name: 'footer-component',
        typography: {
            ..._prev.typography,
            subtitle: "MAGPPIE",
            main: "Privacy Policy",
            action: "Back to top",
            description: "© Copyright 2016 All Rights Reserved by Magppie",
        },
        items: [
            {
                ..._prev.typography,
                orderId: '1',
                main: 'Consultation',
                subtitle: 'mobile',
                secondary: ''
            },
            {
                ..._prev.typography,
                orderId: '2',
                main: 'Gallery',
                subtitle: 'mobile',
                secondary: ''
            },
            {
                ..._prev.typography,
                orderId: '3',
                main: 'Clients',
                subtitle: 'mobile',
                secondary: ''
            },
            {
                ..._prev.typography,
                orderId: '4',
                main: 'Testimonials',
                subtitle: 'mobile',
                secondary: ''
            },
            {
                ..._prev.typography,
                orderId: '5',
                main: 'FAQs',
                subtitle: 'mobile',
                secondary: ''
            },
            {
                ..._prev.typography,
                secondary: "about-us",
                orderId: "1",
                main: "About"
            },
            {
                ..._prev.typography,
                secondary: "gallery",
                main: "Gallery",
                orderId: "2"
            },
            {
                ..._prev.typography,
                orderId: "3",
                secondary: "products",
                main: "Products",
                action: ""
            },
            {
                ..._prev.typography,
                orderId: "4",
                secondary: "get-in-touch",
                main: "Get in Touch"
            },
            {
                ..._prev.typography,
                orderId: "5",
                secondary: "meet-our-clients",
                main: "Meet our Clients"
            },
            {
                ..._prev.typography,
                orderId: "6",
                main: "Request a Call",
                secondary: "request-a-call"
            },
            {
                ..._prev.typography,

                main: "Testimonials",
                orderId: "7",
                secondary: "testimonials"
            },
            {
                ..._prev.typography,
                secondary: "request-a-call-back",
                orderId: "8",
                main: "Request a Call Back"
            }
        ]
    },
    {
        ..._prev,
        gallery: [
            {
                ...COMPONENT_MEDIA_ITEM,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2F1720890827657.png?alt=media&token=5753a5fe-ceae-4f35-812a-dc03cf110d0c"
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2F1720890827656.jpeg?alt=media&token=bd2f6ff1-ab3e-4c34-b622-29ef1f70fe4d"
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2F1720890827655.jpeg?alt=media&token=059413ab-d77b-4099-9da5-29afaf827630"
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fkitchen-making-unhealthy.png?alt=media&token=aa86ed8c-2e66-444d-a44b-31297dc453ff"
            }
        ],
        name: "carousel-component",
        typography: {
            ..._prev.typography,
            main: "What makes <b>MAGPPIE</b> different?",
        },
        orderId: '2',
        isGallery: true,
    },
    {
        ..._prev,
        name: "reel-component",
        typography: {
            ..._prev.typography,
            main: "MAGPPIE",
            action: 'book your consultation',
            secondary: 'stone kitchens',
            description: "Welcome to the <b><i>SPIRITUAL</i></b> heart of your Home.",
        },
        orderId: '0',
        links: {
            ..._prev.links,
            video: 'https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fmobile%2Ffront-reel.mp4?alt=media&token=d6f138c5-c281-4046-88e2-20f0a7f715aa',
            bg: 'https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fimage00019.jpg?alt=media&token=b3982954-41ea-4d2f-99f8-ee44790bfb6b',
            illustration: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Freel.png?alt=media&token=dce817bf-3eef-4e3e-a38f-dae1940e84de",
        },
    },
    {
        ..._prev,
        name: "faq-component",
        items: [
            {
                ..._prev.typography,
                orderId: '',
                description: "Description is here",
                main: "lorem ipsum dolor sit ame.",
            },
            {
                ..._prev.typography,
                orderId: '',
                description: "Description is here",
                main: "lorem ipsum dolor sit ame.",
            },
            {
                ..._prev.typography,
                orderId: '',
                description: "Description is here",
                main: "lorem ipsum dolor sit ame.",
            }
        ],

    },
    {
        ..._prev,
        name: "explore-gallery-component",
        typography: {
            ..._prev.typography,
            main: "Explore our <i>Gallery</i>",
        },
        gallery: [
            {
                ...COMPONENT_MEDIA_ITEM,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/customer%2Fintro.png?alt=media&token=5dedc173-9df0-4b34-be40-11162784f284",
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/customer%2Fintro.png?alt=media&token=5dedc173-9df0-4b34-be40-11162784f284"
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/customer%2Fintro.png?alt=media&token=5dedc173-9df0-4b34-be40-11162784f284",
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/customer%2Fintro.png?alt=media&token=5dedc173-9df0-4b34-be40-11162784f284"
            }
        ],
        orderId: '6',
    },
    {
        ..._prev,
        orderId: '3',
        name: "kitchen-toggle-component",
        typography: {
            ..._prev.typography,
            secondary: "Tired of unhealthy Kitchen?",
            main: "Switch to wellness Kitchen.",
        },
    },
    {
        ..._prev,
        orderId: '4',
        typography: {
            ..._prev.typography,
            main: "What makes <strong>MAGPPIE</strong> different?",
        },
        name: "scope-component",
        gallery: [
            {
                ...COMPONENT_MEDIA_ITEM,

                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fanti-fungal.png?alt=media&token=ff934359-fae6-44d2-b136-f277482e0dc2",
                typography: {
                    ..._prev.typography,
                    main: "Anti Fungal"
                }
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                typography: {
                    ..._prev.typography,
                    main: "Anti Virus",
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fanti-virus.png?alt=media&token=252f9665-08ad-4dde-b36c-8d2db5449889"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                typography: {
                    ..._prev.typography,
                    main: "Anti Bacterial",
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fanti-bacterial.png?alt=media&token=e13d457a-8988-40fd-92cb-62a4e37268b6"
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fanti-germs.png?alt=media&token=46e4172d-2a58-4aa4-8da0-d198fbbf995d",
                typography: {
                    ..._prev.typography,
                    main: "Anti Germs"
                }
            },
            {
                ...COMPONENT_MEDIA_ITEM,

                typography: {
                    ..._prev.typography,
                    main: "Scratch Proof",
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fscratch-proof.png?alt=media&token=49840dbc-04f6-45b0-8fde-4a3a8e1aaf81"
            },
            {
                ...COMPONENT_MEDIA_ITEM,
                typography: {
                    ..._prev.typography,
                    main: "Stain Proof"
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fstain-proof.png?alt=media&token=30cea321-004f-4269-990c-2d4bde6b770a"
            }
        ],
        isGallery: true,
    },
    {
        ..._prev,
        name: "step-component",
        items: [
            {
                ..._prev.typography,
                orderId: '',
                main: "Talk to our executive and discuss your requirement.",
            },
            {
                ..._prev.typography,
                orderId: '',
                main: "Receive a design presentation with detailed cost sheet.",
            },
            {
                ..._prev.typography,
                orderId: '',
                main: "Approve the design and commericals to start production.",
            },
            {
                ..._prev.typography,
                orderId: '',
                main: "Once the Kitchen is ready our teams world bring it and install at your specified location.",
            }
        ],
        isGallery: false,
        orderId: '7',
        typography: {
            ..._prev.typography,
            action: "Request a call",
            main: `How to buy a <span class="font-bold">MAGPPIE</span> Wellness Kitchen in 4 easy steps?`,
        },
    },
    {
        ..._prev,
        name: 'about-component',
        typography: {
            ..._prev.typography,
            subtitle: 'Our Stone Kitchens are strong and safe',
            secondary: 'Discover why your kitchen might be unsafe',
            main: 'Our kitchens are Safe'
        },
        items: [
            {
                ..._prev.typography,
                orderId: '',
                main: `Most modular kitchens in the world are made from wooden
                    cabinets, which can be harmful and toxic, leading to various
                    health problems in our families. Research by the World
                    Health Organization states that wood-based materials like
                    MDF, particle boards, and plywood contain a toxic chemical
                    called formaldehyde, which emits cancerous fumes in our
                    kitchens. Moreover, termites emerging from wood-based
                    materials are extremely harmful, especially for young kids.
                    At Magppie, we've discovered that silver is the best
                    material for kitchen cabinets. By infusing silver into a
                    special stone, we've created a unique, patented material
                    called Silverstone. Our kitchens are made entirely from this
                    material, avoiding the use of wood and other toxic
                    substances.`
            },
            {
                ..._prev.typography,
                orderId: '',
                main: `At Magppie, we've discovered that silver is the best
                    material for kitchen cabinets. By infusing silver into a
                    special stone, we've created a unique, patented material
                    called Silverstone. Our kitchens are made entirely from this
                    material, avoiding the use of wood and other toxic
                    substances.`
            },
            {
                ..._prev.typography,
                orderId: '',
                main: `MAGPPIE kitchens are dedicated to safeguarding your family's
                    health and safety.`
            },
        ]
    }
]


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
