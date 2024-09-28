// import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCreateOutline, IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import dayjs from 'dayjs'
import { useLocation } from "react-use";

//====================================================================

import { TCmsCustomerCardItem } from "../../types";
import { useMemo } from "react";
import { IoIosLink } from "react-icons/io";
import { Link } from "react-router-dom";

export function CmsCustomerCardItem(props: TCmsCustomerCardItem) {
    const location = useLocation()

    const publishedUrl = useMemo(() => {
        if (props.item.id?.length)
            return ([location.origin, 'quotation', props.item.id].join('/'))
        return ''
    }, [location.origin, props.item.id])
    return (<div className="bg-indigo-100 p-4 rounded-lg border hover:bg-indigo-100 transition-all duration-200 ease-in-out"
    >
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{props.item.name}</h2>
            <button className="border p-1 rounded-full border-gray-400  bg-white cursor-pointer"
                title="Go to Published Link"
            >
                {publishedUrl?.length ? (<Link to={publishedUrl} target="_blank">
                    <IoIosLink className="cursor-pointer"
                    />
                </Link>) : ''}

            </button>
        </div>
        <div className="flex items-center mb-2 gap-2">
            <FaRegCalendarAlt size={24} />
            {dayjs(props.item.at.created).format('DD/MM/YYYY')}
        </div>
        <div className="flex items-center mb-2 gap-2">
            <IoLocationOutline size={24} />
            Location
        </div>
        <div className="flex items-center mb-2 capitalize gap-2" />

        <button
            onClick={props.onClickModal}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex gap-1"
        >
            <IoCreateOutline className='text-xl' />
            Edit
        </button>
    </div>);
}
