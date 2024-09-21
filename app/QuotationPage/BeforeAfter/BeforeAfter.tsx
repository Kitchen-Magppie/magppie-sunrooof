import { LazyLoadImage } from 'react-lazy-load-image-component'
import { QuotationMock as _data, MOCK_TO_FIREBASE_SCHEMA } from "../../cms/mocks"

const BeforeAfter = () => {
    console.log(MOCK_TO_FIREBASE_SCHEMA())
    return (
        <div className="container max-w-5xl py-20 w-full mx-auto">
            <div className="grid grid-cols-2 place-items-center gap-2 justify-items-center">
                {_images.map((image, i) => {
                    return (
                        <div key={i}>
                            <LazyLoadImage
                                effect="blur"
                                className="lg:w-[500px] lg:h-[500px] mb-2 h-[350px] w-[350px]"
                                src={image}
                                alt=""
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const _images = Object.values(_data.Comparison)?.flatMap((item) => (Object.values(item)))
export default BeforeAfter
