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
    const [feet, setFeet] = useState(Math.floor(props.measurement.quantity / 12));
    const [inches, setInches] = useState(props.measurement.quantity % 12);

    const handleFeetChange = useCallback((e) => {
        const newFeet = Number(e.target.value);
        setFeet(newFeet);

        // Update total inches in the parent component
        props.setMeasurement((prev) => ({
            ...prev,
            quantity: newFeet * 12 + inches,
        }));
    }, [inches, props])

    const handleInchesChange = useCallback((e) => {
        const newInches = Number(e.target.value);
        setInches(newInches);

        // Update total inches in the parent component
        props.setMeasurement((prev) => ({
            ...prev,
            quantity: feet * 12 + newInches,
        }));
    }, [feet, props])


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
                            props.setMeasurement((prev) => ({
                                ...prev,
                                quantity: prev.quantity - 1,
                            }));
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                        <BsDash />
                    </button>

                    <input
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={props.measurement.quantity}
                        onChange={(e) => {
                            props.setMeasurement((prev) => ({
                                ...prev,
                                quantity: Number(e.target.value),
                            }));
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            props.setMeasurement((prev) => ({
                                ...prev,
                                quantity: prev.quantity + 1,
                            }));
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                        <BsPlus />
                    </button>
                </div>
            </div>
        );
    }, [props, feet, handleFeetChange, inches, handleInchesChange]);

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
                <div className="">
                    <div className="mt-7" />

                    <KonvaActionButton
                        label='Start Drawing'
                        variant={props.measurement.isStartDrawing ? 'primary' : 'secondary'}
                        // disabled={!(props.measurement.unit && props.measurement.quantity && !!props.measurement.value)}
                        icon={<SiExcalidraw className="my-auto text-xl" />}
                        onClick={() => {
                            props.setMeasurement((prev) => ({ ...prev, isStartDrawing: true }))
                        }}
                    />
                    <KonvaActionButton
                        label='Finalize Unit Value'
                        // disabled={!(props.measurement.unit && props.measurement.quantity && !!props.measurement.value)}
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
