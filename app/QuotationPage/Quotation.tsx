import { LazyLoadImage } from 'react-lazy-load-image-component'
import { QuotationMock as _data } from '../cms/mocks'
import { TCustomerComponentQuotationItem } from '../../types'

const Quotation = (props: TProps) => {
    console.log(props.item)
    return (
        <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-8xl italic underline mb-6">
                {_data.Quotation.header}
            </h1>
            <LazyLoadImage
                effect="blur"
                src={props.item.data.illustration}
                className="w-[800px] h-[500px] lg:w-full lg:h-full"
                alt=""
            />
        </div>
    )
}

type TProps = { item: TCustomerComponentQuotationItem }
export default Quotation
