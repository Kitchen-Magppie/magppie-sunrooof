import { clients } from './data'

const Clients = () => {
    return (
        <div className="bg-[#78746c] py-20">
            <h1 className="text-white font-bold text-5xl text-center pb-10">
                From those who love us
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-6 container mx-auto">
                {clients.map((client) => {
                    return (
                        <div className="text-white flex flex-col items-center pb-5">
                            <img src={client.img} alt="" />
                            <h1>{client.heading}</h1>
                            <p>{client.subHeading}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Clients
