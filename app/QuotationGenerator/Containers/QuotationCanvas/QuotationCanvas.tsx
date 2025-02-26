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
import {
    CUSTOMER_COMPONENT_COMPARISON_OPTIONS,
    INIT_CUSTOMER_ITEM,
    KonvaAlertMessage
} from '../../../cms/mocks'
import { useAppSelector } from '../../../../redux'
import {
    _,
    // CANVAS_STAGE_HEIGHT,
    CanvasToolEnum,
    CustomerComponentEnum,
    INIT_CANVAS_KONVA_CORPUS,
    INIT_CANVAS_MEASUREMENT,
    INIT_CANVAS_RECT_PROPS,
    TComponentComparisonDataOption,
    TCustomerComponentDesign2DItem,
    TKonvaImageItem
} from '../../../../types'
import {
    QuotationCanvasAlert,
    QuotationCanvasEditAction,
    QuotationCanvasUnitMeasurementAction
} from '.'
import { useFirebaseStorageActions } from '../../../../hooks'
import { useProposedLayoutAction } from '../../../cms/hooks'
import { useFirebaseCustomerAction } from '../../../cms/utils/firebase/customer'


function QuotationCanvas(props: TProps) {
    const { Presentation } = useAppSelector(({ Cms }) => Cms)
    const [corpus, setCorpus] = useState(INIT_CANVAS_KONVA_CORPUS)
    const [isDrawingStarted, setIsDrawingStarted] = useState(false)
    const [isDrawing, setIsDrawing] = useState(false)
    const [linePoints, setLinePoints] = useState<number[]>([])
    const stageContainerRef = useRef<HTMLDivElement>(null);
    const [measurement, setMeasurement] = useState(INIT_CANVAS_MEASUREMENT)
    const [rectProps, setRectProps] = useState(INIT_CANVAS_RECT_PROPS)
    const stageRef = useRef<Konva.Stage>(null)
    const rectRef = useRef<Konva.Rect>(null)
    const transformerRef = useRef<Konva.Transformer>(null)
    const [image, setImage] = useImage(corpus.selection.image)
    const [patternImageData, setPatternImageData] =
        useState<TComponentComparisonDataOption>(null);
    const [images, setImages] = useState<TKonvaImageItem[]>([])
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
    const navigate = useNavigate()
    const [history, setHistory] = useState([]);
    const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
    const imageRefs = useRef<{ [key: string]: Konva.Image }>({});
    const ProposedLayoutDataAction = useProposedLayoutAction()
    const [imageProps, setImageProps] = useState(INIT_IMAGE_PROPS);
    // const [plotImage, setPlotImage] = useState<TImageProps | null>(null)
    // useEffect(() => {
    //     if (corpus.selection.image?.size) {

    //         const reader = new FileReader();


    //         reader.onload = () => {
    //             const img = new Image();
    //             img.src = corpus.selection.image?.src;

    //             img.onload = () => {
    //                 const imageWidth = img.width;
    //                 const imageHeight = img.height;
    //                 const canvasWidth = 500; // Adjust to your canvas width
    //                 const canvasHeight = 400; // Adjust to your canvas height

    //                 // Calculate scale factor to fit the image within the canvas
    //                 const scaleX = Math.min(canvasWidth / imageWidth, 1);
    //                 const scaleY = Math.min(canvasHeight / imageHeight, 1);

    //                 // Calculate x and y positions to center the image
    //                 const x = (canvasWidth - imageWidth * scaleX) / 2;
    //                 const y = (canvasHeight - imageHeight * scaleY) / 2;

    //                 setPlotImage({
    //                     image: img,
    //                     width: imageWidth * scaleX,
    //                     height: imageHeight * scaleY,
    //                     x,
    //                     y,
    //                 });
    //             }
    //         }
    //     }
    // }, [corpus.selection.image?.size, corpus.selection.image?.src])

    useEffect(() => {
        const img = new window.Image()
        const currentItem = CUSTOMER_COMPONENT_COMPARISON_OPTIONS?.find(
            (item) => item.value === corpus.selection.sunrooofWindow
        )
        if (currentItem?.image?.low?.length) {
            img.src = currentItem?.image?.low
        }
        img.onload = () => {
            setPatternImageData({ ...currentItem, imgComponent: img })
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

    // Function to update images inside the rectangle
    const updateImagesInRect = useCallback(() => {
        if (!rectProps || !patternImageData?.imgComponent) return

        const { x: rectX, y: rectY, width: rectWidth, height: rectHeight } = rectProps;

        const imageWidth = measurement.value * patternImageData?.width; // Desired image width

        // const imageWidth = 50; // Desired image width
        const imageHeight = measurement.value * patternImageData?.height // Desired image height
        const spacing = measurement.value * patternImageData?.gap // Space between images

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
                    image: patternImageData?.imgComponent,
                });
            }
        }

        // Before updating images
        setHistory((prevHistory) => [...prevHistory, { images, rectProps }]);

        setImages(newImages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rectProps, patternImageData]);


    // Update images when rectangle or pattern image changes
    useEffect(() => {
        updateImagesInRect()
    }, [rectProps, patternImageData, updateImagesInRect])

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
                rotation: node.rotation(), // Update rotation
            }))

            node.scaleX(1);
            node.scaleY(1);

            updateImagesInRect(); // Update child images
        }
    }, [updateImagesInRect]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === "z") {
            setHistory((prev) => (prev.slice(0, -1)))
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    // Handle image selection
    const handleImageSelect = useCallback((e: TKonvaMouseEvent, id: string) => {
        e.cancelBubble = true; // Prevent event from reaching the parent or stage
        // const selectedNode = imageRefs.current[id];
        setSelectedObjectId(id);
        setSelectedImageId(id)
    }, [])
    // Handle image drag end
    const handleImageDragEnd = useCallback((e: TKonvaMouseEvent, id: string) => {
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
        setHistory((prev) => [...prev, { images, rectProps }]);

        setImages((prev) =>
            prev.map((img) =>
                img.id === id ? { ...img, width, height, rotation } : img
            )
        )
    }, [images, rectProps])

    const handleUndo = useCallback(() => {
        if (history.length) {
            const lastState = history[history.length - 1];
            // Before updating images
            setHistory((prev) => [...prev, { images, rectProps }]);
            setImages(lastState.images);
            setRectProps(lastState.rectProps);
            // Remove the last state from history
            setHistory((prev) => prev.slice(0, -1));
        }
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
    const action = useFirebaseCustomerAction();
    // console.log(Presentation.value)

    const customers = useAppSelector((state) => state.Cms.Customer.value);
    const handleDownload = useCallback(({ isRedirectBack }: { isRedirectBack: boolean }) => {
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
                _.base64ToFile(uri, Presentation.value.file.name)
                ],
                path: 'proposed-layout',
                onSuccess: (e) => {
                    const args = {
                        label: Presentation?.value?.title,
                        name: Presentation?.value?.name,
                        design: Presentation?.value?.design,
                        sunrooofCount: images?.length,
                        finish: Presentation?.value?.finish,
                        customerId: Presentation?.value?.customerId || _.uuid(),
                        url: { customer: e[0], proposed: e[1], },
                    }
                    ProposedLayoutDataAction.add(args)

                    const currentCustomer = customers?.find((customer) => customer.customerId === Presentation?.value?.customerId)
                    if (currentCustomer) {
                        const results = {
                            ...currentCustomer,
                            components: currentCustomer.components?.map((item) => {
                                if (item.value === CustomerComponentEnum.TwoDDesign) {
                                    return ({
                                        ...item,
                                        data: [
                                            ...item.data,
                                            {
                                                finish: args.finish,
                                                design: args.design,
                                                quantity: args.sunrooofCount,
                                                leftImage: args.url.customer,
                                                rightImage: args.url.proposed
                                            }
                                        ],
                                    }) as TCustomerComponentDesign2DItem;

                                }
                                return item;
                            }),
                            at: {
                                created: currentCustomer.at.created,
                                updated: new Date()
                            }
                        }
                        console.log(results)

                        action.edit(results)
                    }
                    else {

                        const results = {
                            name: args.name,
                            customerId: args.customerId,
                            components: INIT_CUSTOMER_ITEM.components?.map((item) => {

                                if (item.value === CustomerComponentEnum.TwoDDesign) {
                                    return ({
                                        ...item,
                                        data: [
                                            ...item.data,
                                            {
                                                finish: args.finish,
                                                design: args.design,
                                                quantity: args.sunrooofCount,
                                                leftImage: args.url.customer,
                                                rightImage: args.url.proposed
                                            }
                                        ]
                                    }) as TCustomerComponentDesign2DItem;
                                }
                                return item;
                            }),
                            at: {
                                created: new Date(),
                            }
                        }
                        console.log(results)
                        action.add(results)
                    }

                    toast('Proposed image has been saved!')
                    link.click()
                    document.body.removeChild(link)
                    _.download({ url: uri, name: `proposed-layout-${uniq}` })
                    if (isRedirectBack) {
                        props.onToggleEditorPage(false)
                    }
                    navigate(isRedirectBack ? '/cms/proposed/layout' : '/cms')
                }
            })
        }
    }, [
        image,
        StorageAction.batch,
        Presentation.value.file,
        Presentation.value?.title,
        Presentation.value?.name,
        Presentation.value?.design,
        Presentation.value?.finish,
        Presentation.value?.customerId,
        images?.length,
        ProposedLayoutDataAction,
        customers,
        navigate,
        action,
        props
    ])

    const handleCanvasClick = useCallback((event: TKonvaMouseEvent) => {
        const stage = event.target.getStage()
        const { x, y } = stage.getPointerPosition()!

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
        if (measurement.isStartDrawing)
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
        return <></>
    }, [linePoints, measurement.isStartDrawing])


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
            const imageWidth = image.width
            const imageHeight = image.height

            // Center the image (although it's not necessary, since the stage matches the image size)
            setImageProps({
                width: imageWidth, // Use original image width
                height: imageHeight, // Use original image height
                x: 0, // Start at top-left corner
                y: 0, // Start at top-left corner
            })
        }
    }, [image])

    return (
        <form className="">
            <div className="grid grid-cols-12 gap-10 mt-10 justify-start">
                <div className="col-span-4">
                    <div className="mb-4">{renderGuideAlert}</div>
                    {isDrawingStarted ? (
                        <QuotationCanvasEditAction
                            onToolToggle={(tool) => {
                                setCorpus((prev) => ({
                                    ...prev,
                                    selection: {
                                        ...prev.selection,
                                        tool:
                                            prev.selection.tool === tool
                                                ? CanvasToolEnum.None
                                                : tool,
                                    },
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
                    ) : (
                        <QuotationCanvasUnitMeasurementAction
                            measurement={measurement}
                            setMeasurement={setMeasurement}
                            onProceed={() => {
                                if (!measurement.isStartDrawing) return
                                setIsDrawingStarted(true)
                            }}
                        />
                    )}
                </div>
                <div
                    className="col-span-8 border border-gray-300 bg-white"
                    ref={stageContainerRef}
                >
                    {Presentation?.value?.file?.size ? (
                        <Stage
                            width={imageProps.width} // Set the stage width to match the image width
                            height={imageProps.height} // Set the stage height to match the image height
                            // style={{ background: "1px solid red" }}
                            // height={CANVAS_STAGE_HEIGHT}
                            ref={stageRef}
                            onClick={handleCanvasClick}
                            onMouseMove={handleMouseMove}
                            onMouseDown={(e) => {
                                if (isDrawing) return
                                // If the clicked target is the stage, clear selection
                                if (e.target === stageRef.current) {
                                    transformerRef.current.detach()
                                    setSelectedObjectId(null)
                                }
                            }}
                        >
                            <Layer>
                                {Presentation?.value?.file?.size ? (
                                    <KonvaImage
                                        image={image}
                                        listening
                                        x={imageProps.x}
                                        y={imageProps.y}
                                        width={imageProps.width}
                                        height={imageProps.height}
                                        // crop={{ x: 100, y: 100, width: 100, height: 100 }}
                                        // draggable
                                        onClick={(e) => {
                                            if (selectedObjectId) {
                                                e.cancelBubble = true // Prevent event from reaching the stage
                                                setSelectedObjectId(null) // Clear selection
                                                transformerRef.current.detach()
                                                transformerRef.current
                                                    .getLayer()
                                                    .batchDraw()
                                            }
                                        }}
                                    />
                                ) : (
                                    ''
                                )}
                                {isDrawingStarted ? (
                                    <>
                                        {/* Outer Frame */}
                                        <Rect
                                            x={
                                                rectProps.x -
                                                measurement.value *
                                                patternImageData?.outerFrameGap
                                            }
                                            y={
                                                rectProps.y -
                                                measurement.value *
                                                patternImageData?.outerFrameGap
                                            }
                                            width={
                                                rectProps.width +
                                                2 *
                                                measurement.value *
                                                patternImageData?.outerFrameGap
                                            }
                                            height={
                                                rectProps.height +
                                                2 *
                                                measurement.value *
                                                patternImageData?.outerFrameGap
                                            }
                                            fill="#2222"
                                            listening={false} // Not interactive
                                        />

                                        {/* Dashed Line for Inner Frame Gap */}
                                        <Rect
                                            x={
                                                rectProps.x +
                                                measurement.value *
                                                patternImageData?.innerFrameGap
                                            }
                                            y={
                                                rectProps.y +
                                                measurement.value *
                                                patternImageData?.innerFrameGap
                                            }
                                            width={
                                                rectProps.width -
                                                2 *
                                                measurement.value *
                                                patternImageData?.innerFrameGap
                                            }
                                            height={
                                                rectProps.height -
                                                2 *
                                                measurement.value *
                                                patternImageData?.innerFrameGap
                                            }
                                            stroke="#000"
                                            strokeWidth={2}
                                            dash={[10, 5]} // Dashed line
                                            listening={false} // Not interactive
                                        />

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
                                                }))
                                                updateImagesInRect()
                                            }}
                                            onTransformEnd={handleRectTransform}
                                            onClick={handleRectSelect}
                                            onMouseDown={(
                                                e: TKonvaMouseEvent
                                            ) => {
                                                console.log(e)
                                                if (isDrawing) return
                                                setSelectedObjectId('parent')
                                            }}
                                        />

                                        {/* Images */}
                                        {images.map((img) => (
                                            <>
                                                {/* Child Image */}
                                                <KonvaImage
                                                    key={img.id}
                                                    image={
                                                        img.image as CanvasImageSource
                                                    }
                                                    x={img.x}
                                                    y={img.y}
                                                    width={img.width}
                                                    height={img.height}
                                                    rotation={img.rotation}
                                                    draggable
                                                    onClick={(e) =>
                                                        handleImageSelect(
                                                            e,
                                                            img.id
                                                        )
                                                    }
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
                                                        imageRefs.current[
                                                            img.id
                                                        ] = node
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

                                                {/* Purple Mask */}
                                                <Rect
                                                    x={img.x}
                                                    y={img.y}
                                                    width={img.width}
                                                    height={img.height}
                                                    fill="purple"
                                                    opacity={0.3} // Semi-transparent mask
                                                    listening={false} // Not interactive
                                                />
                                            </>
                                        ))}

                                        <Transformer ref={transformerRef} />
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
            </div>
        </form>
    )
}

type TKonvaMouseEvent = Konva.KonvaEventObject<MouseEvent>


const INIT_IMAGE_PROPS = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
}

type TProps = { onToggleEditorPage: (e: boolean) => void }

export default QuotationCanvas

