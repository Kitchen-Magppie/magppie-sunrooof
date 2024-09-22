import { Link } from "react-router-dom"
import { GrFormNextLink } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { MdDone } from "react-icons/md";
export default function Dashboard() {
    return <div>
        <div className="transition-transform duration-300 transform hover:scale-105 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2">
            <div className="flex justify-between align-middle items-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Customers
                </h5>
                <FaRegUser />
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className={`flex justify-center align-middle flex-row gap-1 px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-lg capitalize`}>
                    <MdDone className="text-xl" />Complete: 8/9
                </div>
            </div>
            <div className="">
                <Link
                    to='/cms/customers'
                    className="inline-flex gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    View more
                    <GrFormNextLink />
                </Link>
            </div>
        </div>
    </div>
}
