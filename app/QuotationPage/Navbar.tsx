import { useState, useEffect } from 'react'
import { IoIosMenu } from 'react-icons/io' // Import the 'close' icon
import { motion } from 'framer-motion' // Import framer-motion for smooth animations
import logo from '../../assets/WithoutBG.png'

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    // Close sidebar on 'Esc' key press
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isSidebarOpen) {
                setIsSidebarOpen(false)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isSidebarOpen])

    return (
        <div>
            {/* Navbar */}
            <div
                className={`flex items-center justify-between h-32 lg:h-24 px-10 bg-[#1E1E1E] text-white fixed shadow-xl z-30 w-full transition-all duration-500 ease-in-out ${
                    isSidebarOpen ? 'blur-md' : ''
                }`} // Apply blur when sidebar is open
            >
                <div className="flex flex-col items-center lg:justify-center lg:w-full">
                    <h1 className="text-5xl lg:text-3xl font-extrabold tracking-wide text-center">
                        MAGPPIE
                    </h1>
                    <h3 className="uppercase text-2xl my-1 lg:text-xl lg:my-0 text-gray-400 tracking-wide">
                        sunrooof
                    </h3>
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
                        <li className="hover:text-gray-400 text-2xl transition duration-200 cursor-pointer">
                            <a href="#about" onClick={toggleSidebar}>
                                About
                            </a>{' '}
                            {/* Added href */}
                        </li>
                        <li className="hover:text-gray-400 text-2xl transition duration-200 cursor-pointer">
                            <a href="#clients" onClick={toggleSidebar}>
                                Our Clients
                            </a>{' '}
                            {/* Added href */}
                        </li>
                        <li className="hover:text-gray-400 text-2xl transition duration-200 cursor-pointer">
                            <a href="#team" onClick={toggleSidebar}>
                                Our Team
                            </a>{' '}
                            {/* Added href */}
                        </li>
                        <li className="hover:text-gray-400 text-2xl transition duration-200 cursor-pointer">
                            <a href="#terms" onClick={toggleSidebar}>
                                Terms & Conditions
                            </a>{' '}
                            {/* Added href */}
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
