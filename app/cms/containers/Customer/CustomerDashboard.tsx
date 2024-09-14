import { useMemo } from "react";
import { CmsSearch } from "../../components";
import { MdDone } from "react-icons/md";
import { RiProgress1Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GrFormNextLink } from "react-icons/gr";
export default function CustomerDashboard() {
    return <div className="">
        <div className="">
            <CmsSearch onChange={(e) => { console.log(e) }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
                {Array.from({ length: 5 })?.map((_, i) => {
                    return <CmsCustomerCardItem
                        label={`MagpPie Sunrooof #${i + 1}`}
                        key={i}
                        variant={CmsCardEnum.Pending}
                    />
                })}
            </div>
        </div>

    </div>
}



function CmsCustomerCardItem(props: TCmsCustomerCardItem) {

    const values = useMemo(() => {
        switch (props.variant) {
            case CmsCardEnum.Complete:
                return ({
                    classes: 'bg-green-500',

                    icon: <MdDone className="text-xl" />
                })

            case CmsCardEnum.Pending:
                return ({
                    classes: 'bg-yellow-500',
                    icon: <RiProgress1Line className="text-xl" />
                })

            default:
                return ({
                    classes: '',
                    icon: <></>
                })
                break;
        }
    }, [props.variant])


    return (
        <div className="transition-transform duration-300 transform hover:scale-105 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2">
            <Link to=''>
                <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {props.label}
                </h5>
            </Link>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> */}
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione beatae quibusdam veritatis optio eum nemo, eveniet. */}
            {/* </p> */}
            <div className="">
                <div className="inline-block">
                    <div className={`flex justify-center align-middle flex-row gap-1  px-3 py-1 text-sm font-medium text-white ${values.classes} rounded-lg capitalize`}>
                        {values.icon}
                        {props.variant}
                    </div>
                </div>
            </div>
            <div className="">
                <Link
                    to={'/cms/customers'}
                    className="inline-flex gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    View
                    <GrFormNextLink />
                </Link>
            </div>
        </div>

    )
}
enum CmsCardEnum {
    Complete = 'complete',
    Pending = 'pending',
    None = ''
}

type TCmsCardVariant = CmsCardEnum.Complete | CmsCardEnum.Pending | CmsCardEnum.None
type TCmsCustomerCardItem = {
    label: string,
    variant: TCmsCardVariant,

}
