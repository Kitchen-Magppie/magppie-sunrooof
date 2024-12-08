import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { setPresentationData, useAppDispatch, useAppSelector } from "../../../../redux";
import QuotationCanvas from "../../../QuotationGenerator/Containers/QuotationCanvas";
import { _, TProposedLayoutItem } from "../../../../types";

//====================================================================
import pdfJSWorkerURL from "pdfjs-dist/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfJSWorkerURL;

function ProposedLayoutView() {

    useEffect(() => {
        document.title = 'Proposed Layout | CMS'
        localStorage.clear()
    }, [])
    const [toggle, setToggle] = useState(INIT_TOGGLE)
    const customers = useAppSelector((state) => state.Cms.Customer.value)
    const proposedLayouts = useAppSelector((state) => state.Cms.ProposedLayout.value)
    // const ar = proposedLayouts?.map((item) => item.name?.toLowerCase()?.trim())
    // console.log(ar)

    // console.log(ar)
    const proposedLayoutSchema = useMemo(() => (yup.object().shape({
        name: yup.string().required('Name is required'),
        title: yup.string().required('Title is required')
            .test('unique', 'Title already exists.', (value: string) => {
                const ar = _.uniq(proposedLayouts?.map((item) => item.name?.toLowerCase()?.trim()))
                // console.log(ar)
                // console.log(value)
                return !ar?.find((item) => item === value?.toLowerCase()?.trim())
            }),
        // finish: yup.string().required('Finish is required'),
        // design: yup.string().required('Design is required'),
        file: yup.mixed().required('File is required'),
    })), [proposedLayouts]);

    // const [imageFile, setImageFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    const { watch, register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(proposedLayoutSchema),
    });

    const values = watch() as TProposedLayoutItem

    /**
     * Converts the first page of a PDF to a high-resolution PNG image.
     * @param {File} file - The PDF file to convert.
     * @param {(name: keyof any, value: any) => void} setValue - Function to set form values (from react-hook-form).
     * @returns {Promise<string>} - Returns the Blob URL of the converted image.
     */
  
    
