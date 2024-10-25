import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select"
import { BsDash, BsPlus } from "react-icons/bs";
import Konva from 'konva';
import {
    Stage,
    Layer,
    Line,
    Image as KonvaImage,
    Rect,
    Transformer,
    Circle
} from 'react-konva';
import { TbFileOrientation } from "react-icons/tb";
import { IoIosMove } from "react-icons/io";
import { MdDraw } from "react-icons/md";
import { MdOutlineRotate90DegreesCcw } from "react-icons/md";
import { BsEraser } from "react-icons/bs";
import { RxMaskOn } from "react-icons/rx";
import { CiRuler } from "react-icons/ci";
import { SiExcalidraw } from "react-icons/si"
import { PiDownloadSimpleFill } from "react-icons/pi";
import useImage from "use-image";
//====================================================================
import bgImg from '../../.././../assets/hero-bg.jpeg'
import { CUSTOMER_COMPONENT_COMPARISON_OPTIONS } from "../../../cms/mocks";
import { useAppSelector } from "../../../../redux";

function QuotationCanvas() {

    const { Presentation } = useAppSelector((state) => state.Cms);
    const [corpus, setCorpus] = useState({ selection: { sunrooofWindow: '', image: null } })
    const [isDrawingStarted, setIsDrawingStarted] = useState(false)
    const [isDrawing, setIsDrawing] = useState(false);
    const [linePoints, setLinePoints] = useState<number[]>([]);
    const [stageWidth, setStageWidth] = useState<number>(800);
    const [stageHeight, setStageHeight] = useState<number>(600);
    const [measurement, setMeasurement] = useState(INIT_MEASUREMENT)
    const [rectProps, setRectProps] = useState(INIT_RECT_PROPS);
    const stageRef = useRef<Konva.Stage>(null);
    const rectRef = useRef<Konva.Rect>(null);
    const transformerRef = useRef<Konva.Transformer>(null);
    const [image, setImage] = useImage(corpus.selection.image)
    const [patternImage, setPatternImage] = useState(null);

    useEffect(() => {
        const img = new window.Image();

        const currentItem = CUSTOMER_COMPONENT_COMPARISON_OPTIONS?.find((item) => item.value === corpus.selection.sunrooofWindow)
        if (currentItem?.image?.low?.length) {
            img.src = currentItem?.image?.low
        }
        img.onload = () => {
            setPatternImage(img);
        };
    }, [corpus.selection.sunrooofWindow]);

    const calculatePixelLength = useCallback((line: number[]) => {
        if (!line || linePoints.length < 4) return;
        const x1 = linePoints[0];
        const y1 = linePoints[1];
        const x2 = linePoints[2];
        const y2 = linePoints[3];
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // Pythagorean theorem to calculate pixel distance
        setMeasurement((prev) => ({ ...prev, pixelLength: length }))// Update pixel length
    }, [linePoints])

    const calculatePixelsPerUnit = useCallback(() => {
        if (!measurement.pixelLength || (measurement.quantity) === 0) return; // Ensure units are valid

        const pixelsPerUnit = measurement.pixelLength / (measurement.quantity);
        // setUnitValue(pixelsPerUnit);
        setMeasurement((prev) => ({ ...prev, value: pixelsPerUnit }))
    }, [measurement.quantity, measurement.pixelLength])


    useEffect(() => {
        if (Presentation?.value?.file?.size) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setCorpus((prev) => ({
                        ...prev,
                        selection: {
                            ...prev.selection,
                            image: reader.result
                        }
                    }))
                }
            };
            reader.readAsDataURL(Presentation?.value?.file);
        }
    }, [Presentation?.value?.file, setImage])

    const handleDownload = useCallback(() => {
        if (stageRef.current && transformerRef.current) {
            transformerRef.current.nodes([]);
            transformerRef.current.getLayer()?.batchDraw();
            const uri = stageRef.current.toDataURL();
            transformerRef.current.nodes([rectRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
            const link = document.createElement('a');
            link.download = `canvas-image-${+new Date()}.png`;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [])



    // useEffect(() => { calculateLineLength() }, [calculateLineLength])

    useEffect(() => {
        if (image) {
            const aspectRatio = image.width / image.height;
            setStageWidth(800);
            setStageHeight(800 / aspectRatio);
        }
    }, [image]);

    const handleCanvasClick = useCallback((event: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = event.target.getStage();
        const { x, y } = stage.getPointerPosition()!;

        if (!isDrawing) {
            setLinePoints([x, y, x, y]);
            setIsDrawing(true);
        } else {
            setIsDrawing(false);
        }
    }, [isDrawing])


    const handleMouseMove = useCallback((event: Konva.KonvaEventObject<MouseEvent>) => {
        if (!isDrawing) return;

        const stage = event.target.getStage();
        const { x, y } = stage.getPointerPosition()!;
        setLinePoints([linePoints[0], linePoints[1], x, y]);
        calculatePixelLength([linePoints[0], linePoints[1], linePoints[2], linePoints[3]])
        calculatePixelsPerUnit()
    }, [calculatePixelLength, calculatePixelsPerUnit, isDrawing, linePoints])


    const navigate = useNavigate()

    useEffect(() => {
        if (!Presentation?.value?.file?.size) {
            navigate(`/quotation-generator`)
        }
    }, [Presentation?.value?.file?.size, navigate])

    const renderQuantityContent = useMemo(() => {
        return (<div className="flex flex-col">
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Choose quantity:
            </label>
            <div className="relative flex items-center max-w-[8rem]">
                <button
                    type="button"
                    onClick={() => {
                        setMeasurement((prev) => ({ ...prev, quantity: prev.quantity - 1 }))
                    }}
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                    <BsDash />
                </button>


                <input className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={measurement.quantity}
                    onChange={(e) => {
                        setMeasurement((prev) => ({ ...prev, quantity: Number(e.target.value) }))
                    }}
                />
                <button
                    type="button"
                    onClick={() => {
                        setMeasurement((prev) => ({ ...prev, quantity: prev.quantity + 1 }))
                    }}

                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                    <BsPlus />
                </button>
            </div>
        </div>)
    }, [measurement.quantity])

    const renderDrawingEditor = useMemo(() => {
        return (<div>
            <div className="flex  flex-col mb-3">
                <Select options={CUSTOMER_COMPONENT_COMPARISON_OPTIONS}

                    onChange={(e) => {
                        setCorpus((prev) => ({
                            ...prev,
                            selection: {
                                ...prev.selection,
                                sunrooofWindow: e.value
                            }
                        }))
                    }}
                />
            </div>
            <div className="mt-20">
                <div className="grid grid-flow-row grid-cols-2 gap-2">
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <MdDraw className="my-auto text-xl" />
                        Draw SUNROOOF
                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <TbFileOrientation className="my-auto text-xl" />
                        Orientation II

                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <IoIosMove className="my-auto text-xl" />
                        Move SUNROOOF

                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <MdOutlineRotate90DegreesCcw className="my-auto text-xl" />
                        Rotate SUNROOOF

                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <BsEraser className="my-auto text-xl" />
                        Remove SUNROOOF

                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <RxMaskOn className="my-auto text-xl" />
                        Remove  MASK

                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <CiRuler className="my-auto text-xl" />
                        Scale for Measurement
                    </button>

                </div>

            </div>
            <div className="mt-20">
                <button
                    type="button"
                    onClick={handleDownload}
                    className="text-white bg-gradient-to-r bg-[#b5b496ff]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#b5b496ff] dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                >
                    <PiDownloadSimpleFill className="my-auto text-xl" />
                    Download Final Image
                </button>
            </div>
        </div>)
    }, [handleDownload])



    const renderBeginning = useMemo(() => {
        return (<div>
            <div className="flex flex-col">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Enter the length of the line and click to draw:
                </label>
                <Select
                    className="w-100"
                    onChange={(e) => {
                        setMeasurement((prev) => ({ ...prev, unit: e.value }))
                    }}
                    options={QUOTATION_UNIT_OPTIONS}
                />
            </div>
            <div className="flex gap-1 align-middle flex-row justify-between">
                {renderQuantityContent}
                <div className="">
                    <div className="mt-7" />
                    <button
                        onClick={() => { setIsDrawingStarted(true) }}
                        type="button"
                        className="text-white bg-gradient-to-r bg-[#6b8a7a]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 flex gap-2 align-middle justify-center"
                    >
                        <SiExcalidraw className="my-auto text-xl" />
                        Start Drawing
                    </button>
                </div>

            </div>
            <div className="">
                <p>Total pixels of the drawn line: {measurement.pixelLength.toLocaleString()} pixels</p>
                <p>1 unit equals {measurement.unit === 'mm' ? measurement.value.toLocaleString() : (+measurement.value.toFixed(2) / 25.4)} pixels</p>
                {/* {measurement.unit?.length ? `${measurement.value?.toLocaleString()} ${measurement.unit}` : ''} */}
            </div>
        </div>

        )
    }, [measurement.unit, measurement.value, measurement.pixelLength, renderQuantityContent])

    // Make the transformer active when the rectangle is selected
    const handleRectSelect = useCallback(() => {
        if (transformerRef.current && rectRef.current) {
            transformerRef.current.nodes([rectRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [])
    // Handle changes in rectangle dimensions
    const handleRectTransform = useCallback(() => {
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
    const renderUnitMeasurementComponent = useMemo(() => {
        return linePoints.length > 0 && (
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
    }, [linePoints])

    return (<form className="">
        <div className={`h-[25vh] text-white font-extrabold flex justify-center align-middle text-[100px] `}
            style={{
                background: `url(${bgImg})`,
                backgroundSize: 'cover'
            }}
        >
            <div className=" opacity-70 align-middle flex justify-center flex-col">
                SUNROOOF
            </div>
        </div>

        <div className="container mx-auto">
            <div className="mt-10">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col align-middle justify-center">
                        {isDrawingStarted ? renderDrawingEditor : renderBeginning}
                    </div>
                    <div className="">
                        {Presentation?.value?.file?.size ? (<Stage
                            width={stageWidth}
                            height={stageHeight}
                            ref={stageRef}
                            onClick={handleCanvasClick}
                            onMouseMove={handleMouseMove}
                        >
                            <Layer>
                                {Presentation?.value?.file?.size ? (<KonvaImage
                                    image={image} />) : ''}
                                {isDrawingStarted ? <>
                                    <Rect
                                        {...rectProps}
                                        ref={rectRef}
                                        onClick={handleRectSelect}
                                        fillPatternScale={{ x: 1, y: 1 }}
                                        onTransformEnd={handleRectTransform}
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
                                </> : renderUnitMeasurementComponent}
                            </Layer>
                        </Stage>) : ''}

                    </div>
                </div>
            </div>
        </div>
    </form>);
}
const QUOTATION_UNIT_OPTIONS = [
    { value: 'mm', label: 'mm' },
    { value: 'inch', label: 'Feet & Inches' },
]
const INIT_RECT_PROPS = {
    x: 500,
    y: 500,
    width: 300,
    height: 100,
    stroke: 'red',
    strokeWidth: 2,
    draggable: true,
}
const INIT_MEASUREMENT = {
    unit: '',
    value: 0,
    quantity: 0,
    pixelLength: 0
}
export default QuotationCanvas;
