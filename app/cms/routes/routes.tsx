import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

//====================================================================

import { useFirebaseCmsAuthListener } from '../utils/firebase'
import { ProtectedRoute } from '../components'
import { PageProgress } from '../../../components'

// Lazy components
// ======================================================================

const CustomerView = lazy(() => import('../containers/Customer'))
const ProposedLayoutView = lazy(
    () => import('../containers/ProposedLayoutView')
)
const ProposedLayoutOldView = lazy(
    () => import('../containers/Old/ProposedLayoutOldView')
)
const SignInView = lazy(() => import('../containers/auth/SignIn/SignIn'))

export default function CmsRoutes() {
    useFirebaseCmsAuthListener()
    return {
        path: 'cms',
        element: <ProtectedRoute />,
        children: [
            {
                path: 'sign-in',
                element: <SignInView />,
            },
            {
                path: '',
                element: (
                    <Suspense fallback={<PageProgress />}>
                        <CustomerView />
                    </Suspense>
                ),
            },
            {
                path: 'proposed/layout',
                element: (
                    <Suspense fallback={<PageProgress />}>
                        <ProposedLayoutView />
                    </Suspense>
                ),
            },
            {
                path: 'proposed/old/layout',
                element: (
                    <Suspense fallback={<PageProgress />}>
                        <ProposedLayoutOldView />
                    </Suspense>
                ),
            },
        ],
    } as RouteObject
}
