import { FaHome } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
//====================================================================

import _ from '../../types/lodash'

export default function CustomBreadcrumb() {
    const { pathname } = useLocation()
    const arr = pathname.split('/')?.filter((row) => row?.length)

    const options = arr?.map((path, i) => {
        const currentPath = `/${arr.slice(0, i + 1)?.join('/')}`
        return {
            active: currentPath === pathname,
            path: currentPath,
            label: _.capitalize(path),
        }
    })

    return (
        <div className="flex mt-2" aria-label="Breadcrumb">
            <div className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {options?.map((option, i) => {
                    if (i) {
                        return (<div key={i}>
                            <div className="flex items-center">
                                <IoIosArrowForward />
                                <Link
                                    to={option.path}
                                    className="ms-1 text-sm font-medium text-blue-700 hover:text-blue-600 md:ms-2"
                                >
                                    {_.labelCase(option.label)}
                                </Link>
                            </div>
                        </div>)
                    }
                    return (<div className="inline-flex items-center" key={i}>
                        <div className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                            <FaHome />
                            <Link
                                to={option.path}
                                className="ms-1 text-sm font-medium text-blue-700 hover:text-blue-600 md:ms-2"
                            >
                                Home
                            </Link>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}
