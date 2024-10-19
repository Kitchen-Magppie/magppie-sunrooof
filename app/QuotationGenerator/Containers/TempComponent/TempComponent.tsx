import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Stage,
    Layer,
    Image as KonvaImage,
    Rect,
    Transformer
} from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';
import Select from "react-select"
// ======================================================================
import frenchSunrooof from "./../../assets/sunrooof/low/French.png"
import classicalSunroof from '../../assets/sunrooof/low/Classical.png'
import plot from "../../../QuotationPage/assets/2d2.png"
import { ComponentComparisonDataEnum, TComponentComparisonDataOption } from '../../../../types';

const App: React.FC = () => {
    const stageRef = useRef<Konva.Stage>(null);
    const rectRef = useRef<Konva.Rect>(null);
    const transformerRef = useRef<Konva.Transformer>(null);
    const [currentSunrooof, setCurrentSunrooof] = useState('');

    // Load the image
    const [image] = useImage(plot); // replace with your image URL

    // Rectangle state
    const [rectProps, setRectProps] = useState({
        x: 500,
        y: 500,
        width: 300,
        height: 100,
        stroke: 'red',
        strokeWidth: 2,
        draggable: true,
    });

    // Make the transformer active when the rectangle is selected
    const handleSelect = useCallback(() => {
        if (transformerRef.current && rectRef.current) {
            transformerRef.current.nodes([rectRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [])

    // Handle changes in rectangle dimensions
    const handleTransform = useCallback(() => {
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
    }, [rectProps])

    // Download the stage as an image without the transformer controls
    const handleDownload = useCallback(() => {
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
    }, [])

    const [patternImage, setPatternImage] = useState(null);

    // Load the image and set it as the pattern image
    useEffect(() => {
        const img = new window.Image();
        img.src = currentSunrooof?.length ? currentSunrooof : '../../../../public/rectangle.png'; // Update the image path
        img.onload = () => {
            // const pattern = rectRef.current.getContext().createPattern(img, 'repeat');
            setPatternImage(img);

        };
    }, [currentSunrooof]);
    console.log(currentSunrooof)
    return (<div>

        <Select


            onChange={(e) => {

                setCurrentSunrooof(e.image)
            }}
            options={CUSTOMER_COMPONENT_COMPARISON_OPTIONS?.filter((item) => item.image?.length)}
        />
        {/* <img src={currentSunrooof} width={100} /> */}
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
                    // fillPatternScale={{ x: 1, y: 1 }}
                    onTransformEnd={handleTransform}
                    fillPatternRepeat='repeat'
                    fillPatternImage={patternImage}
                    onDragEnd={(e) => {
                        setRectProps({
                            ...rectProps,
                            x: e.target.x(),
                            y: e.target.y(),
                        })
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

const CUSTOMER_COMPONENT_COMPARISON_OPTIONS: TComponentComparisonDataOption[] = [
    { label: "French Window", value: ComponentComparisonDataEnum.FrenchWindow, image: frenchSunrooof },
    { label: "Arch Window", value: ComponentComparisonDataEnum.ArchWindow, },
    { label: "Louvered Window", value: ComponentComparisonDataEnum.LouveredWindow },
    { label: "Classical Sunrooof", value: ComponentComparisonDataEnum.ClassicalSunrooof, image: classicalSunroof },
    { label: "Fluted Minimalist Sunrooof", value: ComponentComparisonDataEnum.FlutedMinimalistSunrooof },
    { label: "Modern Sunrooof", value: ComponentComparisonDataEnum.ModernSunrooof },
];

export default App;

