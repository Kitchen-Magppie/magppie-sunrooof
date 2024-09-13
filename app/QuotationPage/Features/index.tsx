import { features } from './data'

const Features = () => {
    return (
        <div className="flex flex-col md:flex-row items-start container mx-auto py-20">
            {features.map((feature) => {
                return (
                    <div
                        key={feature.id}
                        className="flex flex-col mb-10 md:items-center md:text-center"
                    >
                        <img src={feature.img} className="h-40 w-40" alt="" />
                        <h1 className="text-3xl pt-3">{feature.heading}</h1>
                        <p className="pt-3 md:text-base text-xl">
                            {feature.content}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default Features
