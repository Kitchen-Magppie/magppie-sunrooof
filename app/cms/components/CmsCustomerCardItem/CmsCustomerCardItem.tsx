// import { BsThreeDotsVertical } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
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
    return (<div className="bg-indigo-100 p-4 rounded-lg border hover:bg-indigo-100 transition-all duration-200 ease-in-out cursor-pointer"
        onClick={props.onClickModal}
    >
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{props.item.name}</h2>
            <button className="border p-1 rounded-full border-gray-400  ">
                {publishedUrl?.length ? (<Link to={publishedUrl} target="_blank">
                    <IoIosLink className="cursor-pointer hover:text-blue-700"
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
        <div className="flex items-center mb-2 capitalize gap-2">
            {/* {values.icon} */}
            {/* {props.variant} */}
        </div>
        {/* <div className="border border-t-1 border-x-0 border-b-0 border-gray-500">
            Team
        </div> */}
    </div>);
}
