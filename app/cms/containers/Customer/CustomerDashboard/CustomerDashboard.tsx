import { useMemo } from "react";
import { RiApps2AddLine } from "react-icons/ri";
import { FaEarthAmericas } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";

//====================================================================
import {
    CmsSearch,
    // MinimalAccordion,
    CmsCustomerCardItem,
    CmsNotFound
} from "../../../components";
import { CustomSimpleModal } from "../../../../../components";
import { CmsCopyClipboard } from "./../../../components"
import { ComponentActionForm } from "../../SiteComponent/components";
import { useCustomerDashboard } from "./useCustomerDashboard";
import { useFirebaseCmsSiteComponentListener } from "../../../utils/firebase";
import { ComponentModeEnum } from "../../../../../types";
import { INIT_CUSTOMER_COMPONENT_ITEM } from "../../../mocks/component";

export default function CustomerDashboard() {
    useFirebaseCmsSiteComponentListener()
    const { loading, data, action } = useCustomerDashboard();

    const renderActionModal = useMemo(() => {
        return (<CustomSimpleModal
            show={data.toggle.isOpenComponentModal}
            onHide={() => {
                action.onChangeModal({
                    action: ComponentModeEnum.None,
                    value: false
                })
            }}
            label="Create Component"
        >
            <div className="p-2">

                <ComponentActionForm
                    mode={ComponentModeEnum.Create}
                    // mode={data.values.modal.action}
                    // item={section}
                    item={data.values.modal.value}
                />
                {/* {data.values.modal.value?.map((section, i) => {

                    return (<MinimalAccordion title={section.name} key={i}>
                        <ComponentActionForm
                            mode={ComponentModeEnum.Create}
                            // mode={data.values.modal.action}
                            item={section}
                        />
                    </MinimalAccordion>)
                })} */}

                <div className="flex flex-col gap-1">
                    <div className="">
                        <button
                            type="button"
                            className="flex items-center gap-1 text-white  bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            <FaEarthAmericas />  Genrate URL
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            URL: <div className=" underline text-blue-700">{data.values.link}</div>
                        </div>
                        <div className="cursor-pointer">
                            {/* <FaRegCopy /> */}
                            <CmsCopyClipboard text={data.values.link} />
                        </div>

                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        // disabled={corpus.isSubmitting}
                        type="submit"
                        className=" flex justify-center gap-3 flex-row align-middle w-full p-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {data.values.modal.action} Component
                        {!data.toggle.isOpenComponentModal ? <AiOutlineLoading3Quarters className='text-xl animate-spin' /> : <IoCreateOutline className='text-xl' />}
                    </button>
                </div>

                {/* <div className="flex justify-center">
                    <button
                        type="button"
                        className="flex items-center gap-1 text-white  bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        <LuSave />  Save
                    </button>
                </div> */}

            </div>
        </CustomSimpleModal>)
    }, [
        action,
        data.toggle.isOpenComponentModal,
        data.values.link,
        data.values.modal.action,
        data.values.modal.value
    ])

    return <div>
        <div>
            <div className="flex gap-2 justify-between">
                <div className=" w-full">
                    <CmsSearch
                        placeholder="Search.."
                        onChange={(e) => {
                            action.onSearchItem(e)
                        }} />
                </div>
                <button className="flex items-center p-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                        action.onChangeModal({
                            action: ComponentModeEnum.Create,
                            value: true,
                            item: INIT_CUSTOMER_COMPONENT_ITEM
                        })
                    }}
                >
                    <RiApps2AddLine className="text-2xl" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
                {loading ? Array.from({ length: 5 })?.map((_, i) => <CardSkeleton key={i} />) : (data.values.components?.length ? (<>
                    {data.values.components.map((item, i) => {
                        return <CmsCustomerCardItem
                            onClickModal={() => {
                                action.onChangeModal({
                                    action: ComponentModeEnum.Edit,
                                    value: true
                                })
                            }}
                            item={item}
                            key={i}
                        // variant={CmsCardEnum.Pending}
                        />
                    })}
                </>) : <div className="mt-40"> <CmsNotFound /></div>)}
            </div>
        </div>
        {renderActionModal}
    </div>
}

function CardSkeleton() {
    return (<div className="max-w-sm p-4 bg-white border border-gray-300 rounded-2xl shadow-sm animate-pulse md:p-6 dark:border-gray-700"    >
        {/* <div className="flex items-center justify-center h-48 mb-4 bg-white rounded dark:bg-gray-700" /> */}
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 py-3 mb-4" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
    </div>
    )
}
