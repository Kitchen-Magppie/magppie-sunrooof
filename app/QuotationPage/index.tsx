import TwodDesigns from './2dDesigns'
import ThreedDesigns from './3dDesigns'
import About from './About'
import BeforeAfter from './BeforeAfter/BeforeAfter'
import ClientName from './ClientName'
import Clients from './Clients'
import DesignedBy from './DesignedBy'
import Features from './Features'
// import Footer from './Footer'
import Guarantee from './Guarantee'
import Header from './Header'
import Quotation from './Quotation/Quotation'
import Team from './Team'
import TermsandConditions from './TermsandConditions/TermsandConditions'
import FooterFinal from './FooterFinal'
import BuyingJourney from './BuyingJourney'
import Navbar from './Navbar'

const QuotationPage = () => {
    return (
        <div className='overflow-x-hidden'>
            <Navbar />
            <Header />
            <About />
            <Clients />
            <BeforeAfter />
            <Features />
            <DesignedBy />
            <Team />
            <ClientName />
            {/* <ProjectDetails /> */}
            <TwodDesigns />
            <ThreedDesigns />
            <Quotation />
            <TermsandConditions />
            <Guarantee />
            <BuyingJourney />
            {/* <Footer /> */}
            <FooterFinal />
        </div>
    )
}

export default QuotationPage
