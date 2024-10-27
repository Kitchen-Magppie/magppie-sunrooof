import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { RiLoader4Line } from "react-icons/ri";
//====================================================================

import { useAppDispatch, setPresentationFile } from '../../../redux';

const Buttons = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [corpus, setCorpus] = useState(INIT_CORPUS)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPresentationFile(e.target.files[0]))
        setCorpus((prev) => ({ ...prev, toggle: { ...prev.toggle, isImageLoading: true } }))
        setTimeout(() => {
            navigate('/design-generator')
            setCorpus((prev) => ({ ...prev, toggle: { ...prev.toggle, isImageLoading: false } }))

        }, 2000)
    }, [dispatch, navigate])
    return (
        <div className="flex justify-evenly items-center w-full mb-20">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl mb-4">Design Generation</h1>
                <div className="text-white cursor-pointer bg-blue-700 flex items-center justify-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    onClick={() => { fileInputRef?.current?.click() }}
                >
                    {corpus.toggle.isImageLoading ? (<RiLoader4Line className="text-xl animate-spin " />) : (<FaUpload className="h-5 w-5" />)}
                    <span className="text-2xl ml-2">Upload File</span>
                </div>
                {/* </Link> */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileChange}
                    className='  hidden'
                />
            </div>
            <hr className="h-40 w-1 bg-black" />
            <div className="flex flex-col items-center">
                <h1 className="text-4xl mb-4">Quotation Generation</h1>
                <Link to="/quotation-generator/quotation">
                    <div className="text-white cursor-pointer flex items-center bg-blue-700 hover:bg-blue-800 justify-center focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        <span className="text-2xl mr-2">Next</span>
                        <FaArrowRight className="h-5 w-5" />
                    </div>
                </Link>
            </div>
        </div>
    )
}
const INIT_CORPUS = { toggle: { isImageLoading: false } }
export default Buttons
