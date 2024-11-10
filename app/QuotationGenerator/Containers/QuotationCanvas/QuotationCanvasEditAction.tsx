import Select from 'react-select'
import { BsEraser } from "react-icons/bs";
import { RxMaskOn } from "react-icons/rx";
import { CiRuler } from "react-icons/ci";
import { PiDownloadSimpleFill } from "react-icons/pi";
//====================================================================
import { CUSTOMER_COMPONENT_COMPARISON_OPTIONS } from "../../../cms/mocks";
import { KonvaActionButton } from "../../components";
import { CanvasToolEnum } from '../../../../types';

function QuotationCanvasEditAction(props: TProps) {
    return (<div>
        <div className="flex flex-col mb-3">
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
                {/* <KonvaActionButton
                    label='Orientation II'
                    icon={<TbFileOrientation className="my-auto text-xl" />}
                    onClick={() => { }}
                /> */}
                <KonvaActionButton
                    label='Remove SUNROOOF'
                    variant={CanvasToolEnum.Remove === props?.tool ? 'primary' : 'secondary'}

                    icon={<BsEraser className="my-auto text-xl" />}
                    onClick={() => {
                        props?.onToolToggle(CanvasToolEnum.Remove)
                    }}
                />
                <KonvaActionButton
                    label='UNDO'
                    variant={CanvasToolEnum.Undo === props?.tool ? 'primary' : 'secondary'}
                    icon={<RxMaskOn className="my-auto text-xl" />}
                    onClick={() => {
                        props?.handleUndo()
                        props?.onToolToggle(CanvasToolEnum.Undo)

                    }}
                />
                <KonvaActionButton
                    variant={CanvasToolEnum.ScaleMeasurement === props?.tool ? 'primary' : 'secondary'}
                    label='Scale for Measurement'
                    icon={<CiRuler className="my-auto text-xl" />}
                    onClick={() => {
                        props?.onToolToggle(CanvasToolEnum.ScaleMeasurement)
                    }}
                />
            </div>
        </div>
        <div className="mt-20">
            <button
                type="button"
                onClick={() => props.handleDownload({ isRedirectBack: false })}
                className="text-white bg-gradient-to-r bg-[#b5b496ff]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#b5b496ff] dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
            >
                <PiDownloadSimpleFill className="my-auto text-xl" />
                Download & Go to CMS
            </button>
            <button
                type="button"
                onClick={() => props.handleDownload({ isRedirectBack: true })}
                className="text-white bg-gradient-to-r bg-[#b5b496ff]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#b5b496ff] dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
            >
                <PiDownloadSimpleFill className="my-auto text-xl" />
                Download & Back to Propsed Layout
            </button>
        </div>
    </div>);
}
type TProps = {
    onChangeSunroofWindow: (e: string) => void
    handleUndo: VoidFunction,
    handleDownload: (e: { isRedirectBack: boolean }) => void,
    tool: CanvasToolEnum,
    onToolToggle: (e: CanvasToolEnum) => void
}
export default QuotationCanvasEditAction;
