import { Navigate, useRoutes } from 'react-router-dom'
// ======================================================================
import CmsRoutes from '../app/cms/routes/routes'
import QuotationPage from '../app/QuotationPage'

export default function Routes() {
    return useRoutes([
        CmsRoutes(),
        {
            path: '/',
            element: <QuotationPage />,
        },
        {
            path: '*',
            element: <Navigate to="/not-found" replace />,
        },
    ])
}
