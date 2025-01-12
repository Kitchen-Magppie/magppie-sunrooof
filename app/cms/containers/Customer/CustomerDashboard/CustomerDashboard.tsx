import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { MdOutlineDesignServices } from "react-icons/md";
import { MdAddchart } from "react-icons/md";
//====================================================================
import { CmsSearch, CmsCustomerCardItem, CmsNotFound } from '../../../components'
import { CustomConfirmationDialog, CustomSimpleModal } from '../../../../../components'
import { useFirebaseCmsCustomerListener, useFirebaseCustomerDeepDeletionAction } from '../../../utils'
import { _, CMS_TOAST_CONFIG, ComponentModeEnum } from '../../../../../types'
import { DEFAULT_CUSTOMER, INIT_CUSTOMER_ITEM } from '../../../mocks'
import { CustomerActionForm, useCustomerDashboard } from '.'
import { useProposedLayoutListener } from '../../../hooks';
import { toast } from 'react-toastify';

export default function CustomerDashboard() {
    useFirebaseCmsCustomerListener()
    useProposedLayoutListener()
    useEffect(() => {
        document.title = 'Customer | CMS'
    }, [])

    const { loading, data, action } = useCustomerDashboard()
    const deleteAction = useFirebaseCustomerDeepDeletionAction()
    const renderDeleteConfirmationModal = useMemo(() => {
        const onConfirm = () => {
            if (data?.values?.modal?.value) {
                deleteAction.confirm(data?.values?.modal?.value).then(() => {
                    action.onCloseModal()
                    toast.success("Customer has been deleted", CMS_TOAST_CONFIG);

                })
            }

        }
        const show = data.values.modal.open && ComponentModeEnum.Delete === data.values.modal.action
        return <CustomConfirmationDialog
            variant='danger'
            text={{
                header: `Delete Confirmation`,
                remark: 'Are you sure you want to delete the customer & its layouts?'
            }}
            onHide={action.onCloseModal}
            onConfirm={onConfirm}
            show={show}
        />
    }, [
        action,
        data.values.modal.action,
        data.values.modal.open,
        data.values.modal?.value,
        deleteAction
    ])

    const renderActionModal = useMemo(() => {
        return (<CustomSimpleModal
            show={data.values.modal.open && [ComponentModeEnum.Edit, ComponentModeEnum.Create]?.includes(data.values.modal.action)}
            onHide={() => { action.onCloseModal() }}
            label={`${data.values.modal.action === ComponentModeEnum.Create ? 'Create' : 'Edit'} Component`}
        >
            <div className="p-2">
                <CustomerActionForm
                    onSubmit={() => { action.onCloseModal() }}
                    mode={data.values.modal.action}
                    item={data.values.modal.value}
                />
            </div>
        </CustomSimpleModal>
        )
    }, [action, data.values.modal.action, data.values.modal.open, data.values.modal.value])

    return (<div className='container mx-auto'>
        <div className="pt-4">
            <div className="flex gap-2 justify-between">
                <div className="w-full">
                    <CmsSearch
                        placeholder="Search.."
                        onChange={(e) => {
                            action.onSearchItem(e)
                        }}
                    />
                </div>
                <div className="flex gap-2">
                    <div >
                        <button
                            className="flex items-center px-4 py-4 text-sm font-medium text-center text-white bg-indigo-700 rounded-full hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                            onClick={() => {
                                action.onChangeModal({
                                    action: ComponentModeEnum.Create,
                                    value: true,
                                    item: INIT_CUSTOMER_ITEM,
                                })
                            }}
                        >
                            <MdAddchart className="text-lg" />
                        </button>
                    </div>
                    <div >
                        <Link
                            to='/cms/proposed/new/layout'
                            className="flex items-center px-4 py-4 text-sm font-medium text-center text-white bg-indigo-700 rounded-full hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                            <MdOutlineDesignServices className="text-lg" />
                        </Link>
                    </div>
                </div>
            </div>
            <div >
                <div className="text-4xl font-bold my-5">Quotations</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {loading ? (_.range(5)?.map((i) => (
                        <CardSkeleton key={i} />
                    ))) : data.values.components?.length ? (
                        <>
                            {data.values.components.map((item, i) => {
                                const isSecondaryRecord =
                                    item.customerId !==
                                    DEFAULT_CUSTOMER.customerId
                                const onClickEditModal = () => {
                                    if (item && isSecondaryRecord) {
                                        action.onChangeModal({
                                            action: ComponentModeEnum.Edit,
                                            value: true,
                                            item,
                                        })
                                    }
                                }
                                const onClickDeleteModal = () => {
                                    action.onChangeModal({
                                        action: ComponentModeEnum.Delete,
                                        value: true,
                                        item,
                                    })
                                }
                                return (<CmsCustomerCardItem
                                    onClickEditModal={onClickEditModal}
                                    onClickDeleteModal={onClickDeleteModal}
                                    item={item}
                                    key={i}
                                />
                                )
                            })}
                        </>
                    ) : (<div className="mt-40">
                        <CmsNotFound />
                    </div>)}
                </div>
            </div>
        </div>
        {renderActionModal}
        {renderDeleteConfirmationModal}
    </div>)
}

function CardSkeleton() {
    return (<div className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm animate-pulse md:p-6 dark:border-gray-700">
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
