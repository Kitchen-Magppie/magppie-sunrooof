import TwodOne from '../assets/2d/2dOne.png'
import TwoDTwo from '../assets/2d/2dTwo.png'

const TwodDesigns = () => {
    return (
        <div className="flex flex-col justify-center items-center py-20">
            <h1 className="text-6xl underline">2D Designs</h1>
            <div className="flex flex-col mx-10">
                <img src={TwodOne} alt="2D Design One" className="my-10 rounded-lg shadow-md" />
                <img src={TwoDTwo} alt="2D Design Two" className="rounded-lg shadow-md" />
            </div>
        </div>
    )
}

export default TwodDesigns
