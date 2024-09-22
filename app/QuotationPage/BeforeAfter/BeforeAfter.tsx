import { useMemo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { _, TCustomerComponentComparisonDataItem } from '../../../types'
type TProps = { item: TCustomerComponentComparisonDataItem[] }
const BeforeAfter = (props: TProps) => {

    const images = useMemo(() => (_.values(props.item?.flatMap((item) => _.values(item.image)))), [props.item])

    return (<div className="container max-w-5xl py-20 w-full mx-auto">
        <div className="grid grid-cols-2 place-items-center gap-2 justify-items-center">
            {images.map((image, i) => {
                return (
                    <div key={i}>
                        <LazyLoadImage
                            effect="blur"
                            className="lg:w-[500px] lg:h-[500px] mb-2 h-[350px] w-[350px]"
                            src={image}
                            alt=""
                        />
                    </div>
                )
            })}
        </div>
    </div>
    )
}

export default BeforeAfter
