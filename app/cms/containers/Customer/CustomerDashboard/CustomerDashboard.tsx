import { useMemo } from "react";
import { RiApps2AddLine } from "react-icons/ri";

//====================================================================
import {
    CmsSearch,
    CmsCustomerCardItem,
    CmsNotFound
} from "../../../components";
import { CustomSimpleModal } from "../../../../../components";
import { useFirebaseCmsCustomerListener } from "../../../utils/firebase";
import { ComponentModeEnum } from "../../../../../types";
import {
    INIT_CUSTOMER_ITEM
} from "../../../mocks";
import {
    CustomerActionForm,
    useCustomerDashboard
} from ".";
// import CustomDumpButton from "../../../components/Dump/CustomDumpButton";

export default function CustomerDashboard() {
    useFirebaseCmsCustomerListener()
    const { loading, data, action } = useCustomerDashboard();
    // console.log(DEFAULT_CUSTOMER)
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
                <CustomerActionForm
                    mode={ComponentModeEnum.Create}
                    item={data.values.modal.value}
                />
            </div>
        </CustomSimpleModal>)
    }, [action, data.toggle.isOpenComponentModal, data.values.modal.value])

    return <div>
        <div>
            {/* <CustomDumpButton /> */}
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
                            item: INIT_CUSTOMER_ITEM
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
                                if (item) {
                                    action.onChangeModal({
                                        action: ComponentModeEnum.Edit,
                                        value: true,
                                        item
                                    })
                                }
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



