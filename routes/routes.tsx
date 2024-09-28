import { Navigate, useRoutes } from 'react-router-dom'
// ======================================================================
import CmsRoutes from '../app/cms/routes/routes'
import QuotationPage from '../app/QuotationPage'

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
                    element: <QuotationPage />,
                }
            ]
        },
        {
            path: '*',
            element: <Navigate to="/not-found" replace />,
        },
    ])
}
