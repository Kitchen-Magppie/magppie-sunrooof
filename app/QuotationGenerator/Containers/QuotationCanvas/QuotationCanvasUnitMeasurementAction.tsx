import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import Select from 'react-select';
import { BsDash, BsPlus } from 'react-icons/bs';
import { SiExcalidraw } from 'react-icons/si';
//====================================================================
import { CANVAS_QUOTATION_UNIT_OPTIONS, TCanvasMeasurement } from '../../../../types';
import { KonvaActionButton } from '../../components';

type TProps = {
    measurement: TCanvasMeasurement,
    setMeasurement: Dispatch<SetStateAction<TCanvasMeasurement>>,
    onProceed: VoidFunction,
}

function QuotationCanvasUnitMeasurementAction(props: TProps) {
    // Local state to hold feet and inches when unit is 'inch'
const [feet, setFeet] = useState(
    Math.floor(props.measurement.quantity / 12 / 0.0254)
)
const [inches, setInches] = useState(
    Math.floor((props.measurement.quantity / 0.0254) % 12)
)

const handleFeetChange = useCallback(
    (e) => {
        const newFeet = Number(e.target.value)
        if (newFeet >= 0) {
            setFeet(newFeet)
            // Update total quantity in mm in the parent component
            props.setMeasurement((prev) => ({
                ...prev,
                quantity: Math.round((newFeet * 12 + inches) * 25.4), // Convert to mm
            }))
        }
    },
    [inches, props]
)

const handleInchesChange = useCallback(
    (e) => {
        const newInches = Number(e.target.value)
        if (newInches >= 0 && newInches <= 11) {
            // Ensure inches are between 0 and 11
            setInches(newInches)
            // Update total quantity in mm in the parent component
            props.setMeasurement((prev) => ({
                ...prev,
                quantity: Math.round((feet * 12 + newInches) * 25.4), // Convert to mm
            }))
        }
    },
    [feet, props]
)
    const renderQuantityContent = useMemo(() => {
        if (props.measurement.unit === 'inch') {
            // Render feet and inches input for "inch" unit
            return (
                <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Enter quantity in feet and inches:
                    </label>
                    <div className="flex items-center space-x-2">
                        {/* Feet Input */}
                        <input
                            type="number"
                            value={feet}
                            onChange={handleFeetChange}
                            className="bg-gray-50 border border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Feet"
                            min="0"
                        />
                        <span className="text-gray-900 dark:text-white">ft</span>

                        {/* Inches Input */}
                        <input
                            type="number"
                            value={inches}
                            onChange={handleInchesChange}
                            className="bg-gray-50 border border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Inches"
                            min="0"
                            max="11"
                        />
                        <span className="text-gray-900 dark:text-white">in</span>
                    </div>
                </div>
            );
        }

        // Default quantity input for other units
        return (
            <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Choose quantity:
                </label>
                <div className="relative flex items-center max-w-[8rem]">
                    <button
                        type="button"
                        onClick={() => {
                            if (props.measurement.quantity > 1) {
                                props.setMeasurement((prev) => ({
                                    ...prev,
                                    quantity: prev.quantity - 1,
                                }));
                            }
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                        <BsDash />
                    </button>

                    <input
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={props.measurement.quantity}
                        onChange={(e) => {
                            const newQuantity = Number(e.target.value);
                            console.log("🚀 ~ renderQuantityContent ~ e.target.value:", e.target.value)
                            if (newQuantity >= 1) {
                                props.setMeasurement((prev) => ({
                                    ...prev,
                                    quantity: newQuantity,
                                }));
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            if (props.measurement.quantity < 1000) {  // Max quantity to avoid overflow
                                props.setMeasurement((prev) => ({
                                    ...prev,
                                    quantity: prev.quantity + 1,
                                }));
                            }
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                        <BsPlus />
                    </button>
                </div>
            </div>
        );
    }, [props, feet, handleFeetChange, inches, handleInchesChange]);

    // Validate if unit and quantity are set correctly
    const isValid = props.measurement.unit && props.measurement.quantity > 0;

    return (
        <div>
            <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Enter the length of the line and click to draw:
                </label>
                <Select
                    className="w-100"
                    onChange={({ value: unit }) => {
                        props.setMeasurement((prev) => ({
                            ...prev,
                            unit,
                        }));
                    }}
                    options={CANVAS_QUOTATION_UNIT_OPTIONS}
                />
            </div>
            <div className="flex gap-1 align-middle flex-row justify-between">
                {renderQuantityContent}
                <div className="flex flex-col">
                    <div className="mt-7" />

                    <KonvaActionButton
                        label='Start Drawing'
                        variant={props.measurement.isStartDrawing ? 'primary' : 'secondary'}
                        disabled={!isValid}
                        icon={<SiExcalidraw className="my-auto text-xl" />}
                        onClick={() => {
                            props.setMeasurement((prev) => ({ ...prev, isStartDrawing: true }))
                        }}
                    />
                    <KonvaActionButton
                        label='Finalize Unit Value'
                        disabled={!isValid}
                        icon={<SiExcalidraw className="my-auto text-xl" />}
                        onClick={() => {
                            props.onProceed();
                        }}
                    />
                </div>
            </div>
            <div className="">
                <p>
                    Total pixels of the drawn line: {props.measurement.pixelLength.toLocaleString()} pixels
                </p>
                <p>
                    1 unit equals{' '}
                    {props.measurement.unit === 'mm'
                        ? props.measurement.value.toLocaleString()
                        : (props.measurement.unit === 'inch' ? `${props.measurement.value} inches` : (+props.measurement.value.toFixed(2) / 25.4))}{' '}
                    pixels
                </p>
            </div>
        </div>
    );
}

export default QuotationCanvasUnitMeasurementAction;
