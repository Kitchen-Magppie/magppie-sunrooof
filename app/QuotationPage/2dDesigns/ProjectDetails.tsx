import { LazyLoadImage } from 'react-lazy-load-image-component'
import { TCustomerComponentDesign2DDataItem } from '../../../types'

type TProps = { item: TCustomerComponentDesign2DDataItem }
const ProjectDetails = (props: TProps) => {

    return (
        <div className="bg-[#78746c] text-white p-6 lg:w-80 shadow-md flex gap-6 lg:flex-col flex-row lg:flex-nowrap flex-wrap">
            <h2 className="text-xl font-bold mb-4 underline">
                Project Details
            </h2>
            <div className="mb-2">
                <span className="font-[400]">Designed By :</span>{' '}
                {props.item.designBy}
            </div>
            <div className="mb-2">
                <span className="font-[400]">Approved By :</span>{' '}
                {props.item.approvedBy}
            </div>
            <div className="mb-2">
                <strong>Design :</strong> {props.item.design}
            </div>
            <div className="mb-2">
                <strong>Finish :</strong> {props.item.finish}
            </div>
            <div className="mb-2">
                <span className="font-[400]">Ceiling Height on site :</span>{' '}
                {props.item.ceilingHeightOnSite}
            </div>
            <div className="mb-2">
                <span className="font-[400]">After Installation :</span>{' '}
                {props.item.afterInstallation}
            </div>
            <div className="relative">
                <span className="font-[400]">Your Plan :</span>
                <div className="border border-white rounded-lg absolute lg:max-h-[32rem] sm:max-h-[8rem]">
                    <LazyLoadImage
                        effect="blur"
                        src={props.item.leftImage}
                        className="w-full h-full object-contain rounded-lg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails
