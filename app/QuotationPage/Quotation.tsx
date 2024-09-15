import { LazyLoadImage } from 'react-lazy-load-image-component'
import quotation from './assets/quotation.png'

const Quotation = () => {
    return (
        <div className='flex flex-col justify-center items-center py-10'>
            <h1 className='text-6xl italic underline'>Quotation</h1>
            <LazyLoadImage
                effect="blur" src={quotation} alt="" />
        </div>
    )
}

export default Quotation
