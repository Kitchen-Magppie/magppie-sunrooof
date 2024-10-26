import Konva from "konva";
import { useState } from "react";
import { Stage, Layer, Image, Line, Text, Circle } from "react-konva";
import useImage from "use-image";
//====================================================================
import bgImg from '../../.././../assets/hero-bg.jpeg'

const MeasurementExample = () => {
    const [image] = useImage(bgImg);
    const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
    const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

    console.log(endPoint)
    console.log(startPoint)
    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const { x, y } = e.target.getStage().getPointerPosition();
        if (!startPoint) {
            setStartPoint({ x, y });
        } else {
            setEndPoint({ x, y });
            const dist = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2));
            setDistance(dist);
        }
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (startPoint && !endPoint) {
            const { x, y } = e.target.getStage().getPointerPosition();
            setEndPoint({ x, y });
        }
    };

    return (<Stage width={800} height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
    >
        <Layer>
            <Image image={image} x={0} y={0} />
            {startPoint && endPoint && (
                <>
                    <Line
                        points={[startPoint.x, startPoint.y, endPoint.x, endPoint.y]}
                        stroke="red"
                        strokeWidth={2}
                    />
                    <Circle
                        x={startPoint.x}
                        y={startPoint.y}
                        radius={4} // Adjust radius as needed
                        fill="red"
                    />
                    <Circle
                        x={endPoint.x}
                        y={endPoint.y}
                        radius={4} // Adjust radius as needed
                        fill="red"
                    />
                </>
            )}
            {distance && (
                <Text
                    x={(startPoint?.x || 0) + 10}
                    y={(startPoint?.y || 0) - 10}
                    text={`Distance: ${distance.toFixed(2)}px`}
                    fontSize={15}
                    fill="black"
                />
            )}
        </Layer>
    </Stage>
    );
};

export default MeasurementExample;
