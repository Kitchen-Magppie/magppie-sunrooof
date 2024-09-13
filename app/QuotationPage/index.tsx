import About from './About'
import BuyingJourney from './BuyingJourney'
// import Clients from './Clients'
import Features from './Features'
import Footer from './Footer'
import Guarantee from './Guarantee'
import Header from './Header'
import Quotation from './Quotation'
import TermsandConditions from './TermsandConditions/TermsandConditions'

const QuotationPage = () => {
    return (
        <>
            <Header />
            <About />
            {/* <Clients /> */}
            <Features />
            <Quotation />
            <TermsandConditions />
            <Guarantee />
            <BuyingJourney />
            <Footer />
        </>
    )
}

export default QuotationPage
