import { LazyLoadImage } from 'react-lazy-load-image-component'
import { features } from './data'

const Features = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-evenly w-full container lg:mx-auto mx-4 py-20">
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
    )
}

export default Features
