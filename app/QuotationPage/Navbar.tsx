import { useState } from 'react'
import { IoIosMenu } from 'react-icons/io'
import { motion } from 'framer-motion'
import logo from '../../assets/WithoutBG.png'
import logoHeader from './assets/logo_header.png'
import { Link } from 'react-scroll' // Import Link from react-scroll

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    
    return (
        <div>
            {/* Navbar */}
            <div
                className={`flex items-center justify-between h-32 lg:h-24 px-10 bg-[#1B1A1A] text-white fixed shadow-xl z-30 w-full transition-all duration-500 ease-in-out ${
                    isSidebarOpen ? 'blur-md' : ''
                }`} // Apply blur when sidebar is open
            >
                <div className="flex flex-col items-center lg:justify-center lg:w-full">
                    <img src={logoHeader} alt="" className="w-80 lg:w-60" />
                </div>

                {/* Menu Toggle Button */}
                <div
                    onClick={toggleSidebar}
                    className="cursor-pointer transform transition-transform hover:scale-110 duration-200 ease-in-out"
                >
                    {!isSidebarOpen && (
                        <IoIosMenu className="w-14 h-14 lg:h-8 lg:w-8 transition-all" />
                    )}
                </div>
            </div>

            {/* Sidebar */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: isSidebarOpen ? 0 : '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 right-0 h-full w-2/4 lg:w-1/4 bg-transparent bg-opacity-50 text-white shadow-lg z-40 transform backdrop-blur-lg" // Transparent background
            >
                <div className="flex flex-col items-start justify-center h-full px-8 mt-20">
                    <div>
                        <img
                            src={logo}
                            alt=""
                            className=" w-[400px] lg:w-60 mb-5"
                        />
                    </div>
                    {/* Sidebar Links */}
                    <ul className="flex flex-col items-start justify-start h-full w-full space-y-8 text-lg font-semibold">
                        {/* Using react-scroll's Link component for smooth scrolling */}
                        <li className="hover:text-gray-400 text-2xl transition duration-200 cursor-pointer">
                            <Link
                                to="about"
                                smooth={true}
                                duration={500}
                                offset={-100} // Optional offset for better alignment
                                onClick={toggleSidebar}
                            >
                                About
                            </Link>
                        </li>
                        <li className="hover:text-gray-400 text-2xl transition duration-200 cursor-pointer">
                            <Link
                                to="clients"
                                smooth={true}
                                duration={500}
                                offset={-100}
                                onClick={toggleSidebar}
                            >
                                Our Clients
                            </Link>
                        </li>
                        <li className="hover:text-gray-400 text-2xl transition duration-200 cursor-pointer">
                            <Link
                                to="team"
                                smooth={true}
                                duration={500}
                                offset={-100}
                                onClick={toggleSidebar}
                            >
                                Our Team
                            </Link>
                        </li>
                        <li className="hover:text-gray-400 text-2xl transition duration-200 cursor-pointer">
                            <Link
                                to="terms"
                                smooth={true}
                                duration={500}
                                offset={-100}
                                onClick={toggleSidebar}
                            >
                                Terms & Conditions
                            </Link>
                        </li>
                        <li className="hover:text-gray-400 text-2xl transition duration-200 cursor-pointer">
                            <Link
                                to="2d"
                                smooth={true}
                                duration={500}
                                offset={-100}
                                onClick={toggleSidebar}
                            >
                                2D Designs
                            </Link>
                        </li>
                        <li className="hover:text-gray-400 text-2xl transition duration-200 cursor-pointer">
                            <Link
                                to="3d"
                                smooth={true}
                                duration={500}
                                offset={-100}
                                onClick={toggleSidebar}
                            >
                                3D Designs
                            </Link>
                        </li>
                        <li className="hover:text-gray-400 text-2xl transition duration-200 cursor-pointer">
                            <Link
                                to="quotation"
                                smooth={true}
                                duration={500}
                                offset={-100}
                                onClick={toggleSidebar}
                            >
                                Quotation
                            </Link>
                        </li>
                    </ul>
                </div>
            </motion.div>

            {/* Overlay (to close sidebar on clicking outside) */}
            {isSidebarOpen && (
                <>
                    {/* Overlay with blur effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 0.3 }}
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-black z-30 backdrop-blur-sm" // Blurred background
                    />
                </>
            )}
        </div>
    )
}

export default Navbar
