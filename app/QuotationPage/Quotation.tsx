import { LazyLoadImage } from 'react-lazy-load-image-component'
import quotation from './assets/quotation.png'

const Quotation = () => {
    return (
        <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-8xl italic underline mb-4">Quotation</h1>
            <LazyLoadImage effect="blur" src={quotation} className='' alt="" />
        </div>
    )
}

export default Quotation
