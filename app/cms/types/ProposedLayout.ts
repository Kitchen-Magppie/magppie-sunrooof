export interface IProposedLayoutItem {
    id?: string,
    label: string,
    name: string,
    url: { proposed: string, customer: string },
    at: { created: Date, updated?: Date }
}
