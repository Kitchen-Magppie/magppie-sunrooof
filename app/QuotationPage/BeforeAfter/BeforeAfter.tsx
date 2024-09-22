import { LazyLoadImage } from 'react-lazy-load-image-component'
// import { images } from './data'
import { QuotationMock as _data, MOCK_TO_FIREBASE_SCHEMA } from "../../cms/mocks"

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/keyboard'
import 'swiper/css/navigation'
import {
    Mousewheel,
Navigation,
    Keyboard,
    Scrollbar,
} from 'swiper/modules'

const _images = Object.values(_data.Comparison)?.flatMap((item) => Object.values(item))

const BeforeAfter = () => {
    console.log(MOCK_TO_FIREBASE_SCHEMA())
    return (
        <div className="container max-w-7xl py-20 w-full mx-auto">
            <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-5xl pb-5 w-full px-4">
                    Witness the change After{' '}
                    <span className="font-bold">SUNROOF</span>
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
                    {_images.map((image, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="flex items-center mx-10 w-full h-full">
                                    <LazyLoadImage
                                        key={index}
                                        effect="blur"
                                        src={image}
                                        className="my-10 rounded-lg shadow-md"
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

export default BeforeAfter;
