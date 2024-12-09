let bgImage
// let smallRectImage
let imgWidth, imgHeight
let design = -1
let theOrientation = 0
let images, images_low
let mousePosX, mousePosY
// let debug = 0

let displayRuler = 0
let rulerOrigin = -1

let selectedMask = -1
let movingMask = true // Default rectangular shape movable
let removalPointsToMove = []
let originalPos

var sending = 0

// let fakeMaskGrid = []

let removeMaskEnabled = false
let corpus = {
    isMaskBorderVisible: true,
    isDragging: false,
}
// let grids = [];
let lengths = []

let designs = {
    '': -1,
    Classical: 0,
    Fluted: 1,
    'French Window': 2,
    'Louvered Window': 3,
    Modern: 4,
    Minimalist: 5,
    // Add Design Here
}

const invMap = {
    0: 'Classical',
    1: 'Fluted',
    2: 'French Window',
    3: 'Louvered Window',
    4: 'Modern',
    5: 'Minimalist',
    // Add Design Here
}
let unitsCount = {
    Classical: 0,
    Fluted: 0,
    'French Window': 0,
    'Louvered Window': 0,
    Modern: 0,
    Minimalist: 0,
    // Add Design Here
}

let width_height = [
    { height: 1200, width: 800, padding: 150 },
    { height: 1200, width: 400, padding: 40 },
    { height: 1200, width: 400, padding: 0 },
    { height: 2450, width: 450, padding: 0 },
    { height: 1200, width: 400, padding: 40 },
    { height: 1200, width: 400, padding: 40 },
    // Add Design Here
]

function selectUnitType() {
    const unitSelect = document.getElementById('unitSelect')
    const unitInput = document.getElementById('unitInput')
    const feetInchInp = document.getElementById('feetinch-inp')

    const selectedUnit = unitSelect.value

    if (selectedUnit === 'mm') {
        unitInput.style.display = 'block'
        feetInchInp.style.display = 'none' // Hide feet/inch inputs
        unitInput.value = '' // Clear any previous feet/inch values
    } else if (selectedUnit === 'feet') {
        unitInput.style.display = 'none'
        feetInchInp.style.display = 'block' // Show feet/inch inputs
        unitInput.value = '' // Clear any previous mm value
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', ({ key }) => {
        const pressedKey = key?.toLowerCase()
        switch (pressedKey) {
            case 'backspace':
                removeMask()
                break
            case 'r':
                rotateMask()
                break
            case 'm':
                startDrawingMask()
                break
            default:
                break
        }
    })
})

let unitValue = null
let points = []
let drawingEnabled = false

let removalEnabled = false
let removalPoints = []

let maskDrawingEnabled = false
let rectStartX, rectStartY, rectEndX, rectEndY

let masks = []

let rotateEnabled = false

function toggleAllOff() {
    maskDrawingEnabled = false
    removalEnabled = false
    removeMaskEnabled = false
    // movingMask = false
    // rotateEnabled = false
    displayRuler = false
}

function moveMask() {
    if (masks.length == 0) alert('You need to draw a mask to move it.')
    else {
        var state = movingMask
        toggleAllOff()
        movingMask = !state
    }
}

function rotateMask() {
    var state = rotateEnabled
    toggleAllOff()
    rotateEnabled = !state
}

function toggleRuler() {
    const titleElement = document.getElementById('title')
    const descElement = document.getElementById('desc')

    titleElement.textContent = 'Scale for Measurement' // Update content
    descElement.textContent = 'This tool helps you to measure the block of canvas horizontally or vertically.' // Clear any message
    var state = displayRuler
    toggleAllOff()
    displayRuler = !state
}

function updateDesign() {
    const designSelect = document.getElementById('design')
    const selectedDesign = designSelect.value
    design = designs[selectedDesign]
}

function changeOrientation() {
    theOrientation = !theOrientation
    document.getElementById('orientation_btn').innerHTML = theOrientation
        ? 'Orientation: =='
        : 'Orientation: ||'
}

// Finalize the unit value and show other tools
function finaliseUnit() {
    document.getElementById('unit-div').style.display = 'none'
    document.getElementById('other-tools').style.display = 'block'
    points = []
}

// Toggle removal mode and update button color
function removePoints() {
    const titleElement = document.getElementById('title')
    const descElement = document.getElementById('desc')

    titleElement.textContent = 'Remove Sunrooof Tool' // Update content
    descElement.textContent = 'This tool helps you to remove a sunrooof from rectangular selection from the canvas.' // Clear any message
    var state = removalEnabled
    toggleAllOff()
    removalEnabled = !state
}

