import { LazyLoadImage } from 'react-lazy-load-image-component'
import { images } from './data'

const BeforeAfter = () => {
    return (
        <div className="container max-w-5xl py-20 w-full mx-auto">
            <div className="grid grid-cols-2 place-items-center gap-2 justify-items-center">
                {images.map((image) => {
                    return (
                        <div key={image.id}>
                            <LazyLoadImage
                                effect="blur"
                                className="lg:w-[500px] lg:h-[500px] mb-2 h-[350px] w-[350px]"
                                src={image.image}
                                alt=""
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BeforeAfter
