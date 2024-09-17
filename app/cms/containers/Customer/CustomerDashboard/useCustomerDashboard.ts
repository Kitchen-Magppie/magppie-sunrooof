import { useCallback, useMemo, useState } from "react"
import { _, INIT_CUSTOMER_SITE_COMPONENT, TComponentItem } from "../../../../../types"
import { useAppSelector } from "../../../../../redux";

export function useCustomerDashboard() {
    const [corpus, setCorpus] = useState(INIT_CORPUS)
    const value = useAppSelector((state) => state.Cms.CustomerSiteComponent);

    const components = useMemo(() => {
        return _.sortBy(value.value?.filter((item) =>
            corpus.filteration.search?.length
                ? _.lowerCase(item.name)?.includes(_.lowerCase(corpus.filteration.search))
                : true
        ), 'orderId')
    }, [corpus.filteration.search, value.value]);

    const onToggleModal = useCallback(() => {
        setCorpus((prev) => ({
            ...prev,
            toggle: {
                ...prev.toggle,
                isOpenComponentModal: !prev.toggle.isOpenComponentModal
            }
        }))
    }, [])

    return ({
        loading: value.loading,
        data: {
            ...corpus,
            values: {
                ...corpus.values,
                components,
                link: `${window.location.href}/fake`
            }
        },
        action: {
            onToggleModal,
            onSearchItem: (search: string) => {
                setCorpus((prev) => ({
                    ...prev,
                    filteration: {
                        ...prev.filteration,
                        search
                    }
                }))
            }
        }
    })
}



type TMode = 'create' | 'edit' | ''
type TCorpusModal = { action: TMode, value: TComponentItem, open: boolean }

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
    action: '',
    value: INIT_CUSTOMER_SITE_COMPONENT,
    open: false
}
const SECTIONS = [
    'Comparisons (Before & After)',
    '2D Design',
    '3D Design',
    'Quotation'
]

const INIT_CORPUS: TCorpus = {
    toggle: { isOpenComponentModal: false },
    filteration: { search: '' },
    values: {
        sections: SECTIONS,
        modal: INIT_CORPUS_MODAL
    }
}


