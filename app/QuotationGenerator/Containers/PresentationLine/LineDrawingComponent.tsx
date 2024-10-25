import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Circle, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import './line.css';

interface LinePoints {
  points: number[];
}

const LineDrawingComponent: React.FC = () => {
  const [line, setLine] = useState<LinePoints | null>(null); // Line state
  const [pixelLength, setPixelLength] = useState<number>(0); // Length of line in pixels
  const [unitValue, setUnitValue] = useState<number>(0); // Pixels per unit
  const [selectedUnit, setSelectedUnit] = useState("mm");
  const [enteredUnits, setEnteredUnits] = useState<string>(''); // User input for units
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Image URL for user-uploaded image
  const [image] = useImage(imageUrl);
  const [drawing, setDrawing] = useState(false); // Track if drawing is active
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false); // Control drawing permission
  const stageRef = useRef<Konva.Stage | null>(null); // Stage reference

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos || !isDrawingEnabled) return;

    if (!drawing) {
      // First click: Set the starting point of the line
      setLine({ points: [pos.x, pos.y] });
      setDrawing(true); // Start drawing process
    } else if (line) {
      // Second click: Finalize the line
      setLine({ points: [line.points[0], line.points[1], pos.x, pos.y] });
      setDrawing(false); // Stop drawing
      calculatePixelLength({ points: [line.points[0], line.points[1], pos.x, pos.y] }); // Final pixel length
      calculatePixelsPerUnit(); // Calculate pixels per unit
      setIsDrawingEnabled(false); // Disable drawing after completion
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!drawing || !line) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      // Update the line while moving the mouse, before the second click
      const updatedLine = { points: [line.points[0], line.points[1], pos.x, pos.y] };
      setLine(updatedLine);

      // Update the pixel length dynamically while drawing
      calculatePixelLength(updatedLine);
    }
  };

  const calculatePixelLength = (line: LinePoints) => {
    if (!line || line.points.length < 4) return;

    const x1 = line.points[0];
    const y1 = line.points[1];
    const x2 = line.points[2];
    const y2 = line.points[3];
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // Pythagorean theorem to calculate pixel distance
    setPixelLength(length); // Update pixel length
  };

  const calculatePixelsPerUnit = () => {
    if (!pixelLength || parseFloat(enteredUnits) === 0) return; // Ensure units are valid

    const pixelsPerUnit = pixelLength / parseFloat(enteredUnits);
    setUnitValue(pixelsPerUnit);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrawLineClick = () => {
    if (enteredUnits.trim() === '') {
      alert('Please enter a valid value as an input');
      return;
    }
    setLine(null); // Clear any previously drawn line
    setIsDrawingEnabled(true); // Enable drawing
    setUnitValue(0);
    setPixelLength(0);
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="controls">
          <label htmlFor="unitSelect">Units:</label>
          <select
            id="unitSelect"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
          >
            <option value="mm">mm</option>
            <option value="in">in</option>
          </select>

          <input
            type="number"
            value={enteredUnits}
            onChange={(e) => setEnteredUnits(e.target.value)}
            placeholder="Enter length in units"
          />

          <button onClick={handleDrawLineClick}>Draw Line</button>
          {(
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              Draw a line by clicking on the canvas. The line will represent {selectedUnit === 'mm' ? +enteredUnits : +enteredUnits * 25.4 } units.
            </p>
          )}
        </div>

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <p>Total pixels of the drawn line: {pixelLength.toFixed(2)} pixels</p>
        <p>1 unit equals {selectedUnit === 'mm' ? unitValue.toFixed(2) : (+unitValue.toFixed(2) / 25.4)} pixels</p>
      </div>

      <div className="canvas-container">
        {imageUrl && (
          <Stage
            width={window.innerWidth * 0.6}
            height={window.innerHeight * 0.6}
            onMouseDown={handleMouseDown} // First click sets start point, second click sets end point
            onMouseMove={handleMouseMove} // Line updates as the mouse moves
            ref={stageRef}
            style={{ border: "1px solid gray" }}
          >
            <Layer>
              <KonvaImage image={image} x={0} y={0} />
              {line && (
                <>
                  <Line
                    points={line.points}
                    stroke="red"
                    strokeWidth={2}
                    lineCap="round"
                    lineJoin="round"
                  />
                  {/* Draw circles at the start and end points */}
                  <Circle
                    x={line.points[0]}
                    y={line.points[1]}
                    radius={4} // Adjust radius as needed
                    fill="red"
                  />
                  <Circle
                    x={line.points[2]}
                    y={line.points[3]}
                    radius={4} // Adjust radius as needed
                    fill="red"
                  />
                </>
              )}
            </Layer>
          </Stage>
        )}
      </div>
    </div>
  );
};

export default LineDrawingComponent;
