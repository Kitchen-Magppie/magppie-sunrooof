import { LazyLoadImage } from 'react-lazy-load-image-component'
import { features } from './data'
import Logo from '../../../assets/logo-black-text.png'

const Features = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full container lg:mx-auto mx-4 py-20">
            <div className='flex flex-col items-center justify-center mb-10'>
                <img src={Logo} alt="" className='w-96' />
                <h1 className='text-4xl'>benefits for offices</h1>
            </div>
            <div className='flex items-center justify-evenly w-full'>
                {features.map((feature) => {
                    return (
                        <div
                            key={feature.id}
                            className="flex flex-col mb-10 lg:items-center lg:text-center"
                        >
                            <LazyLoadImage
                                effect="blur"
                                src={feature.img}
                                className="h-40 w-40"
                                alt=""
                            />
                            <h1 className="text-4xl lg:text-3xl pt-3">
                                {feature.heading}
                            </h1>
                            <p className="pt-3 lg:text-base text-2xl">
                                {feature.content}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Features
