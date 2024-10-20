import {
    useDispatch,
    useSelector,
    TypedUseSelectorHook
} from 'react-redux'

import type { RootState, AppDispatch } from "./store"

export * from "./store"
export * from "./../app/cms/redux/slices"
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
