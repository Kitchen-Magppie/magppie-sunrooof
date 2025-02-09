export interface IProposedLayoutEntryItem {
    finish: string,
    area: string,
    floor: string,
    design: string,
    quantity: string,
    // proposedLayoutId?: string
}

export interface IProposedLayoutItem {
    id?: string,
    label: string,
    name: string,
    sunrooofCount: number,
    design: string,
    finish: string,
    customerId: string,
    entries?: IProposedLayoutEntryItem[],
    url: { proposed: string, customer: string },
    at: { created: Date, updated?: Date }
}


