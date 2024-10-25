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
import { Grid, Scrollbar, FreeMode, Navigation, Mousewheel } from 'swiper/modules'

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
                    mousewheel={true}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[Grid, Scrollbar, Mousewheel]}
                    className="mySwiper container mx-auto max-w-2xl"
                    scrollbar={{ draggable: true }}
                >
                    {team.map((person) => {
                        return (
                            <SwiperSlide key={person.id}>
                                <div className="text-black relative flex flex-col items-center pb-10 gap-1">
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
                                    <div className="absolute right-4 top-4">
                                        <LazyLoadImage
                                            effect="blur"
                                            className="w-15 h-10"
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
                <div className="flex items-center">
                    <button className="arrow-left transform -translate-y-1/2 z-20 ml-auto cursor-pointer mr-4">
                        <img src={leftArrow} className="h-10 w-10" alt="" />
                    </button>
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
                        className="mySwiper container max-w-6xl 2xl:max-w-7xl mx-0"
                        scrollbar={{ draggable: true }}
                    >
                        {team.map((person) => {
                            return (
                                <SwiperSlide key={person.id}>
                                    <div className="text-black flex relative flex-col items-center pb-10 h-full">
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
                                        <div className="absolute right-4 top-2">
                                            <LazyLoadImage
                                                effect="blur"
                                                className="w-15 h-6"
                                                src={person.countryLogo}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <button className="arrow-right transform -translate-y-1/2 z-20 mr-auto cursor-pointer ml-4">
                        <img src={rightArrow} className="h-10 w-10" alt="" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default Team
