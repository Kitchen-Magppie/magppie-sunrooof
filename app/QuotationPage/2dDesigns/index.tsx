import { useCallback, useMemo, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ProposedLayout from './/ProposedLayout'
import CustomerLayout from './CustomerLayout'
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

const Layout2dDesign = (props: TProps) => {
    const leftImagesLength = props.item.data.map((item) => {
        return item.leftImage
    })
    // console.log(props)
    const [selectedLayout, setSelectedLayout] = useState(0)
    const [swiperInstance, setSwiperInstance] = useState(null)

    const isMobile = useMedia('(orientation: portrait)')

    const onNext = useCallback(() => {
        if (swiperInstance && selectedLayout < props.item.data.length - 1) {
            swiperInstance.slideNext()
            setSelectedLayout(selectedLayout + 1)
        }
    }, [swiperInstance, selectedLayout, props.item.data.length])

    const onPrev = useCallback(() => {
        if (swiperInstance && selectedLayout > 0) {
            swiperInstance.slidePrev()
            setSelectedLayout(selectedLayout - 1)
        }
    }, [swiperInstance, selectedLayout])

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
                    {props.item.data.map((image, i) => {
                        return (
                            <SwiperSlide
                                key={i}
                                className="flex items-center justify-center h-full !w-full"
                            >
                                <div>
                                    <div className="swiper-zoom-container flex flex-col mb-4">
                                        <h1 className="text-4xl mb-2">
                                            Customer Layout
                                        </h1>
                                        <LazyLoadImage
                                            effect="blur"
                                            src={image.leftImage}
                                            alt=""
                                            className="block w-screen h-full object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col  swiper-zoom-container">
                                        <h1 className="text-4xl mb-2">
                                            Proposed Layout
                                        </h1>
                                        <LazyLoadImage
                                            effect="blur"
                                            src={image.rightImage}
                                            alt=""
                                            className="block w-screen h-full object-contain"
                                        />
                                    </div>
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
                        {props.item.data.map((image, j) => {
                            return (
                                <SwiperSlide
                                    key={j}
                                    className="flex items-center justify-center h-full !w-full container mx-auto max-w-7xl"
                                >
                                    <div className="flex flex-col h-full swiper-zoom-container">
                                        <div className="flex items-center justify-center w-full">
                                            <div className="mb-2 mt-4 text-2xl lg:text-lg">
                                                <span>Area Name :</span>{' '}
                                                {image.areaName}
                                            </div>
                                        </div>
                                        <div className="">
                                            <LazyLoadImage
                                                effect="blur"
                                                src={image.rightImage}
                                                alt=""
                                            />
                                        </div>

                                        <div className="flex justify-end w-full mt-2">
                                            <div className="mr-2 text-2xl lg:text-lg">
                                                <span>Design :</span>{' '}
                                                {image.design}
                                            </div>
                                            <div className="mr-4 text-2xl lg:text-lg">
                                                <span>Finish :</span>{' '}
                                                {image.finish}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <div className="flex items-center justify-center flex-col gap-8">
                        {selectedLayout > 0 && (
                            <ArrowUpIcon
                                onClick={() => onPrev()}
                                className="text-white p-2 w-16 fill-[#78746c] cursor-pointer"
                            />
                        )}
                        {selectedLayout < props.item.data?.length - 1 && (
                            <ArrowDownIcon
                                onClick={() => onNext()}
                                className="text-white p-2 w-16 fill-[#78746c] cursor-pointer"
                            />
                        )}
                    </div>
                </>
            )
        }
    }, [isMobile, onNext, onPrev, props.item.data, selectedLayout])

    return (
        <div
            className="flex flex-col justify-center items-center py-20 bg-gray-100 min-h-screen"
            id="2d"
        >
            <h1 className="text-6xl pb-16 w-full text-center uppercase text-[#78746c]">
                2D Designs
            </h1>
            {isMobile ? (
                <div className="flex gap-4 flex-col lg:flex-row container mx-auto">
                    <div className="flex">{renderSwiper}</div>
                    <CustomerLayout
                        item={props.item.data[selectedLayout]}
                        // selectedLayout={selectedLayout}
                        // isMobile={isMobile}
                    />
                    {leftImagesLength.length === 1 ? (
                        <ProposedLayout item={props.item.data} />
                    ) : null}
                </div>
            ) : (
                <div className="flex max-h-[46rem] gap-4 flex-col container mx-auto max-w-6xl lg:flex-row w-screen">
                    <ProposedLayout item={props.item.data} />
                    <div className="flex">{renderSwiper}</div>
                    <CustomerLayout
                        item={props.item.data[selectedLayout]}
                        // isMobile={isMobile}
                    />
                </div>
            )}
        </div>
    )
}

type TProps = { item: TCustomerComponentDesign2DItem }
export default Layout2dDesign
