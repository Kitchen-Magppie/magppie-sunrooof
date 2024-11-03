import Select from 'react-select'
import { CANVAS_QUOTATION_UNIT_OPTIONS, TCanvasMeasurement } from '../../../../types';
import { KonvaActionButton } from '../../components';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { BsDash, BsPlus } from 'react-icons/bs'
import { SiExcalidraw } from 'react-icons/si'

type TProps = {
    measurement: TCanvasMeasurement,
    setMeasurement: Dispatch<SetStateAction<TCanvasMeasurement>>,
    onProceed: VoidFunction,
}
function QuotationCanvasUnitMeasurementAction(props: TProps) {
    const renderQuantityContent = useMemo(() => {
        return (
            <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Choose quantity:
                </label>
                <div className="relative flex items-center max-w-[8rem]">
                    <button
                        type="button"
                        onClick={() => {
                            props?.setMeasurement((prev) => ({
                                ...prev,
                                quantity: prev.quantity - 1,
                            }))
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                        <BsDash />
                    </button>

                    <input
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={props?.measurement.quantity}
                        onChange={(e) => {

                            props?.setMeasurement((prev) => ({
                                ...prev,
                                quantity: Number(e.target.value),
                            }))
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            props?.setMeasurement((prev) => ({
                                ...prev,
                                quantity: prev.quantity + 1,
                            }))
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                        <BsPlus />
                    </button>
                </div>
            </div>
        )
    }, [props])
    return (<div>
        <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Enter the length of the line and click to draw:
            </label>
            <Select
                className="w-100"
                onChange={(e) => {
                    props?.setMeasurement((prev) => ({
                        ...prev,
                        unit: e.value,
                    }))
                }}
                options={CANVAS_QUOTATION_UNIT_OPTIONS}
            />
        </div>
        <div className="flex gap-1 align-middle flex-row justify-between">
            {renderQuantityContent}
            <div className="">
                <div className="mt-7" />

                <KonvaActionButton
                    label='Start Drawing'
                    disabled={!(props?.measurement?.unit?.length && props?.measurement?.quantity && !!props?.measurement.value)}
                    icon={<SiExcalidraw className="my-auto text-xl" />}
                    onClick={() => {
                        props?.onProceed()
                    }}
                />

            </div>
        </div>
        <div className="">
            <p>
                Total pixels of the drawn line:{' '}
                {props?.measurement.pixelLength.toLocaleString()} pixels
            </p>
            <p>
                1 unit equals{' '}
                {props?.measurement.unit === 'mm'
                    ? props?.measurement.value.toLocaleString()
                    : +props?.measurement.value.toFixed(2) / 25.4}{' '}
                pixels
            </p>
            {/* {measurement.unit?.length ? `${measurement.value?.toLocaleString()} ${measurement.unit}` : ''} */}
        </div>
    </div>);
}

export default QuotationCanvasUnitMeasurementAction;
