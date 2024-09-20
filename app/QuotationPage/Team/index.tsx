import { LazyLoadImage } from 'react-lazy-load-image-component'
import { team } from './data'

const Team = () => {
    return (
        <div className="py-20">
            <h1 className="uppercase font-bold text-7xl text-center pb-10 text-[#78746c]">
                our team
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 container mx-auto max-w-5xl lg:max-w-7xl">
                {team.map((person) => {
                    return (
                        <div
                            className="text-black flex flex-col items-center pb-10 gap-0"
                            key={person.id}
                        >
                            <LazyLoadImage
                                effect="blur"
                                src={person.img}
                                alt=""
                                className="mb-2 rounded-3xl w-72 h-[400px]"
                            />
                            <h1 className="text-2xl lg:text-xl">
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
                    )
                })}
            </div>
        </div>
    )
}

export default Team
