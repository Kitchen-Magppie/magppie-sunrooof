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
import { DEFAULT_CUSTOMER, INIT_CUSTOMER_ITEM } from "../../../mocks";
import { CustomerActionForm, useCustomerDashboard } from ".";

export default function CustomerDashboard() {

    useFirebaseCmsCustomerListener()

    const { loading, data, action } = useCustomerDashboard();

    const renderActionModal = useMemo(() => {
        const isCreateAction = data.values.modal.action === ComponentModeEnum.Create
        return (<CustomSimpleModal
            show={data.toggle.isOpenComponentModal}
            onHide={() => {
                action.onChangeModal({
                    action: ComponentModeEnum.None,
                    value: false
                })
            }}
            label={`${isCreateAction ? 'Create' : 'Edit'} Component`}
        >
            <div className="p-2">
                <CustomerActionForm
                    onSubmit={() => {
                        action.onChangeModal({
                            action: ComponentModeEnum.None,
                            value: false
                        })
                    }}
                    mode={data.values.modal.action}
                    item={data.values.modal.value}
                />
            </div>
        </CustomSimpleModal>)
    }, [
        action,
        data.toggle.isOpenComponentModal,
        data.values.modal.action,
        data.values.modal.value
    ])

    return <div>
        <div className="pt-4">
            <div className="flex gap-2 justify-between">
                <div className="w-full">
                    <CmsSearch placeholder="Search.." onChange={(e) => { action.onSearchItem(e) }} />
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
            <div className="">
                <div className="text-2xl font-bold my-5">Quotations</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {loading ? Array.from({ length: 5 })?.map((_, i) => <CardSkeleton key={i} />) : (data.values.components?.length ? (<>
                        {data.values.components.map((item, i) => {
                            const isSecondaryRecord = item.customerId !== DEFAULT_CUSTOMER.customerId
                            const onClickModal = () => {
                                if (item && isSecondaryRecord) {
                                    action.onChangeModal({
                                        action: ComponentModeEnum.Edit,
                                        value: true,
                                        item
                                    })
                                }
                            }
                            return <CmsCustomerCardItem onClickModal={onClickModal} item={item} key={i} />
                        })}
                    </>) : <div className="mt-40"> <CmsNotFound /></div>)}
                </div>
            </div>
        </div>
        {renderActionModal}
    </div>
}

function CardSkeleton() {
    return (<div className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm animate-pulse md:p-6 dark:border-gray-700"    >
        <div className="flex justify-between">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 py-3 mb-4" />
            <div className=" bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4" />
        </div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-5" />
        <div className="h-4 bg-gray-200 rounded-lg dark:bg-gray-700 w-24 py-4" />
    </div>
    )
}