// Preload the background image from local storage
function preload() {
    const imageData = localStorage.getItem('CUSTOMER_IMAGE')
    if (imageData) {
        // Load the background image
        bgImage = loadImage(
            imageData,
            () => {
                console.log('Background image loaded successfully.')
            },
            (err) => {
                console.error('Failed to load background image:', err)
            }
        )
    } else {
        console.error('Image data or dimensions not found in localStorage.')
    }

    images = [
        loadImage('/vanilla/assets/high/Classical.jpeg'),
        loadImage('/vanilla/assets/high/Fluted.jpeg'),
        loadImage('/vanilla/assets/high/French.jpeg'),
        loadImage('/vanilla/assets/high/Louvered.jpeg'),
        loadImage('/vanilla/assets/high/Modern.jpeg'),
        loadImage('/vanilla/assets/high/Minimalist.png'),
        // Add Design Here
    ]

    images_low = [
        loadImage('/vanilla/assets/low/Classical.png'),
        loadImage('/vanilla/assets/low/Fluted.png'),
        loadImage('/vanilla/assets/low/French.png'),
        loadImage('/vanilla/assets/low/Louvered.jpeg'),
        loadImage('/vanilla/assets/low/Modern.png'),
        loadImage('/vanilla/assets/low/Minimalist.jpeg'),
        // Add Design Here
    ]
}

// Setup the canvas and display client name
function setup() {
    if (!bgImage) {
        console.error('Background image is not loaded.')
        return
    }

    // Handle Device Pixel Ratio (DPR)
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    // console.log(`Device Pixel Ratio (capped): ${devicePixelRatio}`);

    imgWidth = bgImage.width / devicePixelRatio
    imgHeight = bgImage.height / devicePixelRatio

    pixelDensity(devicePixelRatio)
    console.log('Pixel density set to ', devicePixelRatio)

    const canvasWidth = imgWidth
    const canvasHeight = imgHeight

    // Create the canvas with the original image dimensions
    let myCanvas = createCanvas(canvasWidth, canvasHeight)
    myCanvas.parent('canvas-div')

    // **Access the 2D context**
    const context = drawingContext
    if (!context) {
        throw new Error('Failed to get p5.js canvas 2D context.')
    }

    // **Scale the context to account for device pixel ratio**
    context.scale(devicePixelRatio, devicePixelRatio)
    console.log('Canvas context scaled by device pixel ratio.')

    // **Disable image smoothing for sharper edges**
    context.imageSmoothingEnabled = false
    context.imageSmoothingQuality = 'high'
    console.log('Image smoothing disabled for sharper rendering.')

    // Optional: Scale the canvas context for DPR if needed
    // Note: p5.js handles DPR internally, but if you have custom scaling, manage it here.
    // For example:
    // scale(devicePixelRatio);
}

