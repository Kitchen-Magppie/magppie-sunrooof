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

    // split array into rows of 4 so we can center the last (incomplete) row
    type Client = { id: number; img: string; alt: string }

    const chunkArray = (arr: Client[], size: number): Client[][] => {
        const chunks: Client[][] = []
        for (let i = 0; i < arr?.length; i += size) {
            chunks.push(arr?.slice(i, i + size))
        }
        return chunks
    }

    const firstRow = clientsDesktop?.slice(0, 4)
    const restRows = chunkArray(clientsDesktop?.slice(4), 4)

    return (
        <div className="bg-[#77726c] text-white py-20" id="clients">
            <h1 className="text-5xl lg:text-6xl text-center pb-10 mx-5">
                The ones who chose <span className="font-bold">SUNROOOF</span>
            </h1>
            {isMobile ? (
                <Swiper
                    slidesPerView={2}
                    grid={{
                        rows: 2,
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
                            <SwiperSlide key={client?.id}>
                                <div className="flex flex-col items-center pb-10 gap-1">
                                    <div className="h-72 w-72 lg:mb-4">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={client?.img}
                                            alt={client?.alt || ''}
                                            className="w-full h-full rounded-3xl"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            ) : (
                <div className="container mx-auto max-w-xl lg:max-w-7xl space-y-5">
                    {/* first row: up to 4 items */}
                    <div className="flex justify-center flex-wrap gap-5">
                        {firstRow.map((client) => (
                            <div
                                key={client?.id}
                                className="flex justify-center w-1/2 lg:w-auto"
                            >
                                <div className="w-40 lg:w-56 text-white flex flex-col items-center justify-center text-center pb-5">
                                    <LazyLoadImage
                                        effect="blur"
                                        className="w-full h-auto mb-2 shadow-md rounded-3xl"
                                        src={client?.img}
                                        alt={client?.alt || ''}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* remaining rows (centered) */}
                    {restRows?.map((row, idx) => (
                        <div
                            key={idx}
                            className="flex justify-center flex-wrap gap-5"
                        >
                            {row.map((client) => (
                                <div
                                    key={client?.id}
                                    className="flex justify-center w-1/2 lg:w-auto"
                                >
                                    <div className="w-40 lg:w-56 text-white flex flex-col items-center justify-center text-center pb-5">
                                        <LazyLoadImage
                                            effect="blur"
                                            className="w-full h-auto mb-2 shadow-md rounded-3xl"
                                            src={client?.img}
                                            alt={client?.alt || ''}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Clients
