import { useCallback } from 'react'
import {
    FaArrowUp,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaLinkedinIn,
    FaPhoneAlt,
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { FaMapLocationDot } from 'react-icons/fa6'
import logo from '../../assets/WithoutBG.png'

const Footer = () => {
    const onScrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [])

    return (
        <div className="bg-[#1E1E1E] pt-6 py-24 text-white px-10 flex flex-col justify-start">
            <div className="flex w-full container mx-auto max-w-8xl justify-center flex-col items-center text-center">
                <div className="my-10">
                    <img src={logo} alt="" className="object-cover" />
                </div>
                <div className="flex flex-col lg:flex-row justify-evenly mb-6 gap-3 text-center w-full conatiner mx-auto max-w-7xl">
                    <div className="flex items-center mb-5 lg:mb-0">
                        <FaPhoneAlt className="h-6 w-6 mr-2" />
                        <span className="text-xl">+91 9711008738</span>
                    </div>
                    <div className="flex items-center mb-5 lg:mb-0">
                        <FaMapLocationDot className="h-6 w-6 mr-2" />
                        <span className="text-xl">
                            352, Sultanpur Metro Station, MG Road. New
                            Delhi-110030
                        </span>
                    </div>
                    <div className="flex items-center">
                        <MdEmail className="h-6 w-6 mr-2" />
                        <span className="text-xl">
                            contactsunrooof@magppie.com
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center gap-3 mb-5 mt-5 justify-end">
                <FaFacebook className="h-6 w-6 cursor-pointer" />
                <FaTwitter className="h-6 w-6 cursor-pointer" />
                <FaInstagram className="h-6 w-6 cursor-pointer" />
                <FaYoutube className="h-6 w-6 cursor-pointer" />
                <FaLinkedinIn className="h-6 w-6 cursor-pointer" />
            </div>

            <hr className="" />
            <div className="flex justify-between text-xl cursor-pointer">
                <div className="p-2 text-lg">Privacy Policy</div>
                <div
                    className="flex p-2 items-center text-lg"
                    onClick={onScrollToTop}
                >
                    Back to Top
                    <FaArrowUp className="h-4 w-4 ml-2" />
                </div>
            </div>
            <a href="https://www.sunrooof.com" target="_blank">
                <div className="text-center text-2xl font-light">
                    www.sunrooof.com
                </div>
            </a>
        </div>
    )
}

export default Footer
