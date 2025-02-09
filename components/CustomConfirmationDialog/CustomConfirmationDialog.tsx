import { MdDeleteOutline } from "react-icons/md";
//====================================================================
import CustomSimpleModal from '../CustomSimpleModal';

export default function CustomConfirmationDialog(props: TProps) {
    return <CustomSimpleModal
        show={props?.show}
        onHide={props.onHide}
        label={props?.text?.header || `Confirmation`}
    >
        <div className="grid grid-cols-1 p-5">
            <div className='text-gray-500  text-lg'>
                {props?.text?.remark || 'Are you sure to do this?'}
            </div>
            <div className='flex justify-end gap-1'>
                <button
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={() => { props.onHide() }}
                >
                    Cancel
                </button>
                {props?.variant === 'danger' ? <button
                    style={{ background: " #f00e0e" }}
                    className="cursor-pointer focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex gap-1"
                    onClick={() => { props.onConfirm() }}
                >
                    <MdDeleteOutline className="text-xl" />
                    {props?.text?.buttonLabel || 'Delete'}
                </button> : <button
                    onClick={() => { props.onConfirm() }}
                    className="cursor-pointer focus:outline-none text-white bg-indigo-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 flex gap-3"
                >
                    {props?.text?.buttonLabel || 'Submit'}
                </button>}


            </div>
        </div>
    </CustomSimpleModal>
}

type TProps = {
    show: boolean,
    variant?: 'danger' | '',
    text?: {
        header?: string,
        remark?: string,
        buttonLabel?: string
    },
    onHide: VoidFunction,
    onConfirm: VoidFunction
}
