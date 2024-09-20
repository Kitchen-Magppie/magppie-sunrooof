import { LazyLoadImage } from 'react-lazy-load-image-component'
import twoD from './assets/2d1.png'
import twoDtwo from './assets/2d2.png'
import details from './assets/details.png'

const ProjectDetails = () => {
    return (
        <div className="flex flex-col justify-center items-center py-20 w-full">
            <h1 className="text-6xl underline">2D Designs</h1>
            <div className="flex mt-10 w-full justify-center">
                <LazyLoadImage
                    effect="blur"
                    src={details}
                    className=""
                    alt=""
                />
                <div className="flex flex-col justify-between">
                    <LazyLoadImage
                        effect="blur"
                        src={twoD}
                        className="w-1/2"
                        alt=""
                    />
                    <LazyLoadImage
                        effect="blur"
                        src={twoDtwo}
                        className="w-1/2"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails
