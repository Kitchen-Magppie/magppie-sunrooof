import * as PIXI from 'pixi.js'

let bgImage
let imgWidth, imgHeight
let design = -1
let theOrientation = 0 // 0 for horizontal, 1 for vertical
let images = []
let images_low = []
let mousePosX, mousePosY

let displayRuler = 0
let rulerOrigin = null

let selectedMask = -1
let movingMask = false
let removalPointsToMove = []
let originalPos

let removalPoints = [] // Stores removal points for each mask

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

let unitValue = null
let points = []
let drawingEnabled = false

let removalEnabled = false

let maskDrawingEnabled = false
let rectStartX, rectStartY, rectEndX, rectEndY

let masks = [] // Stores mask data

let rotateEnabled = false

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff,
})

document.body.appendChild(app.view)

// Function to load images as PIXI.Texture
function loadPixiImage(src) {
    return new Promise((resolve, reject) => {
        const texture = PIXI.Texture.from(src)
        texture.onError = reject
        texture.onLoad = () => resolve(texture)
    })
}

// Preload images using PIXI.Texture.from
async function preload() {
    const imageData = localStorage.getItem('CUSTOMER_IMAGE')
    bgImage = await loadPixiImage(imageData)

    imgWidth = bgImage.width
    imgHeight = bgImage.height

    app.renderer.resize(imgWidth, imgHeight)

    images = await Promise.all([
        loadPixiImage('/vanilla-assets/high/Classical.jpeg'),
        loadPixiImage('/vanilla-assets/high/Fluted.jpeg'),
        loadPixiImage('/vanilla-assets/high/French.jpeg'),
        loadPixiImage('/vanilla-assets/high/Louvered.jpeg'),
        loadPixiImage('/vanilla-assets/high/Modern.jpeg'),
        loadPixiImage('/vanilla-assets/high/Minimalist.png'),
        // Add Design Here
    ])

    images_low = await Promise.all([
        loadPixiImage('/vanilla-assets/low/Classical.png'),
        loadPixiImage('/vanilla-assets/low/Fluted.png'),
        loadPixiImage('/vanilla-assets/low/French.png'),
        loadPixiImage('/vanilla-assets/low/Louvered.jpeg'),
        loadPixiImage('/vanilla-assets/low/Modern.png'),
        loadPixiImage('/vanilla-assets/low/Minimalist.jpeg'),
        // Add Design Here
    ])

    setup()
}

function setup() {
    const bgSprite = new PIXI.Sprite(bgImage)
    app.stage.addChild(bgSprite)

    app.stage.interactive = true
    app.stage.hitArea = app.renderer.screen

    app.stage.on('pointerdown', onPointerDown)
    app.stage.on('pointermove', onPointerMove)
    app.stage.on('pointerup', onPointerUp)

    // ... rest of your setup logic (without createCanvas)
}

// Handle pointer down events
function onPointerDown(event) {
    const mouseX = event.data.global.x
    const mouseY = event.data.global.y

    if (
        mouseX < 0 ||
        mouseY < 0 ||
        mouseX > app.screen.width ||
        mouseY > app.screen.height
    ) {
        return
    }

    if (rotateEnabled) {
        handleRotateMask(mouseX, mouseY)
    }

    if (movingMask && selectedMask === -1) {
        handleMoveMaskStart(mouseX, mouseY)
    }

    if (drawingEnabled) {
        handleDrawing(mouseX, mouseY)
    } else if (maskDrawingEnabled) {
        handleMaskDrawingStart(mouseX, mouseY)
    }

    if (removalEnabled) {
        handleRemoval(mouseX, mouseY)
    }

    if (displayRuler) {
        handleRuler(mouseX, mouseY)
    }

    if (removeMaskEnabled) {
        removeMaskAt(mouseX, mouseY)
    }
}

// Handle pointer move events
function onPointerMove(event) {
    mousePosX = event.data.global.x
    mousePosY = event.data.global.y

    if (movingMask && originalPos && selectedMask > -1) {
        handleMoveMask(event)
    }

    // Auto-scroll functionality
    const margin = 50 // Distance from the edge in pixels
    const scrollSpeed = 10 // Scroll speed

    if (mousePosX > window.innerWidth - margin) {
        window.scrollBy(scrollSpeed, 0)
    } else if (mousePosX < margin) {
        window.scrollBy(-scrollSpeed, 0)
    }

    if (mousePosY > window.innerHeight - margin) {
        window.scrollBy(0, scrollSpeed)
    } else if (mousePosY < margin) {
        window.scrollBy(0, -scrollSpeed)
    }

    // Drawing line in ruler mode
    if (displayRuler && rulerOrigin) {
        app.stage.removeChild(rulerLine) // Remove previous line
        rulerLine = drawLine(rulerOrigin.x, rulerOrigin.y, mousePosX, mousePosY)
    }
}

// Handle pointer up events
function onPointerUp(event) {
    if (movingMask && originalPos && selectedMask > -1) {
        handleMoveMaskEnd()
    }

    if (
        maskDrawingEnabled &&
        rectStartX !== undefined &&
        rectStartY !== undefined
    ) {
        handleMaskDrawingEnd(event)
    }
}

// Rotate mask logic
function handleRotateMask(mouseX, mouseY) {
    masks.forEach((mask, index) => {
        if (
            mouseX > mask.startX &&
            mouseX < mask.endX &&
            mouseY > mask.startY &&
            mouseY < mask.endY
        ) {
            mask.theOrientation = !mask.theOrientation
            ;[mask.endX, mask.endY] = [
                mask.startX + mask.endY - mask.startY,
                mask.startY + mask.endX - mask.startX,
            ]
            mask.trueEndSet = false
            redrawMasks()
        }
    })
}

