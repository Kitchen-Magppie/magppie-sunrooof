import horizontalLine from './assets/sunrooof-horizontal.png'
import threeLines from "./assets/three-lines.png"

const About = () => {
    return (
        <div className="bg-[#cfccc8] py-20 w-full" id="about">
            <div className="bg-[#fffafa] flex flex-col mx-auto max-w-2xl lg:max-w-7xl justify-center items-center container text-center px-20 lg:px-40 py-20 w-full rounded-lg shadow-lg">
                <h1 className="text-5xl pb-5 w-full">
                    About <span className="font-bold">MAGPPIE</span> Group
                </h1>
                <img src={horizontalLine} alt="" className="mb-10 w-96" />
                <p className="pb-8 text-2xl w-full">
                    Magppie Group’s belief is to transform all spaces to
                    Wellness Spaces with their revolutionary products and
                    innovations. Magppie first transformed the regular kitchen
                    industry into Wellness Kitchens. Then stepped into wellness
                    surfaces and now SUNROOOF is the latest manifestation of
                    Magppie’s belief.
                </p>
                <p className="pb-8 text-2xl w-full">
                    SUNROOOF is bringing a revolution in the indoor lighting
                    segment with their advanced lighting technology. SUNROOOF
                    brings the experience of the sun inside any room. It is
                    truly the future of lighting and one of Magppie’s best
                    innovations
                </p>
                <img src={threeLines} className="w-28 mt-10" alt="" />
            </div>
        </div>
    )
}

export default About
