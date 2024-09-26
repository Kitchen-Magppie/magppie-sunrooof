import { useCallback, useMemo, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ProjectDetails from './ProjectDetails'
// import twoD from '../assets/2d1.png'
// import twoDtwo from '../assets/2d2.png'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/keyboard'
import 'swiper/css/navigation'
import 'swiper/css/zoom'
import { Mousewheel, Scrollbar, Zoom } from 'swiper/modules'

//Icons
// @ts-expect-error svg-issue
import ArrowUpIcon from '../../../assets/icons/arrowUp.svg?react'
// @ts-expect-error svg-issue
import ArrowDownIcon from '../../../assets/icons/arrowDown.svg?react'

//hooks
import { useMedia } from 'react-use'
import { TCustomerComponentDesign2DItem } from '../../../types'

// const _images = [twoD, twoDtwo]

type TProps = { item: TCustomerComponentDesign2DItem }
const Layout2dDesign = (props: TProps) => {
    const [selectedLayout, setSelectedLayout] = useState(0)
    const [swiperInstance, setSwiperInstance] = useState(null)

    const isMobile = useMedia('(orientation: portrait)')

    const onNext = useCallback(() => {
        if (swiperInstance) {
            swiperInstance.slideNext()
            setSelectedLayout(1)
        }
    }, [swiperInstance])

    const onPrev = useCallback(() => {
        if (swiperInstance) {
            swiperInstance.slidePrev()
            setSelectedLayout(0)
        }
    }, [swiperInstance])

    const renderSwiper = useMemo(() => {
        // console.log('🚀 ~ renderSwiper ~ isMobile:', isMobile)
        if (isMobile) {
            return (
                <Swiper
                    grabCursor={true}
                    slidesPerView={1}
                    mousewheel={true}
                    direction={'horizontal'}
                    centeredSlides={true}
                    spaceBetween={30}
                    zoom={true}
                    modules={[Mousewheel, Scrollbar, Zoom]}
                    className=""
                    scrollbar={{ draggable: true }}
                    onSwiper={setSwiperInstance}
                    onSlideChange={(swiper) =>
                        setSelectedLayout(swiper.activeIndex)
                    }
                >
                    {props.item.data.map((item, index) => {
                        return (
                            <SwiperSlide
                                key={index}
                                className="flex items-center justify-center h-full !w-full mb-16"
                            >
                                <div className="border border-white swiper-zoom-container">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={item.rightImage}
                                        alt=""
                                        className="block w-[900px] h-full object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            )
        } else {
            return (
                <>
                    <Swiper
                        grabCursor={true}
                        slidesPerView={1}
                        mousewheel={true}
                        direction={'vertical'}
                        centeredSlides={true}
                        spaceBetween={30}
                        zoom={true}
                        modules={[Mousewheel, Scrollbar, Zoom]}
                        className="w-full h-full pb-10"
                        scrollbar={{ draggable: true }}
                        onSwiper={setSwiperInstance}
                        onSlideChange={(swiper) =>
                            setSelectedLayout(swiper.activeIndex)
                        }
                    >
                        {props.item.data.map((image, index) => {
                            return (
                                <SwiperSlide
                                    key={index}
                                    className="flex items-center justify-center"
                                >
                                    <div className="border border-white swiper-zoom-container">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={image.leftImage}
                                            alt=""
                                            className="block w-full h-full object-contain lg:min-h-[40rem]"
                                        />
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <div className="flex items-center justify-center flex-col gap-8">
                        {selectedLayout > 0 && (
                            <ArrowUpIcon
                                onClick={() => onPrev()}
                                className="text-white p-2 w-20 fill-[#78746c]"
                            />
                        )}
                        {selectedLayout < props.item.data?.length - 1 && (
                            <ArrowDownIcon
                                onClick={() => onNext()}
                                className="text-white p-2 w-20 fill-[#78746c]"
                            />

                        )}
                    </div>
                </>
            )
        }
    }, [isMobile, onNext, onPrev, props.item.data, selectedLayout])

    return (
        <div
            className="flex flex-col justify-center items-center py-20 px-4"
            id="2d"
        >
            <h1 className="text-5xl mb-12">2D Designs</h1>
            {isMobile ? (
                <div className="flex max-h-[40rem] gap-4 flex-col lg:flex-row">
                    <div className="flex">{renderSwiper}</div>
                    <ProjectDetails
                        item={props.item.data[selectedLayout]}
                    // selectedLayout={selectedLayout}
                    // isMobile={isMobile}
                    />
                </div>
            ) : (
                <div className="flex max-h-[40rem] gap-4 flex-col lg:flex-row">
                    <ProjectDetails
                        item={props.item.data[selectedLayout]}
                    // isMobile={isMobile}
                    />
                    <div className="flex">{renderSwiper}</div>
                </div>
            )}
        </div>
    )
}

export default Layout2dDesign
