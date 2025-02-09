import { Navigate, useRoutes } from 'react-router-dom'
// ======================================================================
import CmsRoutes from '../app/cms/routes/routes'
import QuotationPage from '../app/QuotationPage/QuotationPage'
import QuotationHome from '../app/QuotationGenerator/Containers/Home'
import QuotationGenerator from '../app/QuotationGenerator/Containers/QuotationGenerator'
import { BrowserTabTitle } from '../components'

export default function Routes() {
    const CMS_ROUTES = CmsRoutes()
    return useRoutes([
        CMS_ROUTES,
        {
            path: '/',
            children: [
                {
                    path: '/',
                    element: <QuotationPage />,
                },
                {
                    path: '/quotation/:id',
                    element: <QuotationPage />
                },
            ],
        },
        {
            path: '/quotation-generator',
            element: <QuotationHome />,
        },
        // {
        //     path: '/design-generator',
        //     element: <QuotationCanvas />,
        // },
        {
            path: '/quotation-generator/quotation',
            element: <QuotationGenerator />,
        },
        {
            path: '/dump',
            element: <BrowserTabTitle message='Message me' />,

        },
        {
            path: '*',
            element: <Navigate to="/not-found" replace />,
        },
    ])
}
