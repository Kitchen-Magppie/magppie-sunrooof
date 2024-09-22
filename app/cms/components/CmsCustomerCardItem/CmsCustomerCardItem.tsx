import { BsThreeDotsVertical } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import dayjs from 'dayjs'
//====================================================================

import { TCmsCustomerCardItem } from "../../types";

export function CmsCustomerCardItem(props: TCmsCustomerCardItem) {

    return (<div className="bg-indigo-100 p-4 rounded-lg border hover:bg-indigo-100 transition-all duration-200 ease-in-out"
        onClick={props.onClickModal}
    >
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{props.item.name}</h2>
            <button className="border p-1 rounded-full border-gray-400 ">
                <BsThreeDotsVertical />
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

// const STATUS_ITEM = (variant: CmsCardEnum) => {
//     switch (variant) {
//         case CmsCardEnum.Complete:
//             return ({
//                 classes: 'bg-green-500',
//                 icon: <MdDone size={24} />
//             })

//         case CmsCardEnum.Pending:
//             return ({
//                 classes: 'bg-yellow-500', icon: <RiProgress1Line size={24} />
//             })
//         default:
//             return ({ classes: '', icon: <></> })
//     }
// }
