import TwodDesigns from './2dDesigns'
import ThreedDesigns from './3dDesigns'
import About from './About'
import Clients from './Clients'
import DesignedBy from './DesignedBy'
import Features from './Features'
import Guarantee from './Guarantee'
import Quotation from './Quotation/Quotation'
import Team from './Team'
import TermsandConditions from './TermsandConditions/TermsandConditions'
import FooterFinal from './FooterFinal'
import BuyingJourney from './BuyingJourney'
import Navbar from './Navbar'
import Hero from './Hero'
import ImageComparison from './Image'

import { CustomerComponentEnum } from '../../types'
import { PageProgress } from '../../components'
import useHomeData from '../cms/hooks/useHomeData'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const QuotationPage = () => {
    const { loading, components } = useHomeData()

    const params = useParams()
    useEffect(() => {

        if ('id' in params) {
            document.title = `Quotation for ${components.name}`
        }

    }, [components, params])
    if (loading) {
        return <PageProgress />
    }
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Hero name={components.name} item={components[CustomerComponentEnum.Quotation]} />
            <About />
            <Clients />
            {/* <ImageComparison item={DEFAULT_CUSTOMER?.components.find((item) => item.value === CustomerComponentEnum.Comparison)} /> */}
            <ImageComparison
                item={components[CustomerComponentEnum.Comparison]}
            />
            <Features item={components[CustomerComponentEnum.Feature]} />
            <DesignedBy />
            <Team />
            <TwodDesigns item={components[CustomerComponentEnum.TwoDDesign]} />
            <ThreedDesigns
                item={components[CustomerComponentEnum.ThreeDDesign]}
            />
            <Quotation name={components.name} item={components[CustomerComponentEnum.Quotation]} />
            <TermsandConditions />
            <Guarantee />
            <BuyingJourney />
            <FooterFinal />
        </div>
    )
}

export default QuotationPage
