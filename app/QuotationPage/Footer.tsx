import logo from "./assets/logo_footer.png"

const Footer = () => {
    return (
        <div className="py-20 flex flex-col justify-start bg-[#fbfaf9]">
            <div className="pb-14">
                <p className="text-xl">
                    <span className="font-bold">Number:</span>- +91 9711008738
                </p>
                <p className="text-xl">
                    <span className="font-bold">Experience Center:</span>- 352,
                    Sultanpur Metro Station, MG Road. New Delhi-110030
                </p>
                <p className="text-xl">
                    <span className="font-bold">Email:</span>-
                    contactsunrooof@magppie.com
                </p>
            </div>
            <div className="flex flex-col items-start">
                <img src={logo} alt="" />
                <p className="font-bold text-4xl ml-8">www.sunrooof.com</p>
            </div>
        </div>
    )
}

export default Footer