// Draw loop to continuously render the canvas
function draw() {
    if (movingMask && originalPos && selectedMask > -1) {
        // removalPoints.forEach((point, index) => {
        //   if (
        //     point.x > masks[selectedMask].startX &&
        //     point.x < masks[selectedMask].endX &&
        //     point.y > masks[selectedMask].startY &&
        //     point.y < masks[selectedMask].endY
        //   ) {
        //     point.x += mouseX - originalPos.x;
        //     point.y += mouseY - originalPos.y;
        //   }
        // });
        console.log(removalPointsToMove)
        removalPointsToMove.forEach((maskIndex) => {
            removalPoints[maskIndex].forEach((point) => {
                point.x += mouseX - originalPos.x
                point.y += mouseY - originalPos.y
            })
            //   removalPoints[point].x +=
            //   removalPoints[point].y +=
        })

        masks[selectedMask].startX += mouseX - originalPos.x
        masks[selectedMask].endX += mouseX - originalPos.x
        masks[selectedMask].startY += mouseY - originalPos.y
        masks[selectedMask].endY += mouseY - originalPos.y

        originalPos = { x: mouseX, y: mouseY }
    }

    // if (mousePosX > window.innerWidth * 0.9) {
    //     window.scrollBy(10, 0)
    // } else if (mousePosX < window.innerWidth * 0.1) {
    //     window.scrollBy(-10, 0)
    // }
    // if (mousePosY > window.innerHeight * 0.9) {
    //     window.scrollBy(0, 10)
    // } else if (mousePosY < window.innerHeight * 0.1) {
    //     window.scrollBy(0, -10)
    // }
    image(bgImage, 0, 0, width, height)

    // Draw points and line for unit calculation
    // console.log(points)
    if (points.length > 0) {
        points.forEach((point) => {
            fill(255, 0, 0)
            strokeWeight(10 * unitValue)
            circle(point.x, point.y, 2)
        })
    }

    if (points.length == 1) {
        stroke(255, 0, 0)
        strokeWeight(2)
        line(points[0].x, points[0].y, mouseX, mouseY)
    }

    if (points.length === 2) {
        stroke(255, 0, 0)
        strokeWeight(2)
        line(points[0].x, points[0].y, points[1].x, points[1].y)
    }

    // Draw the grid for all masks
    unitsCount = {
        Classical: 0,
        Fluted: 0,
        'French Window': 0,
        'Louvered Window': 0,
        Modern: 0,
        Minimalist: 0,
        // Add Design Here
    }

    masks.forEach((mask, index) => {
        drawMaskGrid(
            mask.startX,
            mask.startY,
            mask.endX,
            mask.endY,
            mask.design,
            mask.theOrientation,
            mask.trueEndSet,
            index
        )
        // if (corpus.isMaskBorderVisible) {
        //     fill(0, 0)
        //     // stroke(corpus.isDragging ? 'red' : 'gray')
        //     stroke('red')
        //     rect(mask.startX - 10, mask.startY - 10, mask.endX, mask.endY)
        // }
        if (sending) {
            drawRectGrid(
                mask.startX,
                mask.startY,
                mask.endX,
                mask.endY,
                mask.design,
                mask.theOrientation,
                index
            )
        }
    })

    // Draw rectangle while dragging the mouse
    if (
        maskDrawingEnabled &&
        rectStartX !== undefined &&
        rectStartY !== undefined
    ) {
        drawMaskGrid(
            rectStartX,
            rectStartY,
            mouseX,
            mouseY,
            design,
            theOrientation,
            false,
            -1
        )
        fill(0, 150)
        stroke(255, 0, 0)
        rect(rectStartX, rectStartY, mouseX - rectStartX, mouseY - rectStartY)
        strokeWeight(2)
    }

    if (!sending) {
        lengths.forEach((length) => {
            fill(92, 64, 51)
            strokeWeight(1)
            console.log('HERE')
            circle(length.x, length.y, 2)
            circle(length.endX, length.endY, 2)

            stroke(92, 64, 51)
            strokeWeight(1)
            line(length.x, length.y, length.endX, length.endY)

            var dx = Math.abs(length.x - length.endX)
            var dy = Math.abs(length.y - length.endY)

            var distance = Math.round(Math.sqrt(dx * dx + dy * dy) / unitValue)

            strokeWeight(0.5)

            text(
                distance + ' mm',
                length.x + (dx / 2) * (length.endX > length.x ? 1 : -1) - 30,
                10 + length.y + (dy / 2) * (length.endY > length.y ? 1 : -1)
            )
        })
    }

    if (displayRuler) {
        if (rulerOrigin == -1) {
            fill(92, 64, 51)
            strokeWeight(1)
            circle(mouseX, mouseY, 1)
        } else {
            fill(92, 64, 51)
            strokeWeight(1)
            circle(rulerOrigin.x, rulerOrigin.y, 2)
            stroke(255, 0, 0)
            line(rulerOrigin.x, rulerOrigin.y, mouseX, mouseY)

            var dx = Math.abs(rulerOrigin.x - mouseX)
            var dy = Math.abs(rulerOrigin.y - mouseY)

            var distance = Math.round(Math.sqrt(dx * dx + dy * dy) / unitValue)

            strokeWeight(0.5)
            text(
                'Distance: ' + distance,
                rulerOrigin.x +
                    (dx / 2) * (mouseX > rulerOrigin.x ? 1 : -1) -
                    50,
                10 +
                    rulerOrigin.y +
                    (dy / 2) * (mouseY > rulerOrigin.y ? 1 : -1)
            )
        }
    }

    document.getElementById('remove-unit').style.backgroundColor =
        removalEnabled ? '#3730A3' : '#4338CA'

    document.getElementById('remove-mask').style.backgroundColor =
        removeMaskEnabled ? '#3730A3' : '#4338CA'

    document.getElementById('move_mask').style.backgroundColor = movingMask
        ? '#4e685a'
        : '#6b8a7a'

    document.getElementById('rotate_mask').style.backgroundColor = rotateEnabled
        ? '#4e685a'
        : '#6b8a7a'

    document.getElementById('mask_btn').style.backgroundColor =
        maskDrawingEnabled ? '#3730A3' : '#4338CA'

    document.getElementById('ruler').style.backgroundColor = displayRuler
        ? '#3730A3' : '#4338CA'
}

