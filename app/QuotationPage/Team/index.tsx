import { LazyLoadImage } from 'react-lazy-load-image-component'
import { team } from './data'

const Team = () => {
    return (
        <div
            className="py-20 flex flex-col justify-center items-center"
            id="team"
        >
            <h1 className="text-5xl pb-10 w-full text-center font-bold uppercase text-[#78746c]">
                our team
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 container mx-auto max-w-xl lg:max-w-7xl gap-4">
                {team.map((person) => {
                    return (
                        <div
                            className="text-black flex flex-col items-center pb-10 gap-1"
                            key={person.id}
                        >
                            <div className="mb-2 w-48 max-w-48 lg:w-36 lg:max-w-36 h-[200px] max-h-[200px] mb-24 lg:mb-4">
                                <LazyLoadImage
                                    effect="blur"
                                    src={person.img}
                                    alt=""
                                    className="w-full h-full rounded-3xl"
                                />
                            </div>
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
                    )
                })}
            </div>
        </div>
    )
}

export default Team
