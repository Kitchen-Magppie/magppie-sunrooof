import { images } from './data'

const BeforeAfter = () => {
    return (
        <div className="container mx-auto py-14">
            <div className="grid grid-cols-2 gap-2">
                {images.map((image) => {
                    return (
                        <div key={image.id}>
                            <img src={image.image} alt="" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BeforeAfter
