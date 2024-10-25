import React, { useRef, useState } from 'react';
import { Stage, Layer, Image, Rect, Text } from 'react-konva';
import { Image as KonvaImage } from 'konva/lib/shapes/Image';

interface ImageData {
    x: number;
    y: number;
    width: number;
    height: number;
    image: KonvaImage;
    removed: boolean;
}

const CanvasRComponent = () => {
    const stageRef = useRef<Stage>(null);
    const [backgroundImage, setBackgroundImage] = useState<KonvaImage | null>(null);
    const [rectangularShape, setRectangularShape] = useState<Rect | null>(null);
    const [repeatedImages, setRepeatedImages] = useState<ImageData[]>([]);

    // Load background image
    const loadBackgroundImage = async () => {
        const image = new Image();
        image.src = 'path/to/your/background.jpg'; // Replace with your image path
        image.onload = () => {
            setBackgroundImage(new KonvaImage({
                x: 0,
                y: 0,
                image: image,
                width: image.width,
                height: image.height,
            }));
        };
    };

    // Create rectangular shape
    const createRectangularShape = () => {
        const rect = new Rect({
            x: 100,
            y: 100,
            width: 200,
            height: 200,
            stroke: 'black',
            strokeWidth: 2,
            draggable: true,
            scaleX: 1,
            scaleY: 1,
        });

        rect.on('mouseover', () => {
            rect.stroke('blue');
        });

        rect.on('mouseout', () => {
            rect.stroke('black');
        });

        setRectangularShape(rect);
    };

    // Create repeated images
    const createRepeatedImages = () => {
        const portraitImage = new Image();
        portraitImage.src = 'path/to/your/portrait.jpg'; // Replace with your portrait image path
        portraitImage.onload = () => {
            const numRows = 3; // Adjust the number of rows
            const numCols = 3; // Adjust the number of columns
            const imageWidth = portraitImage.width;
            const imageHeight = portraitImage.height;
            const spacing = 10; // Adjust the spacing between images

            const images: ImageData[] = [];

            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    const x = rectangularShape?.x() + j * (imageWidth + spacing);
                    const y = rectangularShape?.y() + i * (imageHeight + spacing);
                    const image = new KonvaImage({
                        x,
                        y,
                        image: portraitImage,
                        width: imageWidth,
                        height: imageHeight,
                    });

                    image.on('click', () => {
                        removeRepeatedImage(image);
                    });

                    images.push({
                        x,
                        y,
                        width: imageWidth,
                        height: imageHeight,
                        image,
                        removed: false,
                    });
                }
            }

            setRepeatedImages(images);
        };
    };

    // Remove repeated image
    const removeRepeatedImage = (image: KonvaImage) => {
        setRepeatedImages(repeatedImages.map(img => ({
            ...img,
            removed: img.image === image ? true : img.removed,
        })));
    };

    // Load resources and create elements on component mount
    useEffect(() => {
        loadBackgroundImage();
        createRectangularShape();
        createRepeatedImages();
    }, []);

    return (
        <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
            <Layer>
                {backgroundImage && backgroundImage}
                {rectangularShape && rectangularShape}
                {repeatedImages.map(image => (
                    <KonvaImage
                        {...image}
                        opacity={image.removed ? 0.2 : 1} // Make removed images transparent
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default CanvasRComponent;
