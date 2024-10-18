import { LazyLoadImage } from 'react-lazy-load-image-component'
import Logo from '../assets/logo-final.svg'
import threeLines from '../assets/three-lines.png'
import './index.css'
import bgImage from '../assets/features/Background.jpg'
import leftArrow from "../assets/team/Left Arrow-min.svg"
import rightArrow from "../assets/team/Right Arrow-min.svg"

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper/modules'
import { TCustomerComponentFeatureItem } from '../../../types'
import { useMemo } from 'react'
import { COMPONENT_FEATURE_DATA_OPTIONS } from '../../cms/mocks/feature'

const Features = ({ item }: TProps) => {
    const currentItem = useMemo(
        () =>
            COMPONENT_FEATURE_DATA_OPTIONS?.find(
                (option) => option.value === item.data
            ),
        [item.data]
    )

    return (
        <div
            id="features"
            style={{ backgroundImage: `url(${bgImage})` }}
            className="bg-cover bg-center bg-no-repeat py-24"
        >
            <div className="hidden lg:flex flex-col items-center justify-center w-full container mx-auto px-4">
                <div className="flex flex-col mb-24 items-center justify-center text-center">
                    <div className='w-96 h-20'>
                        <img src={Logo} alt="Company Logo" className="h-full w-full" />
                    </div>
                    <h1 className="text-3xl font-medium capitalize">
                        {/* Benefits for offices */}
                        {currentItem.header}
                    </h1>
                </div>
                <div className="flex text-center flex-col items-center lg:flex-row w-full">
                    {currentItem.benefits.map((feature, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center w-full justify-center mb-10 text-start lg:w-1/3 md:w-1/2 px-4 lg:items-center lg:text-center"
                        >
                            <div className="h-20 w-20 lg:h-40 lg:w-40 object-cover">
                                <LazyLoadImage
                                    effect="blur"
                                    src={feature.image}
                                    className="w-full h-full"
                                    alt={feature.iconUrl}
                                />
                            </div>
                            <h2 className="text-4xl lg:text-xl pt-4 font-medium mb-1">
                                {feature.title}
                            </h2>
                            <p className="pt-2 text-2xl lg:text-base">
                                {feature.subtitle}
                            </p>
                        </div>
                    ))}
                </div>
                <img className="mt-20" src={threeLines} alt="" />
            </div>
            <div className="flex flex-col lg:hidden py-20 container mx-auto w-full">
                <div className="flex flex-col items-center justify-center mb-32 text-center">
                    <img src={Logo} alt="Company Logo" className="w-96" />
                    <h1 className="text-3xl font-medium capitalize">
                        {currentItem.header}
                    </h1>
                </div>
                <div className="flex">
                    <Swiper
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                        pagination={{
                            dynamicBullets: false,
                        }}
                        navigation={{
                            nextEl: '.arrow-right',
                            prevEl: '.arrow-left',
                        }}
                    >
                        {currentItem.benefits.map((feature, i) => (
                            <SwiperSlide key={i}>
                                <div className="flex flex-col items-center w-full justify-center text-center mb-10 px-4 lg:items-center lg:text-center">
                                    <div className="h-44 w-44 lg:h-40 lg:w-40 object-cover">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={feature.image}
                                            className="w-full h-full"
                                            alt={feature.iconUrl}
                                        />
                                    </div>
                                    <h2 className="text-4xl lg:text-xl pt-4 font-medium mb-3">
                                        {feature.title}
                                    </h2>
                                    <p className="pt-2 text-2xl lg:text-base mb-5">
                                        {feature.subtitle}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <>
                        <button className="arrow-left absolute top-2/2 left-0 transform -translate-y-1/2 z-50 ml-20 mt-28 cursor-pointer">
                            <img src={leftArrow} className="h-16 w-16" alt="" />
                        </button>
                        <button className="arrow-right absolute top-2/2 right-0 transform -translate-y-1/2 z-50 mr-20 mt-28 cursor-pointer">
                            <img
                                src={rightArrow}
                                className="h-16 w-16"
                                alt=""
                            />
                        </button>
                    </>
                </div>
            </div>
        </div>
    )
}
type TProps = { item: TCustomerComponentFeatureItem }

export default Features
