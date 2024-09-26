import { TCustomerComponentClientItem } from '../../types'
// import { QuotationMock as _data } from '../cms/mocks'

const Hero = (props: TProps) => {
    return (
        <div className="flex flex-col pt-20 justify-center items-center min-h-screen w-full bg-[#1B1A1A] text-white">
            <div className="flex flex-col text-center">
                <h1 className="text-5xl lg:text-7xl uppercase font-kudryashev">
                    {props.item.data.description}
                </h1>
                <hr className="bg-white h-1 mt-4 rounded-full lg:mt-2" />
                <h1 className="text-6xl py-10 font-kudryashev">{props.item.data.name}</h1>
            </div>
        </div>
    )
}
export default Hero
type TProps = { item: TCustomerComponentClientItem }
