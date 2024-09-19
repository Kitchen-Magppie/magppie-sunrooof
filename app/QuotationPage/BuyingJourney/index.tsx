import { data } from './data'

const BuyingJourney = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-20">
            <div className="flex items-center justify-center bg-[#77726b] mb-10 py-10 w-full">
                <h1 className="text-6xl font-bold text-white">
                    Buying Journey
                </h1>
            </div>
                <div className="flex flex-col lg:flex-row items-center w-full">
                    <div className="grid grid-cols-3 lg:flex lg:justify-evenly mb-2 w-full">
                        {data.map((step) => {
                            return (
                                <div
                                    className="flex flex-col items-center py-8"
                                    key={step.id}
                                >
                                    <span className="text-6xl lg:text-4xl font-bold">
                                        {step.id}
                                    </span>
                                    <span className="text-center text-2xl lg:text-xl font-semibold mt-2">
                                        {step.heading}
                                    </span>
                                    <span className="text-center text-lg lg:text-sm text-gray-500">
                                        {step.subHeading}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="hidden lg:flex justify-between items-center w-full container mx-auto mt-2">
                    <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                    <span className="w-1/6 border-b-2 border-gray-300"></span>
                    <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                    <span className="w-1/6 border-b-2 border-gray-300"></span>
                    <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                    <span className="w-1/6 border-b-2 border-gray-300"></span>
                    <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                    <span className="w-1/6 border-b-2 border-gray-300"></span>
                    <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                    <span className="w-1/6 border-b-2 border-gray-300"></span>
                    <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                </div>
            </div>
    )
}

export default BuyingJourney
