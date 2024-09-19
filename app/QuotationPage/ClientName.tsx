import { QuotationMock as _data } from "../cms/mocks"
const ClientName = () => {

    return (
        <div className="bg-[#1b1a1a] text-white h-[800px] flex flex-col justify-center items-center w-full text-center">
            <h1 className="text-8xl italic">{_data.Client.remerk}</h1>
            <h1 className="text-6xl py-10">{_data.Client.name}</h1>
        </div>
    )
}

export default ClientName
