import { LazyLoadImage } from 'react-lazy-load-image-component'
import { clients } from './data'
import { useMedia } from 'react-use'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'

// import required modules
import { Grid, FreeMode } from 'swiper/modules'

const Clients = () => {
    const isMobile = useMedia('(orientation: portrait)')
    return (
        <div className="bg-[#f9f5ef] py-20" id="clients">
            <h1 className="text-black text-6xl text-center pb-10">
                The ones who chose <span className="font-bold">SUNROOOF</span>
            </h1>
            {isMobile ? (
                <Swiper
                    slidesPerView={2}
                    grid={{
                        rows: 3,
                        fill: 'row',
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[Grid, FreeMode]}
                    className="mySwiper container max-w-2xl"
                >
                    {clients.map((client) => {
                        return (
                            <SwiperSlide key={client.id}>
                                <div className="text-black flex flex-col items-center pb-10 gap-1">
                                    <div className="h-72 w-72 lg:mb-4">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={client.img}
                                            alt=""
                                            className="w-full h-full rounded-3xl"
                                        />
                                    </div>
                                    {/* <div className="mt-10 flex flex-col items-center">
                                        <h1 className="text-2xl lg:text-xl font-bold">
                                            {person.name}
                                        </h1>
                                        <p className="text-2xl lg:text-xl">
                                            {person.positon}
                                        </p>
                                        <p className="text-2xl lg:text-xl">
                                            {person.country}
                                        </p>
                                        <LazyLoadImage
                                            effect="blur"
                                            className="w-15 h-10 mt-2"
                                            src={person.countryLogo}
                                            alt=""
                                        />
                                    </div> */}
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-6 container mx-auto max-w-xl lg:max-w-7xl gap-5">
                    {clients.map((client) => {
                        return (
                            <div
                                className="text-white flex flex-col items-center justify-center text-center pb-5"
                                key={client.id}
                            >
                                <LazyLoadImage
                                    effect="blur"
                                    className="mb-2 shadow-md rounded-3xl"
                                    src={client.img}
                                    alt=""
                                />
                                {/* <h1>{client.heading}</h1>
                            <p>{client.subHeading}</p> */}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Clients
