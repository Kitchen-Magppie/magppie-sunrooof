import { useMemo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { _, TCustomerComponentComparisonDataItem } from '../../../types'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/keyboard'
import 'swiper/css/navigation'
import { Mousewheel, Navigation, Keyboard, Scrollbar } from 'swiper/modules'

const BeforeAfter = (props: TProps) => {
    const images = useMemo(
        () => _.values(props.item?.flatMap((item) => _.values(item.image))),
        [props.item]
    )
    return (
        <div className="container max-w-7xl py-20 w-full mx-auto">
            <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-5xl pb-5 w-full px-4">
                    Witness the change After{' '}
                    <span className="font-bold">SUNROOOF</span>
                </h1>
            </div>
            <div className="flex">
                <Swiper
                    grabCursor={true}
                    slidesPerView={2}
                    centeredSlides={false}
                    slidesPerGroup={2}
                    spaceBetween={30}
                    modules={[Mousewheel, Keyboard, Scrollbar, Navigation]}
                    className="mySwiper"
                    scrollbar={{ draggable: true }}
                >
                    {images.map((image, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="flex items-center mx-10 w-full h-full">
                                    <LazyLoadImage
                                        key={index}
                                        effect="blur"
                                        src={image}
                                        className="my-10 rounded-lg shadow-md object-cover"
                                        alt=""
                                    />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}
type TProps = { item: TCustomerComponentComparisonDataItem[] }

export default BeforeAfter
