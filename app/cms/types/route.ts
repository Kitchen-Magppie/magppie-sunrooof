export enum NavItemEnum {
    Customer = 'customers',
    Component = 'components',
    Dashboard = 'Dashboard',

}

export type TNavItem = {
    value: NavItemEnum,
    url: string,
    title: string
}

