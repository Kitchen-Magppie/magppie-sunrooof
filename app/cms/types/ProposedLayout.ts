export interface IProposedLayoutItem {
    id?: string,
    label: string,
    name: string,
    sunrooofCount: number,
    design: string,
    finish: string,
    customerId: string,
    url: { proposed: string, customer: string },
    at: { created: Date, updated?: Date }
}
