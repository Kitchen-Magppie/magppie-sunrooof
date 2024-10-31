import { ChangeEvent, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { RiUploadCloud2Line } from "react-icons/ri";
//====================================================================
import { useProposedLayoutListener } from "../../hooks";
import { setPresentationFile, useAppDispatch, useAppSelector } from "../../../../redux";
import { _ } from "../../../../types";

function ProposedLayoutView() {
    // const action = useProposedLayoutAction();

    useProposedLayoutListener()
    const proposedLayout = useAppSelector((state) => state.Cms.ProposedLayout.value)
    console.log(proposedLayout)
    console.log("Re-render")
    const fileInputRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch()
    const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files[0]?.type?.startsWith('image/')) {
            dispatch(setPresentationFile(e.target.files[0]))

            console.log(_.first(e.target.files))
        } else {
            toast('*Please upload an image.')
        }


    }, [dispatch])
    return (<div >
        <div className="text-2xl font-medium uppercase">Proposed Layout Generator</div>
        <div
            className="p-4 bg-white  bg-whtie w-max m-auto rounded-lg border justify-center flex flex-col align-middle mt-52"
        >
            <div
                className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                style={{ width: 450 }}
            >
                <div className="flex align-middle justify-center">
                    <RiUploadCloud2Line className="text-[8rem] text-indigo-600" />
                </div>
                <div className=" flex flex-col mx-auto w-1/2 text-center">
                    <label>
                        <input
                            onChange={onFileChange}
                            ref={fileInputRef}
                            accept='image/*'
                            className="text-sm cursor-pointer w-36 hidden"
                            type="file"
                        />
                        <div className="w-full text bg-indigo-600 text-white border border-gray-300 rounded-xl font-semibold cursor-pointer py-3 px-3 hover:bg-indigo-500">
                            Select
                        </div>
                    </label>
                    {/* <div className="title text-indigo-500 uppercase">
                        or drop files here
                    </div> */}
                </div>
            </div>
        </div>

        {/* <Select options={proposedLayout?.map((item) => ({ value: item.label, label: item.label }))} /> */}
        {/* <button
            className="border p-1 shadow-lg rounded-2xl bg-indigo-700 text-white px-3 hover:bg-indigo-900"
            onClick={() => {
                action.add(INIT_PROPOSED_LAYOUT_ITEM)
            }}>
            Click here, DB Call
        </button> */}
        {/* <QuotationCanvas /> */}
    </div >);
}

export default ProposedLayoutView;