// Start drawing the initial line for unit calculation
function startDrawing() {
    const unitSelect = document.getElementById('unitSelect')

    const selectedUnit = unitSelect.value

    var units = 0

    if (selectedUnit === 'mm') {
        const unitInput = document.getElementById('unitInput')
        units = parseInt(unitInput.value)
    } else {
        const feetInput = document.getElementById('feetInput')
        const inchInput = document.getElementById('inchInput')
        units =
            (parseInt(feetInput.value) * 12 + parseInt(inchInput.value)) * 25.4
    }

    if (units == null) {
        alert('Please input unit value')
    }

    if (units && units > 0) {
        drawingEnabled = true
        unitValue = null
        points = []
        document.getElementById(
            'prompt'
        ).textContent = `Draw a line by clicking on the canvas twice. The line will represent ${units} units.`
    } else {
        alert('Please enter a valid number of units.')
    }
}

function mouseReleased() {
    if (movingMask && originalPos && selectedMask > -1) {
        // movingMask = false;
        originalPos = null
        selectedMask = -1
        removalPointsToMove = []
    }
}

// Handle mouse pressed events for drawing
function mousePressed() {
    if (mouseX < 0 || mouseY < 0) return
    if (mouseX > canvas.width || mouseY > canvas.height) return

    if (rotateEnabled) {
        masks.forEach((mask, index) => {
            if (
                mouseX > mask.startX &&
                mouseX < mask.endX &&
                mouseY > mask.startY &&
                mouseY < mask.endY
            ) {
                removalPoints[index].forEach((point) => {
                    console.log(point)
                    const xDiff = point.x - mask.startX
                    const yDiff = point.y - mask.startY
                    point.x = mask.startX + yDiff
                    point.y = mask.startY + xDiff
                    console.log(point)
                })
                mask.theOrientation = !mask.theOrientation
                var NendX = mask.startX + mask.endY - mask.startY
                var NendY = mask.startY + mask.endX - mask.startX
                mask.endX = NendX
                mask.endY = NendY
                mask.trueEndSet = false
            }
        })
    }

    if (movingMask && selectedMask == -1) {
        console.log(movingMask)
        console.log(masks)
        masks.forEach((mask, maskIndex) => {
            if (
                mouseX > mask.startX &&
                mouseX < mask.endX &&
                mouseY > mask.startY &&
                mouseY < mask.endY
            ) {
                selectedMask = maskIndex
                removalPointsToMove = []
                originalPos = { x: mouseX, y: mouseY }

                // EDIT THIS
                removalPointsToMove.push(maskIndex)
                // removalPoints.forEach((point, index) => {
                //   if (
                //     point.x > mask.startX &&
                //     point.x < mask.endX &&
                //     point.y > mask.startY &&
                //     point.y < mask.endY
                //   ) {
                //     removalPointsToMove.push(index);
                //   }
                // });
            }
        })
    }
    if (drawingEnabled) {
        points.push({ x: mouseX, y: mouseY })
        if (points.length === 2) {
            calculateUnitValue()
        }
    } else if (maskDrawingEnabled) {
        if (rectStartX === undefined && rectStartY === undefined) {
            rectStartX = mouseX
            rectStartY = mouseY
        } else {
            rectEndX = mouseX
            rectEndY = mouseY
            //   maskDrawingEnabled = false;
            finalizeMask() // Finalize the mask as soon as it's drawn
        }
    }

    if (removalEnabled) {
        // EDIT THIS
        masks.forEach((mask, index) => {
            if (
                mouseX > mask.startX &&
                mouseX < mask.endX &&
                mouseY > mask.startY &&
                mouseY < mask.endY
            ) {
                removalPoints[index].push({ x: mouseX, y: mouseY })
            }
        })
        // removalPoints.push({ x: mouseX, y: mouseY });
        // removalEnabled = !removalEnabled;
    }

    if (displayRuler) {
        if (rulerOrigin == -1) {
            rulerOrigin = { x: mouseX, y: mouseY }
        } else {
            lengths.push({
                x: rulerOrigin.x,
                y: rulerOrigin.y,
                endX: mouseX,
                endY: mouseY,
            })
            displayRuler = !displayRuler
            rulerOrigin = -1
        }
    }

    if (removeMaskEnabled) {
        removeMaskAt(mouseX, mouseY)
    }
}

