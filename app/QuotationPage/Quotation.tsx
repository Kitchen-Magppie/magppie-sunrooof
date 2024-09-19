import { LazyLoadImage } from 'react-lazy-load-image-component'
import { QuotationMock as _data } from "../cms/mocks"

const Quotation = () => {
    return (
        <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-8xl italic underline mb-4">{_data.Quotation.header}</h1>
            <LazyLoadImage effect="blur" src={_data.Quotation.illustration} className='' alt="" />
        </div>
    )
}

export default Quotation
