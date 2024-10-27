import { LazyLoadImage } from 'react-lazy-load-image-component'
import { clientsDesktop, clientsMobile } from './data'
import { useMedia } from 'react-use'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'

// import required modules
import { Grid, FreeMode, Scrollbar } from 'swiper/modules'

const Clients = () => {
    const isMobile = useMedia('(orientation: portrait)')
    return (
        <div className="bg-[#77726c] text-white py-20" id="clients">
            <h1 className="text-5xl lg:text-6xl text-center pb-10 mx-5">
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
                    scrollbar={{ draggable: true }}
                    modules={[Grid, FreeMode, Scrollbar]}
                    className="mySwiper container max-w-2xl"
                >
                    {clientsMobile.map((client) => {
                        return (
                            <SwiperSlide key={client.id}>
                                <div className="flex flex-col items-center pb-10 gap-1">
                                    <div className="h-72 w-72 lg:mb-4">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={client.img}
                                            alt=""
                                            className="w-full h-full rounded-3xl"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-6 container mx-auto max-w-xl lg:max-w-7xl gap-5">
                    {clientsDesktop.map((client) => {
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
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Clients
