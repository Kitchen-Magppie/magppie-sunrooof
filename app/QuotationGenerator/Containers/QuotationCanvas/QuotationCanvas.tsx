import Select from "react-select"
import * as Yup from 'yup';
import { BsDash, BsPlus } from "react-icons/bs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import bgImg from '../../.././../assets/hero-bg.jpeg'

function QuotationCanvas() {

    const {
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(validateItem),
        defaultValues,
    });

    const values = watch()

    const renderQuantityContent = useMemo(() => {
        return (<div>
            <label
                htmlFor="quantity-input"
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

                <div className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {values.value}
                </div>
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

    return (<form className="">
        <div className="h-[75vh] text-white font-extrabold flex justify-center align-middle text-[200px] "
            style={{
                background: `url(${bgImg})`,
                backgroundSize: 'cover'
            }}
        >
            <div className=" opacity-70 align-middle flex justify-center flex-col">
                SUNROOOF
            </div>
        </div>

        <div className="flex w-72">
            <Select
                className="w-100"
                onChange={(e) => { setValue('unit', e.value) }}
                options={QUOTATION_UNIT_OPTIONS}
            />
        </div>
        <div className="flex gap-2 flex-col">
            {renderQuantityContent}
            <div className="flex ">
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-500 via-green-700 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Start Drawing
                </button>
            </div>
        </div>
        Loading...
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
