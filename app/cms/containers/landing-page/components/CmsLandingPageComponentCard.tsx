import { FaPen } from 'react-icons/fa'
//====================================================================
import { MdDeleteOutline } from "react-icons/md";
import { TComponentItem } from '../../../../../types/component'


export default function CmsLandingPageComponentCard(props: TProps) {
    return (<div className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-origin-content bg-center w-full group`}
        style={{ background: `url(${CARD_BACKGROUND_SOURCE(props.item)})` }}
    >
        <div className="p-5 bg-white mt-40">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {props.item.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-1">
                {props.item.typography.description || <>&nbsp;</>}
            </p>
            <div className="flex flex-row justify-between">
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {

                        props.onEdit(props.item.id)
                    }}
                >
                    Edit
                    <FaPen className="ml-2" />
                </button>

                <div className="hidden group-hover:block self-center">
                    <MdDeleteOutline className="text-red-700 text-xl cursor-pointer"
                        onClick={() => {
                            if (props?.onRemove) {
                                props?.onRemove(props.item.id)
                            }
                        }} />

                </div>
            </div>
        </div>
    </div >
    )
}

type TProps = {
    item: TComponentItem,
    onRemove?: (e: string) => void,
    onEdit?: (e: string) => void
}

function CARD_BACKGROUND_SOURCE(item: TComponentItem) {

    if (item?.links?.bg?.length) {
        return item.links.bg
    }
    else if (item?.links.illustration?.length) {
        return item.links.illustration
    }
    return ''
}
