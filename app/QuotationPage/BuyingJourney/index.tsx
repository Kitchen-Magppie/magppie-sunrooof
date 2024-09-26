import { data } from './data'

const BuyingJourney = () => {
    return (
        <>
            <div className="w-full hidden lg:flex flex-col items-center justify-center py-20">
                {/* Header */}
                <div className="flex items-center justify-center bg-[#1E1E1E] mb-10 py-10 w-full">
                    <h1 className="text-7xl font-bold text-white">
                        Buying Journey
                    </h1>
                </div>

                {/* Timeline Container */}
                <div className="relative w-full container max-w-7xl py-10">
                    {/* Horizontal Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 mt-[6px] bg-gray-300"></div>

                    {/* Dots and Line */}
                    <div className="absolute top-1/2 left-0 w-full flex justify-between items-center">
                        {data.map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center"
                            >
                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                            </div>
                        ))}
                    </div>

                    {/* Steps Container */}
                    <div className="grid grid-cols-6 gap-4 w-full relative place-items-center">
                        {data.map((step, index) => {
                            const isOdd = index % 2 === 0
                            const one = index === 0
                            const two = index === 1
                            const three = index === 2
                            const four = index === 3
                            const five = index === 4
                            const six = index === 5
                            return (
                                <div
                                    key={step.id}
                                    className={`col-span-1 flex flex-col items-center ${
                                        isOdd ? 'mb-44' : 'mt-60'
                                    } ${one ? 'mr-44 w-60' : ''} ${
                                        two ? 'mr-28 w-60 mb-10' : ''
                                    } ${three ? 'mr-10 w-60' : ''} ${
                                        four ? 'ml-8 w-60 mb-10' : ''
                                    } ${five ? 'ml-28 w-60' : ''} ${
                                        six ? 'ml-44 w-60 mb-10' : ''
                                    }`}
                                >
                                    {/* Step Text */}
                                    <div
                                        className={`flex flex-col items-center ${
                                            isOdd ? 'order-1' : 'order-2'
                                        }`}
                                    >
                                        <span className="text-6xl font-bold">
                                            {step.id}
                                        </span>
                                        <span className="text-center text-2xl font-semibold mt-2">
                                            {step.heading}
                                        </span>
                                        <span className="text-center text-lg text-gray-500">
                                            {step.subHeading}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full lg:hidden flex flex-col items-center justify-center py-20">
                <div className="flex items-center justify-center bg-[#1E1E1E] mb-10 py-10 w-full">
                    <h1 className="text-5xl text-white">
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
                                    <span className="text-center text-2xl font-semibold lg:text-xl mt-2">
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
            </div>
        </>
    )
}

export default BuyingJourney
