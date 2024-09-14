import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MdDone } from "react-icons/md";
import { RiProgress1Line } from "react-icons/ri";
import { GrFormNextLink } from "react-icons/gr";
import { RiApps2AddLine } from "react-icons/ri";
//====================================================================
import { CmsSearch, MinimalAccordion } from "../../components";
import { CustomSimpleModal } from "../../../../components";

export default function CustomerDashboard() {
    const [corpus, setCorpus] = useState(INIT_CORPUS)
    const onToggleModal = useCallback(() => {
        setCorpus((prev) => ({
            ...prev,
            toggle: {
                ...prev.toggle,
                isOpenComponentModal: !prev.toggle.isOpenComponentModal
            }
        }))
    }, [])
    return <div className="">
        <div className="">
            <div className="flex gap-2 justify-between">
                <div className=" w-full">
                    <CmsSearch onChange={(e) => { console.log(e) }} />
                </div>
                <button className="flex items-center p-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                        onToggleModal()
                    }}
                >
                    <RiApps2AddLine className="text-2xl" />
                </button>
            </div>

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

        <CustomSimpleModal
            show={corpus.toggle.isOpenComponentModal}
            onHide={() => { onToggleModal() }}
            label="Create Component"
        >
            <div className="p-2">
                <MinimalAccordion title="Comparisons" >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam tempora facere temporibus consectetur, earum eos doloremque, quam a aliquam perspiciatis, mollitia veniam ipsam alias aspernatur et itaque cum quasi culpa.
                </MinimalAccordion>
            </div>
        </CustomSimpleModal>
    </div>
}
type TCorpus = { toggle: { isOpenComponentModal: boolean } }
const INIT_CORPUS: TCorpus = { toggle: { isOpenComponentModal: false } }



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
