import TwodDesigns from './2dDesigns'
import ThreedDesigns from './3dDesigns'
import About from './About'
import BeforeAfter from './BeforeAfter/BeforeAfter'
import BuyingJourney from './BuyingJourney'
import ClientName from './ClientName'
import Clients from './Clients'
import DesignedBy from './DesignedBy'
import Features from './Features'
import Footer from './Footer'
import Guarantee from './Guarantee'
import Header from './Header'
import Quotation from './Quotation'
import Team from './Team'
import TermsandConditions from './TermsandConditions/TermsandConditions'

const QuotationPage = () => {
    return (
        <>
            <Header />
            <About />
            <Clients />
            <BeforeAfter />
            <Features />
            <DesignedBy />
            <Team />
            <ClientName />
            <TwodDesigns />
            <ThreedDesigns />
            <Quotation />
            <TermsandConditions />
            <Guarantee />
            <BuyingJourney />
            <Footer />
        </>
    )
}

export default QuotationPage