// Start moving mask logic
function handleMoveMaskStart(mouseX, mouseY) {
    masks.forEach((mask, maskIndex) => {
        if (
            mouseX > mask.startX &&
            mouseX < mask.endX &&
            mouseY > mask.startY &&
            mouseY < mask.endY
        ) {
            selectedMask = maskIndex
            removalPointsToMove = [maskIndex]
            originalPos = { x: mouseX, y: mouseY }
        }
    })
}

// Move mask logic
function handleMoveMask(event) {
    const mouseX = event.data.global.x
    const mouseY = event.data.global.y

    removalPointsToMove.forEach((maskIndex) => {
        removalPoints[maskIndex].forEach((point) => {
            point.x += mouseX - originalPos.x
            point.y += mouseY - originalPos.y
        })
    })

    masks[selectedMask].startX += mouseX - originalPos.x
    masks[selectedMask].endX += mouseX - originalPos.x
    masks[selectedMask].startY += mouseY - originalPos.y
    masks[selectedMask].endY += mouseY - originalPos.y

    originalPos = { x: mouseX, y: mouseY }

    redrawMasks()
}

// End moving mask logic
function handleMoveMaskEnd() {
    originalPos = null
    selectedMask = -1
    removalPointsToMove = []
}

// Drawing unit line logic
function handleDrawing(mouseX, mouseY) {
    points.push({ x: mouseX, y: mouseY })
    if (points.length === 2) {
        calculateUnitValue()
    }
}

// Start drawing mask logic
function handleMaskDrawingStart(mouseX, mouseY) {
    rectStartX = mouseX
    rectStartY = mouseY
}

// End drawing mask logic
function handleMaskDrawingEnd(event) {
    rectEndX = event.data.global.x
    rectEndY = event.data.global.y
    finalizeMask()
}

// Removal points logic
function handleRemoval(mouseX, mouseY) {
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
    redrawMasks()
}

// Ruler logic
function handleRuler(mouseX, mouseY) {
    if (!rulerOrigin) {
        rulerOrigin = { x: mouseX, y: mouseY }
    } else {
        lengths.push({
            x: rulerOrigin.x,
            y: rulerOrigin.y,
            endX: mouseX,
            endY: mouseY,
        })
        displayRuler = 0
        rulerOrigin = null
    }
}

// ... (Rest of your functions)

// Drawing functions using PIXI.Graphics
let rulerLine = null // Store ruler line to remove it later

function drawLine(x1, y1, x2, y2, color = 0xff0000, width = 2) {
    const line = new PIXI.Graphics()
    line.lineStyle(width, color)
    line.moveTo(x1, y1)
    line.lineTo(x2, y2)
    app.stage.addChild(line)
    return line // Return the line for later removal
}

function drawCircle(x, y, radius, color = 0xff0000) {
    const circle = new PIXI.Graphics()
    circle.beginFill(color)
    circle.drawCircle(x, y, radius)
    circle.endFill()
    app.stage.addChild(circle)
}

function drawRect(x, y, width, height, color = 0xff0000, alpha = 1) {
    const rectangle = new PIXI.Graphics()
    rectangle.beginFill(color, alpha)
    rectangle.drawRect(x, y, width, height)
    rectangle.endFill()
    app.stage.addChild(rectangle)
}

function drawText(text, x, y, style = {}) {
    const textObject = new PIXI.Text(text, style)
    textObject.x = x
    textObject.y = y
    app.stage.addChild(textObject)
}

// ... (Adapt your drawMaskGrid and drawRectGrid to use PIXI.Graphics)
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

    let trueEndX = startX
    let trueEndY = startY

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
                unitsCount[invMap[design]] += 1 + 1 * !design
                const img =
                    unitValue < 0.17 ? images_low[design] : images[design]

                const container = new PIXI.Container()
                const sprite = new PIXI.Sprite(img)

                container.x = x
                container.y = y

                if (!orient) {
                    sprite.width = smallRectWidth
                    sprite.height = smallRectHeight
                } else {
                    container.pivot.x = smallRectWidth / 2
                    container.pivot.y = smallRectHeight / 2
                    container.rotation = Math.PI / 2
                    sprite.width = smallRectHeight
                    sprite.height = smallRectWidth
                }

                container.addChild(sprite)
                app.stage.addChild(container)

                if (!endset && index >= 0) {
                    if (orient === 0) {
                        trueEndX = x + smallRectWidth
                        trueEndY = y + smallRectHeight
                    } else {
                        trueEndX = x + smallRectHeight
                        trueEndY = y + smallRectWidth
                    }
                }
            }
            if (orient === 0) {
                y += smallRectHeight + padding
            } else {
                y += smallRectWidth + padding
            }
        }
        if (orient === 0) {
            x += smallRectWidth + padding
        } else {
            x += smallRectHeight + padding
        }
    }
    if (!endset && index >= 0) {
        masks[index].endX = trueEndX
        masks[index].endY = trueEndY
        masks[index].trueEndSet = true
    }
}

function redrawMasks() {
    unitsCount = {
        Classical: 0,
        Fluted: 0,
        'French Window': 0,
        'Louvered Window': 0,
        Modern: 0,
        Minimalist: 0,
        // Add Design Here
    }

    // Clear the stage (except for the background)
    app.stage.removeChildren(1) // Keep the background sprite

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
    })
}

preload() // Start preloading
