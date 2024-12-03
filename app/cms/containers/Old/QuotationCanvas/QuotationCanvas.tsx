import { useState } from 'react'

const DesignGeneration = () => {
    const [unitType, setUnitType] = useState('mm')
    const [unitValue, setUnitValue] = useState('')
    const [feetValue, setFeetValue] = useState('')
    const [inchValue, setInchValue] = useState('')
    const [design, setDesign] = useState('')
    const [showTools, setShowTools] = useState(false)
    const [uploadedImage, setUploadedImage] = useState(null)

    const selectUnitType = (e) => {
        setUnitType(e.target.value)
    }

    const startDrawing = () => {
        if (unitType === 'mm' && unitValue) {
            setShowTools(true)
        } else if (unitType === 'feet' && (feetValue || inchValue)) {
            setShowTools(true)
        }
    }

    const updateDesign = (e) => {
        setDesign(e.target.value)
    }

    const downloadCanvas = () => {
        alert('Download functionality goes here!')
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setUploadedImage(event.target.result) // Save the image data URL
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="min-h-screen bg-white font-poppins">
            {/* Content Section */}
            <div className="mt-4 p-8 flex flex-col lg:flex-row justify-between w-ful min-h-screenl">
                {/* Left Panel */}
                <section className="flex flex-col space-y-4 w-full lg:w-1/3 pr-4">
                    <div>
                        <p className="font-medium">
                            Enter the length of the line and click to draw:
                        </p>
                        <select
                            className="p-2 border border-gray-300 rounded-md"
                            value={unitType}
                            onChange={selectUnitType}
                        >
                            <option value="mm">mm</option>
                            <option value="feet">Feet and Inches</option>
                        </select>
                    </div>
                    {unitType === 'mm' && (
                        <input
                            type="number"
                            className="p-2 border border-gray-300 rounded-md"
                            placeholder="Length (in mm)"
                            value={unitValue}
                            onChange={(e) => setUnitValue(e.target.value)}
                        />
                    )}
                    {unitType === 'feet' && (
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                className="p-2 border border-gray-300 rounded-md"
                                placeholder="Feet"
                                value={feetValue}
                                onChange={(e) => setFeetValue(e.target.value)}
                            />
                            <input
                                type="number"
                                className="p-2 border border-gray-300 rounded-md"
                                placeholder="Inches"
                                value={inchValue}
                                onChange={(e) => setInchValue(e.target.value)}
                            />
                        </div>
                    )}
                    <button
                        onClick={startDrawing}
                        className="bg-green-600 text-white rounded-md py-2 hover:bg-green-500"
                    >
                        Start Drawing
                    </button>
                    {showTools && (
                        <>
                            <div>
                                <select
                                    className="p-2 border border-gray-300 rounded-md"
                                    value={design}
                                    onChange={updateDesign}
                                >
                                    <option value="">Select Design</option>
                                    <option value="Classical">Classical</option>
                                    <option value="Fluted">Fluted</option>
                                    <option value="French Window">
                                        French Window
                                    </option>
                                    <option value="Louvered Window">
                                        Louvered Window
                                    </option>
                                    <option value="Modern">Modern</option>
                                    <option value="Minimalist">
                                        Minimalist
                                    </option>
                                </select>
                            </div>
                            <button className="bg-yellow-600 text-white rounded-md py-2 hover:bg-yellow-500">
                                Draw SUNROOOF
                            </button>
                            <button className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-500">
                                Orientation ||
                            </button>
                            <button className="bg-red-600 text-white rounded-md py-2 hover:bg-red-500">
                                Remove SUNROOOF
                            </button>
                        </>
                    )}
                    {/* Upload Section */}
                    <div className="mt-8 flex justify-center space-x-4">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="image-upload"
                            onChange={handleImageUpload}
                        />
                        <label
                            htmlFor="image-upload"
                            className="bg-gray-700 text-white rounded-md py-2 px-4 hover:bg-gray-600 cursor-pointer"
                        >
                            Upload Image
                        </label>
                        {showTools && (
                            <button
                                className="bg-gray-700 text-white rounded-md py-2 px-4 hover:bg-gray-600"
                                onClick={downloadCanvas}
                            >
                                Download Final Image
                            </button>
                        )}
                    </div>
                </section>

                {/* Canvas Section */}
                <main className="w-full lg:w-2/3 flex justify-center items-center">
                    <div
                        id="canvas-div"
                        className="border border-black w-full h-screen flex justify-center items-center overflow-hidden"
                    >
                        {uploadedImage ? (
                            <img
                                src={uploadedImage}
                                alt="Uploaded"
                                className="max-w-full max-h-full"
                            />
                        ) : (
                            <p className="text-gray-500">
                                Upload an image to display here
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DesignGeneration
