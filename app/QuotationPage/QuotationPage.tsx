import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
//====================================================================
import { CMS_NAV_ITEMS } from '../cms/mocks'
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
import { BrowserTabTitle, PageProgress } from '../../components'
import useHomeData from '../cms/hooks/useHomeData'


export default function QuotationPage() {
    const { loading, components } = useHomeData()
    const { pathname } = useLocation()

    const params = useParams()
    const item = CMS_NAV_ITEMS?.find((row) => row.url === pathname)

    useEffect(() => {

        if (!loading) {
            if ('id' in params) {
                document.title = `Quotation for ${components.name}`
            } else {
                document.title = `${item?.title?.length ? item?.title : 'Home'} | Sunrooof`
            }
        }

    }, [components, item?.title, loading, params, pathname])
    if (loading) {
        return <PageProgress />
    }
    return (
        <div className="overflow-x-hidden">
            <BrowserTabTitle message={'id' in params ? `Quotation for ${components.name}` : `${item?.title?.length ? item?.title : 'Home'} | Sunrooof`} />
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

