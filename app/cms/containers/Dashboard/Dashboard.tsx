import { Link } from "react-router-dom"
import { GrFormNextLink } from "react-icons/gr";
export default function Dashboard() {
    return <div className="">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Customers
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione beatae quibusdam veritatis optio eum nemo, eveniet.
            </p>
            <Link
                to={'/cms/customers'}
                className="inline-flex gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                View more
                <GrFormNextLink />
            </Link>
        </div>

    </div>
}
