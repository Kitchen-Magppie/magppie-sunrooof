import { ChangeEvent, useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { RiLoader4Line, RiUploadCloud2Line } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaArrowRight } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
//====================================================================
import { useProposedLayoutListener } from "../../hooks";
import {
    setPresentationData,
    useAppDispatch,
} from "../../../../redux";
import QuotationCanvas from "../../../QuotationGenerator/Containers/QuotationCanvas";


function ProposedLayoutView() {

    useProposedLayoutListener()

    const [toggle, setToggle] = useState(INIT_TOGGLE)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    const { watch, register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(proposedLayoutSchema),
    });
    const values = watch() as TProposedLayoutItem
    const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files[0]?.type?.startsWith('image/')) {
            setValue('image', e.target.files[0])
        } else {
            toast('*Please upload an image.')
        }
    }, [setValue])

    const onSubmit = handleSubmit((e) => {
        setToggle((prev) => ({ ...prev, isLoading: true }))
        setTimeout(() => {
            if (e?.image) {
                dispatch(setPresentationData({
                    file: e?.image as File,
                    title: e?.title
                }))
                setToggle((prev) => ({
                    ...prev,
                    isOpenEditorPage: true,
                    isLoading: false
                }))
            }
        }, 2000)
    })
    return (<div>
        <div className="text-2xl font-medium uppercase">Proposed Layout Generator</div>

        {toggle?.isOpenEditorPage ? <QuotationCanvas /> : <>

            <form
                onSubmit={onSubmit}
                className="p-4 bg-white bg-whtie w-max m-auto rounded-lg border justify-center flex flex-col align-middle mt-36"
            >
                <div className="mb-6">
                    <label
                        htmlFor="large-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        {...register('title')}
                        id="large-input"
                        placeholder="ie. - Minimal Proposed Layout"
                        className={`block w-full p-4  rounded-lg bg-gray-50 text-base dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors?.title ? 'dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900 border border-red-300' : 'dark:focus:ring-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 border border-gray-300'}`}
                    />
                    {errors.title?.message && <span className="text-red-500 flex gap-1 align-middle  flex-row text-sm">
                        <IoIosHelpCircleOutline className="text-sm my-1" />
                        {errors.title.message}</span>}

                </div>


                <div
                    className={` p-5 relative border-4 border-dotted ${errors?.image ? "border-red-300" : 'border-gray-300'} rounded-lg`}
                    style={{ width: 450 }}
                >
                    <div className="flex align-middle justify-center">
                        <RiUploadCloud2Line className={`text-[8rem] ${errors.image ? "text-red-500" : "text-indigo-600"} `} />
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
                            <div className={`w-full text  text-white border border-gray-300 rounded-xl font-semibold cursor-pointer py-3 px-3 ${errors?.image ? 'hover:bg-red-500 bg-red-600' : 'hover:bg-indigo-500 bg-indigo-600'}`}>
                                Select
                            </div>
                        </label>
                        {values?.image?.name?.length ? (<div className="text-gray-500 text-[12px] italic">
                            {values?.image?.name} (~{(values?.image?.size / (1024 * 1024))?.toFixed(2)} MB)
                        </div>) : ''}
                        {errors?.image?.message ? (<div className=" text-red-500 text-sm flex gap-1 align-middle justify-center">
                            <IoIosHelpCircleOutline className="text-sm my-1" />
                            {errors?.image?.message}
                        </div>) : ''}
                    </div>

                </div>
                <button
                    type="submit"
                    className={`flex justify-center gap-3 flex-row align-middle w-full p-3 border border-transparent font-medium text-lg rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 ${errors?.image || errors?.title ? 'focus:ring-red-500 bg-red-600 hover:bg-red-700' : 'focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700'} mt-5`}
                >
                    Proceed
                    {toggle.isLoading ? (<RiLoader4Line className="my-1 animate-spin " />) : (<FaArrowRight className="my-1" />)}
                </button>
            </form>
        </>
        }
        {/* {corpus.toggle.isImageLoading ? (<RiLoader4Line className="text-xl animate-spin " />) : (<FaUpload className="h-5 w-5" />)} */}

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

const INIT_TOGGLE = { isOpenEditorPage: false, isLoading: false }
type TProposedLayoutItem = { title: string, image?: File }
const proposedLayoutSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    image: yup.mixed().required('Image is required'),
});

export default ProposedLayoutView;