function removeMask() {
    const titleElement = document.getElementById('title')
    const descElement = document.getElementById('desc')

    titleElement.textContent = 'Remove Mask Tool' // Update content
    descElement.textContent = 'This tool helps you to remove entire Sunrooof Design from rectangular selection from the canvas.' // Clear any message
    
    var state = removeMaskEnabled
    movingMask = false
    toggleAllOff()
    removeMaskEnabled = !state
}

function removeMaskAt(x, y) {
    let removedIndices = []
    masks = masks.filter((mask, index) => {
        if (
            x >= mask.startX &&
            x <= mask.endX &&
            y >= mask.startY &&
            y <= mask.endY
        ) {
            removedIndices.push(index)
            return false // filter out the mask
        } else {
            return true // keep the mask
        }
    })

    // Remove elements at indices in removedIndices from another array (removalPoints)
    for (let i = removedIndices.length - 1; i >= 0; i--) {
        let indexToRemove = removedIndices[i]
        removalPoints.splice(indexToRemove, 1)
    }
}

// Calculate the value of one unit based on the drawn line
function calculateUnitValue() {
    const dx = Math.abs(points[1].x - points[0].x)
    const dy = Math.abs(points[1].y - points[0].y)
    const distance = Math.sqrt(dy * dy + dx * dx)
    //   COME HERE

    const selectedUnit = unitSelect.value

    var units = 0

    if (selectedUnit === 'mm') {
        const unitInput = document.getElementById('unitInput')
        units = parseInt(unitInput.value)
    } else {
        const feetInput = document.getElementById('feetInput')
        const inchInput = document.getElementById('inchInput')
        units =
            (parseInt(feetInput.value) * 12 + parseInt(inchInput.value)) * 25.4
    }

    unitValue = distance / units
    document.getElementById(
        'unitValueDisplay'
    ).textContent = `1 unit equals ${unitValue.toFixed(2)} pixels.`
    document.getElementById('final-unit').style.display = 'block'
    drawingEnabled = false

    //   for (i=0; i<images.length; i++) {
    //     images[i].resize(width_height[i].width * unitValue, width_height[i].height * unitValue);
    //   }
}

// Start drawing the mask rectangle
function startDrawingMask() {
    const titleElement = document.getElementById('title')
    const descElement = document.getElementById('desc')

    titleElement.textContent = 'Drawing Tool' // Update content
    descElement.textContent = 'This Tool will help you in drawing Sunroof in the Canvas.' // Clear any message

    var state = maskDrawingEnabled
    toggleAllOff()
    if (state) {
        maskDrawingEnabled = false
        return
    }
    if (design == -1) alert('Select a Design First')
    else {
        if (unitValue) {
            maskDrawingEnabled = true
            rectStartX = undefined
            rectStartY = undefined
            rectEndX = undefined
            rectEndY = undefined
        } else {
            alert('Please define the unit length first.')
        }
    }
}

// Finalize the mask drawing and add to masks array
function finalizeMask() {
    if (
        rectStartX !== undefined &&
        rectStartY !== undefined &&
        rectEndX !== undefined &&
        rectEndY !== undefined
    ) {
        var startX = Math.min(rectStartX, rectEndX)
        var endX = Math.max(rectStartX, rectEndX)
        var startY = Math.min(rectStartY, rectEndY)
        var endY = Math.max(rectStartY, rectEndY)
        masks.push({
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            design: design,
            theOrientation: theOrientation,
            trueEndSet: false,
        })
        removalPoints.push([])

        rectStartX = undefined
        rectStartY = undefined
        rectEndX = undefined
        rectEndY = undefined
        isDrawMaskGrid = false
    }
    maskDrawingEnabled = false
}

