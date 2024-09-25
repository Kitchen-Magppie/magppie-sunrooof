import TwodDesigns from './2dDesigns'
import ThreedDesigns from './3dDesigns'
import About from './About'
// import BeforeAfter from './BeforeAfter/BeforeAfter'
// import ClientName from './ClientName'
import Clients from './Clients'
// import DesignedBy from './DesignedBy'
import Features from './Features'
// import Footer from './Footer'
import Guarantee from './Guarantee'
// import Header from './Header'
import Quotation from './Quotation/Quotation'
import Team from './Team'
import TermsandConditions from './TermsandConditions/TermsandConditions'
import FooterFinal from './FooterFinal'
import BuyingJourney from './BuyingJourney'
import Navbar from './Navbar'
import Hero from './Hero'
import ImageComparison from './Image'
import { useFirebaseCmsCustomerListener } from '../cms/utils/firebase'
import { useAppSelector } from '../../redux'
import { useMemo } from 'react'
import { DEFAULT_CUSTOMER } from '../cms/mocks'
import { CustomerComponentEnum, TCustomerComponentClientItem, TCustomerComponentComparisonDataItem, TCustomerComponentQuotationItem } from '../../types'
import { PageProgress } from '../../components'

const QuotationPage = () => {
    useFirebaseCmsCustomerListener()
    const { loading, value } = useAppSelector((state) => state.Cms.Customer);

    console.log(value)

    const component = useMemo(() => {

        const data = value.find((row) => row.customerId === DEFAULT_CUSTOMER.customerId)
        return ({
            [CustomerComponentEnum.Comparison]: data?.components?.find(({ value }) => value === CustomerComponentEnum.Comparison).data as TCustomerComponentComparisonDataItem[],
            [CustomerComponentEnum.Client]: data?.components?.find(({ value }) => value === CustomerComponentEnum.Client) as unknown as TCustomerComponentClientItem,
            [CustomerComponentEnum.TwoDDesign]: data?.components?.find(({ value }) => value === CustomerComponentEnum.TwoDDesign) as unknown as TCustomerComponentClientItem,
            [CustomerComponentEnum.Quotation]: data?.components?.find(({ value }) => value === CustomerComponentEnum.Quotation) as unknown as TCustomerComponentQuotationItem,
        })

    }, [value])

    console.log(component)
    if (loading) {
        return <PageProgress />
    }
    return (
        <div className='overflow-x-hidden'>
            <Navbar />
            <Hero />
            {/* <ClientName /> */}
            {/* <DesignedBy /> */}
            {/* <Header /> */}
            <About />
            <Clients />
            <ImageComparison />
            {/* <BeforeAfter /> */}
            <Features />
            <Team />
            {/* <ProjectDetails /> */}
            <TwodDesigns />
            <ThreedDesigns />
            <Quotation
                item={component[CustomerComponentEnum.Quotation]}
            />
            <TermsandConditions />
            <Guarantee />
            <BuyingJourney />
            <FooterFinal />
        </div>
    )
}

export default QuotationPage
