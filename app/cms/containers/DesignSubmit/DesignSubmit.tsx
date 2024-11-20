import { LazyLoadImage } from 'react-lazy-load-image-component'

const DesignSubmit = () => {
    const customerImage = sessionStorage.getItem('CUSTOMER_IMAGE')
    const proposedImage = sessionStorage.getItem('PROPOSED_IMAGE')

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-5">Layout Submission</h1>
            <div className="flex items-center justify-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold mb-5">Customer Image</h1>
                    <LazyLoadImage
                        effect="blur"
                        src={customerImage}
                        alt="Customer Layout"
                        className="rounded-lg shadow-md max-w-[600px] max-h-[600px] object-contain"
                    />
                </div>
                <div className="flex flex-col justify-center items-center mx-6">
                    <h1 className="text-2xl font-bold mb-5">Proposed Image</h1>
                    <LazyLoadImage
                        effect="blur"
                        src={proposedImage}
                        alt="Proposed Layout"
                        className="rounded-lg shadow-md max-w-[600px] max-h-[600px] object-contain"
                    />
                </div>
            </div>

            <button
                type="button"
                className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
            >
                Submit Layouts
            </button>
        </div>
    )
}

export default DesignSubmit
