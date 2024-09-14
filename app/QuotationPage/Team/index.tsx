import { team } from './data'

const Team = () => {
    return (
        <div className="py-20">
            <h1 className="uppercase font-bold text-5xl text-center pb-10 text-[#78746c]">
                our team
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 container mx-auto max-w-2xl lg:max-w-7xl">
                {team.map((person) => {
                    return (
                        <div className="text-black flex flex-col items-center pb-10 gap-0">
                            <img src={person.img} alt="" />
                            <h1>{person.name}</h1>
                            <p>{person.positon}</p>
                            <p>{person.country}</p>
                            <img
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
