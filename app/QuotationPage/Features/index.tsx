import { LazyLoadImage } from 'react-lazy-load-image-component'
import { features } from './data'
import Logo from '../../../assets/logo-black-text-withoutBg.png'
import threeLines from '../assets/three-lines.png'
import './index.css'
import bgImage from '../assets/features/Background.jpg'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
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
                    <img src={Logo} alt="Company Logo" className="w-96" />
                    <h1 className="text-4xl font-semibold capitalize">
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
                                <div className=" flex flex-col text-center items-center justify-center w-full mb-2">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={feature.img}
                                        className="h-60 w-60 mb-4"
                                        alt={feature.heading}
                                    />
                                    <h2 className="text-5xl mb-2 lg:text-xl pt-4 font-medium">
                                        {feature.heading}
                                    </h2>
                                    <p className="mt-6 text-3xl lg:text-base mb-20">
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
type TProps = { item: TCustomerComponentFeatureItem }

export default Features
