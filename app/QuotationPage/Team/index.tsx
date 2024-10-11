import { LazyLoadImage } from 'react-lazy-load-image-component'
import { team } from './data'
import leftArrow from '../assets/team/Left Arrow-min.svg'
import rightArrow from '../assets/team/Right Arrow-min.svg'
// import { FaArrowCircleLeft } from 'react-icons/fa'
// import { FaArrowCircleRight } from 'react-icons/fa'

import { Swiper, SwiperSlide } from 'swiper/react'
import { useMedia } from 'react-use'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'

// import required modules
import { Grid, Scrollbar, FreeMode, Navigation } from 'swiper/modules'

const Team = () => {
    const isMobile = useMedia('(orientation: portrait)')
    return (
        <div className="py-44 relative w-full" id="team">
            <h1 className="text-6xl pb-16 w-full text-center uppercase text-[#78746c]">
                our team
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
                    modules={[Grid, Scrollbar]}
                    className="mySwiper"
                    scrollbar={{ draggable: true }}
                >
                    {team.map((person) => {
                        return (
                            <SwiperSlide key={person.id}>
                                <div className="text-black flex flex-col items-center pb-10 gap-1">
                                    <div className="h-72 w-80 mb-48 lg:mb-4">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={person.img}
                                            alt=""
                                            className="w-full h-full rounded-3xl"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center absolute text-white bottom-14 w-full">
                                        <h1 className="text-2xl lg:text-xl font-bold">
                                            {person.name}
                                        </h1>
                                        <p className="text-2xl lg:text-xl">
                                            {person.positon}
                                        </p>
                                        <p className="text-2xl lg:text-xl">
                                            {person.country}
                                        </p>
                                    </div>
                                    <div className="absolute right-16 mt-2">
                                        <LazyLoadImage
                                            effect="blur"
                                            className="w-15 h-10 mt-2"
                                            src={person.countryLogo}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            ) : (
                <Swiper
                    slidesPerView={5}
                    grid={{
                        rows: 1,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    spaceBetween={20}
                    freeMode={true}
                    navigation={{
                        nextEl: '.arrow-right',
                        prevEl: '.arrow-left',
                    }}
                    modules={[Grid, Scrollbar, FreeMode, Navigation]}
                    className="mySwiper container mx-auto max-w-6xl 2xl:max-w-7xl"
                    scrollbar={{ draggable: true }}
                >
                    {team.map((person) => {
                        return (
                            <SwiperSlide key={person.id}>
                                <div className="text-black flex flex-col items-center pb-10 h-full">
                                    <div className="h-full w-full lg:mb-4">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={person.img}
                                            alt=""
                                            className="w-full h-full rounded-3xl"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center absolute text-white bottom-20 w-full">
                                        <h1 className="text-md font-bold">
                                            {person.name}
                                        </h1>
                                        <p className="text-md">
                                            {person.positon}
                                        </p>
                                        <p className="text-md">
                                            {person.country}
                                        </p>
                                    </div>
                                    <div className="absolute right-0 mr-4 mt-2">
                                        <LazyLoadImage
                                            effect="blur"
                                            className="w-15 h-6 mt-2"
                                            src={person.countryLogo}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            )}
            {!isMobile && (
                <div className=''>
                    <button className="arrow-left absolute top-1/2 left-28 2xl:left-64 transform -translate-y-1/2 z-20 ml-2 mt-10 cursor-pointer">
                        <img src={leftArrow} className="h-10 w-10" alt="" />
                    </button>
                    <button className="arrow-right absolute top-1/2 right-28 2xl:right-64 transform -translate-y-1/2 z-20 mr-2 mt-10 cursor-pointer">
                        <img src={rightArrow} className="h-10 w-10" alt="" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default Team
