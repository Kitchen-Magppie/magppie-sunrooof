import TwodOne from '../assets/2d/2dOne.png';
import TwoDTwo from '../assets/2d/2dTwo.png';

const TwodDesigns = () => {
    return (
        <div className="flex flex-col justify-start items-center px-4 lg:px-0">
            <h1 className="text-4xl md:text-6xl font-bold underline my-10">2D Designs</h1>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
                <img
                    src={TwodOne}
                    alt="2D Design One"
                    className="w-full md:w-1/3 h-auto rounded-lg shadow-lg"
                />
                <img
                    src={TwoDTwo}
                    alt="2D Design Two"
                    className="w-full md:w-1/3 h-auto rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default TwodDesigns;