function rotate_and_draw_image(
    img,
    startX,
    startY,
    height,
    width,
    orient,
    drawRect = 0
) {
    push()
    translate(startX, startY) // Move to the starting position
    if (!orient) {
        // blendMode(BLEND);
        // tint(0, 0, 255, 150);
        if (drawRect == 3) {
            fill(0, 255, 0)
        } else if (drawRect == 2) {
            fill(0, 0, 255)
        } else {
            fill(255, 0, 0)
        }
        if (drawRect == 0) {
            image(img, 0, 0, height, width)
            fill(0, 0, 255, 100)
        }
        rect(0, 0, height, width)
    } else {
        translate(width / 2, height / 2) // Move to the center of the area
        rotate(HALF_PI) // Rotate 90 degrees for portrait orientation
        // blendMode(BLEND);

        if (drawRect > 255) {
            fill(0, 0, 255)
        } else {
            fill(255, 0, 0, drawRect)
        }
        if (drawRect == 0) {
            image(img, -height / 2, -width / 2, height, width) // Swap width and height for the image
            fill(0, 0, 255, 100)
        }
        rect(-height / 2, -width / 2, height, width)
    }
    pop()
}

// Draw the grid inside the rectangle
function drawMaskGrid(
    startX,
    startY,
    endX,
    endY,
    design,
    orient,
    endset,
    index
) {
    const rectWidth = Math.abs(endX - startX)
    const rectHeight = Math.abs(endY - startY)
    const minX = Math.min(startX, endX)
    const minY = Math.min(startY, endY)
    const maxX = Math.max(startX, endX)
    const maxY = Math.max(startY, endY)

    const smallRectWidth = width_height[design].width * unitValue
    const smallRectHeight = width_height[design].height * unitValue
    const padding = width_height[design].padding * unitValue

    noStroke()
    fill(0, 255, 0, 100)

    let trueEndX = startX
    let trueEndY = startY

    //   var xi = 0;
    //   var yi = 0;

    for (let x = minX; x < maxX; ) {
        for (let y = minY; y < maxY; ) {
            let flag = true
            if (index >= 0) {
                removalPoints[index].forEach((point) => {
                    if (
                        x < point.x &&
                        x +
                            smallRectWidth * !orient +
                            smallRectHeight * orient >
                            point.x &&
                        y < point.y &&
                        y +
                            smallRectHeight * !orient +
                            smallRectWidth * orient >
                            point.y
                    ) {
                        flag = false
                        // if (endset && grids.length > index) {
                        //   grids[index][xi][yi] = 0;
                        // }
                        return
                    }
                })
            }
            if (
                x + smallRectWidth * !orient + smallRectHeight * orient <=
                    maxX &&
                y + smallRectWidth * orient + smallRectHeight * !orient <=
                    maxY &&
                flag
            ) {
                unitsCount[invMap[design]] += 1 + 1 * !design
                var img
                if (unitValue < 0.17) img = images_low[design]
                else img = images[design]
                // if (endset && grids.length > index) {
                //   grids[index][xi][yi] = 1;
                // }
                if (!sending) {
                    rotate_and_draw_image(
                        img,
                        x,
                        y,
                        smallRectWidth,
                        smallRectHeight,
                        orient
                    )
                    if (!endset && index >= 0) {
                        if (orient == 0) {
                            trueEndX = x + smallRectWidth
                            trueEndY = y + smallRectHeight
                        } else {
                            trueEndX = x + smallRectHeight
                            trueEndY = y + smallRectWidth
                        }
                    }
                }
                // image(images[design], x, y, smallRectWidth, smallRectHeight);
            }
            //   yi += 1;
            if (orient == 0) y += smallRectHeight + padding
            else y += smallRectWidth + padding
        }
        // xi += 1;
        if (orient == 0) x += smallRectWidth + padding
        else x += smallRectHeight + padding
    }
    if (!endset && index >= 0) {
        masks[index].endX = trueEndX
        masks[index].endY = trueEndY
        masks[index].trueEndSet = true

        // var n_unitsX =
        //   (trueEndX - startX) /
        //   (!orient * smallRectWidth + orient * smallRectHeight);

        // var n_unitsY =
        //   (trueEndY - startY) /
        //   (orient * smallRectWidth + !orient * smallRectHeight);

        //   console.log(n_units_trueX, n_units_trueY);
        // var gg = init2D(Math.floor(n_unitsX), Math.floor(n_unitsY));
        // console.log(gg);
        // console.log("F");
        // grids.push(gg);
        // console.log(grids);
        // console.log(grids[0] == gg);
    }
}

// Toggle remove mask mode and update button color
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(',')
    mime = arr[0].match(/:(.*?);/)[1]
    bstr = atob(arr[1])
    n = bstr.length
    u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

