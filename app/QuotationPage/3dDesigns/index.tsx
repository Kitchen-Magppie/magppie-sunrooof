import ThreedOne from '../assets/3d/3done.png'
import ThreedTwo from '../assets/3d/3dtwo.png'

const ThreedDesigns = () => {
    return (
        <div className="flex flex-col justify-center items-center py-20">
            <h1 className="text-6xl underline">3D Designs</h1>
            <div className="flex flex-col items-center">
                <img
                    src={ThreedOne}
                    className="my-10 rounded-lg shadow-md"
                    alt=""
                />
                <img src={ThreedTwo} alt="" className="rounded-lg shadow-md" />
            </div>
        </div>
    )
}

export default ThreedDesigns
