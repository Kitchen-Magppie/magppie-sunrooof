import React, { useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Transformer } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';
import plot from "../../../QuotationPage/assets/2d2.png"

const App: React.FC = () => {
    const stageRef = useRef<Konva.Stage>(null);
    const rectRef = useRef<Konva.Rect>(null);
    const transformerRef = useRef<Konva.Transformer>(null);

    // Load the image
    const [image] = useImage(plot); // replace with your image URL

    // Rectangle state
    const [rectProps, setRectProps] = useState({
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        stroke: 'red',
        strokeWidth: 2,
        draggable: true,
    });

    // Make the transformer active when the rectangle is selected
    const handleSelect = () => {
        if (transformerRef.current && rectRef.current) {
            transformerRef.current.nodes([rectRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    };

    // Handle changes in rectangle dimensions
    const handleTransform = () => {
        if (rectRef.current) {
            const node = rectRef.current;
            const newScaleX = node.scaleX();
            const newScaleY = node.scaleY();

            // Update the shape's dimensions and reset scale
            setRectProps({
                ...rectProps,
                x: node.x(),
                y: node.y(),
                width: node.width() * newScaleX,
                height: node.height() * newScaleY,
            });

            node.scaleX(1);
            node.scaleY(1);
        }
    };

    // Download the stage as an image without the transformer controls
    const handleDownload = () => {
        if (stageRef.current && transformerRef.current) {
            // Deselect transformer nodes to hide the controls
            transformerRef.current.nodes([]);
            transformerRef.current.getLayer()?.batchDraw();

            // Generate the data URL for the image
            const uri = stageRef.current.toDataURL();

            // Restore the transformer selection
            transformerRef.current.nodes([rectRef.current]);
            transformerRef.current.getLayer()?.batchDraw();

            // Create a link and download the image
            const link = document.createElement('a');
            link.download = 'canvas-image.png';
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                ref={stageRef}
                onMouseDown={handleSelect}
            >
                <Layer>
                    {/* Background Image */}
                    <KonvaImage image={image} width={window.innerWidth} height={window.innerHeight} />

                    {/* Draggable and Resizable Rectangle with Red Outline */}
                    <Rect
                        {...rectProps}
                        ref={rectRef}
                        onClick={handleSelect}
                        onTransformEnd={handleTransform}
                        onDragEnd={(e) => {
                            setRectProps({
                                ...rectProps,
                                x: e.target.x(),
                                y: e.target.y(),
                            });
                        }}
                    />

                    {/* Transformer for resizing */}
                    <Transformer
                        ref={transformerRef}
                        rotateEnabled={false}
                        boundBoxFunc={(oldBox, newBox) => {
                            // Limit resizing to avoid negative width or height
                            if (newBox.width < 20 || newBox.height < 20) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                    />
                </Layer>
            </Stage>

            {/* Button to Download the Final Image */}
            <button onClick={handleDownload}>Download Image</button>
        </div>
    );
};

export default App;
