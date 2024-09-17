import { MdPostAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { CiCircleAlert } from "react-icons/ci";

export function FieldCautation(props: TProps) {
    return <div
        className="p-4 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
    >
        <div className="flex items-center justify-between">
            <div className="flex flex-row align-middle justify-center items-center gap-2 ">
                <CiCircleAlert className="inline text-xl text-indigo-800" />
                <h3 className="text-lg font-medium text-indigo-800 dark:text-gray-300">
                    {props.label || 'Cautation'}
                </h3>
            </div>
            <div className="">
                {!props?.disableAppendButton && (<MdPostAdd
                    onClick={props.onClickAdd}
                    className='text-xl text-indigo-500 cursor-pointer'

                />)}

            </div>
        </div>
        <div className="mt-2 mb-4 text-sm text-indigo-800 dark:text-indigo-300">
            This section contains multiple fields that require your attention. Ensure all the information provided is accurate, as once you submit the form, changes cannot be undone. Double-check your entries before proceeding.</div>
        <div className="flex">
            <button
                type="button"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center items-center dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:ring-indigo-800 flex gap-1"
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
    label?: string
}
