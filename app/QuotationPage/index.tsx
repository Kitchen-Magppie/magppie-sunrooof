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

import {
    CustomerComponentEnum,

} from '../../types'
import { PageProgress } from '../../components'
import useHomeData from '../cms/hooks/useHomeData'

const QuotationPage = () => {

    const { loading, components } = useHomeData()

    if (loading) {
        return <PageProgress />
    }
    return (<div className='overflow-x-hidden'>
        <Navbar />
        <Hero name={components.name} />
        <About />
        <Clients />
        <ImageComparison item={components[CustomerComponentEnum.Comparison]} />
        <Features item={components[CustomerComponentEnum.Feature]} />
        <DesignedBy />
        <Team />
        <TwodDesigns />
        {/* item={components[CustomerComponentEnum.TwoDDesign]} */}
        <ThreedDesigns item={components[CustomerComponentEnum.ThreeDDesign]} />
        <Quotation item={components[CustomerComponentEnum.Quotation]} />
        <TermsandConditions />
        <Guarantee />
        <BuyingJourney />
        <FooterFinal />
    </div>
    )
}

export default QuotationPage
