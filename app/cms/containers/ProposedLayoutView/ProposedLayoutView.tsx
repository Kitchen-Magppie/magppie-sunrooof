import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { RiLoader4Line, RiUploadCloud2Line } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaArrowRight } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import CreatableSelect from "react-select/creatable"
import * as pdfjsLib from 'pdfjs-dist';
//====================================================================
import { useProposedLayoutListener } from "../../hooks";
import { setPresentationData, useAppDispatch, useAppSelector } from "../../../../redux";
import QuotationCanvas from "../../../QuotationGenerator/Containers/QuotationCanvas";
import { useFirebaseCmsCustomerListener } from "../../utils/firebase";
import {
    COMPONENT_DESIGN2D_DESIGN_OPTIONS,
    COMPONENT_DESIGN2D_FINISH_OPTIONS
} from "../../mocks";
import { _, TProposedLayoutItem } from "../../../../types";

import pdfJSWorkerURL from "pdfjs-dist/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfJSWorkerURL;

function ProposedLayoutView() {

    useProposedLayoutListener()
    useFirebaseCmsCustomerListener()

    useEffect(() => {
        document.title = 'Proposed Layout | CMS'
    }, [])
    const [toggle, setToggle] = useState(INIT_TOGGLE)
    const customers = useAppSelector((state) => state.Cms.Customer.value)

    // const [imageFile, setImageFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    const { watch, register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(proposedLayoutSchema),
    });

    const values = watch() as TProposedLayoutItem
    const convertPdfToImage = useCallback(async (file: File) => {
        const fileUrl = URL.createObjectURL(file);
        const pdfDoc = await pdfjsLib.getDocument(fileUrl).promise;
        const page = await pdfDoc.getPage(1); // Assuming you want the first page

        const scale = 1.5; // Adjust the scale as needed
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
            canvasContext: context,
            viewport: viewport,

        };
        await page.render(renderContext).promise;


        const imageDataUrl = canvas.toDataURL('image/png');

        setValue('file', base64ToFile(imageDataUrl, `${file?.name?.split('.')[0]}.png`))
    }, [setValue])


    const onFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const content = FROM_FILE_TO_ACCESSOR(e.target?.files[0])
        convertPdfToImage(content.file)
        if (content?.isValid && content?.accessor !== 'pdf') {
            setValue('file', content.file)
        } else {
            toast('*Please upload an image or pdf file.')
        }
    }, [convertPdfToImage, setValue])

    const onSubmit = handleSubmit((e) => {
        setToggle((prev) => ({ ...prev, isLoading: true }))
        setTimeout(() => {
            if (e?.file) {
                dispatch(setPresentationData({
                    file: e?.file as File,
                    title: e?.title,
                    name: e.name,
                    design: e.design,
                    finish: e.finish,
                    customerId: customers?.find((item) => item.name === e.name)?.customerId || ''
                }))
                setToggle((prev) => ({
                    ...prev,
                    isOpenEditorPage: true,
                    isLoading: false
                }))
            }
        }, 2000)
    })
    return (<div className="container mx-auto">
        <div className="text-2xl font-medium uppercase">Proposed Layout Generator</div>

        {toggle?.isOpenEditorPage ? <QuotationCanvas onToggleEditorPage={(isOpenEditorPage) => {
            setToggle((prev) => ({ ...prev, isOpenEditorPage }))
        }} /> : <form
            onSubmit={onSubmit}
            className="p-4 bg-white bg-whtie w-max m-auto rounded-lg border justify-center flex flex-col align-middle mt-36"
        >
            <div className="mb-1">
                <CreatableSelect
                    options={_.labelify(COMPONENT_DESIGN2D_DESIGN_OPTIONS)}
                    onChange={({ value }) => { setValue('design', value) }}
                    placeholder="Design"
                />
                {errors?.design?.message && <span className="text-red-500 flex gap-1 align-middle  flex-row text-sm">
                    <IoIosHelpCircleOutline className="text-sm my-1" />
                    {errors?.design?.message}</span>}
            </div>
            <div className="mb-1">
                <CreatableSelect
                    options={_.labelify(COMPONENT_DESIGN2D_FINISH_OPTIONS)}
                    onChange={({ value }) => { setValue('finish', value) }}
                    placeholder="Finish"
                />
                {errors?.title?.message && <span className="text-red-500 flex gap-1 align-middle  flex-row text-sm">
                    <IoIosHelpCircleOutline className="text-sm my-1" />
                    {errors?.title?.message}</span>}
            </div>
            <div className="mb-1">
                <CreatableSelect
                    options={customers?.map((customer) => ({
                        value: customer.id,
                        label: customer.name
                    }))}
                    onChange={(e) => {
                        setValue('name', e.label)
                    }}
                    placeholder="Customer Name"
                />
                {errors?.title?.message && <span className="text-red-500 flex gap-1 align-middle  flex-row text-sm">
                    <IoIosHelpCircleOutline className="text-sm my-1" />
                    {errors?.title?.message}</span>}
            </div>


            <div className="mb-3">

                <input
                    placeholder="Title"
                    type="text"
                    {...register('title')}
                    id="large-input"
                    className={`block w-full rounded-sm py-1.5 bg-white text-base dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors?.title ? 'dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900 border border-red-300' : 'dark:focus:ring-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 border border-gray-300'}`}
                />
                {errors.title?.message && <span className="text-red-500 flex gap-1 align-middle  flex-row text-sm">
                    <IoIosHelpCircleOutline className="text-sm my-1" />
                    {errors.title.message}</span>}
            </div>
            <div
                className={` p-5 relative border-4 border-dotted ${errors?.file ? "border-red-300" : 'border-gray-300'} rounded-lg`}
                style={{ width: 450 }}
            >
                <div className="flex align-middle justify-center">
                    <RiUploadCloud2Line className={`text-[8rem] ${errors.file ? "text-red-500" : "text-indigo-600"} `} />
                </div>
                <div className=" flex flex-col mx-auto w-1/2 text-center">
                    <label>
                        <input
                            onChange={onFileChange}
                            ref={fileInputRef}
                            accept="image/*,application/pdf"
                            className="text-sm cursor-pointer w-36 hidden"
                            type="file"
                        />
                        <div className={`w-full text  text-white border border-gray-300 rounded-xl font-semibold cursor-pointer py-3 px-3 ${errors?.file ? 'hover:bg-red-500 bg-red-600' : 'hover:bg-indigo-500 bg-indigo-600'}`}>
                            Select
                        </div>
                    </label>
                    {values?.file?.name?.length ? (<div className="text-gray-500 text-[12px] italic">
                        {values?.file?.name} (~{(values?.file?.size / (1024 * 1024))?.toFixed(2)} MB)
                    </div>) : ''}
                    {errors?.file?.message ? (<div className=" text-red-500 text-sm flex gap-1 align-middle justify-center">
                        <IoIosHelpCircleOutline className="text-sm my-1" />
                        {errors?.file?.message}
                    </div>) : ''}
                </div>

            </div>
            <button
                type="submit"
                className={`flex justify-center gap-3 flex-row align-middle w-full p-3 border border-transparent font-medium text-lg rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 ${errors?.file || errors?.title ? 'focus:ring-red-500 bg-red-600 hover:bg-red-700' : 'focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700'} mt-5`}
            >
                Proceed
                {toggle.isLoading ? (<RiLoader4Line className="my-1 animate-spin " />) : (<FaArrowRight className="my-1" />)}
            </button>
        </form>
        }
        {/* <MeasurementExample /> */}
    </div >);
}

const FROM_FILE_TO_ACCESSOR = (file: File) => {
    let accessor
    const docType = file.type?.toLowerCase()
    if (docType?.startsWith('application/pdf')) {
        accessor = 'pdf'
    }
    accessor = 'image'
    return ({
        accessor,
        isValid: docType?.startsWith('application/pdf') || docType?.startsWith('image/'),
        file
    })
}

const INIT_TOGGLE = { isOpenEditorPage: false, isLoading: false }
// const AUTOCOMPLETE_STYLE =
//     "mt-1 block w-full py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

const proposedLayoutSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    title: yup.string().required('Title is required'),
    finish: yup.string().required('Finish is required'),
    design: yup.string().required('Design is required'),
    file: yup.mixed().required('File is required'),
});

function base64ToFile(base64String, fileName) {
    const imageType = base64String.split(';')[0].split(':')[1];
    const byteString = atob(base64String.split(',')[1]);
    const arrayBuffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: imageType });
    return new File([blob], fileName, { type: imageType });
}

export default ProposedLayoutView;
