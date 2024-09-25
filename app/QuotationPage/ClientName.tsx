import { TCustomerComponentClientItem } from '../../types'

const ClientName = (props: TProps) => {
    return (
        <div className="bg-[#1B1A1A] text-white h-[800px] flex flex-col justify-center items-center w-full text-center">
            <h1 className="text-8xl font-cursive uppercase">{props.item.data.description}</h1>
            <hr className='bg-white text-white w-[1150px] h-1 mt-2' />
            <h1 className="text-6xl py-10">{props.item.data.name}</h1>
        </div>
    )
}

type TProps = { item: TCustomerComponentClientItem }
export default ClientName
