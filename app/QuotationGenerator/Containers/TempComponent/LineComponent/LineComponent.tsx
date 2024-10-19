import Konva from 'konva';
import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const LineComponent: React.FC = () => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [linePoints, setLinePoints] = useState<number[]>([]);

    const handleCanvasClick = (event: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = event.target.getStage();
        const { x, y } = stage.getPointerPosition()!;

        if (!isDrawing) {
            // Start drawing the line
            setLinePoints([x, y, x, y]);
            setIsDrawing(true);
        } else {
            // End the line
            setIsDrawing(false);
        }
    };

    const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
        if (!isDrawing) return;

        const stage = event.target.getStage();
        const { x, y } = stage.getPointerPosition()!;
        setLinePoints([linePoints[0], linePoints[1], x, y]);
    };
    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            style={{ backgroundColor: '#f0f0f0' }}
        >
            <Layer>
                {linePoints.length > 0 && (
                    <Line
                        points={linePoints}
                        stroke="red"
                        strokeWidth={2}
                        lineCap="round"
                        lineJoin="round"
                    />
                )}
            </Layer>
        </Stage>
    );
};

export default LineComponent;
