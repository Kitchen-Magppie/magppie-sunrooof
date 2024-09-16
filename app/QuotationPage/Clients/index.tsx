import { LazyLoadImage } from 'react-lazy-load-image-component'
import { clients } from './data'

const Clients = () => {
    return (
        <div className="bg-[#78746c] py-20">
            <h1 className="text-white font-bold text-5xl text-center pb-10">
                From those who love us
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-6 container mx-auto max-w-xl lg:max-w-7xl gap-5">
                {clients.map((client) => {
                    return (
                        <div className="text-white flex flex-col items-center justify-center text-center pb-5" key={client.id}>
                            <LazyLoadImage effect='blur' className='mb-2' src={client.img} alt="" />
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
