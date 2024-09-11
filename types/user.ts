export interface IUser {
    id: string,
    email: string;
    password: string;
}

export const INIT_USER: IUser = {
    id: '',
    email: '',
    password: '',
}
