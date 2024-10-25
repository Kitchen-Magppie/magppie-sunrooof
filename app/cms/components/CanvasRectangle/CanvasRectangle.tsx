import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Image as KonvaImage } from "react-konva";
import useImage from 'use-image';
// import Konva from "konva";
import canvasImage from "../../../QuotationPage/assets/2d1.png"
import afterImage from "../../../QuotationPage/assets/BeforeAfter/Arch Window/Before.jpg"


interface Portrait {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean; // To track whether the portrait is visible or removed
}

const CanvasComponent = () => {
    const stageRef = useRef(null);
    const [backgroundImage] = useImage(canvasImage); // Replace with your background image path
    const [portraitImage] = useImage(afterImage); // Replace with your portrait image path
    const [portraits, setPortraits] = useState<Portrait[]>([]);
    const [rectProps, setRectProps] = useState({
        x: 100,
        y: 100,
        width: 300,
        height: 300,
    });

    useEffect(() => {
        // Initialize repeated portrait images inside the rectangle
        const portraitArray: Portrait[] = [];
        const numRows = 3; // Adjust the number of rows
        const numCols = 3; // Adjust the number of columns
        const portraitWidth = rectProps.width / numCols;
        const portraitHeight = rectProps.height / numRows;

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                portraitArray.push({
                    id: row * numCols + col,
                    x: rectProps.x + col * portraitWidth,
                    y: rectProps.y + row * portraitHeight,
                    width: portraitWidth,
                    height: portraitHeight,
                    visible: true, // Initially all portraits are visible
                });
            }
        }

        setPortraits(portraitArray);
    }, [rectProps]);

    const handleClickPortrait = (id: number) => {
        // Set the portrait's visibility to false (make it transparent)
        setPortraits(portraits.map(p => (p.id === id ? { ...p, visible: false } : p)));
    };

    const handleResize = (newWidth: number, newHeight: number) => {
        // Resize the rectangular shape and update portraits accordingly
        setRectProps({ ...rectProps, width: newWidth, height: newHeight });
    };

    return (
        <div>
            <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
                <Layer>
                    {/* Background Image */}
                    {backgroundImage && (
                        <KonvaImage
                            image={backgroundImage}
                            width={window.innerWidth}
                            height={window.innerHeight}
                        />
                    )}

                    {/* Resizable, draggable rectangle */}
                    <Rect
                        x={rectProps.x}
                        y={rectProps.y}
                        width={rectProps.width}
                        height={rectProps.height}
                        stroke="black" // Outline
                        strokeWidth={2}
                        draggable
                        onTransform={(e) => {
                            const node = e.target;
                            handleResize(node.width() * node.scaleX(), node.height() * node.scaleY());
                            node.scaleX(1); // Reset the scale after transformation
                            node.scaleY(1);
                        }}
                    />

                    {/* Render portraits inside the rectangle */}
                    {portraitImage &&
                        portraits.map((portrait) => (
                            <KonvaImage
                                key={portrait.id}
                                image={portraitImage}
                                x={portrait.x}
                                y={portrait.y}
                                width={portrait.width}
                                height={portrait.height}
                                opacity={portrait.visible ? 1 : 0} // Make the portrait transparent if removed
                                onClick={() => handleClickPortrait(portrait.id)} // Remove portrait on click
                            />
                        ))}
                </Layer>
            </Stage>
        </div>
    );
};

export default CanvasComponent;
