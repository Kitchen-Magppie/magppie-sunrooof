import { useCallback, useMemo, useState } from "react"
import { _, INIT_CUSTOMER_SITE_COMPONENT, TComponentItem } from "../../../../../types"

export function useCustomerDashboard() {
    const [corpus, setCorpus] = useState(INIT_CORPUS)


    const components = useMemo(() => {
        return _.sortBy(corpus.values.components?.filter((item) =>
            corpus.filteration.search?.length
                ? _.lowerCase(item.name)?.includes(_.lowerCase(corpus.filteration.search))
                : true
        ), 'orderId')
    }, [corpus.filteration.search, corpus.values.components]);

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
        data: {
            ...corpus,
            values: { ...corpus.values, components }
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
        components: TComponentItem[],
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
const _components: TComponentItem[] = Array.from({ length: 5 })?.map((_, i) => {

    return ({
        ...INIT_CUSTOMER_SITE_COMPONENT,
        name: `MagpPie Sunrooof #${i + 1}`
    }) as TComponentItem
})

const INIT_CORPUS: TCorpus = {
    toggle: { isOpenComponentModal: false },
    filteration: { search: '' },
    values: {
        components: _components,
        sections: SECTIONS,
        modal: INIT_CORPUS_MODAL
    }
}


