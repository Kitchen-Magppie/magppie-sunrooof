import { useMedia } from 'react-use'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Swiper } from 'swiper/types'
import { TCustomerComponentDesign2DDataItem } from '../../../types'
// import { MdClose } from 'react-icons/md'
// import { useState } from 'react'

type TProps = {
    item: TCustomerComponentDesign2DDataItem[]
    swiper: Swiper
}

const ProposedLayout = (props: TProps) => {
    const { item, swiper } = props
    const isMobile = useMedia('(orientation: portrait)')
    // const [swiperInstance, setSwiperInstance] = useState(null)

    // const leftImagesLength = item.map((data) => {
    //     return data.leftImage.length
    // })

    // const [corpus, setCorpus] = useState({
    //     link: item.leftImage,
    //     isOpenModal: false,
    // })
    return (
        <>
            {isMobile ? (
                <>
                    <div className="bg-white text-black p-6 mt-2 lg:w-80 w-full rounded-lg shadow-md flex gap-6 justify-evenly items-start flex-row flex-wrap">
                        <div className="flex items-center overflow-x-auto w-full space-x-4 no-scrollbar">
                            {item.map((data, i) => {
                                const isActive = swiper?.activeIndex === i
                                return (
                                    <div
                                        className={`mt-2 flex min-w-[200px] cursor-pointer gap-2 `}
                                        onClick={() => {
                                            swiper.slideTo(i)
                                        }}
                                        key={i}
                                    >
                                        <div className=" py-1">{i + 1}.</div>
                                        <div className="flex flex-col items-center">
                                            <LazyLoadImage
                                                src={data.leftImage}
                                                alt=""
                                                effect="blur"
                                                style={{
                                                    border: `2px solid ${
                                                        isActive
                                                            ? '#0066FF'
                                                            : 'white'
                                                    }`,
                                                }}
                                                className={`rounded-lg cursor-pointer w-[200px] `}
                                            />
                                            <span className="mt-2 text-xl">
                                                {data.areaName}
                                                {/* Kitchen */}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-white text-black p-6 w-full rounded-lg shadow-md">
                    <div className="flex items-center">
                        <div className="overflow-x-auto whitespace-nowrap gap-4 flex">
                            {item.map((data, i) => {
                                const isActive = swiper?.activeIndex === i

                                return (
                                    <div className="inline-flex gap-2" key={i}>
                                        <div className="py-1">{i + 1}.</div>
                                        <div className="mt-2 text-center mb-4">
                                            <div
                                                style={{
                                                    border: `2px solid ${
                                                        isActive
                                                            ? '#0066FF'
                                                            : 'white'
                                                    }`,
                                                }}
                                                className="flex justify-center items-center overflow-hidden w-60 h-40 rounded-lg bg-white cursor-pointer"
                                                onClick={() => {
                                                    swiper.slideTo(i)
                                                }}
                                            >
                                                <img
                                                    src={data.leftImage}
                                                    alt=""
                                                    className="cursor-pointer w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="mt-2 text-md">
                                                {data.areaName}
                                            </span>
                                        </div>
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
