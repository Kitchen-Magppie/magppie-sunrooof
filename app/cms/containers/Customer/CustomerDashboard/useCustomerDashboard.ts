import { useCallback, useMemo, useState } from "react"
import {
    _,
    ComponentModeEnum,
    TComponentMode,
    TCustomerItem,
} from "../../../../../types"
import { useAppSelector } from "../../../../../redux";
import { INIT_CUSTOMER_COMPONENT_ITEM } from "../../../mocks";


export function useCustomerDashboard() {
    const [corpus, setCorpus] = useState(INIT_CORPUS)
    const value = useAppSelector((state) => state.Cms.Customer);



    const components = useMemo(() => {
        return _.sortBy(value.value?.filter((item) =>
            corpus.filteration.search?.length
                ? _.lowerCase(item.name)?.includes(_.lowerCase(corpus.filteration.search))
                : true
        ), 'orderId')
    }, [
        corpus.filteration.search,
        value.value
    ]);


    const onChangeModal = useCallback((args: TChangeModalEvent) => {
        setCorpus((prev) => ({
            ...prev,
            values: {
                ...prev.values,
                modal: {
                    ...prev.values.modal,
                    action: args.action,
                    value: args?.item,
                    open: args.value
                }
            },

        }))
    }, [])
    const onSearchItem = useCallback((search: string) => {
        setCorpus((prev) => ({
            ...prev,
            filteration: {
                ...prev.filteration,
                search
            }
        }))
    }, [])
    const data = useMemo(() => {
        return {
            ...corpus,
            values: {
                ...corpus.values,
                components,
                link: `${window.location.href}/fake`
            }
        }
    }, [components, corpus])

    return ({
        loading: value.loading,
        data,
        action: {
            onChangeModal,
            onSearchItem,
            onCloseModal: () => {
                onChangeModal({
                    action: ComponentModeEnum.None,
                    value: false,
                })
            }
        }
    })
}



type TCorpusModal = {
    action: TComponentMode,
    value: TCustomerItem,
    open: boolean
}

type TCorpus = {

    filteration: { search: string },
    values: {
        modal: TCorpusModal
    }
}
const INIT_CORPUS_MODAL: TCorpusModal = {
    action: ComponentModeEnum.None,
    value: INIT_CUSTOMER_COMPONENT_ITEM,
    open: false
}

export const INIT_CORPUS: TCorpus = {
    filteration: { search: '' },
    values: {
        modal: INIT_CORPUS_MODAL
    }
}


type TChangeModalEvent = { action: TComponentMode, value: boolean, item?: TCustomerItem }
