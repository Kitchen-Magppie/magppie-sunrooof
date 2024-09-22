// import TwodDesigns from './2dDesigns'
// import ThreedDesigns from './3dDesigns'
import About from './About'
import BeforeAfter from './BeforeAfter/BeforeAfter'
import ClientName from './ClientName'
import Clients from './Clients'
import DesignedBy from './DesignedBy'
import Features from './Features'
// import Footer from './Footer'
import Guarantee from './Guarantee'
import Header from './Header'
import ProjectDetails from './ProjectDetails'
import Quotation from './Quotation'
import Team from './Team'
import TermsandConditions from './TermsandConditions/TermsandConditions'
import FooterFinal from './FooterFinal'
import BuyingJourney from './BuyingJourney'
import Navbar from './Navbar'
import { useFirebaseCmsCustomerListener } from '../cms/utils/firebase'
import { useAppSelector } from '../../redux'
import { PageProgress } from '../../components'
import { useMemo } from 'react'
import { DEFAULT_CUSTOMER } from '../cms/mocks'
import { CustomerComponentEnum } from '../../types'

const QuotationPage = () => {
    useFirebaseCmsCustomerListener()
    const { loading, value } = useAppSelector((state) => state.Cms.Customer);

    const currentCustomer = useMemo(() => value.find((row) => row.customerId === DEFAULT_CUSTOMER.customerId), [value])
    // console.log(loading, value)
    console.log(currentCustomer)
    if (loading) {
        return <PageProgress />
    }
    return (
        <div className='overflow-x-hidden'>
            <Navbar />
            <Header />
            <About />
            <Clients />
            <BeforeAfter item={currentCustomer?.components?.find(({ value }) => value === CustomerComponentEnum.Comparison).data} />
            <Features />
            <DesignedBy />
            <Team />
            <ClientName />
            <ProjectDetails />
            {/* <TwodDesigns />
            <ThreedDesigns /> */}
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