function downloadCanvas() {
    corpus.isMaskBorderVisible = false
    const canvas = document.getElementsByTagName('canvas')[0]
    if (!canvas) {
        console.error('Canvas not found!')
        return
    }

    // Get the true image from the canvas as a Base64 Data URL
    const trueImgBase64 = canvas.toDataURL('image/png')

    // Simulate some processing for masked image
    setTimeout(() => {
        const maskedImgBase64 = canvas.toDataURL('image/png') // Replace with actual masked image logic if needed

        // Choose the image to store as Base64
        const finalImageBase64 = maskedImgBase64 // Use maskedImgBase64 or trueImgBase64 based on requirement

        // Store the final image in session storage as PROPOSED_IMAGE
        localStorage.setItem('PROPOSED_IMAGE', finalImageBase64)
        localStorage.setItem('units_count', JSON.stringify(unitsCount))
        console.log(
            'Image successfully stored in session storage as Base64 string under key PROPOSED_IMAGE'
        )

        // Navigate to /design-submit
        window.location.href = '/cms/design-submit'
    }, 200)
}

// function downloadCanvas() {
//     const canvas = document.getElementsByTagName('canvas')[0];
//     if (!canvas) {
//         console.error('Canvas not found!');
//         return;
//     }

//     // Get the true image from the canvas as a Base64 Data URL
//     const trueImgBase64 = canvas.toDataURL('image/png');

//     // Simulate some processing for masked image
//     setTimeout(() => {
//         const maskedImgBase64 = canvas.toDataURL('image/png'); // Replace with actual masked image logic if needed

//         // Choose the image to store as Base64
//         const finalImageBase64 = maskedImgBase64; // Use maskedImgBase64 or trueImgBase64 based on requirement

//         // Store the final image in session storage as PROPOSED_IMAGE
//         localStorage.setItem('PROPOSED_IMAGE', finalImageBase64);
//         console.log('Image successfully stored in session storage as Base64 string under key PROPOSED_IMAGE');
//     }, 200);
// }

// function downloadCanvas() {
//     const canvas = document.getElementsByTagName('canvas')[0];
//     if (!canvas) {
//         console.error('Canvas not found!');
//         return;
//     }

//     // Get the canvas image as a Data URL
//     const trueImg = canvas.toDataURL('image/png');
//     const uniq = +new Date();

//     // Download the true image
//     const trueImgLink = document.createElement('a');
//     trueImgLink.href = trueImg;
//     trueImgLink.download = `true_img-${uniq}.png`;
//     document.body.appendChild(trueImgLink);
//     trueImgLink.click();
//     document.body.removeChild(trueImgLink);

//     // Simulate some processing for masked image
//     setTimeout(() => {
//         const maskedImg = canvas.toDataURL('image/png'); // Replace this with actual masked image logic if needed
//         const maskedImgLink = document.createElement('a');
//         maskedImgLink.href = maskedImg;
//         maskedImgLink.download = `masked_img-${uniq}.png`;
//         document.body.appendChild(maskedImgLink);
//         maskedImgLink.click();
//         document.body.removeChild(maskedImgLink);
//     }, 200);
// }

// function downloadCanvas() {
//     var canvas = document.getElementsByTagName('canvas')[0]
//     var true_img = canvas.toDataURL('image/png')

//     sending = 1
//     ;``
//     sleep(200).then(() => {
//         var canvas = document.getElementsByTagName('canvas')[0]
//         var masked_img = canvas.toDataURL('image/png')

//         sending = 0

//         var trueBlob = dataURLtoBlob(true_img)
//         var maskedBlob = dataURLtoBlob(masked_img)

//         var formData = new FormData()
//         formData.append('true_img', trueBlob, 'true_img.png')
//         formData.append('masked_img', maskedBlob, 'masked_img.png')
//         formData.append('unitValue', unitValue)

//         // Send the request to the Flask server
//         fetch(
//             //   "https://a046a03d-14db-4c6e-bc93-ea37dd946a42-00-3n5zucyk1f9fz.sisko.replit.dev/process-image",
//             debug
//                 ? 'https://dc08932b-72d8-412f-960e-375d708b1f1c-00-1hkd2oifixm4r.pike.replit.dev/process-image'
//                 : 'https://sunrooof.replit.app/process-image',
//             {
//                 method: 'POST',
//                 body: formData,
//             }
//         )
//             .then((response) => response.blob())
//             .then((blob) => {
//                 var link = document.createElement('a')
//                 link.href = URL.createObjectURL(blob)
//                 link.download = 'Design.jpeg'
//                 document.body.appendChild(link)
//                 link.click()
//                 document.body.removeChild(link)
//             })
//             .catch((error) => console.error('Error:', error))
//     })

