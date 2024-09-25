import { QuotationMock as _data } from '../cms/mocks'

const Hero = () => {
    return (
        <div className="flex flex-col pt-20 justify-center items-center min-h-screen w-full bg-[#1B1A1A] text-white">
            <div className="flex flex-col text-center">
                <h1 className="text-5xl lg:text-7xl uppercase">
                    {_data.Client.remark}
                </h1>
                <hr className="bg-white w-[600px] lg:w-[900px] h-1 mt-4 rounded-full lg:mt-2" />
                <h1 className="text-6xl py-10">{_data.Client.name}</h1>
            </div>
            <div className="flex flex-col text-center mt-10">
                <p className=" text-5xl lg:text-7xl mb-2 font-cursive">
                    engineered in
                </p>
                <h1 className=" text-5xl mt-1 lg:text-7xl pb-1">GERMANY</h1>
                <p className=" text-5xl mt-1 lg:text-7xl pb-1 font-cursive">
                    assembled in{' '}
                </p>
                <h1 className="text-5xl mt-1 lg:text-7xl">INDIA</h1>
            </div>
            {/* <div className="flex flex-col text-center">
                <p className=" text-6xl lg:text-8xl font-cursive">
                    engineered in <span className="font-sans">GERMANY</span>{' '}
                    assembled in
                    <span className="font-sans"> INDIA</span>
                </p> */}
                {/* <h1 className=" text-6xl mt-1 lg:text-8xl pb-1"></h1>
                <p className=" text-6xl mt-1 lg:text-8xl pb-1 font-cursive"></p>
                <h1 className="text-6xl mt-1 lg:text-8xl"></h1> */}
            {/* </div> */}
        </div>
    )
}

export default Hero
