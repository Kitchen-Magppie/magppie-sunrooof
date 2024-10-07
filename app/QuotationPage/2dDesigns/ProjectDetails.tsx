import { LazyLoadImage } from 'react-lazy-load-image-component'
import { TCustomerComponentDesign2DDataItem } from '../../../types'

type TProps = { item: TCustomerComponentDesign2DDataItem }

const ProjectDetails = ({ item }: TProps) => {
    return (
        <div className="bg-[#78746c] text-white p-6 lg:w-80 shadow-md flex gap-6 lg:flex-col flex-row lg:flex-nowrap flex-wrap">
            <h2 className="text-xl font-bold mb-4 underline">
                Project Details
            </h2>
            <div className="mb-2 text-xl">
                <strong>Design :</strong> {item.design}
            </div>
            <div className="mb-2 text-xl">
                <strong>Finish :</strong> {item.finish}
            </div>
            <div className="mb-2 text-xl">
                <span className="font-[400]">After Installation :</span>{' '}
                {item.afterInstallation}
            </div>
            <div className="relative">
                <span className="font-[400] text-xl">Your Plan :</span>
                <div className="rounded-lg mt-2 absolute lg:max-h-[32rem] sm:max-h-[8rem]">
                    <LazyLoadImage
                        effect="blur"
                        src={item.leftImage}
                        className="w-full h-full object-contain rounded-lg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails
