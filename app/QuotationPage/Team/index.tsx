import { LazyLoadImage } from 'react-lazy-load-image-component'
import { team } from './data'

import { Swiper, SwiperSlide } from 'swiper/react'
import { useMedia } from 'react-use'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'

// import required modules
import { Grid, FreeMode } from 'swiper/modules'

const Team = () => {
    const isMobile = useMedia('(orientation: portrait)')
    return (
        // <div
        //     className="py-20 flex flex-col justify-center items-center"
        //     id="team"
        // >
        //     <h1 className="text-5xl pb-10 w-full text-center font-bold uppercase text-[#78746c]">
        //         our team
        //     </h1>
        //     <div className="grid grid-cols-2 lg:grid-cols-4 container mx-auto max-w-xl lg:max-w-7xl gap-4">
        //         {team.map((person) => {
        //             return (
        //                 <div
        //                     className="text-black flex flex-col items-center pb-10 gap-1"
        //                     key={person.id}
        //                 >
        //                     <div className="w-48 max-w-48 lg:w-36 lg:max-w-36 h-[200px] max-h-[200px] mb-24 lg:mb-4">
        //                         <LazyLoadImage
        //                             effect="blur"
        //                             src={person.img}
        //                             alt=""
        //                             className="w-full h-full rounded-3xl"
        //                         />
        //                     </div>
        //                     <h1 className="text-2xl lg:text-xl font-bold">
        //                         {person.name}
        //                     </h1>
        //                     <p className="text-2xl lg:text-xl">
        //                         {person.positon}
        //                     </p>
        //                     <p className="text-2xl lg:text-xl">
        //                         {person.country}
        //                     </p>
        //                     <LazyLoadImage
        //                         effect="blur"
        //                         className="w-15 h-10 mt-2"
        //                         src={person.countryLogo}
        //                         alt=""
        //                     />
        //                 </div>
        //             )
        //         })}
        //     </div>
        // </div>
        <>
            <div className="py-20 container mx-auto lg:max-w-7xl">
                <h1 className="text-5xl pb-10 w-full text-center font-bold uppercase text-[#78746c]">
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
                        modules={[Grid, FreeMode]}
                        className="mySwiper"
                    >
                        {team.map((person) => {
                            return (
                                <SwiperSlide key={person.id}>
                                    <div className="text-black flex flex-col items-center pb-10 gap-1">
                                        <div className="h-64 w-64 mb-24 lg:mb-4">
                                            <LazyLoadImage
                                                effect="blur"
                                                src={person.img}
                                                alt=""
                                                className="w-full h-full rounded-3xl"
                                            />
                                        </div>
                                        <div className="mt-10 flex flex-col items-center">
                                            <h1 className="text-2xl lg:text-xl font-bold">
                                                {person.name}
                                            </h1>
                                            <p className="text-2xl lg:text-xl">
                                                {person.positon}
                                            </p>
                                            <p className="text-2xl lg:text-xl">
                                                {person.country}
                                            </p>
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
                        slidesPerView={3}
                        grid={{
                            rows: 1,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        spaceBetween={10}
                        freeMode={true}
                        modules={[Grid, FreeMode]}
                        className="mySwiper"
                    >
                        {team.map((person) => {
                            return (
                                <SwiperSlide key={person.id}>
                                    <div className="text-black flex flex-col items-center pb-10 gap-1">
                                        <div className="h-96 w-96 mb-24 lg:mb-4">
                                            <LazyLoadImage
                                                effect="blur"
                                                src={person.img}
                                                alt=""
                                                className="w-full h-full rounded-3xl"
                                            />
                                        </div>
                                        <div className="mt-48 flex flex-col items-center">
                                            <h1 className="text-2xl lg:text-xl font-bold">
                                                {person.name}
                                            </h1>
                                            <p className="text-2xl lg:text-xl">
                                                {person.positon}
                                            </p>
                                            <p className="text-2xl lg:text-xl">
                                                {person.country}
                                            </p>
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
                )}
            </div>
        </>
    )
}

export default Team
