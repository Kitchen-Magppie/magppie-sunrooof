import { RiApps2AddLine } from "react-icons/ri";
import { LuSave } from "react-icons/lu";
import { FaEarthAmericas } from "react-icons/fa6";
//====================================================================
import {
    CmsSearch,
    MinimalAccordion,
    CmsCustomerCardItem,
    CmsNotFound
} from "../../../components";
import { CustomSimpleModal } from "../../../../../components";
import { CmsCopyClipboard } from "./../../../components"
import { ComponentActionForm } from "../../Landing/components";
import { CmsCardEnum } from "../../../types";
import { useCustomerDashboard } from "./useCustomerDashboard";

export default function CustomerDashboard() {

    const { data, action } = useCustomerDashboard();

    return <div>
        <div>
            <div className="flex gap-2 justify-between">
                <div className=" w-full">
                    <CmsSearch onChange={(e) => {
                        action.onSearchItem(e)
                    }} />
                </div>
                <button className="flex items-center p-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => { action.onToggleModal() }}
                >
                    <RiApps2AddLine className="text-2xl" />
                </button>
            </div>

            {data.values.components?.length ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
                {data.values.components.map((item, i) => {
                    return <CmsCustomerCardItem
                        label={item.name}
                        key={i}
                        variant={CmsCardEnum.Pending}
                    />
                })}
            </div>) : <div className="mt-40"> <CmsNotFound /></div>}

        </div>

        <CustomSimpleModal
            show={data.toggle.isOpenComponentModal}
            onHide={() => { action.onToggleModal() }}
            label="Create Component"
        >
            <div className="p-2">
                {data.values.sections?.map((section, i) => {
                    return (<MinimalAccordion title={section} key={i}>
                        <ComponentActionForm
                            mode={data.values.modal.action}
                            item={data.values.modal.value}
                        />
                    </MinimalAccordion>)
                })}

                <div className="flex flex-col gap-1">
                    <div className="">
                        <button
                            type="button"
                            className="flex items-center gap-1 text-white  bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            <FaEarthAmericas />  Genrate URL
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            URL: <div className=" underline text-blue-700">{data.values.link}</div>
                        </div>
                        <div className="cursor-pointer">
                            {/* <FaRegCopy /> */}
                            <CmsCopyClipboard text={data.values.link} />
                        </div>

                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="button"
                        className="flex items-center gap-1 text-white  bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        <LuSave />  Save
                    </button>
                </div>

            </div>
        </CustomSimpleModal>
    </div>
}
