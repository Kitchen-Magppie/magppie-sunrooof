import { useEffect, useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { toast } from 'react-toastify'
import {
    CustomerComponentEnum,
    TCustomerComponentDesign2DItem,
    _,
} from '../../../../types'
import {
    // COMPONENT_DESIGN2D_FINISH_OPTIONS,
    INIT_CUSTOMER_ITEM,
} from '../../mocks'
import { useFirebaseStorageActions } from '../../../../hooks'
import { useAppSelector } from '../../../../redux'
import { useNavigate } from 'react-router-dom'
import { useFirebaseCustomerAction } from '../../utils/firebase/customer'
import { useProposedLayoutAction } from '../../hooks'

const DesignSubmit = ({
    props,
    isRedirectBack,
}: {
    props: TProps
    isRedirectBack: boolean
}) => {
    const { Presentation } = useAppSelector(({ Cms }) => Cms)
    const customerImage = sessionStorage.getItem('CUSTOMER_IMAGE')
    const proposedImage = sessionStorage.getItem('PROPOSED_IMAGE')
    const StorageAction = useFirebaseStorageActions()
    const action = useFirebaseCustomerAction()
    const navigate = useNavigate()
    const customers = useAppSelector((state) => state.Cms.Customer.value)
    const ProposedLayoutDataAction = useProposedLayoutAction()
    const firestoreRunRef = useRef(null)
    // const [selectedFinish, setSelectedFinish] = useState(
    //     sessionStorage.getItem('selectedFinish') || ''
    // )
    // const [selectedFloor, setSelectedFloor] = useState(
    //     sessionStorage.getItem('selectedFloor') || ''
    // )
    // const [areaName, setAreaName] = useState(
    //     sessionStorage.getItem('areaName') || ''
    // )

    // const handleFinishChange = (event) => {
    //     setSelectedFinish(event.target.value)
    // }

    // const handleFloorChange = (event) => {
    //     setSelectedFloor(event.target.value)
    // }

    // const handleAreaNameChange = (event) => {
    //     setAreaName(event.target.value)
    // }

    // useEffect(() => {
    //     sessionStorage.setItem('selectedFinish', selectedFinish)
    //     sessionStorage.setItem('selectedFloor', selectedFloor)
    //     sessionStorage.setItem('areaName', areaName)
    // }, [selectedFinish, selectedFloor, areaName])

    useEffect(() => {
        if (customerImage && proposedImage && !firestoreRunRef.current) {
            firestoreRunRef.current = true
            StorageAction.batch.upload({
                files: [
                    _.base64ToFile(customerImage, 'customer-image.png'),
                    _.base64ToFile(proposedImage, 'proposed-layout.png'),
                ],
                path: 'proposed-layout',
                onSuccess: (e) => {
                    const args = {
                        label: Presentation?.value?.title,
                        name: Presentation?.value?.name,
                        design: Presentation?.value?.design,
                        sunrooofCount: 0,
                        finish: Presentation?.value.finish,
                        customerId: Presentation?.value?.customerId || _.uuid(),
                        url: { customer: e[0], proposed: e[1] },
                    }
                    ProposedLayoutDataAction.add(args)

                    const currentCustomer = customers?.find(
                        (customer) =>
                            customer.customerId ===
                            Presentation?.value?.customerId
                    )
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
                        console.log(results)

                        action.edit(results)
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
                        action.add(results)
                    }

                    toast('Proposed image has been saved!')
                    if (isRedirectBack) {
                        props.onToggleEditorPage(false)
                    }
                    // navigate(isRedirectBack ? '/cms/proposed/layout' : '/cms')
                },
            })
        } else {
            toast('Images could not be retrieved from session storage')
        }
    }, [
        Presentation?.value?.customerId,
        Presentation?.value?.design,
        Presentation?.value.finish,
        Presentation?.value?.name,
        Presentation?.value?.title,
        ProposedLayoutDataAction,
        StorageAction.batch,
        action,
        customerImage,
        customers,
        isRedirectBack,
        navigate,
        proposedImage,
        props,
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
                        src={customerImage}
                        alt="Customer Layout"
                        className="rounded-lg shadow-md max-w-[600px] max-h-[600px] object-contain"
                    />
                </div>
                <div className="flex flex-col justify-center items-center mx-6">
                    <h1 className="text-2xl font-bold mb-5">Proposed Image</h1>
                    <LazyLoadImage
                        effect="blur"
                        src={proposedImage}
                        alt="Proposed Layout"
                        className="rounded-lg shadow-md max-w-[600px] max-h-[600px] object-contain"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center w-full gap-4">
                <button
                    type="button"
                    className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                    Back to Old Design Generator
                </button>
                <button
                    type="button"
                    className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                    Proceed to CMS
                </button>
            </div>
        </div>
    )
}

type TProps = { onToggleEditorPage: (e: boolean) => void }

export default DesignSubmit
