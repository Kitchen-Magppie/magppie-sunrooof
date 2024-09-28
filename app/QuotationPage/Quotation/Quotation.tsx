import { LazyLoadImage } from 'react-lazy-load-image-component'
import ClientDetails from './ClientDetails'
import { TCustomerComponentQuotationItem } from '../../../types'

const Quotation = (props: TProps) => {
    return (
        <div
            className="flex flex-col justify-center items-center py-10"
            id="quotation"
        >
            <h1 className="text-5xl mb-10">Quotation</h1>
            <div className="flex flex-col items-center justify center px-24">
                <ClientDetails item={props.item} />
                <div className=''>
                    <LazyLoadImage
                        effect="blur"
                        src={props.item.data.invoiceUrl}
                        className="h-[300px] w-[1000px] lg:w-full lg:h-full object-contain quotation-image mt-5"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default Quotation
type TProps = { item: TCustomerComponentQuotationItem }
