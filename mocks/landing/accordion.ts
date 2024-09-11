import { INIT_CUSTOMER_SITE_COMPONENT, TComponentItem, TComponentTypography } from "../../types";
import { TLandingAccordion } from "./../../types/landing"

export const LANDING_ACCORDION: TLandingAccordion[] = [
    {
        label: "What is wellness kitchen?",
        description: `Wellness Kitchen is an innovation of Magppie, dedicated to safeguarding your family's health and safety.
  All other modular kitchens in the world use wooden cabinets that can be harmful and toxic, leading to various health issues. The World Health Organization (WHO) reports that wood-based materials like MDF, particle boards, and plywood contain formaldehyde, a toxic chemical that emits cancerous fumes. Termites from these materials can also be dangerous, especially for young children.
  At Magppie, we've found that silver is the best material for kitchen cabinets. We infuse silver particles into a special stone to create Silverstone, a unique, patented material. Our kitchen countertop as well as cabinets are made entirely from this material, avoiding wood and other toxic substances.
  Our Wellness Kitchens are the Safest Kitchens. 100% Termite Safe, 100% Bacteria Safe, 100% Fungus Safe, 100% Cancer Safe, 100% Fire Safe, 100% Made in Stone, 0% Wood, 25 Years Guarantee, 75 Complimentary Services`
    },
    {
        label: "What areas in kitchen are made of stone?",
        description: `The cabinets, door facias, countertop, and backsplash of the kitchen are all made of silverstone.
  By all other brands, cabinets and door facias of the kitchens are made of wood-based materials, which are toxic and harmful for our families. Our Wellness kitchens are made of Magppie’s patented silverstone.`
    },
    {
        label: "What is Silverstone?",
        description: `Silverstone is a Magppie patented material. It’s a man-made stone, produced by Magppie by infusing silver and copper particles inside the stone via nanotechnology. By this process, the good qualities of silver and copper enter inside the stone and make it anti-bacterial, anti-germs, and anti-fungal.`
    },
    {
        label: "Why is stone kitchen better than wooden kitchens?",
        description: `Wooden kitchens are harmful, leading to many health problems in our families. These wooden kitchens are made of materials like plywood, particle board & MDF - that contain a chemical called formaldehyde. This chemical gets heated in the kitchen and emits toxic fumes which is one of the causes of cancer and many other health problems.`
    },
    {
        label: "Are stone kitchens not heavy as compared to wooden kitchens?",
        description: `Definitely stone kitchens are heavier than the wooden kitchen. The density of stone is approximately 3 times more than particle board or plywood. Due to its dense nature, it becomes non-porous, which makes stone kitchens waterproof & termite-proof.`
    },
    {
        label: "What makes Magppie kitchens Termite proof?",
        description: `Magppie kitchens are fully made of stone. Termites cannot attack and enter stone. On the other side, wood is food for termites. There is no need to do anti-termite treatment on Magppie stone kitchens.`
    },
    {
        label: "What is the price of your kitchens?",
        description: `Our kitchens start from Rs 15 lacs and it could go up to Rs 50 lacs. The price depends on the kitchen size, layout, height, and the kind of accessories selected.`
    },
    {
        label: "What kind of guarantees are applicable on Magppie kitchens?",
        description: `Magppie kitchens come with 25 years of guarantee. Not just this, we give 3 complimentary services every year, which makes 75 services - free of cost.`
    },
    {
        label: "How long does the design process take?",
        description: `3 working days.`
    },
    {
        label: "How soon can the kitchen be installed?",
        description: `The delivery time is 2 months.`
    },
    {
        label: "What other products do you provide?",
        description: `Apart from wellness kitchens, we have a wellness lighting brand called ‘Sunroof’.`
    },
    {
        label: "What is Sunroof?",
        description: `It’s the World's First Lighting Technology which brings the effect and experience of sunlight inside any room.`
    },
    {
        label: "What is your store locations and operational hours?",
        description: `Magppie has 2 stores in Delhi and 1 in Mohali, Punjab.`
    }
];


export const FAQ_COMPONENT_ITEM = ({
    ...INIT_CUSTOMER_SITE_COMPONENT,
    name: 'faqs-component',
    items: LANDING_ACCORDION?.map((item) => {
        return ({
            ...INIT_CUSTOMER_SITE_COMPONENT.typography,
            main: item.label,
            description: item.description,
        }) as TComponentTypography
    })
}) as TComponentItem
