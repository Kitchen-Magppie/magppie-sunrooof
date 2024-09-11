import _ from "./lodash"
import { STORAGE_BASE_URL } from "./storage"
export type TComponentMeta = { order: { used: number[], next: number } }

export type TComponentTypography = {
    main: string,
    secondary: string,
    subtitle: string,
    action: string,
    description: string,
    secondaryDescription: string
}
export type TComponentLink = { icon: string, bg: string, illustration: string }

export type TComponentMediaItem = { link: string, typography: TComponentTypography }


export type TComponentItem = {
    orderId: number,
    id: string,
    typography: TComponentTypography,
    items: TComponentTypography[],
    links: TComponentLink,
    name: string,
    isGallery: boolean,
    gallery: TComponentMediaItem[],
    icons: TComponentMediaItem[],
    at: { created: Date, updated: Date }
}


export const COMPONENT_META = (ar: TComponentItem[]) => {
    const used = _(ar).map('orderId').value().sort()
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
const INIT_CUSTOMER_SITE_COMPONENT_LINK: TComponentLink = {
    icon: '',
    bg: '',
    illustration: '',
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
    orderId: -1,
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
    typography: INIT_CUSTOMER_SITE_COMPONENT_TYPOGRAPHY,
    link: ""
}
// NOTE: Lagacy Cms/Landing Page;
export const _CUSTOMER_SITE_COMPONENTS: TComponentItem[] = [
    {
        ..._prev,

        orderId: 0,
        name: 'first-component',
        typography: {
            ..._prev.typography,
            main: 'MAGPPIE',
            secondary: 'an exclusive compilation for Ms Monica Chaudhary',
            subtitle: 'Habitat Architects • India'
        },
        links: {
            ..._prev.links,
            bg: `${STORAGE_BASE_URL}/customer%2Ftopbanner.png?alt=media&token=817c748a-5dc2-4011-a9af-681d3f749744`
        },
        at: { created: new Date(), updated: new Date() }
    },
    {
        ..._prev,

        orderId: 1,
        name: 'planet-component',
        typography: {
            ..._prev.typography,
            main: 'MAGPPIE',
            secondary: 'for people and planet',
            subtitle: 'We design and build products that bring wellness at home',
            description: 'At MAGPPIE™, we\'re committed to create products that make everyday life healthier and more sustainable. Our goal is to offer solutions that prioritise personal well-being while caring for our planet.'
        },
        links: {
            ..._prev.links,
            bg: `${STORAGE_BASE_URL}/customer%2Fsecondbanner.png?alt=media&token=13414136-43c0-4229-b78e-dfeea598b079`
        },
        at: { created: new Date(), updated: new Date() }


    },
    {
        ..._prev,

        orderId: 2,
        name: 'rating-component',
        typography: {
            ..._prev.typography,
            subtitle: 'Wellness Kitchens',
            main: 'MAGPPIE',
            secondary: '1',
            description: " Magppie Kitchens are world's first wellness kitchens, fully built in sanitised stone - Magppie Silverstone™",
            secondaryDescription: "These kitchens are fully washable, most hygienic and world's most strongest."
        },
        links: {
            ..._prev.links,
            illustration: `${STORAGE_BASE_URL}/customer%2Fintro.png?alt=media&token=5dedc173-9df0-4b34-be40-11162784f284`
        },
        at: { created: new Date(), updated: new Date() }

    },
    {
        ..._prev,

        orderId: 3,
        name: 'transform-component',
        typography: {
            ..._prev.typography,

            main: 'Transform Your Kitchen, Transform Your',
            secondary: 'Health',
            subtitle: 'Upgrade to Magppie Wellness Kitchen'
        },
        at: { created: new Date(), updated: new Date() }

    }

]


export const _LANDING_COMPONENTS: TComponentItem[] = [
    {
        ..._prev,
        name: "feedback-component",
        gallery: [
            {
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Franbir.png?alt=media&token=08d63e95-7d2e-4d73-bf50-56aa64798556",
                typography: {
                    secondaryDescription: "",
                    subtitle: "Actor",
                    description: "",
                    secondary: "",
                    action: "",
                    main: "Ranbir Kapoor"
                }
            },
            {
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fharbajan.png?alt=media&token=74829590-e717-4eba-8083-0f2f310be870",
                typography: {
                    action: "",
                    secondary: "",
                    secondaryDescription: "",
                    description: "",
                    subtitle: "Cricketer, Indian Team",
                    main: "Harbhajan Singh"
                }
            },
            {
                typography: {
                    secondaryDescription: "",
                    description: "",
                    subtitle: "Captain, Indian Cricket Team",
                    main: "MS Dhoni",
                    action: "",
                    secondary: ""
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fdhoni.png?alt=media&token=d37f9726-a18e-48d3-9877-e08afd77d4a3"
            },
            {
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fwrshad.png?alt=media&token=cc70d597-a871-4490-874f-be4435e826b4",
                typography: {
                    action: "",
                    subtitle: "Actor",
                    secondaryDescription: "",
                    secondary: "",
                    description: "",
                    main: "Arshad Warsi"
                }
            },
            {
                typography: {
                    subtitle: "Chairperson, Park",
                    action: "",
                    secondaryDescription: "",
                    main: "Priya Paul",
                    description: "",
                    secondary: ""
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2FPriya_Paul.png?alt=media&token=52a256b9-a4b0-442e-be9b-c770e26f387b"
            },
            {
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2FSubhash_Chandra.png?alt=media&token=85240335-fa7a-4b46-a94f-2a4634a2bc92",
                typography: {
                    subtitle: "Chairman, ZeeTv",
                    secondary: "",
                    action: "",
                    main: "Subhash Chandra",
                    description: "",
                    secondaryDescription: ""
                }
            },
            {
                typography: {
                    subtitle: "Actor",
                    secondaryDescription: "",
                    description: "",
                    secondary: "",
                    main: "Chiranjeevi",
                    action: ""
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2FChiranjeevi.png?alt=media&token=146dd141-7425-4f84-b40e-346df083b5c8"
            },
            {
                typography: {
                    action: "",
                    subtitle: "Owner, Airtel",
                    secondaryDescription: "",
                    secondary: "",
                    description: "",
                    main: "Sunil Bharti Mittal"
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2FSunil_Bharti_Mittal.png?alt=media&token=8710940f-34f8-42f7-ac24-aeb701ca9952"
            }
        ],

        orderId: 5,
        typography: {
            ..._prev.typography,
            main: "The ones who already <b><em>SWITCHED</em></b>",
        },
        isGallery: true,
    },
    {
        ..._prev,
        name: "footer-component",
        items: [
            {
                ..._prev.typography,
                secondary: "about-us",
                main: "About",
            },
            {
                ..._prev.typography,
                main: "Gallery",
                secondary: "gallery",
            },
            {
                ..._prev.typography,
                secondary: "products",
                main: "Products",
            },
            {
                ..._prev.typography,
                secondary: "get-in-touch",
                main: "Get in Touch",
            },
            {
                ..._prev.typography,
                main: "Meet our Clients",
                secondary: "meet-our-clients"
            },
            {
                ..._prev.typography,
                main: "Request a Call",
                secondary: "request-a-call",
            },
            {
                ..._prev.typography,
                secondary: "testimonials",
                main: "Testimonials",
            },
            {
                ..._prev.typography,
                secondary: "request-a-call-back",
                main: "Request a Call Back",
            }
        ],
        typography: {
            ..._prev.typography,
            action: "Back to top",
            main: "Privacy Policy",
            description: "© Copyright 2016 All Rights Reserved by Magppie"
        },
        orderId: 9,
    },
    {
        ..._prev,
        gallery: [
            {
                typography: _prev.typography,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2F1720890827657.png?alt=media&token=5753a5fe-ceae-4f35-812a-dc03cf110d0c"
            },
            {
                typography: _prev.typography,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2F1720890827656.jpeg?alt=media&token=bd2f6ff1-ab3e-4c34-b622-29ef1f70fe4d"
            },
            {
                typography: _prev.typography,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2F1720890827655.jpeg?alt=media&token=059413ab-d77b-4099-9da5-29afaf827630"
            },
            {
                typography: _prev.typography,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fkitchen-making-unhealthy.png?alt=media&token=aa86ed8c-2e66-444d-a44b-31297dc453ff"
            }
        ],
        name: "carousel-component",
        typography: {
            ..._prev.typography,
            main: "What makes <b>MAGPPIE</b> different?",
        },

        orderId: 2,
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
        orderId: 0,
        links: {
            ..._prev.links,
            bg: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Freel.png?alt=media&token=dce817bf-3eef-4e3e-a38f-dae1940e84de",
        },
    },
    {
        ..._prev,
        name: "faq-component",
        items: [
            {
                ..._prev.typography,
                description: "Description is here",
                main: "lorem ipsum dolor sit ame.",
            },
            {
                ..._prev.typography,
                description: "Description is here",
                main: "lorem ipsum dolor sit ame.",
            },
            {
                ..._prev.typography,
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
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/customer%2Fintro.png?alt=media&token=5dedc173-9df0-4b34-be40-11162784f284",
                typography: _prev.typography
            },
            {
                typography: _prev.typography,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/customer%2Fintro.png?alt=media&token=5dedc173-9df0-4b34-be40-11162784f284"
            },
            {
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/customer%2Fintro.png?alt=media&token=5dedc173-9df0-4b34-be40-11162784f284",
                typography: _prev.typography,
            },
            {
                typography: _prev.typography,
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/customer%2Fintro.png?alt=media&token=5dedc173-9df0-4b34-be40-11162784f284"
            }
        ],
        orderId: 6,
    },
    {
        ..._prev,
        orderId: 3,
        name: "kitchen-toggle-component",
        typography: {
            ..._prev.typography,
            secondary: "Tired of unhealthy Kitchen?",
            main: "Switch to wellness Kitchen.",
        },
    },
    {
        ..._prev,
        orderId: 4,
        typography: {
            ..._prev.typography,
            main: "What makes <strong>MAGPPIE</strong> different?",
        },
        name: "scope-component",
        gallery: [
            {
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fanti-fungal.png?alt=media&token=ff934359-fae6-44d2-b136-f277482e0dc2",
                typography: {
                    ..._prev.typography,
                    main: "Anti Fungal"
                }
            },
            {
                typography: {
                    ..._prev.typography,
                    main: "Anti Virus",
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fanti-virus.png?alt=media&token=252f9665-08ad-4dde-b36c-8d2db5449889"
            },
            {
                typography: {
                    ..._prev.typography,
                    main: "Anti Bacterial",
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fanti-bacterial.png?alt=media&token=e13d457a-8988-40fd-92cb-62a4e37268b6"
            },
            {
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fanti-germs.png?alt=media&token=46e4172d-2a58-4aa4-8da0-d198fbbf995d",
                typography: {
                    ..._prev.typography,
                    main: "Anti Germs"
                }
            },
            {
                typography: {
                    ..._prev.typography,
                    main: "Scratch Proof",
                },
                link: "https://firebasestorage.googleapis.com/v0/b/magppie-e89d7.appspot.com/o/landing%2Fscratch-proof.png?alt=media&token=49840dbc-04f6-45b0-8fde-4a3a8e1aaf81"
            },
            {
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
                main: "Talk to our executive and discuss your requirement.",
            },
            {
                ..._prev.typography,
                main: "Receive a design presentation with detailed cost sheet.",
            },
            {
                ..._prev.typography,
                main: "Approve the design and commericals to start production.",
            },
            {
                ..._prev.typography,
                main: "Once the Kitchen is ready our teams world bring it and install at your specified location.",
            }
        ],
        isGallery: false,
        orderId: 7,
        typography: {
            ..._prev.typography,
            action: "Request a call",
            main: "How to buy a <b>MAGPPIE</b> Wellness Kitchen in 4 easy steps?",
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
                main: `At Magppie, we've discovered that silver is the best
                    material for kitchen cabinets. By infusing silver into a
                    special stone, we've created a unique, patented material
                    called Silverstone. Our kitchens are made entirely from this
                    material, avoiding the use of wood and other toxic
                    substances.`
            },
            {
                ..._prev.typography,
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
