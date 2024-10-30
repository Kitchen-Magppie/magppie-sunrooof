import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Konva from 'konva'
import {
    Stage,
    Layer,
    Line,
    Image as KonvaImage,
    Rect,
    Transformer,
    Circle,
} from 'react-konva'
import useImage from 'use-image'
//====================================================================
import bgImg from '../../.././../assets/hero-bg.jpeg'
import { CUSTOMER_COMPONENT_COMPARISON_OPTIONS } from '../../../cms/mocks'
import { useAppSelector } from '../../../../redux'
import {
    _,
    CANVAS_STAGE_HEIGHT,
    INIT_CANVAS_KONVA_CORPUS,
    INIT_CANVAS_MEASUREMENT,
    INIT_CANVAS_RECT_PROPS,
    TKonvaImageItem
} from '../../../../types'
import QuotationCanvasUnitMeasurementAction from './QuotationCanvasUnitMeasurementAction'
import QuotationCanvasEditAction from './QuotationCanvasEditAction'
import { QuotationConvasAlert } from './QuotationCanvasAlert'


function QuotationCanvas() {
    const { Presentation } = useAppSelector((state) => state.Cms)
    const [corpus, setCorpus] = useState(INIT_CANVAS_KONVA_CORPUS)
    const [isDrawingStarted, setIsDrawingStarted] = useState(false)
    const [isDrawing, setIsDrawing] = useState(false)
    const [linePoints, setLinePoints] = useState<number[]>([])
    const stageContainerRef = useRef<HTMLDivElement>(null);
    const [stageWidth, setStageWidth] = useState<number>(800)
    const [measurement, setMeasurement] = useState(INIT_CANVAS_MEASUREMENT)
    const [rectProps, setRectProps] = useState(INIT_CANVAS_RECT_PROPS)
    const stageRef = useRef<Konva.Stage>(null)
    const rectRef = useRef<Konva.Rect>(null)
    const transformerRef = useRef<Konva.Transformer>(null)
    const [image, setImage] = useImage(corpus.selection.image)
    const [patternImage, setPatternImage] = useState(null)
    const [images, setImages] = useState<TKonvaImageItem[]>([])
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const img = new window.Image()

        const currentItem = CUSTOMER_COMPONENT_COMPARISON_OPTIONS?.find(
            (item) => item.value === corpus.selection.sunrooofWindow
        )
        if (currentItem?.image?.low?.length) {
            img.src = currentItem?.image?.low
        }
        img.onload = () => {
            setPatternImage(img)
        }
    }, [corpus.selection.sunrooofWindow])

    const calculatePixelLength = useCallback(
        (line: number[]) => {
            if (!line || linePoints.length < 4) return
            const x1 = linePoints[0]
            const y1 = linePoints[1]
            const x2 = linePoints[2]
            const y2 = linePoints[3]
            const length = Math.sqrt(
                Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
            ) // Pythagorean theorem to calculate pixel distance
            setMeasurement((prev) => ({ ...prev, pixelLength: length })) // Update pixel length
        },
        [linePoints]
    )

    const calculatePixelsPerUnit = useCallback(() => {
        if (!measurement.pixelLength || measurement.quantity === 0) return // Ensure units are valid
        const pixelsPerUnit = measurement.pixelLength / measurement.quantity
        setMeasurement((prev) => ({ ...prev, value: pixelsPerUnit }))
    }, [measurement.quantity, measurement.pixelLength]);

    console.log(measurement)
    // Function to update images inside the rectangle
    const updateImagesInRect = useCallback(() => {
        if (!rectProps || !patternImage) return;

        const { x: rectX, y: rectY, width: rectWidth, height: rectHeight } = rectProps;

        const imageWidth = measurement.pixelLength / 2; // Desired image width

        // const imageWidth = 50; // Desired image width
        const imageHeight = 50; // Desired image height
        const spacing = 20; // Space between images

        const columns = Math.floor(rectWidth / (imageWidth + spacing));
        const rows = Math.floor(rectHeight / (imageHeight + spacing));

        const newImages = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const imgX = rectX + col * (imageWidth + spacing);
                const imgY = rectY + row * (imageHeight + spacing);

                newImages.push({
                    id: `${row}-${col}-${Date.now()}`,
                    x: imgX,
                    y: imgY,
                    width: imageWidth,
                    height: imageHeight,
                    rotation: 0,
                    image: patternImage,
                });
            }
        }

        // Before updating images
        setHistory((prevHistory) => [...prevHistory, { images, rectProps }]);

        setImages(newImages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rectProps, patternImage]);


    // Update images when rectangle or pattern image changes
    useEffect(() => {
        updateImagesInRect()
    }, [rectProps, patternImage, updateImagesInRect])

    // Handle rectangle transform
    const handleRectTransform = useCallback(() => {
        if (rectRef.current) {
            const node = rectRef.current;
            const newScaleX = node.scaleX();
            const newScaleY = node.scaleY();

            // Update the rectangle's dimensions and reset scale
            setRectProps((prev) => ({
                ...prev,
                x: node.x(),
                y: node.y(),
                width: node.width() * newScaleX,
                height: node.height() * newScaleY,
            }));

            node.scaleX(1);
            node.scaleY(1);

            updateImagesInRect(); // Update child images
        }
    }, [updateImagesInRect]);


    // Handle image selection
    const handleImageSelect = useCallback((id: string) => {
        setSelectedImageId(id)
    }
        , [])
    // Handle image drag end
    const handleImageDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>, id: string) => {
        const { x, y } = e.target.position()

        // Before updating images
        setHistory((prevHistory) => [...prevHistory, { images, rectProps }]);

        setImages((prevImages) =>
            prevImages.map((img) =>
                img.id === id ? { ...img, x, y } : img
            )
        )
    }
        , [images, rectProps])
    // Handle image transform end
    const handleImageTransformEnd = useCallback((e: Konva.KonvaEventObject<Event>, id: string) => {
        const node = e.target
        const scaleX = node.scaleX()
        const scaleY = node.scaleY()

        const width = node.width() * scaleX
        const height = node.height() * scaleY
        const rotation = node.rotation()

        node.scaleX(1)
        node.scaleY(1)

        // Before updating images
        setHistory((prevHistory) => [...prevHistory, { images, rectProps }]);

        setImages((prevImages) =>
            prevImages.map((img) =>
                img.id === id ? { ...img, width, height, rotation } : img
            )
        )
    }, [images, rectProps])

    const handleUndo = useCallback(() => {
        if (history.length === 0) return;

        const lastState = history[history.length - 1];
        // Before updating images
        setHistory((prevHistory) => [...prevHistory, { images, rectProps }]);
        setImages(lastState.images);
        setRectProps(lastState.rectProps);

        // Remove the last state from history
        setHistory((prevHistory) => prevHistory.slice(0, -1));
    }, [history, images, rectProps])


    // Handle delete key to remove selected image
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Delete' && selectedImageId) {
                // Before updating images
                setHistory((prevHistory) => [...prevHistory, { images, rectProps }]);
                setImages((prevImages) =>
                    prevImages.filter((img) => img.id !== selectedImageId)
                )
                setSelectedImageId(null)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [images, rectProps, selectedImageId])

    useEffect(() => {
        if (Presentation?.value?.file?.size) {
            const reader = new FileReader()
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setCorpus((prev) => ({
                        ...prev,
                        selection: {
                            ...prev.selection,
                            image: reader.result,
                        },
                    }))
                }
            }
            reader.readAsDataURL(Presentation?.value?.file)
        }
    }, [Presentation?.value?.file, setImage])

    const handleDownload = useCallback(() => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height

        // Draw the image on the canvas
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0)

        const uniq = +new Date()
        // Convert the canvas to a Data URL
        const dataURL = canvas.toDataURL('image/png')

        // Create a download link and trigger download
        const link = document.createElement('a')
        link.href = dataURL
        link.download = `client-layout-${uniq}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        if (stageRef.current && transformerRef.current) {
            transformerRef.current.nodes([])
            transformerRef.current.getLayer()?.batchDraw()
            const uri = stageRef.current.toDataURL()
            transformerRef.current.nodes([rectRef.current])
            transformerRef.current.getLayer()?.batchDraw()
            _.download({ url: uri, name: `proposed-layout-${uniq}` })
        }
    }, [image])

    const handleCanvasClick = useCallback((event: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = event.target.getStage()
        const { x, y } = stage.getPointerPosition()!

        if (!isDrawing) {
            setLinePoints([x, y, x, y])
            setIsDrawing(true)
        } else {
            setIsDrawing(false)
        }
    },
        [isDrawing]
    )

    const handleMouseMove = useCallback((event: Konva.KonvaEventObject<MouseEvent>) => {
        if (!isDrawing) return

        const stage = event.target.getStage()
        const { x, y } = stage.getPointerPosition()!
        setLinePoints([linePoints[0], linePoints[1], x, y])
        calculatePixelLength([
            linePoints[0],
            linePoints[1],
            linePoints[2],
            linePoints[3],
        ])
        calculatePixelsPerUnit()
    },
        [calculatePixelLength, calculatePixelsPerUnit, isDrawing, linePoints]
    )

    const navigate = useNavigate()

    useEffect(() => {
        if (!Presentation?.value?.file?.size) {
            navigate(`/quotation-generator`)
        }
    }, [Presentation?.value?.file?.size, navigate])

    // Make the transformer active when the rectangle is selected
    const handleRectSelect = useCallback(() => {
        if (transformerRef.current && rectRef.current) {
            transformerRef.current.nodes([rectRef.current])
            transformerRef.current.getLayer()?.batchDraw()
        }
    }, [])

    const renderUnitMeasurementComponent = useMemo(() => {
        return (
            linePoints.length > 0 && (
                <>
                    <Line
                        points={linePoints}
                        stroke="red"
                        strokeWidth={2}
                        lineCap="round"
                        lineJoin="round"
                    />
                    <Circle
                        x={linePoints[0]}
                        y={linePoints[1]}
                        radius={4} // Adjust radius as needed
                        fill="red"
                    />
                    <Circle
                        x={linePoints[2]}
                        y={linePoints[3]}
                        radius={4} // Adjust radius as needed
                        fill="red"
                    />
                </>
            )
        )
    }, [linePoints])


    useEffect(() => {
        const handleResize = () => {
            setStageWidth(window.innerWidth)
            // setStageHeight(window.innerHeight)
        };

        // Add event listener on component mount
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    // Update the stage width to match the container's width
    const updateStageSize = () => {
        if (stageContainerRef.current) {
            setStageWidth(stageContainerRef.current.clientWidth);
        }
    };

    useEffect(() => {
        updateStageSize();
        window.addEventListener('resize', updateStageSize);
        return () => window.removeEventListener('resize', updateStageSize);
    }, []);

    return (<form className="">
        <div
            className={`h-[25vh] text-white font-extrabold flex justify-center align-middle text-[100px] `}
            style={{
                background: `url(${bgImg})`,
                backgroundSize: 'cover',
            }}
        >
            <div className=" opacity-70 align-middle flex justify-center flex-col">
                SUNROOOF
            </div>
        </div>

        <div className="container mx-auto">
            <div className="mt-10">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col align-middle ">
                        <div className="mb-4">
                            <QuotationConvasAlert
                                label='Step 1'
                                remark='Please select mm or inches then enter the numeric value. You can move cursor on canvas to measure the value in pixels. Then proceed to next step.'
                            />
                        </div>
                        {isDrawingStarted
                            ? <QuotationCanvasEditAction

                                handleDownload={handleDownload}
                                handleUndo={handleUndo}
                                onChangeSunroofWindow={(sunrooofWindow) => {
                                    setCorpus((prev) => ({
                                        ...prev,
                                        selection: {
                                            ...prev.selection,
                                            sunrooofWindow,
                                        },
                                    }))
                                }}
                            />
                            : <QuotationCanvasUnitMeasurementAction

                                measurement={measurement}
                                setMeasurement={setMeasurement}

                                onProceed={() => {
                                    setIsDrawingStarted(true)
                                }}
                            />}
                    </div>
                    <div className=""
                        ref={stageContainerRef}
                        style={{ width: "100%", overflow: "hidden" }}
                    >
                        {Presentation?.value?.file?.size ? (
                            <Stage
                                width={stageWidth}
                                height={CANVAS_STAGE_HEIGHT}
                                ref={stageRef}
                                onClick={handleCanvasClick}
                                onMouseMove={handleMouseMove}
                            >
                                <Layer>
                                    {Presentation?.value?.file?.size ? (<KonvaImage image={image} />) : ''}
                                    {isDrawingStarted ? (
                                        <>
                                            <Rect
                                                {...rectProps}
                                                ref={rectRef}
                                                draggable={true}
                                                onDragEnd={(e) => {
                                                    setRectProps((prev) => ({
                                                        ...prev,
                                                        x: e.target.x(),
                                                        y: e.target.y(),
                                                    }));
                                                    updateImagesInRect();
                                                }}
                                                onTransformEnd={handleRectTransform}
                                                onClick={handleRectSelect}
                                            />

                                            {/* Images */}
                                            {images.map((img) => (
                                                <KonvaImage
                                                    key={img.id}
                                                    image={img.image as CanvasImageSource}
                                                    x={img.x}
                                                    y={img.y}
                                                    width={img.width}
                                                    height={img.height}
                                                    rotation={img.rotation}
                                                    draggable
                                                    onClick={() => handleImageSelect(
                                                        img.id
                                                    )}
                                                    onDragEnd={(e) =>
                                                        handleImageDragEnd(
                                                            e,
                                                            img.id
                                                        )
                                                    }
                                                    onTransformEnd={(e) =>
                                                        handleImageTransformEnd(
                                                            e,
                                                            img.id
                                                        )
                                                    }
                                                    ref={(node) => {
                                                        if (
                                                            node &&
                                                            selectedImageId ===
                                                            img.id
                                                        ) {
                                                            transformerRef.current.nodes(
                                                                [node]
                                                            )
                                                            transformerRef.current
                                                                .getLayer()
                                                                .batchDraw()
                                                        }
                                                    }}
                                                />
                                            ))}

                                            {/* Transformer */}
                                            <Transformer
                                                ref={transformerRef}
                                                rotateEnabled={true}
                                                boundBoxFunc={(
                                                    oldBox,
                                                    newBox
                                                ) => {
                                                    if (
                                                        newBox.width < 5 ||
                                                        newBox.height < 5
                                                    ) {
                                                        return oldBox
                                                    }
                                                    return newBox
                                                }}
                                            />
                                        </>
                                    ) : (
                                        renderUnitMeasurementComponent
                                    )}
                                </Layer>
                            </Stage>
                        ) : (
                            ''
                        )}
                    </div>
                    {/* <MeasurementExample /> */}
                </div>
            </div>
        </div>
    </form>
    )
}


export default QuotationCanvas
