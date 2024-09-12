import { features } from './data'

const Features = () => {
    return (
        <div className="flex items-center container mx-auto py-20">
            {features.map((feature) => {
                return (
                    <div
                        key={feature.id}
                        className="flex flex-col items-center text-center"
                    >
                        <img src={feature.img} className="h-40 w-40" alt="" />
                        <h1 className="text-3xl pt-3">{feature.heading}</h1>
                        <p className="pt-3">{feature.content}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Features
