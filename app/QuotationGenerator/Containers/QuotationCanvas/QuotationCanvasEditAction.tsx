import { CUSTOMER_COMPONENT_COMPARISON_OPTIONS } from "../../../cms/mocks";
import Select from 'react-select'
import { KonvaActionButton } from "../../components";
import { TbFileOrientation } from "react-icons/tb";
import { BsEraser } from "react-icons/bs";
import { RxMaskOn } from "react-icons/rx";
import { CiRuler } from "react-icons/ci";
import { PiDownloadSimpleFill } from "react-icons/pi";

type TProps = {
    onChangeSunroofWindow: (e: string) => void
    handleUndo: VoidFunction,
    handleDownload: VoidFunction

}
function QuotationCanvasEditAction(props: TProps) {
    return (<div>
        <div className="flex  flex-col mb-3">
            <Select
                options={CUSTOMER_COMPONENT_COMPARISON_OPTIONS}
                onChange={(e) => {
                    props?.onChangeSunroofWindow(e.value)
                    // setCorpus((prev) => ({
                    //     ...prev,
                    //     selection: {
                    //         ...prev.selection,
                    //         sunrooofWindow: e.value,
                    //     },
                    // }))
                }}
            />
        </div>
        <div className="mt-20">
            <div className="grid grid-flow-row grid-cols-2 gap-2">
                <KonvaActionButton
                    label='Orientation II'
                    icon={<TbFileOrientation className="my-auto text-xl" />}
                    onClick={() => { }}
                />
                <KonvaActionButton
                    label='Remove SUNROOOF'
                    icon={<BsEraser className="my-auto text-xl" />}
                    onClick={() => { }}
                />
                <KonvaActionButton
                    label='UNDO'
                    icon={<RxMaskOn className="my-auto text-xl" />}
                    onClick={props?.handleUndo}
                />
                <KonvaActionButton
                    variant='secondary'
                    label='Scale for Measurement'
                    icon={<CiRuler className="my-auto text-xl" />}
                    onClick={() => { }}
                />
            </div>
        </div>
        <div className="mt-20">
            <button
                type="button"
                onClick={props.handleDownload}
                className="text-white bg-gradient-to-r bg-[#b5b496ff]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#b5b496ff] dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
            >
                <PiDownloadSimpleFill className="my-auto text-xl" />
                Download Final Image
            </button>
        </div>
    </div>);
}

export default QuotationCanvasEditAction;
