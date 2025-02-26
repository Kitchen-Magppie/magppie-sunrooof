import { useMedia } from 'react-use'
import { TCustomerComponentDesign2DDataItem } from '../../../types'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
// import { MdClose } from 'react-icons/md'
// import { useState } from 'react'


const CustomerLayout = (props: TProps) => {
    const { item, caption } = props;
    const isMobile = useMedia('(orientation: portrait)')
    // const [corpus, setCorpus] = useState({
    //     link: item.leftImage,
    //     isOpenModal: false,
    // })
    return (
        <>
            {isMobile ? (
                <>
                    <div className="lg:w-80 w-full flex gap-6 justify-evenly items-start flex-row flex-wrap text-[#78746c]">
                        <div className="mb-2 text-3xl lg:text-xl text-[#78746c]">
                            <strong>Design :</strong> {caption.design}
                        </div>
                        <div className="mb-2 text-3xl lg:text-xl text-[#78746c]">
                            <strong>Finish :</strong> {caption.finish}
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-white text-black p-6 lg:w-80 w-full rounded-lg shadow-md flex gap-6 lg:flex-col justify-evenly lg:justify-start items-start flex-row lg:flex-nowrap flex-wrap">
                    <div className="flex flex-col">
                        <h1 className="text-xl mb-2 ">Customer Layout</h1>

                        <div
                            className={`flex justify-center overflow-hidden border w-60 h-40 rounded-lg bg-white`}
                        >
                            <img
                                src={item.rightImage}
                                alt=""
                                className="cursor-pointer"
                            />
                        </div>

                        <span className="mt-2 text-sm text-center">
                            {/* Area Name: */}
                            {item.areaName}  Hello
                        </span>
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
type TProps = { item: TCustomerComponentDesign2DDataItem, caption: { design: string, finish: string } }

export default CustomerLayout
