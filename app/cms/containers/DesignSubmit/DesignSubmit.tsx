import { useEffect, useMemo, useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { toast } from 'react-toastify'
import {
    CustomerComponentEnum,
    TCustomerComponentDesign2DDataItem,
    TCustomerComponentDesign2DItem,
    _,
} from '../../../../types'
import { INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM, INIT_CUSTOMER_ITEM } from '../../mocks'
import { useFirebaseStorageActions } from '../../../../hooks'
import { useAppSelector } from '../../../../redux'
// import { useNavigate } from 'react-router-dom'
import { useFirebaseCustomerAction } from '../../utils/firebase/customer'
import { useProposedLayoutAction } from '../../hooks'
import { useFirebaseCmsCustomerListener } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'

const DesignSubmit = () => {

    const StorageAction = useFirebaseStorageActions()
    const CustomerAction = useFirebaseCustomerAction()
    const ProposedLayoutDataAction = useProposedLayoutAction()
    const navigate = useNavigate()
    useFirebaseCmsCustomerListener()
    const customers = useAppSelector((state) => state.Cms.Customer)
    const firestoreRunRef = useRef(null)
    const STORAGE_DATA: TSessionStorageData = useMemo(() => {
        const units_count = JSON.parse(sessionStorage.getItem("units_count"))
        return {
            ...INIT_CUSTOMER_COMPONENT_2D_DESIGN_ITEM,
            customerId: sessionStorage.getItem("CUSTOMER_ID"),
            title: sessionStorage.getItem("LAYOUT_TITLE"),
            leftImage: sessionStorage.getItem("CUSTOMER_IMAGE"),
            rightImage: sessionStorage.getItem("PROPOSED_IMAGE"),
            windows: _.isObject(units_count) ? _.keys(units_count)?.map((win) => {
                return ({
                    label: win,
                    count: _.get(units_count, win, 0)
                })
            })?.filter((win) => win.count) : []
        }
    }, [])



    useEffect(() => {
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

                        console.log(currentCustomer)
                        const args = {
                            label: STORAGE_DATA.title,
                            name: currentCustomer?.name || sessionStorage.getItem('CUSTOMER_NAME'),
                            design: _.first(STORAGE_DATA?.windows).label,
                            sunrooofCount: _.first(STORAGE_DATA?.windows).count || 0,
                            finish: '',
                            customerId: STORAGE_DATA?.customerId || _.uuid(),
                            url: { customer: e[0], proposed: e[1] },
                        }
                        console.log(args)
                        ProposedLayoutDataAction.add(args)
                        if (currentCustomer) {
                            const results = {
                                ...currentCustomer,
                                components: currentCustomer.components?.map(
                                    (item) => {
                                        if (
                                            item.value ===
                                            CustomerComponentEnum.TwoDDesign
                                        ) {
                                            return {
                                                ...item,
                                                data: [
                                                    ...item.data,
                                                    {
                                                        finish: args.finish,
                                                        design: args.design,
                                                        quantity:
                                                            args.sunrooofCount,
                                                        leftImage:
                                                            args.url.customer,
                                                        rightImage:
                                                            args.url.proposed,
                                                    },
                                                ],
                                            } as TCustomerComponentDesign2DItem
                                        }
                                        return item
                                    }
                                ),
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
                                components: INIT_CUSTOMER_ITEM.components?.map(
                                    (item) => {
                                        if (
                                            item.value ===
                                            CustomerComponentEnum.TwoDDesign
                                        ) {
                                            return {
                                                ...item,
                                                data: [
                                                    ...item.data,
                                                    {
                                                        finish: args.finish,
                                                        design: args.design,
                                                        quantity:
                                                            args.sunrooofCount,
                                                        leftImage:
                                                            args.url.customer,
                                                        rightImage:
                                                            args.url.proposed,
                                                    },
                                                ],
                                            } as TCustomerComponentDesign2DItem
                                        }
                                        return item
                                    }
                                ),
                                at: {
                                    created: new Date(),
                                },
                            }
                            console.log(results)
                            CustomerAction.add(results)
                        }

                        toast('Proposed image has been saved!')
                        sessionStorage.clear()
                        // navigate(isRedirectBack ? '/cms/proposed/layout' : '/cms')
                    },
                })
            } else {
                console.log('Images could not be retrieved from session storage')
                // toast('Images could not be retrieved from session storage')
            }
        }
    }, [
        STORAGE_DATA.rightImage,
        STORAGE_DATA.leftImage,
        STORAGE_DATA.title,
        STORAGE_DATA?.windows,
        STORAGE_DATA?.customerId,
        StorageAction.batch,
        customers,
        ProposedLayoutDataAction,
        CustomerAction,
        STORAGE_DATA
    ])

    return (
        <div className="flex flex-col justify-center w-full items-center min-h-screen">
            {/* <div className="flex flex-col items-center container mx-auto mb-5 justify-center w-full max-w-2xl"> */}
            {/* <h1 className="text-4xl font-bold mb-5">Layout Details</h1> */}
            {/* <div className=" w-full"> */}
            {/* <form className="flex justify-around"> */}
            {/* <div>
                            <label
                                htmlFor="desings"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Select Design
                            </label>
                            <select
                                id="desings"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected="">Choose a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div> */}
            {/* <div>
                            <label
                                htmlFor="finishes"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Select Finish
                            </label>
                            <select
                                id="finishes"
                                value={selectedFinish}
                                onChange={handleFinishChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="" defaultValue="Finish" disabled>
                                    Finish
                                </option>
                                {COMPONENT_DESIGN2D_FINISH_OPTIONS.map(
                                    (finish) => (
                                        <option key={finish} value={finish}>
                                            {finish}
                                        </option>
                                    )
                                )}
                            </select>
                        </div> */}
            {/* <div>
                            <label
                                htmlFor="floor"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Select Floor
                            </label>
                            <select
                                id="floor"
                                value={selectedFloor}
                                onChange={handleFloorChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="" disabled defaultValue="Floor">
                                    Floor
                                </option>
                                <option value="BSMT">BSMT</option>
                                <option value="GF">GF</option>
                                <option value="FF">FF</option>
                                <option value="SF">SF</option>
                                <option value="TF">TF</option>
                            </select>
                        </div> */}
            {/* <div>
                            <label
                                htmlFor="area_name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Area Name
                            </label>
                            <input
                                type="text"
                                value={areaName}
                                onChange={handleAreaNameChange}
                                id="area_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Living Room || Kitchen"
                                required
                            />
                        </div> */}
            {/* </form> */}
            {/* </div> */}
            {/* </div> */}
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
                    className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                    Back to Old Design Generator
                </button>
                <button
                    type="button"
                    onClick={() => {
                        navigate('/cms')
                    }}
                    className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                    Proceed to CMS
                </button>
            </div>
        </div>
    )
}

type TSessionStorageData = TCustomerComponentDesign2DDataItem & { windows: { label: string, count: number }[], customerId: string, title: string }
export default DesignSubmit
//322
