import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

//====================================================================

import {
    // Projects,
    SignIn,
    User,
} from '../containers'
import { useFirebaseCmsAuthListener } from '../utils/firebase'
import { ProtectedRoute } from '../components'
import { PageProgress } from '../../../components'

// ======================================================================

const CustomerView = lazy(() => import('../containers/Customer'))
const ProposedLayoutView = lazy(() => import('../containers/ProposedLayoutView'))

export default function CmsRoutes() {
    useFirebaseCmsAuthListener()
    // useAppService()

    return {
        path: 'cms',
        element: <ProtectedRoute />,
        children: [
            {
                path: 'sign-in',
                element: <SignIn />,
            },
            // {
            //     path: 'projects',
            //     element: <Projects />,
            // },
            {
                path: '',
                element: (<Suspense fallback={<PageProgress />}>
                    <CustomerView />
                </ Suspense>)

            },
            {
                path: 'proposed/layout',
                element: (<Suspense fallback={<PageProgress />}>
                    <ProposedLayoutView />
                </Suspense>)
            },
            {
                path: 'users',
                element: <User />,
            },
        ],
    } as RouteObject
}
