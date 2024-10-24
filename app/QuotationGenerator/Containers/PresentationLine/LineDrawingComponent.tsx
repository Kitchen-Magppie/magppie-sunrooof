import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import './line.css';

interface Props {}

const LineDrawingComponent: React.FC<Props> = () => {
  const [line, setLine] = useState<any>(null); // Only one line allowed
  const [pixelLength, setPixelLength] = useState<number>(0); // Length of line in pixels
  const [unitValue, setUnitValue] = useState<number>(0); // Pixels per unit
  const [selectedUnit, setSelectedUnit] = useState("mm");
  const [enteredUnits, setEnteredUnits] = useState<string>(''); // User input for units, starts as an empty string
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Image URL for user-uploaded image
  const [image] = useImage(imageUrl);
  const [drawing, setDrawing] = useState(false);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false); // Control drawing permission
  const stageRef = useRef(null);

  const handleMouseDown = (e: any) => {
    if (drawing || line) return; // Do not allow more than one line
    const pos = e.target.getStage().getPointerPosition();
    setLine({ points: [pos.x, pos.y] });
    setDrawing(true);
  };

  const handleMouseMove = (e: any) => {
    if (!drawing || !line) return;
    const pos = e.target.getStage().getPointerPosition();
    const updatedLine = { points: [line.points[0], line.points[1], pos.x, pos.y] };
    setLine(updatedLine);

    // Update the pixel length dynamically while drawing
    calculatePixelLength(updatedLine);
  };

  const handleMouseUp = () => {
    if (drawing) {
      setDrawing(false);
      calculatePixelsPerUnit(); // Final calculation of pixels per unit when drawing is done
    }
  };

  const calculatePixelLength = (line: any) => {
    if (!line) return;

    const x1 = line.points[0];
    const y1 = line.points[1];
    const x2 = line.points[2];
    const y2 = line.points[3];
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // Pythagorean theorem to calculate pixel distance
    setPixelLength(length); // Update the pixel length during drawing
  };

  const calculatePixelsPerUnit = () => {
    if (!pixelLength || parseFloat(enteredUnits) === 0) return; // Ensure units are parsed correctly

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
    if (enteredUnits.trim() === '') { // Check if the input is empty
      alert('Please enter a value in the input box before drawing the line.'); // Show alert
      return; // Exit the function if input is empty
    }
    setIsDrawingEnabled(true); // Enable drawing if input is valid
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
            <option value="cm">cm</option>
            <option value="in">in</option>
          </select>

          <input
            type="number"
            value={enteredUnits}
            onChange={(e) => setEnteredUnits(e.target.value)} // Keep it as string for empty state
            placeholder="Enter length in units"
          />

          <button onClick={handleDrawLineClick}>Draw Line</button> {/* Set drawing enabled */}
          {isDrawingEnabled && (
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              Draw a line by clicking on the canvas twice. The line will represent {enteredUnits} {selectedUnit}.
            </p>
          )}
        </div>

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <p>Total pixels of the drawn line: {pixelLength.toFixed(2)} pixels</p>
        <p>1 unit equals {unitValue.toFixed(2)} pixels</p>
      </div>

      <div className="canvas-container">
        {imageUrl && (
          <Stage
            width={window.innerWidth * 0.6}
            height={window.innerHeight * 0.6}
            onMouseDown={isDrawingEnabled ? handleMouseDown : undefined} // Enable mouse down only if drawing is enabled
            onMouseMove={isDrawingEnabled ? handleMouseMove : undefined} // Enable mouse move only if drawing is enabled
            onMouseUp={isDrawingEnabled ? handleMouseUp : undefined} // Enable mouse up only if drawing is enabled
            ref={stageRef}
            style={{ border: "1px solid gray" }}
          >
            <Layer>
              <KonvaImage image={image} x={0} y={0} />
              {line && (
                <Line
                  points={line.points}
                  stroke="red"
                  strokeWidth={2}
                  lineCap="round"
                  lineJoin="round"
                />
              )}
            </Layer>
          </Stage>
        )}
      </div>
    </div>
  );
};

export default LineDrawingComponent;
