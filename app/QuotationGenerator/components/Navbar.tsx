import logoHeader from '../../QuotationPage/assets/logo_header.png'

const Navbar = () => {
    return (
        <div>
            <div className="flex items-center justify-between h-32 lg:h-24 px-10 bg-[#1B1A1A] text-white fixed shadow-xl z-30 w-full transition-all duration-500 ease-in-out">
                <div className="flex flex-col items-center lg:justify-center lg:w-full">
                    <img src={logoHeader} alt="" className="w-80 lg:w-60" />
                </div>
            </div>
        </div>
    )
}

export default Navbar
