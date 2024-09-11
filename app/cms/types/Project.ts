export type TProject = {
    id: string,
    name: string,
    description: string,
    kitchenIds: string[],
    flats: { serial: number }[]
}
