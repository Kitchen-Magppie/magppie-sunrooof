
export enum CanvasToolEnum {
    Remove = 'remove',
    Undo = 'undo',
    ScaleMeasurement = 'scale-measurement',
    None = ''
}

export const INIT_CANVAS_KONVA_CORPUS = {
    selection: {
        sunrooofWindow: '',
        image: null,
        tool: CanvasToolEnum.None
    },
}
export type TKonvaImageItem = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    image: object;
}

export const CANVAS_STAGE_HEIGHT = 1200


export const CANVAS_QUOTATION_UNIT_OPTIONS = [
    { value: 'mm', label: 'mm' },
    { value: 'inch', label: 'Feet & Inches' },
]
export const INIT_CANVAS_RECT_PROPS = {
    x: 500,
    y: 500,
    width: 300,
    height: 100,
    stroke: '#22222',
    strokeWidth: 2,
    draggable: true,
    rotation:0
}

export type TCanvasMeasurement = {
    unit: string,
    value: number,
    quantity: number,
    pixelLength: number,
    feet: number, inches: number,
    isStartDrawing: boolean
}
export const INIT_CANVAS_MEASUREMENT: TCanvasMeasurement = {
    unit: '',
    value: 0,
    quantity: 0,
    pixelLength: 0,
    feet: 0,
    inches: 0,
    isStartDrawing: false
}

