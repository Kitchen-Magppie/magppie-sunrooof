import React, { useState, useRef, useCallback } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import Konva from 'konva';

const LineDrawingComponent: React.FC = () => {
    const [lines, setLines] = useState<Array<{ points: number[] }>>([]);
    const [newLine, setNewLine] = useState<number[]>([]);
    const [lineLength, setLineLength] = useState<number>(0);
    const stageRef = useRef<Konva.Stage>(null);

    // Function to calculate the distance between two points
    const calculateDistance = (points: number[]): number => {
        let distance = 0;
        for (let i = 0; i < points.length - 2; i += 2) {
            const dx = points[i + 2] - points[i];
            const dy = points[i + 3] - points[i + 1];
            distance += Math.sqrt(dx * dx + dy * dy);
        }
        return distance;
    };

    // When the user starts drawing a line
    const handleMouseDown = (e: any) => {
        const stage = stageRef.current;
        if (!stage) return;

        const { x, y } = stage.getPointerPosition()!;
        setNewLine([x, y]); // Start the line with the first point
    };

    // While drawing the line (ensure it stays straight)
    const handleMouseMove = (e: any) => {
        if (newLine.length === 0) return; // No active line

        const stage = stageRef.current;
        if (!stage) return;

        const { x, y } = stage.getPointerPosition()!;
        const startX = newLine[0];
        const startY = newLine[1];

        // Update the line's second point dynamically as the user moves the mouse
        const updatedLine = [startX, startY, x, y];

        setNewLine(updatedLine);
        setLineLength(calculateDistance(updatedLine)); // Calculate the line length
    };

    // When the user finishes drawing the line
    const handleMouseUp = () => {
        if (newLine.length === 0) return;

        setLines([...lines, { points: newLine }]); // Save the new line
        setNewLine([]); // Reset the current line
    };

    return (
        <div>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                ref={stageRef}
            >
                <Layer>
                    {/* Draw the lines that were completed */}
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="black"
                            strokeWidth={2}
                            lineCap="round"
                            lineJoin="round"
                        />
                    ))}
                    {/* Draw the currently active line */}
                    {newLine.length > 0 && (
                        <Line
                            points={newLine}
                            stroke="red"
                            strokeWidth={2}
                            lineCap="round"
                            lineJoin="round"
                        />
                    )}
                    {/* Display the length of the current line */}
                    <Text
                        text={`Line length: ${Math.round(lineLength)} px`}
                        x={10}
                        y={10}
                        fontSize={18}
                        fill="black"
                    />
                </Layer>
            </Stage>
        </div>
    );
};

export default LineDrawingComponent;
