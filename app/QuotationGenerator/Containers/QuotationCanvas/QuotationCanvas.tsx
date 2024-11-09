import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

//====================================================================
// import bgImg from '../../.././../assets/hero-bg.jpeg'
import {
    CUSTOMER_COMPONENT_COMPARISON_OPTIONS,
    KonvaAlertMessage
} from '../../../cms/mocks'
import { useAppSelector } from '../../../../redux'
import {
    _,
    CANVAS_STAGE_HEIGHT,
    CanvasToolEnum,
    INIT_CANVAS_KONVA_CORPUS,
    INIT_CANVAS_MEASUREMENT,
    INIT_CANVAS_RECT_PROPS,
    TKonvaImageItem
} from '../../../../types'
import {
    QuotationCanvasAlert,
    QuotationCanvasEditAction,
    QuotationCanvasUnitMeasurementAction
} from '.'
import { useFirebaseStorageActions } from '../../../../hooks/firebase'
import { useProposedLayoutAction } from '../../../cms/hooks'


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
    const navigate = useNavigate()
    const [history, setHistory] = useState([]);
    const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
    const imageRefs = useRef<{ [key: string]: Konva.Image }>({});
    const ProposedLayoutDataAction = useProposedLayoutAction()
    const [imageProps, setImageProps] = useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });


    console.log(corpus.selection.image)
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

    const calculatePixelLength = useCallback((line: number[]) => {
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

    // console.log(measurement)
    // Function to update images inside the rectangle
    const updateImagesInRect = useCallback(() => {
        if (!rectProps || !patternImage) return;

        const { x: rectX, y: rectY, width: rectWidth, height: rectHeight } = rectProps;

        const imageWidth = measurement.pixelLength / 2; // Desired image width

        // const imageWidth = 50; // Desired image width
        const imageHeight = measurement.pixelLength / 2; // Desired image height
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
    const handleImageSelect = useCallback((e: TKonvaMouseEvent, id: string) => {
        e.cancelBubble = true; // Prevent event from reaching the parent or stage
        // const selectedNode = imageRefs.current[id];
        setSelectedObjectId(id);
        setSelectedImageId(id)
    }, [])
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
    }, [images, rectProps])
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

    useEffect(() => {
        if (selectedObjectId === 'parent' && rectRef.current) {
            transformerRef.current.nodes([rectRef.current]);
        } else if (selectedObjectId && imageRefs.current[selectedObjectId]) {
            transformerRef.current.nodes([imageRefs.current[selectedObjectId]]);
        } else if (transformerRef?.current?.nodes) {
            transformerRef.current.nodes([]);
        }
        if (transformerRef?.current?.getLayer) {
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [selectedObjectId]);

    console.log(history)
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

    const StorageAction = useFirebaseStorageActions();

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
        // const blob = new Blob([dataURL], { type: 'image/png' });

        // Create a File object
        // const file = new File([blob], link.download, { type: 'image/png' });

        document.body.appendChild(link)

        if (stageRef.current && transformerRef.current) {
            transformerRef.current.nodes([])
            transformerRef.current.getLayer()?.batchDraw()
            const uri = stageRef.current.toDataURL()
            transformerRef.current.nodes([rectRef.current])
            transformerRef.current.getLayer()?.batchDraw()


            StorageAction.batch.upload({
                files: [Presentation.value.file,
                Base64ToFile(uri, Presentation.value.file.name)
                ],
                path: 'proposed-layout',
                onSuccess: (e) => {
                    ProposedLayoutDataAction.add({
                        label: Presentation.value.title,
                        url: {
                            customer: e[0],
                            proposed: e[1],
                        },
                    })
                    toast('Proposed image has been saved!')
                    navigate('/cms')
                    link.click()
                    document.body.removeChild(link)
                    _.download({ url: uri, name: `proposed-layout-${uniq}` })
                }
            })


        }
    }, [
        navigate,
        Presentation.value.file,
        Presentation.value.title,
        ProposedLayoutDataAction,
        StorageAction,
        image
    ])

    const handleCanvasClick = useCallback((event: TKonvaMouseEvent) => {
        const stage = event.target.getStage()
        const { x, y } = stage.getPointerPosition()!

        console.log('Target is/////', event.target);
        console.log('Target is/////2', stageRef.current);

        // If the clicked target is the stage (background), clear selection
        if (event.target === stageRef.current || event.target === stageRef.current.getStage()) {
            setSelectedObjectId(null);
            transformerRef.current.detach();
            transformerRef.current.nodes([]);
            transformerRef.current.getLayer()?.batchDraw();
        }

        if (!isDrawing) {
            setLinePoints([x, y, x, y])
            setIsDrawing(true)
        } else {
            setIsDrawing(false)
        }
    }, [isDrawing])

    const handleMouseMove = useCallback((event: TKonvaMouseEvent) => {
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

    // Make the transformer active when the rectangle is selected
    const handleRectSelect = useCallback((e: TKonvaMouseEvent) => {
        if (transformerRef.current && rectRef.current) {
            e.cancelBubble = true; // Prevent event from reaching the stage
            setSelectedObjectId('parent');
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

    const renderGuideAlert = useMemo(() => {
        if (isDrawingStarted) {

            switch (corpus.selection.tool) {
                case CanvasToolEnum.Remove:
                    return <QuotationCanvasAlert
                        label={KonvaAlertMessage.RemoveTool.label}
                        remark={KonvaAlertMessage.RemoveTool.remark}
                    />
                case CanvasToolEnum.ScaleMeasurement:
                    return <QuotationCanvasAlert
                        label={KonvaAlertMessage.ScaleMeasurementTool.label}
                        remark={KonvaAlertMessage.ScaleMeasurementTool.remark}
                    />
                case CanvasToolEnum.Undo:
                    return <QuotationCanvasAlert
                        label={KonvaAlertMessage.UndoTool.label}
                        remark={KonvaAlertMessage.UndoTool.remark}
                    />
                default:
                    return <QuotationCanvasAlert
                        label={KonvaAlertMessage.Tool.label}
                        remark={KonvaAlertMessage.Tool.remark}
                    />
            }
        }
        return <QuotationCanvasAlert
            label={KonvaAlertMessage.Measurement.label}
            remark={KonvaAlertMessage.Measurement.remark}
        />
    }, [corpus.selection.tool, isDrawingStarted])
    useEffect(() => {
        if (image) {
            const aspectRatio = image.width / image.height;
            let width: number, height: number;

            // Calculate width and height to fit the image within the box
            if (aspectRatio > boxWidth / boxHeight) {
                width = boxWidth;
                height = boxWidth / aspectRatio;
            } else {
                width = boxHeight * aspectRatio;
                height = boxHeight;
            }

            // Center the image in the box
            const x = (boxWidth - width) / 2;
            const y = (boxHeight - height) / 2;

            setImageProps({ width, height, x, y });
        }
    }, [image]);

    return (<form className="">
        {/* <div
            className={`h-[25vh] text-white font-extrabold flex justify-center align-middle text-[100px] `}
            style={{
                background: `url(${ConverImage})`,
                backgroundSize: 'cover',
            }}
        >
            <div className=" opacity-70 align-middle flex justify-center flex-col">
                SUNROOOF
            </div>
        </div>s

        <div className="container mx-auto">
            <div className="flex mt-10">
                <div className="flex justify-center align-center gap-2">
                    <div className="flex flex-col align-middle flex-[50%]">
                        <div className="mb-4">
                            {renderGuideAlert}

                        </div>
                        {isDrawingStarted
                            ? <QuotationCanvasEditAction
                                onToolToggle={(tool) => {
                                    setCorpus((prev) => ({
                                        ...prev,
                                        selection: {
                                            ...prev.selection,
                                            tool: prev.selection.tool === tool ? CanvasToolEnum.None : tool
                                        }
                                    }))
                                }}
                                tool={corpus.selection.tool}
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
                    <div className="flex flex-auto"
                        ref={stageContainerRef}
                    // style={{ width: "100%", overflow: "hidden" }}
                    >
                        {Presentation?.value?.file?.size ? (
                            <Stage
                                // width={imageProps.x}
                                // height={imageProps.y}
                                // width={imageProps.width}
                                // height={imageProps.height}
                                width={stageWidth}
                                // style={{ background: "1px solid red" }}
                                height={CANVAS_STAGE_HEIGHT}
                                ref={stageRef}
                                onClick={handleCanvasClick}
                                onMouseMove={handleMouseMove}
                                onMouseDown={(e) => {
                                    if (isDrawing) return;
                                    // If the clicked target is the stage, clear selection
                                    if (e.target === stageRef.current) {
                                        transformerRef.current.detach();
                                        setSelectedObjectId(null);
                                    }
                                }}
                            >
                                <Layer>
                                    {Presentation?.value?.file?.size ? (<KonvaImage
                                        image={image}
                                        listening
                                        x={imageProps.x}
                                        y={imageProps.y}
                                        width={imageProps.width}
                                        height={imageProps.height}
                                        // crop={{ x: 100, y: 100, width: 100, height: 100 }}
                                        // scaleX={100}
                                        // scaleY={100}

                                        // width={1200}
                                        // height={1200}
                                        // draggable
                                        onClick={(e) => {
                                            if (selectedObjectId) {
                                                e.cancelBubble = true; // Prevent event from reaching the stage
                                                setSelectedObjectId(null); // Clear selection
                                                transformerRef.current.detach();
                                                transformerRef.current.getLayer().batchDraw();
                                            }

                                        }} />) : ''}
                                    {isDrawingStarted ? (
                                        <>
                                            <Rect
                                                {...rectProps}
                                                ref={rectRef}
                                                draggable={true}
                                                listening={true}
                                                hitStrokeWidth={10} // Adjust as needed
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
                                                onMouseDown={(e: TKonvaMouseEvent) => {
                                                    console.log(e)
                                                    if (isDrawing) return;
                                                    setSelectedObjectId('parent');
                                                }}
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
                                                    fill="red"
                                                    filters={[Konva.Filters.RGBA]}
                                                    // red={92}
                                                    // green={64}
                                                    // blue={51}
                                                    //alpha={100 / 255} // Convert alpha to a value between 0 and 1
                                                    draggable
                                                    onClick={(e) => handleImageSelect(e,
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
                                                    onMouseDown={(e: TKonvaMouseEvent) => {
                                                        console.log(e)
                                                        if (isDrawing) return;
                                                        setSelectedObjectId(img.id);
                                                    }}
                                                    ref={(node) => {
                                                        imageRefs.current[img.id] = node;
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
                                            // nodes={
                                            //     selectedObjectId === 'parent'
                                            //         ? [rectRef.current]
                                            //         : images
                                            //             .filter((img) => img.id === selectedObjectId)
                                            //             .map((img) => imageRefs.current[img.id])
                                            // }
                                            // rotateEnabled={true}
                                            // boundBoxFunc={(oldBox, newBox) => {
                                            //     if (newBox.width < 5 || newBox.height < 5) {
                                            //         return oldBox;
                                            //     }
                                            //     return newBox;
                                            // }}
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

type TKonvaMouseEvent = Konva.KonvaEventObject<MouseEvent>
function Base64ToFile(base64: string, filename: string): File {
    const arr = typeof base64 === 'string' ? base64.split(',') : [];
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export default QuotationCanvas
const boxHeight = 800
const boxWidth = 1000
