import logo from './assets/logo_header.png'

const Header = () => {
    return (
        <div className="bg-[#1b1a1a] flex flex-col min-h-screen items-center justify-center w-full">
            <img src={logo} className="h-100 w-100" alt="" />
        </div>
    )
}

export default Header
