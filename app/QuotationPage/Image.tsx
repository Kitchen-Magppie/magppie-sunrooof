import { useState } from 'react'
// import { QuotationMock as _data } from '../cms/mocks'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

import { motion, AnimatePresence } from 'framer-motion'

// Import styles
import 'swiper/css'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import { TCustomerComponentComparisonItem } from '../../types'

type TProps = { item: TCustomerComponentComparisonItem }
const ImageComparison = (props: TProps) => {
    const [view, setView] = useState('before')
    const [currentSlide, setCurrentSlide] = useState(0)
    // const slides = [
    //     {
    //         before: _data.Comparison.Row1.Before,
    //         after: _data.Comparison.Row1.After,
    //     },
    //     {
    //         before: _data.Comparison.Row2.Before,
    //         after: _data.Comparison.Row2.After,
    //     },
    // ]
    const slides = props.item.data?.map((item) => item.image)

    const variants = {
        enter: (direction) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
            }
        },
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => {
            return {
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
            }
        },
    }

    const swipe = (direction) => {
        const newIndex =
            (currentSlide + direction + props.item.data.length) % slides.length
        setCurrentSlide(newIndex)
    }

    return (
        <div className="w-full bg-gray-100 flex flex-col items-center justify-center py-20">
            <div className="flex items-center justify-center text-center">
                <h1 className="text-5xl lg:text-6xl w-full px-4 mb-8">
                    Witness the change After
                    <span className="font-bold"> SUNROOOF</span>
                </h1>
            </div>
            <div className="w-[700px] h-[650px] lg:h-[800px] relative bg-white rounded-2xl shadow-lg overflow-hidden">
                <AnimatePresence initial={false} custom={currentSlide}>
                    <motion.div
                        key={currentSlide}
                        custom={currentSlide}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="absolute top-0 left-0 w-full h-full"
                    >
                        <div className="w-full flex items-center justify-center h-full">
                            <LazyLoadImage
                                effect="blur"
                                src={
                                    view === 'before'
                                        ? slides[currentSlide].before
                                        : slides[currentSlide].after
                                }
                                alt={view === 'before' ? 'Before' : 'After'}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Buttons for Before and After */}
            <div className="flex items-center justify-between w-[700px]">
                <div className="flex space-x-2 mt-5 justify-center items-center w-full">
                    <div className="border-2 p-2 rounded-md shadow-md">
                        <button
                            onClick={() => setView('before')}
                            className={`px-6 py-2.5 text-2xl lg:text-lg ${view === 'before'
                                ? 'bg-gradient-to-r from-gray-800 rounded-md to-gray-600 text-white'
                                : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            Before
                        </button>
                        <button
                            onClick={() => setView('after')}
                            className={`px-6 py-2 text-2xl lg:text-lg ${view === 'after'
                                ? 'bg-gradient-to-r from-gray-800 rounded-md to-gray-600 text-white'
                                : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            After
                        </button>
                    </div>
                </div>
                {/* Navigation Arrows */}
                <div className="flex space-x-2 mt-5">
                    <button
                        onClick={() => swipe(-1)}
                        className="py-3 px-5 bg-[#615b58] text-white rounded-lg shadow-md"
                    >
                        <FaArrowLeft className="h-8 w-8 lg:h-4 lg:w-4" />
                    </button>
                    <button
                        onClick={() => swipe(1)}
                        className="py-3 px-5 bg-[#615b58] text-white rounded-lg shadow-md"
                    >
                        <FaArrowRight className="h-8 w-8 lg:h-4 lg:w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageComparison
