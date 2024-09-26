import { LazyLoadImage } from 'react-lazy-load-image-component'
import ClientDetails from './ClientDetails'
import { TCustomerComponentQuotationItem } from '../../../types'

const Quotation = (props: TProps) => {
    return (
        <div className="flex flex-col justify-center items-center py-10" id='quotation'>
            <h1 className="text-5xl mb-10">Quotation</h1>
            <div className="flex flex-col items-center justify center px-24">
                <ClientDetails />
                <LazyLoadImage
                    effect="blur"
                    src={props.item.data.invoiceUrl}
                    className=" lg:w-full lg:h-full object-cover quotation-image"
                    alt=""
                />
            </div>
        </div>
    )
}

export default Quotation
type TProps = { item: TCustomerComponentQuotationItem }
