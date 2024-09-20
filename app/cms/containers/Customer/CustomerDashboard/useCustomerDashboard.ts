import { useCallback, useMemo, useState } from "react"
import {
    _,
    ComponentModeEnum,
    INIT_CUSTOMER_SITE_COMPONENT,
    TComponentItem,
    TComponentMode
} from "../../../../../types"
import { useAppSelector } from "../../../../../redux";
import { COMPONENT_SECTIONS } from "../../../mocks/component";

export function useCustomerDashboard() {
    const [corpus, setCorpus] = useState(INIT_CORPUS)
    const value = useAppSelector((state) => state.Cms.CustomerSiteComponent);

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

    const onToggleModal = useCallback(() => {
        setCorpus((prev) => ({
            ...prev,
            toggle: {
                ...prev.toggle,
                isOpenComponentModal: !prev.toggle.isOpenComponentModal
            }
        }))
    }, [])

    const onChangeModal = useCallback((args: { action: TComponentMode, value: boolean }) => {
        setCorpus((prev) => ({
            ...prev,
            values: {
                ...prev.values,
                modal: {
                    ...prev.values.modal,
                    action: args.action
                }
            },
            toggle: {
                ...prev.toggle,
                isOpenComponentModal: args.value
            }
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
            onToggleModal,
            onChangeModal,
            onSearchItem
        }
    })
}



type TCorpusModal = { action: TComponentMode, value: TComponentItem, open: boolean }

type TCorpus = {
    toggle: { isOpenComponentModal: boolean },
    filteration: {
        search: string,
    },
    values: {
        sections: string[],
        modal: TCorpusModal
    }
}
const INIT_CORPUS_MODAL: TCorpusModal = {
    action: ComponentModeEnum.None,
    value: INIT_CUSTOMER_SITE_COMPONENT,
    open: false
}

const INIT_CORPUS: TCorpus = {
    toggle: { isOpenComponentModal: false },
    filteration: { search: '' },
    values: {
        sections: COMPONENT_SECTIONS,
        modal: INIT_CORPUS_MODAL
    }
}


