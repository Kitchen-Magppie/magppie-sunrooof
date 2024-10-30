// import { MdPostAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { CiCircleAlert } from "react-icons/ci";

export function QuotationConvasAlert(props: TProps) {
    return <div
        className="p-4 border border-gray-300  bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
    >
        <div className="flex items-center justify-between">
            <div className="flex flex-row align-middle justify-center items-center gap-2 ">
                <CiCircleAlert className="inline text-xl text-[#6b8a7a]" />
                <h3 className="text-lg font-medium text-[#6b8a7a] dark:text-gray-300">
                    {props.label || 'Cautation'}
                </h3>
            </div>
            {/* <div className="">
                {!props?.disableAppendButton && (<MdPostAdd
                    onClick={props.onClickAdd}
                    className='text-xl text-[#6b8a7a] cursor-pointer'

                />)}

            </div> */}
        </div>
        <div className="mt-2 mb-4 text-sm text-[#6b8a7a] dark:text-indigo-300">
            {props.remark || DEFAULT_REMARK}
        </div>
        <div className="flex">
            <button
                type="button"
                className="text-white bg-[#6b8a7a] hover:bg-[#6b8a7a] focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center items-center dark:bg-indigo-600 dark:hover:bg-[#6b8a7a] dark:focus:ring-[#6b8a7a] flex gap-1"
            >
                <FaExternalLinkAlt />
                Learn more
            </button>

        </div>
    </div>
}
type TProps = {
    onClickAdd?: VoidFunction,
    disableAppendButton?: boolean;
    label?: string,
    remark?: string
}
const DEFAULT_REMARK = 'This section contains multiple fields that require your attention. Ensure all the information provided is accurate, as once you submit the form, changes cannot be undone. Double-check your entries before proceeding.';
