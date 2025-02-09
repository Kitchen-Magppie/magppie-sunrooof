import { LazyLoadImage } from 'react-lazy-load-image-component'
//====================================================================
import ClientDetails from './ClientDetails'
import { TCustomerComponentQuotationItem } from '../../../types'

export default function Quotation(props: TProps) {
    return (<div
        className="flex flex-col justify-center py-20 items-center bg-white"
        id="quotation"
    >
        <h1 className="text-6xl pb-10 w-full text-center uppercase text-[#78746c]">Quotation</h1>
        <div className="flex flex-col items-center justify center px-24">
            <ClientDetails name={props.name} item={props.item} />
            <div className='w-[700px] lg:w-full h-full'>
                <LazyLoadImage
                    effect="blur"
                    src={props.item.data.invoiceUrl}
                    className=" lg:w-full lg:h-full object-contain rounded-lg quotation-image mt-5"
                    alt=""
                />
            </div>
        </div>
    </div>
    )
}

type TProps = { name: string; item: TCustomerComponentQuotationItem }
