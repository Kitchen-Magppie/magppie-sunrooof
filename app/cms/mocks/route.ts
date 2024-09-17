import { NavItemEnum, TNavItem } from "../types";

export const CMS_NAV_ITEMS: TNavItem[] = [
    {
        value: NavItemEnum.Dashboard,
        url: '/cms',
        title: 'Dashboard'
    },
    {
        value: NavItemEnum.Customer,
        url: '/cms/customers',
        title: 'Customer'
    },
    {
        value: NavItemEnum.Component,
        url: '/cms/components',
        title: 'Component'
    }
]
