import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import useImage from 'use-image';
const ImageSelectorActionKonva = () => {
    const [image] = useImage("https://firebasestorage.googleapis.com/v0/b/magppie-sunrooof.appspot.com/o/customers%2F309e18c2-5350-4788-8234-0e3e3580229d%2F2d-design%2F2d1.png?alt=media&token=cbaac8e2-8915-451e-adba-6038037cc275"); // Load the image
    const [erasedPoints, setErasedPoints] = useState<{ x: number, y: number }[]>([]);
    const rectRef = useRef(null);

    useEffect(() => {
        if (rectRef.current && image) {
            const rect = rectRef.current;
            rect.fillPatternImage(image);
            rect.fillPatternRepeat('repeat');
        }
    }, [image]);

    const handleClick = (e) => {
        const { x, y } = e.target.getStage().getPointerPosition();
        setErasedPoints((prev) => [...prev, { x, y }]);
    };

    return (
        <Stage width={window.innerWidth} height={window.innerHeight} onClick={handleClick}>
            <Layer>
                <Rect
                    ref={rectRef}
                    x={50}
                    y={50}
                    width={300}
                    height={200}
                    fillPatternImage={image}
                    fillPatternRepeat="repeat"
                    onClick={handleClick}
                />
                {erasedPoints.map((point, index) => (
                    <Rect
                        key={index}
                        x={point.x}
                        y={point.y}
                        width={20}
                        height={20}
                        fill="white"
                        globalCompositeOperation="destination-out" // This removes the image where clicked
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default ImageSelectorActionKonva;
