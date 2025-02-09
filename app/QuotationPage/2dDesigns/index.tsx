import { useMemo, useState } from 'react'
import { useMedia } from 'react-use'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/keyboard'
import 'swiper/css/navigation'
import 'swiper/css/zoom'
import { Mousewheel, Scrollbar, Zoom } from 'swiper/modules'

// //Icons
// // @ts-expect-error svg-issue
// import ArrowUpIcon from '../../../assets/icons/arrowUp.svg?react'
// // @ts-expect-error svg-issue
// import ArrowDownIcon from '../../../assets/icons/arrowDown.svg?react'

//hooks
import ProposedLayout from './ProposedLayout'
import CustomerLayout from './CustomerLayout'
import { _, TCustomerComponentDesign2DItem } from '../../../types'
import { CustomImage } from '../../../components'
// import { images } from './data'


export default function Layout2dDesign(props: TProps) {
    const { item: { data } } = props;
    const [selectedLayout, setSelectedLayout] = useState(0)
    const [swiperInstance, setSwiperInstance] = useState(null)

    const isMobile = useMedia('(orientation: portrait)')

    const leftImagesLength = _.map(data, 'leftImage')

    const currentLayoutCaption = useMemo(() => {

        const currentEntries = _.get(data, `${selectedLayout}.entries`, [])
        return ({
            design: _.fromStrToSentence(_.map(currentEntries, 'design')),
            finish: _.fromStrToSentence(_.map(currentEntries, 'finish'))
        })
    }, [data, selectedLayout])

    // console.log(_.map(currentEntries, 'design'))
    // console.log(_.fromStrToSentence(props.item?.data?.flatMap((item) => item.entries?.flatMap((entry) => entry.design))?.filter((design) => design?.length)))
    // console.log(_.fromStrToSentence(props.item?.data?.flatMap((item) => item.entries?.flatMap((entry) => entry.design))?.filter((design) => design?.length)))
    // console.log(_.fromStrToSentence(props.item?.data?.flatMap((item) => item.entries?.flatMap((entry) => entry.finish))?.filter((finish) => finish?.length)))

    // console.log(_.flatMap(props.item?.data, 'entries.*.design'))

    // const onNext = useCallback(() => {
    //     if (swiperInstance && selectedLayout < props.item.data.length - 1) {
    //         swiperInstance.slideNext()
    //         setSelectedLayout(selectedLayout + 1)
    //     }
    // }, [swiperInstance, selectedLayout, props.item.data.length])

    // const onPrev = useCallback(() => {
    //     if (swiperInstance && selectedLayout > 0) {
    //         swiperInstance.slidePrev()
    //         setSelectedLayout(selectedLayout - 1)
    //     }
    // }, [swiperInstance, selectedLayout])

    console.log(data)
    const renderSwiper = useMemo(() => {
        // console.log('🚀 ~ renderSwiper ~ isMobile:', isMobile)
        if (isMobile) {
            return (
                <Swiper
                    grabCursor={true}
                    slidesPerView={1}
                    mousewheel={leftImagesLength.length > 1 ? true : false}
                    direction={'horizontal'}
                    centeredSlides={true}
                    spaceBetween={30}
                    zoom={true}
                    modules={[Mousewheel, Scrollbar, Zoom]}
                    // className={`${
                    //     leftImagesLength.length === 1
                    // } ? " overflow-y-scroll" : ""`}
                    scrollbar={{ draggable: true }}
                    onSwiper={setSwiperInstance}
                    onSlideChange={(swiper) =>
                        setSelectedLayout(swiper.activeIndex)
                    }
                >
                    {data.map((image, i) => {
                        return (<SwiperSlide
                            key={i}
                            className="flex items-center justify-center h-full !w-full"
                        >
                            <div>
                                <h2 className="text-4xl text-center mb-10 font-medium capitalize text-[#78746c]">
                                    {image.areaName}
                                </h2>
                                <div className="swiper-zoom-container flex flex-col mb-4">
                                    <div className="flex flex-col mb-4">
                                        <CustomImage src={image.leftImage}
                                            alt="blur"

                                            className="block w-screen h-full object-contain"

                                        />
                                        {/* <LazyLoadImage
                                            effect="blur"
                                            src={image.leftImage}
                                            alt=""
                                            className="block w-screen h-full object-contain"
                                        /> */}
                                        <h1 className="text-3xl mb-4 p-2 font-[400] w-full text-[#fff] text-left bg-gradient-to-t from-stone-800 via-stone-600 to-stone-400">
                                            Customer Layout
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex flex-col swiper-zoom-container">
                                    <div className="flex flex-col mb-4">
                                        <CustomImage
                                            effect="blur"
                                            src={image.rightImage}
                                            alt=""
                                            className="block w-screen h-full object-contain"
                                        />
                                    </div>
                                    <h1 className="text-3xl mb-4 p-2 font-[400] w-full text-[#fff] text-left bg-gradient-to-t from-stone-800 via-stone-600 to-stone-400">
                                        Proposed Layout
                                    </h1>
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
                        mousewheel={leftImagesLength.length > 1 ? true : false}
                        direction={'horizontal'}
                        centeredSlides={true}
                        spaceBetween={30}
                        zoom={true}
                        modules={[Mousewheel, Scrollbar, Zoom]}
                        scrollbar={{ draggable: true }}
                        onSwiper={setSwiperInstance}
                        onSlideChange={(swiper) =>
                            setSelectedLayout(swiper.activeIndex)
                        }
                    >
                        {data.map((image, i) => {
                            return (<SwiperSlide
                                key={i}
                                className="flex items-center justify-center h-full !w-full"
                            >
                                <div className="flex flex-col">
                                    <h2 className="text-3xl font-medium capitalize text-center mb-10 text-[#78746c]">
                                        {image.areaName}
                                    </h2>
                                    <div className="flex">
                                        <div className="swiper-zoom-container flex flex-col mb-4 mx-6">
                                            <h1 className="text-2xl mb-2 font-[500] text-[#78746c]">
                                                Customer Layout
                                            </h1>
                                            <div>
                                                <CustomImage
                                                    effect="blur"
                                                    src={
                                                        image.leftImage
                                                    }
                                                    alt=""
                                                    className="block w-screen h-full object-contain rounded-lg shadow-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col  swiper-zoom-container">
                                            <h1 className="text-2xl mb-2 font-[500] text-[#78746c]">
                                                Proposed Layout
                                            </h1>
                                            <div>
                                                <CustomImage
                                                    effect="blur"
                                                    src={image.rightImage}
                                                    alt=""
                                                    className="block w-screen h-full object-contain rounded-lg shadow-md"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mb-5 text-[#78746c]">
                                        <div className="mr-4 text-2xl lg:text-lg">
                                            <span className="font-semibold text-[#78746c]">
                                                Design :&nbsp;
                                            </span>
                                            {/* {image.design} */}

                                            {currentLayoutCaption.design}


                                        </div>
                                        <div className="mr-4 text-2xl lg:text-lg">
                                            <span className="font-semibold text-[#78746c]">
                                                Finish :&nbsp;
                                            </span>
                                            {currentLayoutCaption.finish}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    {/* <Swiper
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
                    > */}
                    {/* {props.item.data.map((image, j) => {
                            return (
                                <SwiperSlide
                                    key={j}
                                    className="flex items-center justify-center h-full !w-full container mx-auto max-w-7xl"
                                >
                                    <div className="flex flex-col h-full swiper-zoom-container">
                                        <div className="flex items-center justify-center w-full">
                                            <div className="mb-2 mt-4 text-2xl lg:text-lg font-bold">
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
                        })} */}
                    {/* </Swiper>
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
                    </div> */}
                </>
            )
        }
    }, [
        isMobile,
        leftImagesLength.length,
        data,
        currentLayoutCaption.design,
        currentLayoutCaption.finish
    ])

    return (
        <div
            className="flex flex-col justify-center items-center py-20 bg-gray-100 min-h-screen"
            id="2d"
        >
            <h1 className="text-6xl pb-6 w-full text-center uppercase text-[#78746c]">
                2D Designs
            </h1>
            {isMobile ? (
                <div className="flex gap-4 flex-col lg:flex-row container mx-auto">
                    <div className="flex">{renderSwiper}</div>
                    <CustomerLayout
                        caption={currentLayoutCaption}
                        item={data[selectedLayout]}
                    // selectedLayout={selectedLayout}
                    // isMobile={isMobile}
                    />
                    {leftImagesLength.length > 1 ? (
                        <ProposedLayout item={data}
                            swiper={swiperInstance}
                        />
                    ) : null}
                </div>
            ) : (
                <div className="flex flex-col gap-4 container mx-auto max-w-6xl w-screen">
                    {/* <ProposedLayout item={props.item.data} /> */}
                    <div className="flex">{renderSwiper}</div>
                    {/* <CustomerLayout
                        item={props.item.data[selectedLayout]}
                        // isMobile={isMobile}
                    /> */}
                    {leftImagesLength.length > 1 ? (
                        <ProposedLayout item={props.item.data}
                            swiper={swiperInstance}
                        />
                    ) : null}
                </div>
            )}
        </div>
    )
}

type TProps = { item: TCustomerComponentDesign2DItem }
