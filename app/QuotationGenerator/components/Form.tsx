const Form = () => {
    return (
        <div className="mt-32 flex flex-col justify-center w-full items-center">
            <h1 className="text-4xl mb-5 font-bold">Quotation Generator</h1>
            <div className="flex flex-col justify-between container mx-auto max-w-3xl">
                <div className="mb-2 flex items-center justify-between w-full">
                    <label>Client Name:</label>
                    <input
                        type="text"
                        name=""
                        id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    />
                </div>
                <hr className="h-0.5 my-1 bg-black border-0 rounded" />
                <div className="mb-2 mt-2 flex items-center justify-between w-full">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name=""
                        id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    />
                </div>
                <hr className="h-0.5 my-1 bg-black border-0 rounded" />
                <div className="mb-2 mt-2 flex items-center justify-between w-full">
                    <label>Email:</label>
                    <input
                        type="text"
                        name=""
                        id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    />
                </div>
                <hr className="h-0.5 my-1 bg-black border-0 rounded" />
                <div className="mb-2 mt-2 flex items-center justify-between w-full">
                    <label>Site Address:</label>
                    <input
                        type="text"
                        name=""
                        id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    />
                </div>
                <hr className="h-0.5 my-1 bg-black border-0 rounded" />
                <div className="mb-2 mt-2 flex items-center justify-between w-full">
                    <label>Zone:</label>
                    <input
                        type="text"
                        name=""
                        id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    />
                </div>
                <hr className="h-0.5 my-1 bg-black border-0 rounded" />
                <div className="mb-2 mt-2 flex items-center justify-between w-full">
                    <label>Date:</label>
                    <input
                        type="text"
                        name=""
                        id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    />
                </div>
                <hr className="h-0.5 my-1 bg-black border-0 rounded" />
                <div className="mb-2 mt-2 flex items-center justify-between w-full">
                    <label>Discount %:</label>
                    <input
                        type="text"
                        name=""
                        id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    />
                </div>
            </div>
            <div className="flex items-center mt-10">
                <div className="text-white cursor-pointer bg-blue-700 flex items-center justify-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2 ">
                    <span className="text-sm ml-2">Add Entry</span>
                </div>
                <div className="text-white cursor-pointer flex items-center bg-blue-700 hover:bg-blue-800 justify-center focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    <span className="text-sm mr-2">Generate Invoice</span>
                </div>
            </div>
        </div>
    )
}

export default Form
