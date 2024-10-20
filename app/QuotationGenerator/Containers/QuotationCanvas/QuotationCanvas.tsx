import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select"
import * as Yup from 'yup';
import { BsDash, BsPlus } from "react-icons/bs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TbFileOrientation } from "react-icons/tb";
import { IoIosMove } from "react-icons/io";
import { MdDraw } from "react-icons/md";
import { MdOutlineRotate90DegreesCcw } from "react-icons/md";
import { BsEraser } from "react-icons/bs";
import { RxMaskOn } from "react-icons/rx";
import { CiRuler } from "react-icons/ci";
import { SiExcalidraw } from "react-icons/si"
import { PiDownloadSimpleFill } from "react-icons/pi";

//====================================================================
import bgImg from '../../.././../assets/hero-bg.jpeg'
import { CUSTOMER_COMPONENT_COMPARISON_OPTIONS } from "../../../cms/mocks";
import { useAppSelector } from "../../../../redux";

function QuotationCanvas() {

    const { Presentation } = useAppSelector((state) => state.Cms);
    const [isDrawingStarted, setIsDrawingStarted] = useState(false)

    const {
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(validateItem),
        defaultValues,
    });

    const values = watch()

    const navigate = useNavigate()

    useEffect(() => {
        if (!Presentation?.value?.file?.size) {
            navigate(`/quotation-generator`)
        }
    }, [Presentation?.value?.file?.size, navigate])

    const renderQuantityContent = useMemo(() => {
        return (<div className="flex flex-col">
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Choose quantity:
            </label>
            <div className="relative flex items-center max-w-[8rem]">
                <button
                    type="button"
                    onClick={() => {
                        setValue('value', values.value - 1)
                    }}
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                    <BsDash />
                </button>


                <input className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={values.value}

                    onChange={(e) => {
                        setValue('value', Number(e.target.value))
                    }}
                />
                <button
                    type="button"
                    onClick={() => {
                        setValue('value', values.value + 1)
                    }}

                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                    <BsPlus />
                </button>
            </div>
        </div>)
    }, [setValue, values.value])

    const renderDrawingEditor = useMemo(() => {
        return (<div>
            <div className="flex w-72 flex-col mb-3">
                <Select options={CUSTOMER_COMPONENT_COMPARISON_OPTIONS} />
            </div>
            <div className="mt-20">
                <div className="grid grid-flow-row grid-cols-2 gap-2">
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <MdDraw className="my-auto text-xl" />
                        Draw SUNROOOF
                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <TbFileOrientation className="my-auto text-xl" />
                        Orientation II

                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <IoIosMove className="my-auto text-xl" />
                        Move SUNROOOF

                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <MdOutlineRotate90DegreesCcw className="my-auto text-xl" />
                        Rotate SUNROOOF

                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <BsEraser className="my-auto text-xl" />
                        Remove SUNROOOF

                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <RxMaskOn className="my-auto text-xl" />
                        Remove  MASK

                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <CiRuler className="my-auto text-xl" />
                        Scale for Measurement
                    </button>

                </div>

            </div>
            <div className="mt-20">
                <button
                    type="button"
                    className="text-white bg-gradient-to-r bg-[#b5b496ff]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#b5b496ff] dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                >
                    <PiDownloadSimpleFill className="my-auto text-xl" />
                    Download Final Image
                </button>
            </div>
        </div>)
    }, [])

    const renderBeginning = useMemo(() => {
        return (
            <>
                <div className="flex w-72 flex-col">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Enter the length of the line and click to draw:
                    </label>
                    <Select
                        className="w-100"
                        onChange={(e) => { setValue('unit', e.value) }}
                        options={QUOTATION_UNIT_OPTIONS}
                    />
                </div>
                <div className="flex gap-1 align-middle flex-row">
                    {renderQuantityContent}
                    <div className="">
                        <div className="mt-7" />
                        <button
                            onClick={() => { setIsDrawingStarted(true) }}
                            type="button"
                            className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                        >
                            <SiExcalidraw className="my-auto text-xl" />
                            Start Drawing
                        </button>
                    </div>

                </div>
            </>

        )
    }, [renderQuantityContent, setValue])
    return (<form className="">
        <div className={`h-[25vh] text-white font-extrabold flex justify-center align-middle text-[100px] `}
            style={{
                background: `url(${bgImg})`,
                backgroundSize: 'cover'
            }}
        >
            <div className=" opacity-70 align-middle flex justify-center flex-col">
                SUNROOOF
            </div>
        </div>

        <div className="container mx-auto">
            <div className="mt-10">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col align-middle justify-center">
                        {isDrawingStarted ? renderDrawingEditor : renderBeginning}
                    </div>
                    <div className="">
                        {Presentation?.value?.file?.size ? (
                            <img src={`${URL.createObjectURL(Presentation?.value?.file)}`} />
                        ) : ''}

                    </div>
                </div>
            </div>
        </div>
    </form>);
}
const QUOTATION_UNIT_OPTIONS = [
    { value: 'mm', label: 'mm' },
    { value: 'inch', label: 'Feet & Inches' },
]

type TInput = { unit: string, value: number }
const validateItem = Yup.object({
    unit: Yup.string().required('Unit is required'),
    value: Yup.number().required('Value is required'),
});

const defaultValues: TInput = { unit: '', value: 1 }
export default QuotationCanvas;
