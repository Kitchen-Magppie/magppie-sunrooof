import { LazyLoadImage } from 'react-lazy-load-image-component'
import { features } from './data'
import Logo from '../../../assets/logo-black-text.png'
import threeLines from '../assets/three-lines.png'

const Features = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full container mx-auto max-w-8xl py-20 px-4">
            <div className="flex flex-col items-center justify-center mb-10 text-center">
                <img src={Logo} alt="Company Logo" className="w-96" />
                <h1 className="text-4xl font-semibold capitalize">
                    Benefits for offices
                </h1>
            </div>
            <div className="flex text-center justify-between w-full">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className="flex flex-col mb-10 items-center text-center lg:w-1/3 md:w-1/2 px-4"
                    >
                        <LazyLoadImage
                            effect="blur"
                            src={feature.img}
                            className="h-40 w-40 object-cover hover:scale-105 transition-transform duration-300"
                            alt={feature.heading}
                        />
                        <h2 className="text-2xl lg:text-xl pt-4 font-medium">
                            {feature.heading}
                        </h2>
                        <p className="pt-2 text-lg lg:text-base">
                            {feature.content}
                        </p>
                    </div>
                ))}
            </div>
            <img src={threeLines} alt="" />
        </div>
    )
}

export default Features
