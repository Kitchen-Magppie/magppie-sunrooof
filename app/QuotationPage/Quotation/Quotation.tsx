import { LazyLoadImage } from 'react-lazy-load-image-component'
import { QuotationMock as _data } from '../../cms/mocks'
import ClientDetails from './ClientDetails'

const Quotation = () => {
    return (
        <div
            className="flex flex-col justify-center items-center py-10"
            id="quotation"
        >
            <h1 className="text-5xl mb-10">{_data.Quotation.header}</h1>
            <div className="flex flex-col items-center justify center px-24">
                <ClientDetails />
                <div className="flex mt-5 h-full w-full">
                    <LazyLoadImage
                        effect="blur"
                        src={_data.Quotation.illustration}
                        className=" lg:w-full lg:h-full object-contain quotation-image"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default Quotation
