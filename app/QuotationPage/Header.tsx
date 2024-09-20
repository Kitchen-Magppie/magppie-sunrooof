import { LazyLoadImage } from 'react-lazy-load-image-component'
import logo from './assets/logo_header.png'

const Header = () => {
    return (
        <div className="bg-[#1b1a1a] flex flex-col min-h-screen items-center justify-center w-full">
            <LazyLoadImage effect='blur' src={logo} className="h-100 w-100" alt="" />
        </div>
    )
}

export default Header
