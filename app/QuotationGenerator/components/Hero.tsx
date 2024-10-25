import bgImg from '../../../assets/hero-bg.jpeg'
import logo from '../../../assets/WithoutBG.png'

const Hero = () => {
    return (<div
        className="relative w-full h-[650px] bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bgImg})` }}
    >
        {/* Background Image */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
        {/* Overlay for a dark effect */}

        {/* Foreground Image */}
        <div className="relative h-screen flex items-center justify-center">
            <img
                src={logo}
                alt="Foreground"
                className="object-cover rounded-lg shadow-lg"
            />
        </div>
    </div>
    )
}

export default Hero
