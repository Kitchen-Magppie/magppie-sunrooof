import { useMedia } from 'react-use'
import { TCustomerComponentDesign2DDataItem } from '../../../types'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// import { MdClose } from 'react-icons/md'
// import { useState } from 'react'

type TProps = { item: TCustomerComponentDesign2DDataItem[] }

const ProposedLayout = ({ item }: TProps) => {
    const isMobile = useMedia('(orientation: portrait)')
    // const [corpus, setCorpus] = useState({
    //     link: item.leftImage,
    //     isOpenModal: false,
    // })
    return (
        <>
            {isMobile ? (
                <>
                    <div className="bg-[#78746c] text-white p-6 mt-2 lg:w-80 w-full rounded-lg shadow-md flex gap-6 justify-evenly items-start flex-row flex-wrap">
                        <div className="flex items-center overflow-x-auto w-full space-x-4 no-scrollbar">
                            {item.map((data, i) => {
                                return (
                                    <div className="mt-2 flex flex-col min-w-[200px]" key={i}>
                                        <LazyLoadImage
                                            src={data.leftImage}
                                            alt=""
                                            effect="blur"
                                            className="rounded-lg cursor-pointer w-[200px]"
                                        />
                                        <span className="mt-2 text-xl">
                                            {data.areaName}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-[#78746c] text-white p-6 lg:w-80 w-full rounded-lg shadow-md flex gap-6 lg:flex-col justify-evenly lg:justify-start items-start flex-row lg:flex-nowrap flex-wrap">
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl mb-2">Proposed Layout</h1>
                        <div className="overflow-y-auto h-[650px]">
                            {item.map((data, i) => {
                                return (
                                    <div className="mt-2" key={i}>
                                        <LazyLoadImage
                                            src={data.leftImage}
                                            alt=""
                                            effect="blur"
                                            className="rounded-lg cursor-pointer"
                                        />
                                        <span className="mt-2">
                                            Area Name: {data.areaName}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
            {/* <Modal
                isOpen={corpus.isOpenModal}
                onClose={() => {
                    setCorpus((prev) => ({ ...prev, isOpenModal: false }))
                }}
                imageSrc={corpus.link}
            /> */}
        </>
    )
}

// function Modal({ isOpen, onClose, imageSrc }) {
//     if (!isOpen) return null

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 px-10">
//             <div className="relative">
//                 <MdClose
//                     className="absolute right-4 cursor-pointer text-black h-12 w-12"
//                     onClick={onClose}
//                 />
//                 <img
//                     loading="lazy"
//                     src={imageSrc}
//                     alt="Selected"
//                     className="max-w-full max-h-full object-contain rounded-lg"
//                 />
//             </div>
//         </div>
//     )
// }

export default ProposedLayout
