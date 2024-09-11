export interface ISuperUser {
    id: string
    email: string
    createdAt: Date
    designation: string
    name: string
    profileUrl: string
}

export const INIT_SUPER_USER: ISuperUser = {
    id: '',
    email: '',
    createdAt: new Date(),
    designation: '',
    name: '',
    profileUrl: '',
}
