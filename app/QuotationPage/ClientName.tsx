import { TCustomerComponentClientItem } from '../../types'
import singleLine from './assets/singleLine.png'

const ClientName = (props: TProps) => {
    return (
        <div className="bg-[#1b1a1a] text-white h-[800px] flex flex-col justify-center items-center w-full text-center">
            <h1 className="text-8xl font-cursive">{props.item.data.description}</h1>
            <img className='mt-10' src={singleLine} alt="" />
            <h1 className="text-6xl py-10">{props.item.data.name}</h1>
        </div>
    )
}

type TProps = { item: TCustomerComponentClientItem }
export default ClientName
