import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Mousewheel, Scrollbar } from 'swiper/modules'
import { useMedia } from 'react-use'
import { CoverflowEffectOptions } from 'swiper/types'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
//====================================================================

import { TCustomerComponentDesign3DItem } from '../../../types'

const ThreedDesigns = ({ item }: TProps) => {
    const isMobile = useMedia('(orientation: portrait)')
    if (item.data?.length) {
        return (
            <div className="container max-w-5xl py-40 w-full mx-auto" id="3d">
                <div className="flex flex-col items-center justify-center mb-10 text-center">
                    <h1 className="text-6xl pb-16 w-full text-center uppercase text-[#78746c]">
                        <span>3D Designs</span>
                    </h1>
                </div>
                <div className="flex">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={isMobile ? 1.2 : 2}
                        spaceBetween={80}
                        coverflowEffect={COVERFLOW_EFFECT}
                        modules={[Mousewheel, EffectCoverflow, Scrollbar]}
                        className="mySwiper pb-20"
                        scrollbar={{ draggable: true }}
                    >
                        {item.data.map((feature, index) => (
                            <SwiperSlide
                                key={index}
                                className="bg-cover bg-center"
                            >
                                <div className="flex items-center mx-10 w-[620px] h-[620px]">
                                    <LazyLoadImage
                                        key={index}
                                        effect="blur"
                                        src={feature}
                                        className="my-10 rounded-lg shadow-md  w-[620px] h-[620px] object-cover max-w-[620px] max-h-[620px]"
                                        alt=""
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        )
    }
    return ''
}

type TProps = { item: TCustomerComponentDesign3DItem }
const COVERFLOW_EFFECT: CoverflowEffectOptions = {
    rotate: 30,
    stretch: 0,
    depth: 80,
    modifier: 1,
    slideShadows: true,
}
export default ThreedDesigns