const convertPdfToImage = useCallback(
    async function (file: File): Promise<string> {
    try {
        // Step 1: Create an object URL for the PDF file
        const fileUrl = URL.createObjectURL(file);
        console.log(`Object URL created: ${fileUrl}`);

        // Step 2: Load the PDF document
        const pdfDoc = await pdfjsLib.getDocument(fileUrl).promise;
        console.log(`PDF loaded with ${pdfDoc.numPages} page(s).`);

        // Step 3: Get the first page of the PDF
        const page = await pdfDoc.getPage(1);
        console.log(`Rendering page ${page.pageNumber}.`);

        // Step 4: Define the scale
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        console.log(`Viewport created with scale ${scale}:`, viewport);

        // Step 5: Create a canvas element
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Failed to get canvas 2D context.');

        // Step 6: Adjust canvas for device pixel ratio
        const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        console.log(`Device Pixel Ratio (capped): ${devicePixelRatio}`);

        canvas.width = viewport.width * devicePixelRatio;
        canvas.height = viewport.height * devicePixelRatio;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        console.log(
            `Canvas dimensions set to ${canvas.width}x${canvas.height} pixels.`
        );

        // Step 7: Scale the context to account for device pixel ratio
        context.scale(devicePixelRatio, devicePixelRatio);
        console.log(`Canvas context scaled by device pixel ratio.`);

        // Step 8: Disable image smoothing for sharper edges
        context.imageSmoothingEnabled = false;
        context.imageSmoothingQuality = 'high';
        console.log(`Image smoothing disabled for sharper rendering.`);

        // Step 9: Define the render context
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };

        // Step 10: Render the PDF page into the canvas
        await page.render(renderContext).promise;
        console.log(`Page rendered onto canvas.`);

        // Step 11: Convert the canvas to a Blob
        const blob = await new Promise<Blob | null>((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error('Canvas is empty'));
                },
                'image/png',
                1.0
            );
        });
        console.log(`Canvas converted to Blob.`);

        if (!blob) throw new Error('Failed to convert canvas to Blob.');

        // Step 12: Convert Blob to File
        const fileName = `${file.name.split('.')[0]}.png`;
        const imageFile = new File([blob], fileName, { type: 'image/png' });
        console.log(`Blob converted to File: ${fileName}`);

        // Step 13: Update the form value with the image file
        setValue('file', imageFile);
        console.log(`Form value 'file' set with the image file.`);

        // Step 14: Convert Blob to Base64
        const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) resolve(reader.result as string);
                else reject(new Error('Failed to read Blob as Base64.'));
            };
            reader.onerror = () => reject(new Error('Error reading Blob as Base64.'));
            reader.readAsDataURL(blob);
        });
        console.log(`Blob converted to Base64.`);

        // Step 15: Save the Base64 string to localStorage
        localStorage.setItem('CUSTOMER_IMAGE', base64Data);
        console.log(
            `Base64 image saved to localStorage under 'CUSTOMER_IMAGE'.`
        );

        // Step 16: Clean up the object URL
        URL.revokeObjectURL(fileUrl);
        console.log(`Object URL revoked to free up memory.`);

        // Step 17: Create a Blob URL for the image
        const imageUrl = URL.createObjectURL(blob);
        console.log(`Image Blob URL created: ${imageUrl}`);
        return imageUrl;
    } catch (error) {
        console.error('Error converting PDF to image:', error);
        throw error;
    }
},
    [setValue] // Add any dependencies here if needed
)



    const onFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const content = FROM_FILE_TO_ACCESSOR(e.target?.files[0])

        // console.log(content)
        if (content?.isValid) {
            if (content.accessor === 'pdf') {
                convertPdfToImage(content.file)
            }
            if (content?.accessor === 'image') {
                const data = await convertFileToBase64(content.file)
                localStorage.setItem('CUSTOMER_IMAGE', `${data}`)
                setValue('file', content.file)
            }
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
                    design: '',
                    finish: '',
                    customerId: customers?.find((item) => item.name === e.name)?.customerId || ''
                }))
                setToggle((prev) => ({
                    ...prev,
                    isOpenEditorPage: true,
                    isLoading: false
                }))

                window.location.href = '/vanilla.html';
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
                    options={customers?.map((customer) => ({
                        value: customer.id,
                        label: customer.name
                    }))}
                    onChange={(e) => {
                        const currentCustomer = customers.find((customer) => customer.name === e.label)
                        if (currentCustomer)
                            localStorage.setItem('CUSTOMER_ID', currentCustomer.customerId)
                        else {
                            localStorage.setItem('CUSTOMER_ID', '')
                            localStorage.setItem('CUSTOMER_NAME', e.label)
                        }
                        // console.log(currentCustomer);
                        setValue('name', e.label)
                    }}
                    placeholder="Customer Name"
                />
                {errors?.name?.message && <span className="text-red-500 flex gap-1 align-middle  flex-row text-sm">
                    <IoIosHelpCircleOutline className="text-sm my-1" />
                    {errors?.name?.message}</span>}
            </div>


            <div className="mb-3">

                <input
                    placeholder="Title"
                    type="text"
                    {...register('title')}
                    id="large-input"
                    onChange={(e) => {
                        localStorage.setItem('LAYOUT_TITLE', e.target.value)
                        setValue('name', e.target.value)
                    }}
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
    const docType = file.type?.toLowerCase()
    const accessor = docType?.startsWith('application/pdf') ? 'pdf' : 'image'
    return ({
        accessor,
        isValid: docType?.startsWith('application/pdf') || docType?.startsWith('image/'),
        file
    })
}

const INIT_TOGGLE = { isOpenEditorPage: false, isLoading: false }
// const AUTOCOMPLETE_STYLE =
//     "mt-1 block w-full py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

// function fromImageToBase64(image: File) {
//     if (image) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             const base64String = reader.result as string;
//             return base64String
//         };
//         reader.readAsDataURL(image);
//     }
// }
function convertFileToBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload
            = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default ProposedLayoutView;
