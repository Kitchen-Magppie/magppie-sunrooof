import { useState } from 'react'
import { QuotationMock as _data } from '../cms/mocks'
import { FaArrowRight } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

import { LazyLoadImage } from 'react-lazy-load-image-component'

const ImageComparison = () => {
    const [view, setView] = useState('before')
    console.log(_data.Comparison)

    return (
        <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center py-20">
            <div className="flex items-center justify-center text-center">
                <h1 className="text-5xl  w-full px-4 mb-8">
                    Witness the change After
                    <span className="font-bold"> SUNROOF</span>
                </h1>
            </div>
            <div className="w-[700px] h-[800px] relative bg-white rounded-2xl shadow-lg overflow-hidden">
                <Swiper className="mySwiper">
                    <SwiperSlide>
                        <div className="w-full flex items-center justify-center h-full transition-all duration-500">
                            <LazyLoadImage
                                effect="blur"
                                src={
                                    view === 'before'
                                        ? _data.Comparison.Row1.Before
                                        : _data.Comparison.Row1.After
                                }
                                alt={view === 'before' ? 'Before' : 'After'}
                                className=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full flex items-center justify-center h-full transition-all duration-500">
                            <LazyLoadImage
                                effect="blur"
                                src={
                                    view === 'before'
                                        ? _data.Comparison.Row2.Before
                                        : _data.Comparison.Row2.After
                                }
                                alt={view === 'before' ? 'Before' : 'After'}
                                className=""
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Buttons for Before and After */}
            <div className="flex items-center justify-between w-[700px]">
                <div className="flex space-x-2 mt-5">
                    <button
                        onClick={() => setView('before')}
                        className={`px-4 py-2 rounded-full ${
                            view === 'before'
                                ? 'bg-gray-800 text-white'
                                : 'bg-white text-gray-800'
                        }`}
                    >
                        Before
                    </button>
                    <button
                        onClick={() => setView('after')}
                        className={`px-4 py-2 rounded-full ${
                            view === 'after'
                                ? 'bg-gray-800 text-white'
                                : 'bg-white text-gray-800'
                        }`}
                    >
                        After
                    </button>
                </div>
                {/* Navigation Arrows */}
                <div className="flex space-x-2 mt-5">
                    <button className="p-2 bg-white rounded-full shadow-md">
                        <FaArrowLeft className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md">
                        <FaArrowRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageComparison
