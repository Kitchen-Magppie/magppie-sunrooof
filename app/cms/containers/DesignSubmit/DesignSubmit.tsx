import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
//====================================================================

import {
    CustomerComponentEnum,
    IProposedLayoutItem,
    TCustomerComponentDesign2DDataItem,
    TCustomerComponentDesign2DItem,
    TCustomerComponentItem,
    _,
} from '../../../../types'
import { INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM, INIT_CUSTOMER_ITEM } from '../../mocks'
import { useFirebaseStorageActions } from '../../../../hooks'
import { useAppSelector } from '../../../../redux'
// import { useNavigate } from 'react-router-dom'
import { useFirebaseCustomerAction } from '../../utils/firebase/customer'
import { useProposedLayoutAction } from '../../hooks'
import { useFirebaseCmsCustomerListener } from '../../utils/firebase'
import { CircularProgress } from '../../../../components'

// const UNIT_COUNT = { "Classical": 30, "Fluted": 30, "French Window": 0, "Louvered Window": 0, "Modern": 0, "Minimalist": 0 }
export default function DesignSubmit() {

    const [isLoading, setLoading] = useState(true)
    const StorageAction = useFirebaseStorageActions()
    const CustomerAction = useFirebaseCustomerAction()
    const ProposedLayoutDataAction = useProposedLayoutAction()
    const customers = useAppSelector(({ Cms }) => Cms.Customer)




    const navigate = useNavigate()
    useFirebaseCmsCustomerListener()
    const firestoreRunRef = useRef(null)
    const STORAGE_DATA: TSessionStorageData = useMemo(() => {
        const units_count = JSON.parse(localStorage.getItem("units_count"))
        return {
            ...INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
            customerId: localStorage.getItem("CUSTOMER_ID"),
            title: localStorage.getItem("LAYOUT_TITLE"),
            leftImage: localStorage.getItem("CUSTOMER_IMAGE"),
            rightImage: localStorage.getItem("PROPOSED_IMAGE"),
            windows: _.isObject(units_count) ? _.keys(units_count)?.map((win) => {
                return ({
                    label: win,
                    count: _.get(units_count, win, 0)
                })
            })?.filter((win) => win.count) : [],
            entries: _.keys(units_count).filter((win) => _.get(units_count, win))?.map((design) => {
                const quantity = _.get(units_count, design)
                const _common = { finish: '', area: '', floor: '' }
                return ({
                    ..._common,
                    design,
                    quantity
                })
            }),
        }
    }, [])


    const onCreateDatabaseCall = useCallback(() => {
        if (!customers?.loading) {
            if (STORAGE_DATA.rightImage?.length && STORAGE_DATA.leftImage?.length && !firestoreRunRef.current) {
                firestoreRunRef.current = true
                const files = [
                    _.base64ToFile(STORAGE_DATA.leftImage, `customer-image.png`),
                    _.base64ToFile(STORAGE_DATA.rightImage, 'proposed-layout.png'),
                ]
                // console.log(files)
                console.log(STORAGE_DATA)
                StorageAction.batch.upload({
                    files,
                    path: 'proposed-layout',
                    onSuccess: (e) => {
                        const currentCustomer = customers?.value?.find(
                            (customer) =>
                                customer.id ===
                                STORAGE_DATA?.customerId
                        )

                        const args = {
                            label: STORAGE_DATA.title,
                            name: currentCustomer?.name || localStorage.getItem('CUSTOMER_NAME'),
                            design: _.first(STORAGE_DATA?.windows).label,
                            sunrooofCount: _.first(STORAGE_DATA?.windows).count || 0,
                            finish: '',
                            customerId: STORAGE_DATA?.customerId || _.uuid(),
                            url: { customer: e[0], proposed: e[1] },
                            entries: _.get(STORAGE_DATA, 'entries', [])
                        }
                        console.log(args)
                        ProposedLayoutDataAction.add(args).then((response) => {
                            const proposedLayoutId = response.id
                            if (currentCustomer) {
                                const results = {
                                    ...currentCustomer,
                                    components: currentCustomer.components?.map((item) => CUSTOMER_COMPONENT_ITEM(item, { ...args, proposedLayoutId }, 'edit')),
                                    at: {
                                        created: currentCustomer.at.created,
                                        updated: new Date(),
                                    },
                                }
                                // console.log(results)

                                CustomerAction.edit(results)
                            } else {
                                const results = {
                                    name: args.name,
                                    customerId: args.customerId,
                                    components: INIT_CUSTOMER_ITEM.components?.map((item) => CUSTOMER_COMPONENT_ITEM(item, { ...args, proposedLayoutId }, 'create')),
                                    at: {
                                        created: new Date(),
                                    },
                                }
                                CustomerAction.add(results)
                            }
                        })


                        toast('Proposed image has been saved!')
                        // sessionStorage.clear()
                        setLoading(false)
                        // navigate(isRedirectBack ? '/cms/proposed/layout' : '/cms')
                    },
                })
            } else {
                console.log('Images could not be retrieved from session storage')
                // toast('Images could not be retrieved from session storage')
            }
        }
    }, [CustomerAction, ProposedLayoutDataAction, STORAGE_DATA, StorageAction.batch, customers?.loading, customers?.value])

    useEffect(() => { onCreateDatabaseCall() }, [onCreateDatabaseCall])

    return (
        <div className="flex flex-col justify-center w-full items-center min-h-screen">

            <h1 className="text-4xl font-bold mb-5">Layout Submission</h1>
            <div className="flex items-center justify-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold mb-5">Customer Image</h1>
                    <LazyLoadImage
                        effect="blur"
                        src={STORAGE_DATA.leftImage}
                        alt="Customer Layout"
                        className="rounded-lg shadow-md max-w-[600px] max-h-[600px] object-contain"
                    />
                </div>
                <div className="flex flex-col justify-center items-center mx-6">
                    <h1 className="text-2xl font-bold mb-5">Proposed Image</h1>
                    <LazyLoadImage
                        effect="blur"
                        src={STORAGE_DATA.rightImage}
                        alt="Proposed Layout"
                        className="rounded-lg shadow-md max-w-[600px] max-h-[600px] object-contain"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center w-full gap-4">
                <button
                    type="button"
                    onClick={() => {
                        navigate('/cms/proposed/old/layout')
                    }}
                    className={`text-white mt-10  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ${isLoading ? 'bg-blue-300 ' : 'bg-blue-700 hover:bg-blue-800'}`}
                    disabled={isLoading}

                >
                    Back to Old Design Generator
                </button>
                <button
                    type="button"
                    onClick={() => {
                        navigate('/cms')
                    }}
                    className={`text-white mt-10  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ${isLoading ? 'bg-blue-300 ' : 'bg-blue-700 hover:bg-blue-800'}`}
                    disabled={isLoading}
                >
                    Proceed to CMS
                </button>
            </div>
            {isLoading && (<div className="">
                <CircularProgress />
            </div>)}
        </div>
    )
}
const CUSTOMER_COMPONENT_ITEM = (item: TCustomerComponentItem, args: Omit<IProposedLayoutItem, 'id' | 'at'> & { proposedLayoutId: string }, action: 'create' | 'edit') => {
    if (item.value === CustomerComponentEnum.TwoDDesign) {
        const current2Design = {
            proposedLayoutId: args.proposedLayoutId,
            finish: args.finish,
            design: args.design,
            quantity: args.sunrooofCount,
            leftImage: args.url.customer,
            rightImage: args.url.proposed,
            entries: args.entries?.map((item) => {
                return ({
                    ...item,
                    proposedLayoutId: args.proposedLayoutId
                })
            }),
        }
        return {
            ...item,
            data: action === 'create' ? [current2Design] : [
                ...item.data,
                current2Design
            ],
        } as TCustomerComponentDesign2DItem
    }
    return item
}

type TSessionStorageData = TCustomerComponentDesign2DDataItem & { windows: { label: string, count: number }[], customerId: string, title: string }
//322
