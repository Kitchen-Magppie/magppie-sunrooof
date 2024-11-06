
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
    stroke: 'red',
    strokeWidth: 2,
    draggable: true,
}

export type TCanvasMeasurement = { unit: string, value: number, quantity: number, pixelLength: number }
export const INIT_CANVAS_MEASUREMENT: TCanvasMeasurement = {
    unit: '',
    value: 0,
    quantity: 0,
    pixelLength: 0,
}