//     // document.getElementById('generate-invoice').style.display = 'block'
// }

// function generateInvoice() {
//     localStorage.setItem('units_count', JSON.stringify(unitsCount))
//     window.open('/quotation.html', '_blank')
// }

document.addEventListener('mousemove', function (event) {
    //   const margin = 50; // Distance from the edge in pixels
    //   const scrollSpeed = 10; // Scroll speed

    //   // Get the cursor's position
    //   const mouseX = event.clientX;
    //   const mouseY = event.clientY;
    mousePosX = event.clientX
    mousePosY = event.clientY

    //   // Get the window's dimensions
    //   const windowWidth = window.innerWidth;
    //   const windowHeight = window.innerHeight;

    //   // Scroll the window based on cursor position
    //   if (mouseX < margin) {
    //     // Scroll left
    //     window.scrollBy(-scrollSpeed, 0);
    //   } else if (mouseX > windowWidth - margin) {
    //     // Scroll right
    //     window.scrollBy(scrollSpeed, 0);
    //   }

    //   if (mouseY < margin) {
    //     // Scroll up
    //     window.scrollBy(0, -scrollSpeed);
    //   } else if (mouseY > windowHeight - margin) {
    //     // Scroll down
    //     window.scrollBy(0, scrollSpeed);
    //   }
    // console.log(event)
})

// const element = document.getElementById('canvas-div')

// element.addEventListener('mousedown', () => {
//     element.classList.add('pressed')
//     console.log('Mouse-down')
// })

// element.addEventListener('mouseup', () => {
//     element.classList.remove('pressed')
//     maskDrawingEnabled = false
// })

function init2D(M, N) {
    var array = []
    for (let i = 0; i < M; i++) {
        var arr = []
        for (let j = 0; j < N; j++) {
            arr.push(0)
        }
        array.push(arr)
    }
    return array
}

function drawRectGrid(startX, startY, endX, endY, design, orient, index) {
    const rectWidth = Math.abs(endX - startX)
    const rectHeight = Math.abs(endY - startY)
    const minX = Math.min(startX, endX)
    const minY = Math.min(startY, endY)
    const maxX = Math.max(startX, endX)
    const maxY = Math.max(startY, endY)

    const smallRectWidth = width_height[design].width * unitValue
    const smallRectHeight = width_height[design].height * unitValue
    const padding = width_height[design].padding * unitValue

    var xi = 0
    var yi = 0
    for (let x = minX; x < maxX; ) {
        for (let y = minY; y < maxY; ) {
            let flag = true
            if (index >= 0) {
                removalPoints[index].forEach((point) => {
                    if (
                        x < point.x &&
                        x +
                            smallRectWidth * !orient +
                            smallRectHeight * orient >
                            point.x &&
                        y < point.y &&
                        y +
                            smallRectHeight * !orient +
                            smallRectWidth * orient >
                            point.y
                    ) {
                        flag = false
                        return
                    }
                })
            }
            if (
                x + smallRectWidth * !orient + smallRectHeight * orient <=
                    maxX &&
                y + smallRectWidth * orient + smallRectHeight * !orient <=
                    maxY &&
                flag
            ) {
                // unitsCount[invMap[design]] += 1 + 1 * !design;
                var img
                if (unitValue < 0.17) img = images_low[design]
                else img = images[design]
                // Add Design Here
                if (design == 2 || design == 3) {
                    rotate_and_draw_image(
                        img,
                        x - padding / 2 - 2,
                        y - padding / 2 - 2,
                        smallRectWidth + padding + 4,
                        smallRectHeight + padding + 4,
                        orient,
                        3
                    )
                } else if (design == 0) {
                    rotate_and_draw_image(
                        img,
                        x - padding / 2 - 2,
                        y - padding / 2 - 2,
                        smallRectWidth + padding + 4,
                        smallRectHeight + padding + 4,
                        orient,
                        2
                    )
                } else {
                    rotate_and_draw_image(
                        img,
                        x - padding / 2 - 2,
                        y - padding / 2 - 2,
                        smallRectWidth + padding + 4,
                        smallRectHeight + padding + 4,
                        orient,
                        1
                    )
                }

                // image(images[design], x, y, smallRectWidth, smallRectHeight);
            }
            if (orient == 0) y += smallRectHeight + padding
            else y += smallRectWidth + padding
        }
        if (orient == 0) x += smallRectWidth + padding
        else x += smallRectHeight + padding
    }
}
