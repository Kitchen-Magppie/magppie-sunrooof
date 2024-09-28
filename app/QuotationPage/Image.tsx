import { useCallback, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// Import styles
import 'swiper/css'

import { _, TCustomerComponentComparisonItem } from '../../types'
import { CustomToggle } from './components'


const ImageComparison = ({ item: { data } }: TProps) => {
    const [view, setView] = useState('before')
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = useMemo(() => _.map(data, 'image'), [data])

    const variants = useMemo(() => ({
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
    }), [])

    const onSwipeImage = useCallback((direction) => {
        const newIndex = (currentSlide + direction + data.length) % slides.length
        setCurrentSlide(newIndex)
    }, [currentSlide, data.length, slides.length])

    return (<>


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

            <div className="flex items-center justify-between w-[700px] mt-10">
                <div className="flex space-x-2 mt-5 justify-center items-center w-full">
                    <CustomToggle onToggle={(value) => { setView(value ? 'after' : 'before') }} />

                    {/* <div className="border-2 p-2 rounded-md shadow-md">
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
                    </div> */}
                </div>
                {/* Navigation Arrows */}
                <div className="flex space-x-2 mt-5">
                    <button
                        onClick={() => onSwipeImage(-1)}
                        className="py-3 px-5 bg-gray-700 bg-opacity-50 rounded-lg text-white shadow-sm hover:bg-opacity-70 transition duration-300"
                    >
                        <FaArrowLeft className="h-8 w-8 lg:h-4 lg:w-4" />
                    </button>
                    <button
                        onClick={() => onSwipeImage(1)}
                        className="py-3 px-5 bg-gray-700 bg-opacity-50 rounded-lg text-white shadow hover:bg-opacity-70 transition duration-300"
                    >
                        <FaArrowRight className="h-8 w-8 lg:h-4 lg:w-4" />
                    </button>
                </div>
            </div>
        </div>
    </>
    )
}

export default ImageComparison
type TProps = { item: TCustomerComponentComparisonItem }
