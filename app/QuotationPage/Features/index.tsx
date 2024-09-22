import { LazyLoadImage } from 'react-lazy-load-image-component'
import { features } from './data'
import Logo from '../../../assets/logo-black-text.png'
import threeLines from '../assets/three-lines.png'
import './index.css'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

const Features = () => {
    return (
        <div id='features'>
            <div className="hidden lg:flex flex-col items-center justify-center w-full container mx-auto py-20 px-4">
                <div className="flex flex-col items-center justify-center mb-10 text-center">
                    <img src={Logo} alt="Company Logo" className="w-96" />
                    <h1 className="text-4xl font-semibold capitalize">
                        Benefits for offices
                    </h1>
                </div>
                <div className="flex text-center flex-col mt-5 items-center lg:flex-row w-full">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex flex-col items-center w-full justify-center mb-10 text-start lg:w-1/3 md:w-1/2 px-4 lg:items-center lg:text-center"
                        >
                            <LazyLoadImage
                                effect="blur"
                                src={feature.img}
                                className="h-40 w-40 object-cover hover:scale-105 transition-transform duration-300"
                                alt={feature.heading}
                            />
                            <h2 className="text-4xl lg:text-xl pt-4 font-medium">
                                {feature.heading}
                            </h2>
                            <p className="pt-2 text-2xl lg:text-base">
                                {feature.content}
                            </p>
                        </div>
                    ))}
                </div>
                <img src={threeLines} alt="" />
            </div>
            <div className="flex flex-col lg:hidden py-20 container mx-auto w-full">
                <div className="flex flex-col items-center justify-center mb-10 text-center">
                    <img src={Logo} alt="Company Logo" className="w-96" />
                    <h1 className="text-4xl font-semibold capitalize">
                        Benefits for offices
                    </h1>
                </div>
                <div className="flex">
                    <Swiper
                        modules={[Pagination]}
                        className="mySwiper"
                        pagination={{
                            dynamicBullets: true,
                        }}
                    >
                        {features.map((feature) => (
                            <SwiperSlide key={feature.id}>
                                <div className=" flex  flex-col text-center items-center justify-center w-full">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={feature.img}
                                        className="h-40 w-40"
                                        alt={feature.heading}
                                    />
                                    <h2 className="text-4xl lg:text-xl pt-4 font-medium">
                                        {feature.heading}
                                    </h2>
                                    <p className="pt-2 text-2xl lg:text-base mb-12">
                                        {feature.content}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Features
