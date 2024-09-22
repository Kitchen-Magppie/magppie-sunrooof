import { LazyLoadImage } from 'react-lazy-load-image-component'
import { QuotationMock as _data } from '../../cms/mocks'
import ClientDetails from './ClientDetails'

const Quotation = () => {
    return (
        <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-5xl mb-10">{_data.Quotation.header}</h1>
            <div className="flex flex-col items-center justify center px-24">
                <ClientDetails />
                <LazyLoadImage
                    effect="blur"
                    src={_data.Quotation.illustration}
                    className="w-[800px] h-[500px] lg:w-full lg:h-full object-cover quotation-image"
                    alt=""
                />
                <style jsx>
                    {`
                        img.quotation-image {
                            clip-path: polygon(
                                0 30%,
                                100% 30%,
                                100% 100%,
                                0 100%
                            );
                        }
                    `}
                </style>
            </div>
        </div>
    )
}

export default Quotation
