import { useMemo } from "react";
import { Link } from "react-router-dom";
import { IoCreateOutline, IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import dayjs from 'dayjs'
import { useLocation } from "react-use";
import { IoIosLink } from "react-icons/io";
//====================================================================
import { DEFAULT_CUSTOMER } from '../../mocks'

import { TCmsCustomerCardItem } from "../../types";
import { IS_VALID_FOR_URL } from "../../../../types";
import { BsTrash2 } from "react-icons/bs";


export function CmsCustomerCardItem(props: TCmsCustomerCardItem) {
    const { item } = props;
    const location = useLocation()
    const isDefault = DEFAULT_CUSTOMER.customerId === item.customerId

    const publishedUrl = useMemo(() => {
        if (item.id?.length && IS_VALID_FOR_URL(item)) {
            return ([location.origin, 'quotation', item.id].join('/'))
        }
        return ''
    }, [location.origin, item])

    return (<div className="bg-indigo-100 p-4 rounded-lg border hover:bg-indigo-100 transition-all duration-200 ease-in-out">
        <div className="flex justify-between items-center mb-2">
            <div className="flex gap-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                {isDefault ? (<div
                    className="flex flex-col align-middle justify-center rounded-md bg-orange-400 px-1 py-0 border border-transparent text-sm text-white">
                    Default
                </div>) : ''}

            </div>
            {publishedUrl?.length ? (
                <button className="border p-1 rounded-full border-gray-400  bg-white cursor-pointer"
                    title="Go to Published Link">
                    <Link to={publishedUrl} target="_blank">
                        <IoIosLink className="cursor-pointer" />
                    </Link>
                </button>

            ) : ''}
        </div>
        <div className="flex items-center mb-2 gap-2">
            <FaRegCalendarAlt size={24} />
            {dayjs(item.at.created).format('DD/MM/YYYY')}
        </div>
        <div className="flex items-center mb-2 gap-2 overflow-hidden">
            {publishedUrl?.length ? (<>
                <IoIosLink className="cursor-pointer" size={24} />
                <Link
                    to={publishedUrl}
                    target="_blank"
                    className="text-indigo-600 underline"
                >
                    {publishedUrl}
                </Link>
            </>) : (<>
                <IoLocationOutline size={24} />
                -
            </>)}


        </div>
        <div className="flex items-center justify-between flex-row mb-2 capitalize gap-2  " />
        <div className="flex justify-between group">
            <button
                onClick={props.onClickEditModal}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex gap-1"
            >
                <IoCreateOutline className='text-xl' />
                Edit
            </button>
            {/* <button className=" font-medium px-5 py-2 mb-2" onClick={props.onClickDeleteModal} /> */}
            {/* {item.isTransformed ? 'Transformed' : ''} */}
            <button
                className=" hidden group-hover:block bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm  p-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={props.onClickDeleteModal}
            >
                <BsTrash2 className='text-xl text-red-500 hover:text-red-800' />
            </button>
        </div>

    </div>);
}
