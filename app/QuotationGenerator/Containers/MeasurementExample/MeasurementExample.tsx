import React, { useState } from 'react';
import { Stage, Layer, Line, Circle, Text, Image } from 'react-konva';
import useImage from 'use-image';
import f3 from "../../../QuotationPage/assets/2d1.png"
import Konva from 'konva';
interface Measurement {
    start: { x: number; y: number };
    end: { x: number; y: number };
    direction: 'horizontal' | 'vertical';
    completed: boolean;
}

type TMouseEventKonva = Konva.KonvaEventObject<MouseEvent>
export default function Canvas() {
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentMeasurement, setCurrentMeasurement] = useState<Measurement | null>(null);
    const [image] = useImage(f3); // Replace with your image path

    const calculateDistance = (start: { x: number; y: number }, end: { x: number; y: number }) => {
        return Math.round(
            start.x === end.x
                ? Math.abs(end.y - start.y)
                : Math.abs(end.x - start.x)
        );
    };

    const handleCanvasClick = (e: TMouseEventKonva) => {
        const pos = e.target.getStage().getPointerPosition();

        if (!isDrawing) {
            // Start a new measurement
            setCurrentMeasurement({ start: pos, end: pos, direction: 'horizontal', completed: false });
            setIsDrawing(true);
        } else if (currentMeasurement) {
            // Finish the current measurement
            setMeasurements([...measurements, { ...currentMeasurement, completed: true }]);
            setCurrentMeasurement(null);
            setIsDrawing(false);
        }
    }

    const handleMouseMove = (e: TMouseEventKonva) => {
        if (!isDrawing || !currentMeasurement) return;
        const pos = e.target.getStage().getPointerPosition();

        // Determine direction and update the end point for a straight line
        const direction = Math.abs(pos.x - currentMeasurement.start.x) > Math.abs(pos.y - currentMeasurement.start.y)
            ? 'horizontal'
            : 'vertical';

        const newEnd = direction === 'horizontal'
            ? { x: pos.x, y: currentMeasurement.start.y }
            : { x: currentMeasurement.start.x, y: pos.y };

        setCurrentMeasurement({ ...currentMeasurement, end: newEnd, direction });
    };

    return (
        <Stage width={800} height={600} onMouseDown={handleCanvasClick} onMouseMove={handleMouseMove}>
            <Layer>
                {/* Background image in the rectangular shape */}
                <Image image={image} x={0} y={0} width={800} height={600} />

                {/* Render each saved measurement with its pixel distance */}
                {measurements.map((measurement, index) => {
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
                {currentMeasurement && (
                    <React.Fragment>
                        <Line
                            points={[
                                currentMeasurement.start.x,
                                currentMeasurement.start.y,
                                currentMeasurement.end.x,
                                currentMeasurement.end.y,
                            ]}
                            stroke="gray"
                            strokeWidth={2}
                        />
                        <Text
                            x={(currentMeasurement.start.x + currentMeasurement.end.x) / 2}
                            y={(currentMeasurement.start.y + currentMeasurement.end.y) / 2 - 15}
                            text={`${calculateDistance(currentMeasurement.start, currentMeasurement.end)}px`}
                            fontSize={15}
                            fill={'gray'}
                        />
                        <Circle x={currentMeasurement.start.x} y={currentMeasurement.start.y} radius={5} fill="gray" />
                        <Circle x={currentMeasurement.end.x} y={currentMeasurement.end.y} radius={5} fill="gray" />
                    </React.Fragment>
                )}
            </Layer>
        </Stage>
    );
}
