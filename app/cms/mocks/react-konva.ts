import { CanvasToolEnum } from "../../../types"


export const QUOTATION_CANVAS_BUTTON_OPTIIONS = [
    { label: 'Remove SUNROOOF', accessor: CanvasToolEnum.Remove },
    { label: 'Undo', accessor: CanvasToolEnum.Undo },
    { label: 'Scale for Measurement', accessor: CanvasToolEnum.ScaleMeasurement },
]

export const KonvaAlertMessage = {
    Measurement: {
        label: 'Step 1',
        remark: 'Please select mm or inches then enter the numeric value. You can move cursor on canvas to measure the value in pixels. Then proceed to next step.'
    },
    Tool: {
        label: 'Step 2',
        remark: 'Please select a sunrooof window from dropdown. Then you can move the rectangular selection using mouse. Also you can use multiple tools from toolbox.'
    },
    RemoveTool: {
        label: 'Remove Sunrooof Tool',
        remark: 'This tool helps you to remove a sunrooof from rectangular selection from the canvas.'
    },
    UndoTool: {
        label: 'Undo Tool',
        remark: 'This tool helps you to get previous state of canvas.'
    },
    ScaleMeasurementTool: {
        label: 'Scale for Measurement',
        remark: 'This tool helps you to measure the block of canvas horizontally or vertically.'
    }
}
