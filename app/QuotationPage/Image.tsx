import { useCallback, useMemo, useState } from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// Import styles
import 'swiper/css'

import { _, TCustomerComponentComparisonItem } from '../../types'
import { COMPONENT_COMPARISON_DATA_OPTIONS } from '../cms/mocks'
import { useMedia } from 'react-use'

const ImageComparison = (props: TProps) => {
    const isMobile = useMedia('(orientation: portrait)')
    const [view, setView] = useState('before')
    const [currentSlide, setCurrentSlide] = useState(0)

    const isBefore = view === 'before'

    const slides = useMemo(() => {
        const item = COMPONENT_COMPARISON_DATA_OPTIONS?.find(
            (row) => row.value === props.item.data
        )
        return item.slides?.map((slide) => slide.pair)
    }, [props.item.data])

    const swipe = useCallback(
        (direction) => {
            const newIndex =
                (currentSlide +
                    direction +
                    COMPARISON_STATIC_ITEM.slides.length) %
                COMPARISON_STATIC_ITEM.slides.length
            setCurrentSlide(newIndex)
        },
        [currentSlide]
    )

    return (
        <div className="w-full bg-gray-100 flex flex-col items-center justify-center py-20">
            <div className="flex items-center justify-center text-center">
                <h1 className="text-5xl lg:text-6xl w-full px-4 mb-8">
                    Witness the change After
                    <span className="font-bold"> SUNROOOF</span>
                </h1>
            </div>
            {isMobile ? (
                <>
                    <div className="w-[700px] h-[650px] lg:h-[800px] relative bg-white rounded-2xl shadow-lg overflow-hidden">
                        <AnimatePresence initial={false} custom={currentSlide}>
                            <motion.div
                                key={currentSlide}
                                custom={currentSlide}
                                variants={ANIMATION_VARIATION}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={TRANSITION_OPTIONS}
                                className="absolute top-0 left-0 w-full h-full"
                            >
                                <div className="w-full flex items-center justify-center h-full">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={
                                            isBefore
                                                ? slides[currentSlide].after
                                                : slides[currentSlide].before
                                        }
                                        alt={isBefore ? 'After' : 'Before'}
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
                                    className={`px-6 py-2.5 text-2xl lg:text-lg ${
                                        view === 'before'
                                            ? 'bg-gradient-to-r from-gray-800 rounded-md to-gray-600 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    After
                                </button>
                                <button
                                    onClick={() => setView('after')}
                                    className={`px-6 py-2 text-2xl lg:text-lg ${
                                        view === 'after'
                                            ? 'bg-gradient-to-r from-gray-800 rounded-md to-gray-600 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    Before
                                </button>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        {slides.length > 1 ? (
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
                        ) : null}
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center w-full container mx-auto max-w-7xl">
                    {slides.map((slide, i) => {
                        return (
                            <div className="flex items-center" key={i}>
                                <div className="flex flex-col items-center">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={slide.before}
                                        alt=""
                                        className="object-cover w-[500px] h-[500px] rounded-lg shadow-md mr-10"
                                    />
                                    <h1 className="uppercase mt-1 text-3xl font-bold">
                                        before
                                    </h1>
                                </div>
                                <div className="flex flex-col items-center">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={slide.after}
                                        alt=""
                                        className="object-cover w-[500px] h-[500px] rounded-lg shadow-md"
                                    />
                                    <h1 className="uppercase mt-1 text-3xl font-bold">
                                        after
                                    </h1>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

const TRANSITION_OPTIONS = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
}

const ANIMATION_VARIATION = {
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
const COMPARISON_STATIC_ITEM = _.first(COMPONENT_COMPARISON_DATA_OPTIONS)

type TProps = { item: TCustomerComponentComparisonItem }
export default ImageComparison
