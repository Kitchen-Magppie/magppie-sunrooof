import React, { useCallback, useState } from 'react';
import { Stage, Layer, Line, Circle, Text, Image } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';
//====================================================================
import f3 from "../../../QuotationPage/assets/2d1.png"

interface IMeasurementItem {
    start: { x: number; y: number };
    end: { x: number; y: number };
    direction: 'horizontal' | 'vertical';
    completed: boolean;
}

type TMouseEventKonva = Konva.KonvaEventObject<MouseEvent>

type TCorpus = {
    measurements: IMeasurementItem[],
    isDrawing: boolean,
    currentMeasurement: IMeasurementItem | null
}
const INIT_CORPUS: TCorpus = {
    measurements: [],
    isDrawing: false,
    currentMeasurement: null
}
const calculateDistance = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    return Math.round(
        start.x === end.x
            ? Math.abs(end.y - start.y)
            : Math.abs(end.x - start.x)
    );
};
export default function MeasurementExample() {
    const [corpus, setCorpus] = useState(INIT_CORPUS);
    const [image] = useImage(f3); // Replace with your image path

    const handleCanvasClick = useCallback((e: TMouseEventKonva) => {
        const pos = e.target.getStage().getPointerPosition();

        if (!corpus.isDrawing) {
            // Start a new measurement
            // setCurrentMeasurement({ start: pos, end: pos, direction: 'horizontal', completed: false });
            // setIsDrawing(true);
            setCorpus((prev) => ({
                ...prev,
                isDrawing: true,
                currentMeasurement: {
                    ...prev.currentMeasurement,
                    start: pos,
                    end: pos,
                    direction: 'horizontal',
                    completed: false
                }
            }))
        } else if (corpus.currentMeasurement) {
            // Finish the current measurement
            // setMeasurements([...measurements, { ...currentMeasurement, completed: true }]);
            // setCurrentMeasurement(null);
            // setIsDrawing(false);
            setCorpus((prev) => ({
                ...prev,
                isDrawing: false,
                currentMeasurement: null,
                measurements: [
                    ...prev.measurements,
                    {
                        ...prev.currentMeasurement,
                        completed: true
                    }
                ]
            }))
        }
    }, [corpus.currentMeasurement, corpus.isDrawing])

    const handleMouseMove = useCallback((e: TMouseEventKonva) => {
        if (!corpus.isDrawing || !corpus.currentMeasurement) return;
        const pos = e.target.getStage().getPointerPosition();

        // Determine direction and update the end point for a straight line
        const direction = Math.abs(pos.x - corpus.currentMeasurement.start.x) > Math.abs(pos.y - corpus.currentMeasurement.start.y)
            ? 'horizontal'
            : 'vertical';

        const newEnd = direction === 'horizontal'
            ? { x: pos.x, y: corpus.currentMeasurement.start.y }
            : { x: corpus.currentMeasurement.start.x, y: pos.y };

        setCorpus((prev) => ({
            ...prev,
            currentMeasurement: {
                ...prev.currentMeasurement,
                end: newEnd,
                direction
            }
        }))
        // setCurrentMeasurement({ ...currentMeasurement, end: newEnd, direction });
    }, [corpus.currentMeasurement, corpus.isDrawing])

    return (<>
        <button
            className={`flex justify-center gap-3 flex-row align-middle  px-3 border border-transparent font-medium text-lg rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 mt-5`}
        >Start Drawing</button>
        <Stage width={800} height={600} onMouseDown={handleCanvasClick} onMouseMove={handleMouseMove}>
            <Layer>
                {/* Background image in the rectangular shape */}
                <Image
                    image={image}
                    x={0}
                    y={0}
                    width={800}
                    height={600}
                />

                {/* Render each saved measurement with its pixel distance */}
                {corpus.measurements.map((measurement, index) => {
                    const distance = calculateDistance(measurement.start, measurement.end);
                    const stroke = measurement.completed ? "red" : "black"
                    return (
                        <React.Fragment key={index}>
                            <Line
                                points={[
                                    measurement.start.x,
                                    measurement.start.y,
                                    measurement.end.x,
                                    measurement.end.y,
                                ]}
                                stroke={stroke}
                                strokeWidth={2}
                            />
                            <Text
                                x={(measurement.start.x + measurement.end.x) / 2}
                                y={(measurement.start.y + measurement.end.y) / 2 - 15}
                                text={`${distance}px`}
                                fontSize={15}
                                fill={stroke}
                            />
                            <Circle x={measurement.start.x} y={measurement.start.y} radius={5} fill={stroke} />
                            <Circle x={measurement.end.x} y={measurement.end.y} radius={5} fill={stroke} />
                        </React.Fragment>
                    );
                })}

                {/* Render the current measurement being drawn */}
                {corpus.currentMeasurement && (
                    <React.Fragment>
                        <Line
                            points={[
                                corpus.currentMeasurement.start.x,
                                corpus.currentMeasurement.start.y,
                                corpus.currentMeasurement.end.x,
                                corpus.currentMeasurement.end.y,
                            ]}
                            stroke="gray"
                            strokeWidth={2}
                        />
                        <Text
                            x={(corpus.currentMeasurement.start.x + corpus.currentMeasurement.end.x) / 2}
                            y={(corpus.currentMeasurement.start.y + corpus.currentMeasurement.end.y) / 2 - 15}
                            text={`${calculateDistance(corpus.currentMeasurement.start, corpus.currentMeasurement.end)}px`}
                            fontSize={15}
                            fill={'gray'}
                        />
                        <Circle x={corpus.currentMeasurement.start.x} y={corpus.currentMeasurement.start.y} radius={5} fill="gray" />
                        <Circle x={corpus.currentMeasurement.end.x} y={corpus.currentMeasurement.end.y} radius={5} fill="gray" />
                    </React.Fragment>
                )}
            </Layer>
        </Stage>
    </>
    );
}
