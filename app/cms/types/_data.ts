export interface ICmsState {
    projects: Project[];
    kitchens: Kitchen[];
    flats: number[];
}

export interface Kitchen {
    name: string;
    images: string[];
    projectId: number;
    selectedKitchenIds: number[];
}

export interface Project {
    id: number;
    name: string;
    description: string;
    kitchenIds: number[];
}

export const _CMS: ICmsState = {
    projects: [
        {
            id: 1,
            name: "DLF Sunrise",
            description: "Remark",
            kitchenIds: [
                1,
                2
            ]
        }
    ],
    kitchens: [
        {
            name: "Super Kitchen",
            images: [],
            projectId: 1,
            selectedKitchenIds: []
        }
    ],
    flats: [301, 302, 303, 304]
}



