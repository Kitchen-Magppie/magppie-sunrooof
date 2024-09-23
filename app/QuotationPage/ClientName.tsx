import { QuotationMock as _data } from '../cms/mocks'

const ClientName = () => {
    return (
        <div className="bg-[#1B1A1A] text-white h-[800px] flex flex-col justify-center items-center w-full text-center">
            <h1 className="text-8xl font-cursive uppercase">{_data.Client.remark}</h1>
            <hr className='bg-white text-white w-[1150px] h-1 mt-2' />
            <h1 className="text-6xl py-10">{_data.Client.name}</h1>
        </div>
    )
}

export default ClientName
