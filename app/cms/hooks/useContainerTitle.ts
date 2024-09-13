import { useLocation } from "react-router-dom";
import { CMS_NAV_ITEMS } from "../mocks";
import { useEffect } from "react";

export function useContainerTitle() {
    const { pathname } = useLocation()
    useEffect(() => {
        const item = CMS_NAV_ITEMS?.find((row) => row.url === pathname)
        document.title = `${item.title || 'Home'} | Sunrooof`
    }, [pathname])
}
