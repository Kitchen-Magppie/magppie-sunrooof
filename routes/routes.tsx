import { Navigate, useRoutes } from 'react-router-dom'
// ======================================================================
import CmsRoutes from '../app/cms/routes/routes'
export default function Routes() {
    return useRoutes([
        CmsRoutes(),
        {
            path: '/',
            element: <>Hello World</>,
        },
        {
            path: '*',
            element: <Navigate to="/not-found" replace />,
        },

    ])
}
