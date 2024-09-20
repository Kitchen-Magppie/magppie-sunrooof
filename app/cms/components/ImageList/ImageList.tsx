import { useCallback, useState } from "react"
import { IoMdClose } from 'react-icons/io'
import { LazyLoadImage } from "react-lazy-load-image-component"

export default function ImageList(props: TProps) {

    const [images, setImages] = useState<string[]>(props.images)

    const handleRemoveImage = useCallback((url: string) => {
        const links = props.images?.filter((row) => row !== url)
        setImages(links)
    }, [props.images])

    return (<div className="flex flex-wrap">
        {images.map((image, i) => (<div key={i} className="relative my-2 ">
            <LazyLoadImage
                effect="blur"
                src={image}
                alt=""
                className="w-32 h-32 object-cover rounded-lg ms-1"
            />
            <button
                onClick={() => handleRemoveImage(image)}
                className="absolute top-0 right-0 mt-1 mr-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                <IoMdClose />
                {/* &times; */}
            </button>
        </div>
        ))}
    </div>)
}

type TProps = { images: string[] }
