import { LazyLoadImage } from 'react-lazy-load-image-component'
import { TCustomerComponentDesign2DDataItem } from '../../../types'
import { MdClose } from 'react-icons/md'
import { useState } from 'react'

type TProps = { item: TCustomerComponentDesign2DDataItem }

const ProjectDetails = ({ item }: TProps) => {
    const [corpus, setCorpus] = useState({
        link: item.leftImage,
        isOpenModal: false,
    })
    return (
        <>
            <div className="bg-[#78746c] text-white p-6 lg:w-80 w-full container mx-auto rounded-lg shadow-md flex gap-6 lg:flex-col justify-evenly lg:justify-start items-start flex-row lg:flex-nowrap flex-wrap">
                <h2 className="text-xl font-bold mb-4 underline">
                    Project Details
                </h2>
                <div className="mb-2 text-2xl lg:text-xl">
                    <strong>Design :</strong> {item.design}
                </div>
                <div className="mb-2 text-2xl lg:text-xl">
                    <strong>Finish :</strong> {item.finish}
                </div>
                <div className="mb-2 text-2xl lg:text-xl">
                    <span className="font-[400]">After Installation :</span>{' '}
                    {item.afterInstallation}
                </div>
                <div className="flex lg:flex-col items-start">
                    <span className="font-[400] text-2xl lg:text-xl mr-2">Your Plan :</span>
                    <div className="rounded-lg mt-2">
                        <LazyLoadImage
                            effect="blur"
                            src={item.leftImage}
                            className="w-[200px] lg:w-full h-full cursor-pointer object-contain rounded-lg"
                            alt=""
                            onClick={() => {
                                setCorpus((prev) => ({
                                    ...prev,
                                    isOpenModal: true,
                                }))
                            }}
                        />
                    </div>
                </div>
            </div>
            <Modal
                isOpen={corpus.isOpenModal}
                onClose={() => {
                    setCorpus((prev) => ({ ...prev, isOpenModal: false }))
                }}
                imageSrc={corpus.link}
            />
        </>
    )
}

function Modal({ isOpen, onClose, imageSrc }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 px-10">
            <div className="relative">
                <MdClose
                    className="absolute right-4 cursor-pointer text-black h-12 w-12"
                    onClick={onClose}
                />
                <img
                    loading="lazy"
                    src={imageSrc}
                    alt="Selected"
                    className="max-w-full max-h-full object-contain rounded-lg"
                />
            </div>
        </div>
    )
}

export default ProjectDetails
